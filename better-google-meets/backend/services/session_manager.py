"""
BetterGoogleMeets: Multi-Tenant Meeting Session & Persistence Manager
Maintains in-memory MerkleDAG sessions backed by SQLite WAL persistence.
Guarantees meeting state survives server restarts and isolates rooms cleanly.
"""

from __future__ import annotations
import asyncio
import json
import logging
import time
from typing import Dict, Optional

from core.database import db
from models.tree import MerkleDAG

logger = logging.getLogger("SessionManager")


class SessionManager:
    def __init__(self):
        self._sessions: Dict[str, MerkleDAG] = {}
        self._lock = asyncio.Lock()

    async def get_or_create_dag(
        self,
        meeting_id: str = "meet-session-01",
        default_title: str = "Discussion",
        author: str = "Chair"
    ) -> MerkleDAG:
        """
        Retrieves active MerkleDAG session. If not in memory, attempts to restore
        from SQLite database. If not in DB, creates and persists a new one.
        """
        async with self._lock:
            if meeting_id in self._sessions:
                return self._sessions[meeting_id]

            # Try loading from persistent database
            saved_dict = await db.load_dag(meeting_id)
            if saved_dict:
                dag = MerkleDAG.from_dict(saved_dict)
                self._sessions[meeting_id] = dag
                logger.info(f"Restored MerkleDAG for meeting '{meeting_id}' from SQLite database.")
                return dag

            # Create brand new meeting session
            dag = MerkleDAG(meeting_id=meeting_id)
            dag.create_root(title=default_title, author=author)
            self._sessions[meeting_id] = dag

            # Persist initial state
            export = dag.export_json()
            await db.save_dag(
                meeting_id=meeting_id,
                title=default_title,
                revision=dag.revision,
                state_hash=export["state_hash"],
                dag_json=json.dumps(export)
            )
            logger.info(f"Initialized new MerkleDAG for meeting '{meeting_id}' with root title '{default_title}'.")
            return dag

    async def reset_dag(
        self,
        meeting_id: str,
        goal_title: str = "Discussion",
        author: str = "Chair"
    ) -> MerkleDAG:
        """
        Resets a meeting session with a new goal root and commits to SQLite.
        """
        async with self._lock:
            dag = MerkleDAG(meeting_id=meeting_id)
            dag.create_root(title=goal_title, author=author)
            self._sessions[meeting_id] = dag

            export = dag.export_json()
            await db.save_dag(
                meeting_id=meeting_id,
                title=goal_title,
                revision=dag.revision,
                state_hash=export["state_hash"],
                dag_json=json.dumps(export)
            )
            logger.info(f"Reset MerkleDAG for meeting '{meeting_id}'. New root: '{goal_title}'.")
            return dag

    async def update_agenda(
        self,
        meeting_id: str,
        agenda: str,
        author: str = "Chair"
    ) -> MerkleDAG:
        """
        Updates the meeting agenda root node without discarding existing nodes.
        """
        dag = await self.get_or_create_dag(meeting_id)
        dag.update_root_title(title=agenda, author=author)
        await self.persist_dag(dag)
        logger.info(f"Updated agenda for meeting '{meeting_id}' to '{agenda}'.")
        return dag

    async def persist_dag(self, dag: MerkleDAG):
        """Asynchronously writes active DAG snapshot to SQLite."""
        export = dag.export_json()
        root_text = dag.nodes[dag.root_id].text if dag.root_id and dag.root_id in dag.nodes else "Meeting"
        await db.save_dag(
            meeting_id=dag.meeting_id,
            title=root_text,
            revision=dag.revision,
            state_hash=export["state_hash"],
            dag_json=json.dumps(export)
        )


session_manager = SessionManager()
