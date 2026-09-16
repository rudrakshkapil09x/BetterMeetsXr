"""
BetterMeetsXR: High-Performance LM Studio Client
Author: Chaitanya Anand et al.
Target: ACM CHI 2027

Interfaces directly with local LM Studio API (http://localhost:1234/v1).
Optimized for low latency, zero overhead, and strict output validation.
"""

from __future__ import annotations
import json
import logging
from typing import Dict, List, Optional
import requests

logger = logging.getLogger(__name__)

DEFAULT_LM_STUDIO_URL = "http://localhost:1234/v1"
DEFAULT_MODEL = "qwen/qwen2.5-coder-14b"


class LMStudioClient:
    """
    Direct, lightweight HTTP client for the local LM Studio OpenAI-compatible endpoint.
    """

    def __init__(self, base_url: str = DEFAULT_LM_STUDIO_URL, model: str = DEFAULT_MODEL, timeout: int = 45):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout = timeout
        self._verify_connection()

    def _verify_connection(self):
        try:
            r = requests.get(f"{self.base_url}/models", timeout=5)
            r.raise_for_status()
            models_data = r.json().get("data", [])
            available_ids = [m["id"] for m in models_data]
            if self.model not in available_ids and available_ids:
                logger.warning(f"Configured model '{self.model}' not in available models {available_ids}. Selecting '{available_ids[0]}'.")
                self.model = available_ids[0]
        except Exception as e:
            logger.warning(f"LM Studio connection check warning: {e}. Defaulting to '{self.model}'.")

    def generate_completion(
        self,
        prompt: str,
        system_prompt: str = "You are an expert AI co-pilot for collaborative XR meetings.",
        temperature: float = 0.2,
        max_tokens: int = 500
    ) -> str:
        url = f"{self.base_url}/chat/completions"
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        resp = requests.post(url, json=payload, timeout=self.timeout)
        if resp.status_code != 200:
            raise RuntimeError(f"LM Studio returned HTTP {resp.status_code}: {resp.text}")
        data = resp.json()
        return data["choices"][0]["message"]["content"].strip()

    def process_speech_chunk(self, raw_transcript: str, speaker: str) -> Dict[str, str]:
        """
        Filters speech disfluencies ('um', 'uh', false starts) and distills
        the utterance into a concise semantic card for the personal slate.
        """
        system_prompt = (
            "You are a real-time speech-to-intent engine for an XR tablet. "
            "Given a spoken utterance, filter out fillers ('um', 'like', 'you know') "
            "and output a JSON object with: 'distilled_text' (succinct phrase, max 15 words) "
            "and 'intent' ('claim', 'question', 'action', 'evidence', or 'proposal'). Return ONLY raw JSON."
        )
        prompt = f"Speaker: {speaker}\nUtterance: {raw_transcript}"
        raw_output = self.generate_completion(prompt, system_prompt=system_prompt, temperature=0.1, max_tokens=100)

        valid_intents = {"claim", "question", "action", "evidence", "proposal"}
        clean_json = raw_output.replace("```json", "").replace("```", "").strip()
        try:
            parsed = json.loads(clean_json)
            raw_intent = str(parsed.get("intent", "claim")).strip().lower()
            intent = raw_intent if raw_intent in valid_intents else "claim"
            distilled = str(parsed.get("distilled_text", raw_transcript.strip())).strip()
            return {
                "distilled_text": distilled if distilled else raw_transcript.strip(),
                "intent": intent
            }
        except Exception:
            return {
                "distilled_text": raw_transcript.strip(),
                "intent": "claim"
            }
