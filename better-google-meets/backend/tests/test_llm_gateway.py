import pytest
import asyncio
import sys
import os

# Add parent directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.llm_gateway import LLMGateway, LRUCache


def test_lru_cache():
    cache = LRUCache(capacity=2)
    cache.put("k1", "v1")
    cache.put("k2", "v2")
    assert cache.get("k1") == "v1"
    assert cache.get("k2") == "v2"

    # Evict k1
    cache.put("k3", "v3")
    assert cache.get("k1") is None
    assert cache.get("k2") == "v2"
    assert cache.get("k3") == "v3"


def test_json_extractor():
    gateway = LLMGateway()

    # Raw JSON
    res1 = gateway._extract_json('{"key": "value"}')
    assert res1 == {"key": "value"}

    # Markdown fenced JSON
    res2 = gateway._extract_json('```json\n{"has_conflict": true, "alignment": 0.8}\n```')
    assert res2 == {"has_conflict": True, "alignment": 0.8}

    # Embedded in prose
    res3 = gateway._extract_json('Here is the evaluation:\n{"trade_off": "budget clash"}\nHope this helps!')
    assert res3 == {"trade_off": "budget clash"}

    # Malformed / empty
    assert gateway._extract_json("") == {}


def test_gateway_heuristic_fallback():
    async def _test():
        gateway = LLMGateway()
        gateway.active_provider = "mock"

        prompt = "Utterance: We should benchmark Redis cache latency before launch."
        resp, provider = await gateway.generate(prompt, "You are a classifier.")
        assert provider in ("heuristic_fallback", "mock")

        data = gateway._extract_json(resp)
        assert "intent" in data
        assert data["intent"] in ["claim", "proposal", "question", "action", "evidence"]

    asyncio.run(_test())


def test_gateway_cache_hit():
    async def _test():
        gateway = LLMGateway()
        prompt = "Unique test prompt for caching verification."
        resp1, prov1 = await gateway.generate(prompt, "Test system prompt")

        # Second call must hit LRU cache with 0ms overhead
        resp2, prov2 = await gateway.generate(prompt, "Test system prompt")
        assert prov2 == "cache"
        assert resp1 == resp2

    asyncio.run(_test())

