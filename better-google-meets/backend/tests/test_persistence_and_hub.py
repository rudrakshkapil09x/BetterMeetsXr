"""
Unit tests for SQLite WAL persistence and WebSocket room isolation.
"""

import asyncio
import pytest
from core.websocket_hub import WebSocketHub
from core.database import db
from services.session_manager import SessionManager
from models.tree import NodeType


class MockWebSocket:
    def __init__(self):
        self.accepted = False
        self.messages = []
        self.closed = False

    async def accept(self):
        self.accepted = True

    async def send_text(self, text: str):
        if self.closed:
            raise RuntimeError("Socket closed")
        self.messages.append(text)

    async def close(self):
        self.closed = True


def test_websocket_room_isolation():
    async def _test():
        hub = WebSocketHub()
        ws_alice = MockWebSocket()
        ws_bob = MockWebSocket()
        ws_charlie = MockWebSocket()

        # Alice and Bob in Room 1, Charlie in Room 2
        await hub.join("room_meet_01", ws_alice)
        await hub.join("room_meet_01", ws_bob)
        await hub.join("room_meet_02", ws_charlie)

        assert hub.get_room_size("room_meet_01") == 2
        assert hub.get_room_size("room_meet_02") == 1

        # Broadcast to room 1
        await hub.broadcast("room_meet_01", {"event": "TEST_ROOM_1", "msg": "hello room 1"})

        # Alice and Bob received it, Charlie did NOT
        assert len(ws_alice.messages) == 1
        assert "TEST_ROOM_1" in ws_alice.messages[0]
        assert len(ws_bob.messages) == 1
        assert "TEST_ROOM_1" in ws_bob.messages[0]
        assert len(ws_charlie.messages) == 0

        # Broadcast to room 2
        await hub.broadcast("room_meet_02", {"event": "TEST_ROOM_2", "msg": "hello room 2"})
        assert len(ws_charlie.messages) == 1
        assert "TEST_ROOM_2" in ws_charlie.messages[0]
        assert len(ws_alice.messages) == 1  # Alice received nothing new

        # Disconnect Alice
        hub.leave("room_meet_01", ws_alice)
        assert hub.get_room_size("room_meet_01") == 1

    asyncio.run(_test())


def test_sqlite_persistence_across_sessions():
    async def _test():
        manager = SessionManager()
        meeting_id = "test-persistent-meet-99"

        # 1. Create meeting and add node
        dag = await manager.get_or_create_dag(meeting_id, default_title="Initial Strategy")
        root_id = dag.root_id
        child = dag.add_node(parent_id=root_id, text="Persistent Claim A", author="Tester")
        await manager.persist_dag(dag)

        state_hash_before = dag.compute_state_hash()
        revision_before = dag.revision

        # 2. Simulate server restart: completely clear in-memory sessions
        fresh_manager = SessionManager()

        # 3. Restore from SQLite
        restored_dag = await fresh_manager.get_or_create_dag(meeting_id)

        assert restored_dag.meeting_id == meeting_id
        assert restored_dag.revision == revision_before
        assert restored_dag.compute_state_hash() == state_hash_before
        assert child.id in restored_dag.nodes
        assert restored_dag.nodes[child.id].text == "Persistent Claim A"

    asyncio.run(_test())
