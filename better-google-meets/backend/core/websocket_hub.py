"""
BetterGoogleMeets: Room-Isolated WebSocket Hub
Provides strict multi-tenant room isolation for real-time meeting events.
"""

from __future__ import annotations
import json
import logging
from typing import Dict, Set, Optional
from fastapi import WebSocket

logger = logging.getLogger("WebSocketHub")


class WebSocketHub:
    """
    Room-isolated WebSocket manager.
    Each meeting_id has its own Set[WebSocket] so events never leak across meetings.
    """

    def __init__(self):
        # Maps meeting_id -> Set of active WebSockets
        self.rooms: Dict[str, Set[WebSocket]] = {}

    async def join(self, meeting_id: str, websocket: WebSocket):
        await websocket.accept()
        if meeting_id not in self.rooms:
            self.rooms[meeting_id] = set()
        self.rooms[meeting_id].add(websocket)
        logger.info(f"WebSocket joined room '{meeting_id}'. Room clients: {len(self.rooms[meeting_id])}")

    def leave(self, meeting_id: str, websocket: WebSocket):
        if meeting_id in self.rooms:
            self.rooms[meeting_id].discard(websocket)
            if not self.rooms[meeting_id]:
                del self.rooms[meeting_id]
            logger.info(f"WebSocket left room '{meeting_id}'.")

    async def broadcast(self, meeting_id: str, message: dict):
        """
        Broadcasts a message strictly to clients connected to the given meeting_id.
        """
        if meeting_id not in self.rooms:
            return

        payload = json.dumps(message)
        dead: Set[WebSocket] = set()

        for ws in list(self.rooms[meeting_id]):
            try:
                await ws.send_text(payload)
            except Exception as e:
                logger.warning(f"Error broadcasting to client in room '{meeting_id}': {e}")
                dead.add(ws)

        for d in dead:
            self.leave(meeting_id, d)

    def get_room_size(self, meeting_id: str) -> int:
        return len(self.rooms.get(meeting_id, set()))

    def get_all_rooms(self) -> Dict[str, int]:
        return {mid: len(clients) for mid, clients in self.rooms.items()}
