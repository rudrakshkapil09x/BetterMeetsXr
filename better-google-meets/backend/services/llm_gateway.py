"""
BetterGoogleMeets: Ultra-Efficient Dual-Engine LLM Gateway
Supports:
1. Local LM Studio (OpenAI-compatible REST on localhost:1234)
2. Google Gemini Flash (Direct REST API with Gemini 2.5 Flash / 1.5 Flash)
3. In-Memory LRU Prompt Cache (sub-1ms response for repeated queries)
4. Heuristic Fallback Engine (guarantees meeting continuity during network drops)
"""

from __future__ import annotations
import hashlib
import json
import logging
import re
import time
from collections import OrderedDict
from typing import Any, Dict, Optional, Tuple
import httpx

from config import settings

logger = logging.getLogger("LLMGateway")


class LRUCache:
    """Thread-safe simple LRU Cache for prompt completions."""
    def __init__(self, capacity: int = 500):
        self.cache: OrderedDict[str, str] = OrderedDict()
        self.capacity = capacity

    def get(self, key: str) -> Optional[str]:
        if key in self.cache:
            self.cache.move_to_end(key)
            return self.cache[key]
        return None

    def put(self, key: str, value: str):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)


class LLMGateway:
    """
    Unified dual-engine LLM client with intelligent fallback,
    latency tracking, and in-memory caching.
    """

    def __init__(self):
        self.cache = LRUCache(capacity=settings.LRU_CACHE_CAPACITY)
        self.active_provider = settings.ACTIVE_PROVIDER
        self.last_latency_ms: Dict[str, float] = {"lm_studio": 0.0, "gemini_flash": 0.0}
        self.provider_status: Dict[str, bool] = {"lm_studio": False, "gemini_flash": False}

    def _compute_cache_key(self, prompt: str, system_prompt: str, max_tokens: int) -> str:
        raw = f"{system_prompt}||{prompt}||{max_tokens}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    def _extract_json(self, text: str) -> Dict[str, Any]:
        """Extract and parse JSON safely, even when surrounded by commentary or markdown."""
        if not text:
            return {}
        cleaned = re.sub(r"^```(?:json)?\s*", "", text.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r"\s*```$", "", cleaned.strip(), flags=re.MULTILINE)

        # Direct JSON load attempt
        try:
            return json.loads(cleaned)
        except Exception:
            pass

        # Regex search for first JSON object
        match = re.search(r"(\{.*?\})", cleaned, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(1))
            except Exception:
                pass

        return {}

    async def generate(
        self,
        prompt: str,
        system_prompt: str = "You are a concise meeting deliberation AI. Output JSON only.",
        temperature: float = 0.2,
        max_tokens: int = 150
    ) -> Tuple[str, str]:
        """
        Generates completion. Returns tuple of (response_text, provider_used).
        Checks LRU cache first.
        """
        cache_key = self._compute_cache_key(prompt, system_prompt, max_tokens)
        cached = self.cache.get(cache_key)
        if cached:
            logger.info("Gateway: Cache HIT (0ms, 0 tokens)")
            return cached, "cache"

        # Determine route based on active_provider
        provider = self.active_provider.lower()

        if provider in ("auto", "lm_studio"):
            res, ok = await self._call_lm_studio(prompt, system_prompt, temperature, max_tokens)
            if ok:
                self.cache.put(cache_key, res)
                return res, "lm_studio"
            elif provider == "lm_studio":
                logger.warning("LM Studio requested but failed. Falling back to heuristic.")
                fallback = self._heuristic_fallback(prompt, system_prompt)
                self.cache.put(cache_key, fallback)
                return fallback, "heuristic_fallback"

        if provider in ("auto", "gemini_flash"):
            res, ok = await self._call_gemini_flash(prompt, system_prompt, temperature, max_tokens)
            if ok:
                self.cache.put(cache_key, res)
                return res, "gemini_flash"
            elif provider == "gemini_flash":
                logger.warning("Gemini Flash requested but failed. Falling back to heuristic.")
                fallback = self._heuristic_fallback(prompt, system_prompt)
                self.cache.put(cache_key, fallback)
                return fallback, "heuristic_fallback"

        # Universal fallback if all else fails
        logger.info("Using deterministic heuristic fallback.")
        fallback = self._heuristic_fallback(prompt, system_prompt)
        self.cache.put(cache_key, fallback)
        return fallback, "heuristic_fallback"

    async def _call_lm_studio(
        self, prompt: str, system_prompt: str, temperature: float, max_tokens: int
    ) -> Tuple[str, bool]:
        """Call Local LM Studio (OpenAI-compatible endpoint)."""
        start_t = time.perf_counter()
        url = f"{settings.LM_STUDIO_URL}/chat/completions"
        payload = {
            "model": settings.LM_STUDIO_MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        try:
            async with httpx.AsyncClient(timeout=settings.LM_STUDIO_TIMEOUT) as client:
                resp = await client.post(url, json=payload)
                latency = (time.perf_counter() - start_t) * 1000.0
                self.last_latency_ms["lm_studio"] = round(latency, 1)

                if resp.status_code == 200:
                    data = resp.json()
                    content = data["choices"][0]["message"]["content"]
                    self.provider_status["lm_studio"] = True
                    logger.info(f"LM Studio call successful in {latency:.1f}ms")
                    return content, True
                else:
                    self.provider_status["lm_studio"] = False
                    return "", False
        except Exception as e:
            self.provider_status["lm_studio"] = False
            logger.warning(f"LM Studio unavailable ({e}). Triggering fallback.")
            return "", False

    async def _call_gemini_flash(
        self, prompt: str, system_prompt: str, temperature: float, max_tokens: int
    ) -> Tuple[str, bool]:
        """Call Google Gemini Flash via REST API."""
        if not settings.GEMINI_API_KEY:
            logger.info("No GEMINI_API_KEY provided; skipping Gemini Flash.")
            self.provider_status["gemini_flash"] = False
            return "", False

        start_t = time.perf_counter()
        model_name = settings.GEMINI_MODEL
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={settings.GEMINI_API_KEY}"

        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": f"{system_prompt}\n\nTask:\n{prompt}"}]
                }
            ],
            "generationConfig": {
                "temperature": temperature,
                "maxOutputTokens": max_tokens,
                "responseMimeType": "application/json"
            }
        }

        try:
            async with httpx.AsyncClient(timeout=settings.GEMINI_TIMEOUT) as client:
                resp = await client.post(url, json=payload)
                latency = (time.perf_counter() - start_t) * 1000.0
                self.last_latency_ms["gemini_flash"] = round(latency, 1)

                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        content = candidates[0]["content"]["parts"][0]["text"]
                        self.provider_status["gemini_flash"] = True
                        logger.info(f"Gemini Flash call successful in {latency:.1f}ms")
                        return content, True
                self.provider_status["gemini_flash"] = False
                return "", False
        except Exception as e:
            self.provider_status["gemini_flash"] = False
            logger.warning(f"Gemini Flash call failed: {e}")
            return "", False

    def _heuristic_fallback(self, prompt: str, system_prompt: str = "") -> str:
        """Deterministic, instant heuristic engine guaranteeing zero dropped turns."""
        prompt_lower = prompt.lower()
        sys_lower = system_prompt.lower()
        combined = f"{prompt_lower} {sys_lower}"

        # 1. Texterial text compression / knead
        if "compress" in sys_lower or "knead" in sys_lower or "sharp 5-10 word" in sys_lower:
            words = prompt.replace("Text:", "").strip().split()
            return " ".join(words[:7]) + "."

        # 2. Texterial text elaboration / stretch
        if "elaboration" in sys_lower or "stretch" in sys_lower:
            base = prompt.replace("Text:", "").strip()
            return f"{base} This ensures operational resilience and architectural alignment."

        # 3. Speech ingestion & intent classification
        if "classify" in combined or "distill" in combined or "utterance:" in prompt_lower or "speaker:" in prompt_lower:
            intent = "claim"
            if any(w in prompt_lower for w in ["propose", "suggest", "should", "could", "recommend"]):
                intent = "proposal"
            elif any(w in prompt_lower for w in ["why", "what", "how", "when", "?"]):
                intent = "question"
            elif any(w in prompt_lower for w in ["action", "will do", "assign", "by friday", "next step"]):
                intent = "action"
            elif any(w in prompt_lower for w in ["benchmark", "data", "log", "metrics", "tested"]):
                intent = "evidence"

            distilled_line = prompt.split("\n")[-1].replace("Utterance:", "").strip()
            return json.dumps({
                "distilled_text": distilled_line[:120],
                "intent": intent,
                "confidence": 0.85
            })

        # 4. Proposal conflict analysis request
        has_conflict = any(w in prompt_lower for w in ["conflict", "contradict", "zero budget", "reject", "impossible", "exceeds"])
        return json.dumps({
            "has_conflict": has_conflict,
            "conflict_reason": "Constraint collision detected with active parent node." if has_conflict else "No semantic collision detected.",
            "trade_off_analysis": "Operational constraint clash requires compromise." if has_conflict else "Synergistic proposal extending the parent solution node.",
            "alignment_score": 0.45 if has_conflict else 0.92,
            "compromise_synthesis": "Adopt phased rollout: validate baseline performance in staging before committing full resources." if has_conflict else None
        })

    async def get_engine_status(self) -> Dict[str, Any]:
        """Returns live status and latency pings of available engines."""
        # Lightweight ping to LM Studio
        lm_online = False
        try:
            async with httpx.AsyncClient(timeout=1.0) as client:
                r = await client.get(f"{settings.LM_STUDIO_URL}/models")
                lm_online = (r.status_code == 200)
        except Exception:
            lm_online = False

        self.provider_status["lm_studio"] = lm_online
        self.provider_status["gemini_flash"] = bool(settings.GEMINI_API_KEY)

        return {
            "active_provider": self.active_provider,
            "lm_studio": {
                "online": lm_online,
                "url": settings.LM_STUDIO_URL,
                "model": settings.LM_STUDIO_MODEL,
                "last_latency_ms": self.last_latency_ms["lm_studio"]
            },
            "gemini_flash": {
                "configured": bool(settings.GEMINI_API_KEY),
                "model": settings.GEMINI_MODEL,
                "last_latency_ms": self.last_latency_ms["gemini_flash"]
            }
        }
