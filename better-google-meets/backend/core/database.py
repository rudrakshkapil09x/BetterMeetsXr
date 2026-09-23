"""
BetterGoogleMeets: Asynchronous SQLite Database Layer
Provides WAL-mode ACID persistence for meetings, Merkle DAG snapshots, speech cards, and votes.
Uses standard library sqlite3 wrapped in asyncio.to_thread for robust, zero-dependency async operation.
"""

from __future__ import annotations
import asyncio
import json
import logging
import sqlite3
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

from core.config import settings

logger = logging.getLogger("Database")


class Database:
    def __init__(self, db_path: Optional[str] = None):
        self.db_path = db_path or settings.DB_PATH
        self._schema_initialized = False
        self._init_schema_sync()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        # Enable WAL mode for high concurrency
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA synchronous=NORMAL;")
        conn.execute("PRAGMA foreign_keys=ON;")
        return conn

    def _init_schema_sync(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS meetings (
                meeting_id TEXT PRIMARY KEY,
                title TEXT,
                revision INTEGER DEFAULT 0,
                state_hash TEXT,
                dag_json TEXT,
                created_at REAL,
                updated_at REAL
            );
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS speech_slates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                meeting_id TEXT,
                speaker TEXT,
                transcript TEXT,
                distilled_text TEXT,
                intent TEXT,
                created_at REAL,
                FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id)
            );
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS proposal_diffs (
                proposal_id TEXT PRIMARY KEY,
                meeting_id TEXT,
                parent_id TEXT,
                candidate_text TEXT,
                author TEXT,
                node_type TEXT,
                has_conflict INTEGER,
                conflict_reason TEXT,
                trade_off_analysis TEXT,
                compromise_synthesis TEXT,
                created_at REAL
            );
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS votes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                meeting_id TEXT,
                proposal_id TEXT,
                voter TEXT,
                created_at REAL,
                UNIQUE(meeting_id, proposal_id, voter)
            );
            """)

            # Migration: mark whether a staged proposal has already been merged into the DAG.
            # Guards against double-merge races and lets /proposals hydrate only pending ones.
            try:
                cursor.execute("ALTER TABLE proposal_diffs ADD COLUMN merged INTEGER DEFAULT 0")
            except sqlite3.OperationalError:
                pass  # column already exists

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS transcripts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                meeting_id TEXT,
                speaker TEXT,
                text TEXT,
                created_at REAL,
                extracted INTEGER DEFAULT 0,
                FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id)
            );
            """)
            conn.commit()
            logger.info("Database schema initialized with WAL mode enabled.")

    async def init_schema(self):
        await asyncio.to_thread(self._init_schema_sync)

    def _save_dag_sync(self, meeting_id: str, title: str, revision: int, state_hash: str, dag_json: str):
        now = time.time()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO meetings (meeting_id, title, revision, state_hash, dag_json, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(meeting_id) DO UPDATE SET
                title = excluded.title,
                revision = excluded.revision,
                state_hash = excluded.state_hash,
                dag_json = excluded.dag_json,
                updated_at = excluded.updated_at;
            """, (meeting_id, title, revision, state_hash, dag_json, now, now))
            conn.commit()

    async def save_dag(self, meeting_id: str, title: str, revision: int, state_hash: str, dag_json: str):
        await asyncio.to_thread(
            self._save_dag_sync, meeting_id, title, revision, state_hash, dag_json
        )

    def _load_dag_sync(self, meeting_id: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT dag_json FROM meetings WHERE meeting_id = ?", (meeting_id,))
            row = cursor.fetchone()
            if row and row["dag_json"]:
                return json.loads(row["dag_json"])
            return None

    async def load_dag(self, meeting_id: str) -> Optional[Dict[str, Any]]:
        return await asyncio.to_thread(self._load_dag_sync, meeting_id)

    def _save_speech_slate_sync(self, meeting_id: str, speaker: str, transcript: str, distilled_text: str, intent: str) -> int:
        now = time.time()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT OR IGNORE INTO meetings (meeting_id, title, revision, state_hash, dag_json, created_at, updated_at)
            VALUES (?, 'Meeting', 0, '', '', ?, ?)
            """, (meeting_id, now, now))
            cursor.execute("""
            INSERT INTO speech_slates (meeting_id, speaker, transcript, distilled_text, intent, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (meeting_id, speaker, transcript, distilled_text, intent, now))
            conn.commit()
            return cursor.lastrowid

    def _update_speech_slate_sync(self, slate_id: int, transcript: str, distilled_text: str, intent: str):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE speech_slates
            SET transcript = ?, distilled_text = ?, intent = ?
            WHERE id = ?
            """, (transcript, distilled_text, intent, slate_id))
            conn.commit()

    async def update_speech_slate(self, slate_id: int, transcript: str, distilled_text: str, intent: str):
        await asyncio.to_thread(self._update_speech_slate_sync, slate_id, transcript, distilled_text, intent)

    def _load_speech_slates_sync(self, meeting_id: str, limit: int = 50) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT id, speaker, transcript, distilled_text, intent, created_at
            FROM speech_slates
            WHERE meeting_id = ?
            ORDER BY id DESC
            LIMIT ?
            """, (meeting_id, limit))
            rows = cursor.fetchall()
            return [
                {
                    "id": f"card_{r['id']}",
                    "speaker": r["speaker"],
                    "rawText": r["transcript"],
                    "distilledText": r["distilled_text"],
                    "intent": r["intent"],
                    "createdAt": r["created_at"] * 1000,
                    "isStaged": False
                }
                for r in rows
            ]

    async def load_speech_slates(self, meeting_id: str, limit: int = 50) -> List[Dict[str, Any]]:
        return await asyncio.to_thread(self._load_speech_slates_sync, meeting_id, limit)

    async def save_speech_slate(self, meeting_id: str, speaker: str, transcript: str, distilled_text: str, intent: str) -> int:
        return await asyncio.to_thread(
            self._save_speech_slate_sync, meeting_id, speaker, transcript, distilled_text, intent
        )

    def _save_proposal_diff_sync(self, p_diff: dict, meeting_id: str):
        now = time.time()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT OR IGNORE INTO meetings (meeting_id, title, revision, state_hash, dag_json, created_at, updated_at)
            VALUES (?, 'Meeting', 0, '', '', ?, ?)
            """, (meeting_id, now, now))
            cursor.execute("""
            INSERT OR REPLACE INTO proposal_diffs
            (proposal_id, meeting_id, parent_id, candidate_text, author, node_type,
             has_conflict, conflict_reason, trade_off_analysis, compromise_synthesis, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                p_diff["proposal_id"],
                meeting_id,
                p_diff["parent_id"],
                p_diff["text"],
                p_diff["author"],
                p_diff.get("node_type", "proposal"),
                1 if p_diff.get("has_conflict") else 0,
                p_diff.get("conflict_reason", ""),
                p_diff.get("trade_off_analysis", ""),
                p_diff.get("compromise_synthesis"),
                now
            ))
            conn.commit()

    async def save_proposal_diff(self, p_diff: dict, meeting_id: str):
        await asyncio.to_thread(self._save_proposal_diff_sync, p_diff, meeting_id)

    def _record_vote_sync(self, meeting_id: str, proposal_id: str, voter: str) -> int:
        now = time.time()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT OR IGNORE INTO meetings (meeting_id, title, revision, state_hash, dag_json, created_at, updated_at)
            VALUES (?, 'Meeting', 0, '', '', ?, ?)
            """, (meeting_id, now, now))
            cursor.execute("""
            INSERT OR IGNORE INTO votes (meeting_id, proposal_id, voter, created_at)
            VALUES (?, ?, ?, ?)
            """, (meeting_id, proposal_id, voter, now))
            conn.commit()

            cursor.execute("SELECT COUNT(*) as cnt FROM votes WHERE meeting_id = ? AND proposal_id = ?", (meeting_id, proposal_id))
            row = cursor.fetchone()
            return row["cnt"] if row else 1

    async def record_vote(self, meeting_id: str, proposal_id: str, voter: str) -> int:
        return await asyncio.to_thread(self._record_vote_sync, meeting_id, proposal_id, voter)

    def _get_voters_sync(self, meeting_id: str, proposal_id: str) -> List[str]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT voter FROM votes WHERE meeting_id = ? AND proposal_id = ? ORDER BY created_at ASC
            """, (meeting_id, proposal_id))
            return [r["voter"] for r in cursor.fetchall()]

    async def get_voters(self, meeting_id: str, proposal_id: str) -> List[str]:
        return await asyncio.to_thread(self._get_voters_sync, meeting_id, proposal_id)

    def _mark_proposal_merged_sync(self, meeting_id: str, proposal_id: str) -> bool:
        """Atomically flips merged 0->1. Returns True only for the caller that actually flipped it,
        so concurrent vote requests crossing the threshold at once can't double-merge."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE proposal_diffs SET merged = 1 WHERE meeting_id = ? AND proposal_id = ? AND merged = 0
            """, (meeting_id, proposal_id))
            conn.commit()
            return cursor.rowcount > 0

    async def mark_proposal_merged(self, meeting_id: str, proposal_id: str) -> bool:
        return await asyncio.to_thread(self._mark_proposal_merged_sync, meeting_id, proposal_id)

    def _get_proposal_diff_sync(self, meeting_id: str, proposal_id: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT * FROM proposal_diffs WHERE meeting_id = ? AND proposal_id = ?
            """, (meeting_id, proposal_id))
            row = cursor.fetchone()
            return dict(row) if row else None

    async def get_proposal_diff(self, meeting_id: str, proposal_id: str) -> Optional[Dict[str, Any]]:
        return await asyncio.to_thread(self._get_proposal_diff_sync, meeting_id, proposal_id)

    def _get_pending_proposals_sync(self, meeting_id: str) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT * FROM proposal_diffs WHERE meeting_id = ? AND merged = 0 ORDER BY created_at ASC
            """, (meeting_id,))
            diffs = [dict(r) for r in cursor.fetchall()]
            for d in diffs:
                cursor.execute("""
                SELECT voter FROM votes WHERE meeting_id = ? AND proposal_id = ? ORDER BY created_at ASC
                """, (meeting_id, d["proposal_id"]))
                d["voters"] = [r["voter"] for r in cursor.fetchall()]
            return diffs

    async def get_pending_proposals(self, meeting_id: str) -> List[Dict[str, Any]]:
        return await asyncio.to_thread(self._get_pending_proposals_sync, meeting_id)

    def _save_transcript_sync(self, meeting_id: str, speaker: str, text: str) -> int:
        now = time.time()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT OR IGNORE INTO meetings (meeting_id, title, revision, state_hash, dag_json, created_at, updated_at)
            VALUES (?, 'Meeting', 0, '', '', ?, ?)
            """, (meeting_id, now, now))
            cursor.execute("""
            INSERT INTO transcripts (meeting_id, speaker, text, created_at, extracted)
            VALUES (?, ?, ?, ?, 0)
            """, (meeting_id, speaker, text, now))
            conn.commit()
            return cursor.lastrowid

    async def save_transcript(self, meeting_id: str, speaker: str, text: str) -> int:
        return await asyncio.to_thread(self._save_transcript_sync, meeting_id, speaker, text)

    def _update_transcript_sync(self, transcript_id: int, text: str):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE transcripts
            SET text = ?
            WHERE id = ?
            """, (text, transcript_id))
            conn.commit()

    async def update_transcript(self, transcript_id: int, text: str):
        await asyncio.to_thread(self._update_transcript_sync, transcript_id, text)

    def _get_unextracted_transcripts_sync(self, meeting_id: str, limit: int = 300) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT id, speaker, text, created_at
            FROM transcripts
            WHERE meeting_id = ? AND extracted = 0
            ORDER BY id ASC
            LIMIT ?
            """, (meeting_id, limit))
            rows = cursor.fetchall()
            return [
                {
                    "id": r["id"],
                    "speaker": r["speaker"],
                    "text": r["text"],
                    "created_at": r["created_at"]
                }
                for r in rows
            ]

    async def get_unextracted_transcripts(self, meeting_id: str, limit: int = 300) -> List[Dict[str, Any]]:
        return await asyncio.to_thread(self._get_unextracted_transcripts_sync, meeting_id, limit)

    def _mark_transcripts_extracted_sync(self, transcript_ids: List[int]):
        if not transcript_ids:
            return
        placeholders = ",".join("?" * len(transcript_ids))
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"""
            UPDATE transcripts
            SET extracted = 1
            WHERE id IN ({placeholders})
            """, transcript_ids)
            conn.commit()

    async def mark_transcripts_extracted(self, transcript_ids: List[int]):
        await asyncio.to_thread(self._mark_transcripts_extracted_sync, transcript_ids)

    def _get_all_transcripts_sync(self, meeting_id: str, limit: int = 500) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT id, speaker, text, created_at, extracted
            FROM transcripts
            WHERE meeting_id = ?
            ORDER BY id ASC
            LIMIT ?
            """, (meeting_id, limit))
            rows = cursor.fetchall()
            return [
                {
                    "id": r["id"],
                    "speaker": r["speaker"],
                    "text": r["text"],
                    "created_at": r["created_at"],
                    "extracted": bool(r["extracted"])
                }
                for r in rows
            ]

    async def get_all_transcripts(self, meeting_id: str, limit: int = 500) -> List[Dict[str, Any]]:
        return await asyncio.to_thread(self._get_all_transcripts_sync, meeting_id, limit)

    def _get_recent_transcripts_sync(self, meeting_id: str, limit: int = 5) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            SELECT id, speaker, text, created_at
            FROM transcripts
            WHERE meeting_id = ?
            ORDER BY id DESC
            LIMIT ?
            """, (meeting_id, limit))
            rows = cursor.fetchall()
            items = [
                {
                    "id": r["id"],
                    "speaker": r["speaker"],
                    "text": r["text"],
                    "created_at": r["created_at"]
                }
                for r in rows
            ]
            items.reverse()
            return items

    async def get_recent_transcripts(self, meeting_id: str, limit: int = 5) -> List[Dict[str, Any]]:
        return await asyncio.to_thread(self._get_recent_transcripts_sync, meeting_id, limit)


db = Database()

