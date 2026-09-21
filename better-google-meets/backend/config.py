"""
Configuration settings for BetterGoogleMeets backend.
Reads from environment variables or .env file.
"""

import os
from pydantic import BaseModel, Field


class Settings(BaseModel):
    # Host & Port
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    # Active Provider: "auto", "lm_studio", "gemini_flash", "mock"
    ACTIVE_PROVIDER: str = os.getenv("ACTIVE_PROVIDER", "auto")

    # Local LM Studio Engine
    LM_STUDIO_URL: str = os.getenv("LM_STUDIO_URL", "http://localhost:1234/v1")
    LM_STUDIO_MODEL: str = os.getenv("LM_STUDIO_MODEL", "qwen2.5-coder:14b")
    LM_STUDIO_TIMEOUT: float = float(os.getenv("LM_STUDIO_TIMEOUT", "3.5"))

    # Google Gemini Flash Engine
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    GEMINI_TIMEOUT: float = float(os.getenv("GEMINI_TIMEOUT", "8.0"))

    # Efficiency & Cache Settings
    LRU_CACHE_CAPACITY: int = int(os.getenv("LRU_CACHE_CAPACITY", "500"))
    LEXICAL_PREFILTER_THRESHOLD: float = float(os.getenv("LEXICAL_PREFILTER_THRESHOLD", "0.20"))


settings = Settings()
