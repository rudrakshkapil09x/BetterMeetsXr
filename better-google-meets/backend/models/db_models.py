"""
Database model definitions and schemas for BetterGoogleMeets.
"""

from dataclasses import dataclass
from typing import Optional, List


@dataclass
class MeetingRecord:
    meeting_id: str
    title: str
    revision: int
    state_hash: str
    dag_json: str
    created_at: float
    updated_at: float


@dataclass
class SpeechSlateRecord:
    id: Optional[int]
    meeting_id: str
    speaker: str
    transcript: str
    distilled_text: str
    intent: str
    created_at: float
