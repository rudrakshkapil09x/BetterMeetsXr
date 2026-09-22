"""
BetterGoogleMeets: Core Configuration Settings
Supports environment variables and .env file loading via python-dotenv and Pydantic.
"""

from __future__ import annotations
import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load .env if present
env_path = Path(__file__).resolve().parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()


class Settings(BaseModel):
    # Host & Port
    HOST: str = Field(default_factory=lambda: os.getenv("HOST", "0.0.0.0"))
    PORT: int = Field(default_factory=lambda: int(os.getenv("PORT", "8000")))

    # Active Provider: "lm_studio", "ollama", "auto"
    ACTIVE_PROVIDER: str = Field(default_factory=lambda: os.getenv("ACTIVE_PROVIDER", "lm_studio"))

    # Local LLM Engines (LM Studio primary on port 1234, Ollama on port 11434)
    LM_STUDIO_URL: str = Field(default_factory=lambda: os.getenv("LM_STUDIO_URL", "http://localhost:1234/v1"))
    LM_STUDIO_MODEL: str = Field(default_factory=lambda: os.getenv("LM_STUDIO_MODEL", "default"))
    OLLAMA_URL: str = Field(default_factory=lambda: os.getenv("OLLAMA_URL", "http://localhost:11434/v1"))
    OLLAMA_MODEL: str = Field(default_factory=lambda: os.getenv("OLLAMA_MODEL", "qwen2.5-coder:14b"))
    LOCAL_LLM_TIMEOUT: float = Field(default_factory=lambda: float(os.getenv("LOCAL_LLM_TIMEOUT", "15.0")))
    LM_STUDIO_TIMEOUT: float = Field(default_factory=lambda: float(os.getenv("LM_STUDIO_TIMEOUT", "15.0")))

    # Google Gemini Flash Engine
    GEMINI_API_KEY: str = Field(default_factory=lambda: os.getenv("GEMINI_API_KEY", ""))
    GEMINI_MODEL: str = Field(default_factory=lambda: os.getenv("GEMINI_MODEL", "gemini-2.5-flash"))
    GEMINI_TIMEOUT: float = Field(default_factory=lambda: float(os.getenv("GEMINI_TIMEOUT", "8.0")))

    # Efficiency & Cache Settings
    LRU_CACHE_CAPACITY: int = Field(default_factory=lambda: int(os.getenv("LRU_CACHE_CAPACITY", "500")))
    LEXICAL_PREFILTER_THRESHOLD: float = Field(default_factory=lambda: float(os.getenv("LEXICAL_PREFILTER_THRESHOLD", "0.20")))

    # Database Persistence Settings
    DB_PATH: str = Field(default_factory=lambda: os.getenv("DB_PATH", "better_meets.db"))

    # Consensus threshold
    REQUIRED_VOTES: int = Field(default_factory=lambda: int(os.getenv("REQUIRED_VOTES", "3")))


settings = Settings()
