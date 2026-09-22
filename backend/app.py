"""
BetterMeetsXR: High-Performance FastAPI & WebSocket Server
Author: Chaitanya Anand et al.
Target: ACM CHI 2027

Serves Meta Quest 3 clients with real-time Tree State synchronization,
speech-to-slate materialization, and Branch-Commit-Merge deliberation protocol.
"""

import asyncio
import json
import logging
import time
from typing import Dict, List, Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.models.tree import MerkleDAG, NodeType, ProposalDiff
from backend.services.lm_client import LMStudioClient
from backend.services.deliberation_engine import DeliberationEngine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("BetterMeetsXR")

app = FastAPI(
    title="BetterMeetsXR Deliberation Backend",
    version="1.0.0",
    description="Synchronous Epistemic Version Control & Tangible Slate Engine for XR Meetings"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Canonical In-Memory DAG State (Session 01 Default)
current_dag = MerkleDAG(meeting_id="chi-2027-session-01")
current_dag.create_root(
    title="Municipal Climate Resilience Strategy",
    author="AgendaChair"
)

lm_client = LMStudioClient()
deliberation_engine = DeliberationEngine(lm_client=lm_client)


class SpeechIngestRequest(BaseModel):
    speaker: str = Field(..., description="Participant ID or avatar name")
    transcript: str = Field(..., description="Raw ASR speech clause")


class ProposalRequest(BaseModel):
    parent_id: str = Field(..., description="Target parent node on Arbor")
    candidate_text: str = Field(..., description="Proposed idea text")
    author: str = Field(..., description="Proposing participant")
    node_type: str = Field(default="claim", description="Node type")


class MergeRequest(BaseModel):
    proposal_id: str
    parent_id: str
    candidate_text: str
    author: str
    node_type: str = Field(default="claim", description="Node type: claim, question, action, evidence, proposal")


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"Client connected. Active: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logger.info(f"Client disconnected. Active: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        dead_connections = []
        payload = json.dumps(message)
        for connection in self.active_connections:
            try:
                await connection.send_text(payload)
            except Exception as e:
                logger.error(f"Failed to broadcast to client: {e}")
                dead_connections.append(connection)
        for dead in dead_connections:
            if dead in self.active_connections:
                self.active_connections.remove(dead)


manager = ConnectionManager()


@app.get("/health")
def health_check():
    return {
        "status": "online",
        "meeting_id": current_dag.meeting_id,
        "revision": current_dag.revision,
        "state_hash": current_dag.compute_state_hash(),
        "node_count": len(current_dag.nodes),
        "lm_studio_model": lm_client.model
    }


@app.get("/tree")
def get_tree_state():
    return current_dag.export_json()


@app.post("/tree/reset")
async def reset_tree(goal_title: str = "Municipal Climate Resilience Strategy"):
    global current_dag
    current_dag = MerkleDAG(meeting_id="chi-2027-session-01")
    current_dag.create_root(title=goal_title, author="AgendaChair")
    export = current_dag.export_json()
    await manager.broadcast({
        "event": "TREE_RESET",
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "timestamp": time.time()
    })
    return export


@app.post("/slate/ingest")
def ingest_speech(req: SpeechIngestRequest):
    """
    Transforms noisy speech from a participant's microphone into a structured
    semantic card for their personal XR slate.
    """
    try:
        card = lm_client.process_speech_chunk(raw_transcript=req.transcript, speaker=req.speaker)
    except RuntimeError as e:
        logger.error(f"/slate/ingest LLM failure: {e}")
        raise HTTPException(status_code=503, detail=f"LLM unavailable: {e}")
    return {
        "speaker": req.speaker,
        "raw": req.transcript,
        "card": card
    }


@app.post("/proposal/analyze")
def analyze_proposal(req: ProposalRequest):
    """
    Diffs candidate branch against current MerkleDAG, returning conflict detection
    and Deliberation Card metrics.
    """
    try:
        diff = deliberation_engine.analyze_proposal(
            dag=current_dag,
            parent_id=req.parent_id,
            candidate_text=req.candidate_text,
            author=req.author,
            node_type=NodeType(req.node_type.lower()) if req.node_type.lower() in NodeType._value2member_map_ else NodeType.CLAIM
        )
    except RuntimeError as e:
        logger.error(f"/proposal/analyze LLM failure: {e}")
        raise HTTPException(status_code=503, detail=f"LLM unavailable: {e}")
    return {
        "proposal_id": diff.proposal_id,
        "parent_id": diff.parent_id,
        "text": diff.text,
        "author": diff.author,
        "has_conflict": diff.has_conflict,
        "conflict_reason": diff.conflict_reason,
        "alignment_score": diff.alignment_score,
        "trade_off_analysis": diff.trade_off_analysis
    }


@app.post("/proposal/merge")
async def merge_proposal(req: MergeRequest):
    """
    Merges approved proposal into the canonical Arbor and broadcasts state update
    to all connected Meta Quest 3 headsets.
    """
    if req.parent_id not in current_dag.nodes:
        raise HTTPException(
            status_code=404,
            detail=f"Parent node '{req.parent_id}' does not exist in the Arbor."
        )

    clean_type = req.node_type.lower() if req.node_type else "claim"
    node_type_enum = NodeType(clean_type) if clean_type in NodeType._value2member_map_ else NodeType.CLAIM

    diff = ProposalDiff(
        proposal_id=req.proposal_id,
        parent_id=req.parent_id,
        node_type=node_type_enum,
        text=req.candidate_text,
        author=req.author,
        has_conflict=False,
        alignment_score=1.0
    )
    merged_node = deliberation_engine.merge_proposal(dag=current_dag, proposal=diff)
    export = current_dag.export_json()

    # Broadcast to all headsets
    await manager.broadcast({
        "event": "TREE_MUTATED",
        "action": "MERGE_PROPOSAL",
        "node": {
            "id": merged_node.id,
            "text": merged_node.text,
            "parent_id": merged_node.parent_id,
            "node_type": merged_node.node_type.value if hasattr(merged_node.node_type, "value") else str(merged_node.node_type),
            "author": merged_node.author
        },
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "timestamp": time.time()
    })

    return {
        "status": "MERGED",
        "merged_node_id": merged_node.id,
        "node_type": merged_node.node_type.value if hasattr(merged_node.node_type, "value") else str(merged_node.node_type),
        "state_hash": export["state_hash"],
        "revision": export["revision"]
    }


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    # Send initial snapshot
    await websocket.send_text(json.dumps({
        "event": "INITIAL_SNAPSHOT",
        "data": current_dag.export_json()
    }))
    try:
        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
                # Handle client ping or events with UTC epoch timestamp
                if msg.get("action") == "PING":
                    await websocket.send_text(json.dumps({"event": "PONG", "timestamp": time.time()}))
            except Exception as e:
                logger.error(f"Malformed WS payload: {e}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)

