"""
BetterGoogleMeets: Production FastAPI & WebSocket Server
Provides real-time Merkle DAG state synchronization, dual-engine LLM gateway,
and Branch-Commit-Merge deliberation protocol for Google Meet.
"""

from __future__ import annotations
import asyncio
import json
import logging
import time
from typing import Dict, List, Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from config import settings
from models.tree import MerkleDAG, NodeType, ProposalDiff
from services.llm_gateway import LLMGateway
from services.deliberation import DeliberationEngine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("BetterGoogleMeets")

app = FastAPI(
    title="BetterGoogleMeets Deliberation Backend",
    version="2.0.0",
    description="Synchronous Epistemic Version Control & Tangible Deliberation for Video Meetings"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Canonical In-Memory DAG State
current_dag = MerkleDAG(meeting_id="meet-session-01")
current_dag.create_root(
    title="Cloud Architecture & Sub-15ms Latency SLA",
    author="AgendaChair"
)

gateway = LLMGateway()
deliberation_engine = DeliberationEngine(gateway=gateway)


class SpeechIngestRequest(BaseModel):
    speaker: str = Field(..., description="Participant name or ID")
    transcript: str = Field(..., description="Raw verbal utterance")


class CardTransformRequest(BaseModel):
    text: str = Field(..., description="Original card text")
    action: str = Field(..., description="'knead' (condense) or 'stretch' (elaborate)")


class ProposalRequest(BaseModel):
    parent_id: str = Field(..., description="Target parent node ID on Arbor")
    candidate_text: str = Field(..., description="Proposed claim or solution")
    author: str = Field(..., description="Proposing participant")
    node_type: str = Field(default="proposal", description="Epistemic node type")


class MergeRequest(BaseModel):
    proposal_id: str
    parent_id: str
    candidate_text: str
    author: str
    node_type: str = Field(default="claim")
    additional_parents: Optional[List[str]] = None


class EngineConfigRequest(BaseModel):
    active_provider: str = Field(..., description="'auto', 'lm_studio', 'gemini_flash'")
    gemini_api_key: Optional[str] = None
    lm_studio_url: Optional[str] = None


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket client connected. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logger.info(f"WebSocket client disconnected. Total: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        payload = json.dumps(message)
        dead = []
        for ws in self.active_connections:
            try:
                await ws.send_text(payload)
            except Exception as e:
                logger.error(f"WS broadcast error: {e}")
                dead.append(ws)
        for d in dead:
            self.disconnect(d)


manager = ConnectionManager()


@app.get("/health")
async def health_check():
    status = await gateway.get_engine_status()
    return {
        "status": "online",
        "meeting_id": current_dag.meeting_id,
        "revision": current_dag.revision,
        "state_hash": current_dag.compute_state_hash(),
        "node_count": len(current_dag.nodes),
        "engine_status": status
    }


@app.get("/tree")
def get_tree_state():
    return current_dag.export_json()


@app.post("/tree/reset")
async def reset_tree(goal_title: str = Query("Cloud Architecture & Sub-15ms Latency SLA")):
    global current_dag
    current_dag = MerkleDAG(meeting_id=f"meet-{int(time.time())}")
    current_dag.create_root(title=goal_title, author="AgendaChair")
    export = current_dag.export_json()

    await manager.broadcast({
        "event": "TREE_RESET",
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "data": export,
        "timestamp": time.time()
    })
    return export


@app.post("/slate/ingest")
async def ingest_speech(req: SpeechIngestRequest):
    """
    Transforms noisy speech from a participant into a structured epistemic card
    for their personal, private Upwelling draft slate.
    """
    card_info = await deliberation_engine.distill_speech(
        speaker=req.speaker,
        raw_transcript=req.transcript
    )
    return {
        "speaker": req.speaker,
        "raw": req.transcript,
        "card": card_info
    }


@app.post("/card/transform")
async def transform_card(req: CardTransformRequest):
    """
    Texterial material action: knead (condense) or stretch (elaborate).
    """
    transformed = await deliberation_engine.transform_card(action=req.action, text=req.text)
    return {
        "original": req.text,
        "action": req.action,
        "transformed": transformed
    }


@app.post("/proposal/analyze")
async def analyze_proposal(req: ProposalRequest):
    """
    Diffs candidate proposal branch against active Merkle DAG.
    Returns trade-off analysis, alignment score, and Habermas compromise if conflicting.
    """
    clean_type = req.node_type.lower()
    node_type_enum = NodeType(clean_type) if clean_type in NodeType._value2member_map_ else NodeType.PROPOSAL

    diff = await deliberation_engine.analyze_proposal(
        dag=current_dag,
        parent_id=req.parent_id,
        candidate_text=req.candidate_text,
        author=req.author,
        node_type=node_type_enum
    )

    result = {
        "proposal_id": diff.proposal_id,
        "parent_id": diff.parent_id,
        "text": diff.text,
        "author": diff.author,
        "node_type": clean_type,
        "has_conflict": diff.has_conflict,
        "conflict_reason": diff.conflict_reason,
        "alignment_score": diff.alignment_score,
        "trade_off_analysis": diff.trade_off_analysis,
        "compromise_synthesis": diff.compromise_synthesis
    }

    # Broadcast ghost sprout to all active meeting attendees
    await manager.broadcast({
        "event": "GHOST_SPROUT_STAGED",
        "data": result,
        "timestamp": time.time()
    })

    return result


@app.post("/proposal/merge")
async def merge_proposal(req: MergeRequest):
    """
    Atomically commits approved proposal into the canonical Merkle DAG.
    Broadcasts state mutation with new cryptographic SHA-256 hash.
    """
    if req.parent_id not in current_dag.nodes:
        raise HTTPException(
            status_code=404,
            detail=f"Parent node '{req.parent_id}' does not exist in Merkle DAG."
        )

    clean_type = req.node_type.lower()
    node_type_enum = NodeType(clean_type) if clean_type in NodeType._value2member_map_ else NodeType.CLAIM

    merged_node = deliberation_engine.merge_proposal(
        dag=current_dag,
        proposal_id=req.proposal_id,
        parent_id=req.parent_id,
        candidate_text=req.candidate_text,
        author=req.author,
        node_type=node_type_enum,
        additional_parents=req.additional_parents
    )

    export = current_dag.export_json()

    await manager.broadcast({
        "event": "TREE_MUTATED",
        "action": "MERGE_PROPOSAL",
        "node": {
            "id": merged_node.id,
            "text": merged_node.text,
            "parent_id": merged_node.parent_id,
            "parent_ids": merged_node.parent_ids,
            "node_type": merged_node.node_type.value,
            "author": merged_node.author
        },
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "timestamp": time.time()
    })

    return {
        "status": "MERGED",
        "merged_node_id": merged_node.id,
        "state_hash": export["state_hash"],
        "revision": export["revision"]
    }


@app.get("/config/engine")
async def get_engine_config():
    return await gateway.get_engine_status()


@app.post("/config/engine")
async def update_engine_config(req: EngineConfigRequest):
    gateway.active_provider = req.active_provider
    if req.gemini_api_key is not None:
        settings.GEMINI_API_KEY = req.gemini_api_key.strip()
    if req.lm_studio_url is not None:
        settings.LM_STUDIO_URL = req.lm_studio_url.strip()

    status = await gateway.get_engine_status()
    await manager.broadcast({
        "event": "ENGINE_CONFIG_CHANGED",
        "status": status,
        "timestamp": time.time()
    })
    return status


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    # Send initial snapshot
    await websocket.send_text(json.dumps({
        "event": "INITIAL_SNAPSHOT",
        "data": current_dag.export_json(),
        "timestamp": time.time()
    }))

    try:
        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
                if msg.get("action") == "PING":
                    await websocket.send_text(json.dumps({
                        "event": "PONG",
                        "timestamp": time.time()
                    }))
            except Exception as e:
                logger.error(f"Malformed WS message: {e}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
