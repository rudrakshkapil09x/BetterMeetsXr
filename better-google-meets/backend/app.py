"""
BetterGoogleMeets: Production FastAPI & WebSocket Server (v2.1.0)
Features:
1. Lifespan resource management (persistent pooled HTTP, SQLite schema init)
2. Multi-tenant meeting isolation with room-isolated WebSockets
3. SQLite WAL-mode ACID persistence across restarts
4. True cryptographically authentic Merkle DAG with topological ancestry context
5. Dual-engine LLM gateway (Local LM Studio + Gemini Flash with LRU cache)
"""

from __future__ import annotations
import asyncio
import json
import logging
import time
from contextlib import asynccontextmanager
from typing import Dict, List, Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from core.config import settings
from core.database import db
from core.websocket_hub import WebSocketHub
from models.tree import MerkleDAG, NodeType, ProposalDiff
from services.llm_gateway import LLMGateway
from services.deliberation import DeliberationEngine
from services.session_manager import session_manager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("BetterGoogleMeets")

# Singletons for services & WebSocket routing
hub = WebSocketHub()
gateway = LLMGateway()
deliberation_engine = DeliberationEngine(gateway=gateway)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database tables and warm up persistent HTTP client
    logger.info("Starting BetterGoogleMeets backend...")
    await db.init_schema()
    # Initialize default meeting DAG
    await session_manager.get_or_create_dag("meet-session-01")
    yield
    # Shutdown: clean up HTTP client and sockets
    logger.info("Shutting down BetterGoogleMeets backend...")
    await gateway.close()


app = FastAPI(
    title="BetterGoogleMeets Deliberation Backend",
    version="2.1.0",
    description="Synchronous Epistemic Version Control & Tangible Deliberation for Video Meetings",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Schemas
class SpeechIngestRequest(BaseModel):
    speaker: str = Field(..., description="Participant name or ID")
    transcript: str = Field(..., description="Raw verbal utterance")
    meeting_id: Optional[str] = Field(default="meet-session-01", description="Meeting room ID")
    padding_history: Optional[List[Dict[str, str]]] = Field(default=None, description="Optional surrounding dialogue padding turns")



class CardTransformRequest(BaseModel):
    text: str = Field(..., description="Original card text")
    action: str = Field(..., description="'knead' (condense) or 'stretch' (elaborate)")


class ProposalRequest(BaseModel):
    parent_id: str = Field(..., description="Target parent node ID on Arbor")
    candidate_text: str = Field(..., description="Proposed claim or solution")
    author: str = Field(..., description="Proposing participant")
    node_type: str = Field(default="proposal", description="Epistemic node type")
    meeting_id: Optional[str] = Field(default="meet-session-01", description="Meeting room ID")


class MergeRequest(BaseModel):
    proposal_id: str
    parent_id: str
    candidate_text: str
    author: str
    node_type: str = Field(default="claim")
    additional_parents: Optional[List[str]] = None
    meeting_id: Optional[str] = Field(default="meet-session-01", description="Meeting room ID")


class VoteRequest(BaseModel):
    proposal_id: str
    voter: str
    meeting_id: Optional[str] = Field(default="meet-session-01", description="Meeting room ID")


class AgendaRequest(BaseModel):
    agenda: str = Field(..., description="Meeting agenda / motive / core objective")
    meeting_id: Optional[str] = Field(default="meet-session-01", description="Meeting room ID")
    author: Optional[str] = Field(default="Chair", description="Author or chair")


class EngineConfigRequest(BaseModel):
    active_provider: str = Field(..., description="'auto', 'lm_studio', 'gemini_flash'")
    gemini_api_key: Optional[str] = None
    lm_studio_url: Optional[str] = None


@app.get("/health")
async def health_check(meeting_id: str = Query("meet-session-01")):
    dag = await session_manager.get_or_create_dag(meeting_id)
    status = await gateway.get_engine_status()
    return {
        "status": "online",
        "meeting_id": dag.meeting_id,
        "revision": dag.revision,
        "state_hash": dag.compute_state_hash(),
        "node_count": len(dag.nodes),
        "engine_status": status
    }


@app.get("/tree")
async def get_tree_state(meeting_id: str = Query("meet-session-01")):
    dag = await session_manager.get_or_create_dag(meeting_id)
    return dag.export_json()


@app.post("/tree/reset")
async def reset_tree(
    goal_title: str = Query("Discussion"),
    meeting_id: str = Query("meet-session-01")
):
    dag = await session_manager.reset_dag(meeting_id=meeting_id, goal_title=goal_title)
    export = dag.export_json()

    await hub.broadcast(meeting_id, {
        "event": "TREE_RESET",
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "data": export,
        "timestamp": time.time()
    })
    return export


@app.post("/tree/agenda")
async def set_meeting_agenda(req: AgendaRequest):
    """
    Sets or updates the meeting agenda / motive (root goal node) without clearing existing children.
    Broadcasts the updated tree to all attendees.
    """
    meeting_id = req.meeting_id or "meet-session-01"
    dag = await session_manager.update_agenda(
        meeting_id=meeting_id,
        agenda=req.agenda,
        author=req.author or "Chair"
    )
    export = dag.export_json()

    await hub.broadcast(meeting_id, {
        "event": "TREE_MUTATED",
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "node": export["nodes"][dag.root_id],
        "data": export,
        "timestamp": time.time()
    })
    return {
        "status": "agenda_updated",
        "agenda": req.agenda,
        "root_id": dag.root_id,
        "state_hash": export["state_hash"],
        "revision": export["revision"],
        "tree": export
    }


@app.get("/slate")
async def get_speech_slates(meeting_id: str = Query("meet-session-01"), limit: int = Query(50)):
    """
    Returns stored speech cards for the meeting from SQLite.
    """
    cards = await db.load_speech_slates(meeting_id=meeting_id, limit=limit)
    return {
        "meeting_id": meeting_id,
        "cards": cards
    }


@app.post("/slate/ingest")
async def ingest_speech(req: SpeechIngestRequest):
    """
    Transforms noisy speech from a participant into a structured epistemic card
    for their personal, private Upwelling draft slate.
    """
    meeting_id = req.meeting_id or "meet-session-01"
    dag = await session_manager.get_or_create_dag(meeting_id)
    agenda = dag.nodes[dag.root_id].text if dag.root_id and dag.root_id in dag.nodes else None

    # Retrieve dialogue padding context to avoid cutoff ideas
    padding_context = req.padding_history
    if not padding_context:
        recent_transcripts = await db.get_recent_transcripts(meeting_id=meeting_id, limit=5)
        padding_context = [
            {"speaker": t.get("speaker", "Participant"), "text": t.get("text", "")}
            for t in recent_transcripts
        ]

    card_info = await deliberation_engine.distill_speech(
        speaker=req.speaker,
        raw_transcript=req.transcript,
        agenda=agenda,
        tree_context=dag.summarize_committed(),
        padding_context=padding_context
    )

    if card_info.get("is_noise"):
        logger.info(f"[/slate/ingest] Filtered noise from {req.speaker}: '{req.transcript[:50]}' -> {card_info.get('reason')}")
        # Save it anyway, left unextracted: real-time filtration only sees one utterance
        # plus a little padding, so something dismissed here may read as substantive to the
        # periodic batch pass once it has the fuller surrounding dialogue. Previously a
        # noise-filtered turn vanished entirely -- never in the transcript log, never
        # reconsidered by anything -- which also meant the meeting's own chronological
        # transcript was silently incomplete.
        await db.save_transcript(meeting_id=meeting_id, speaker=req.speaker, text=req.transcript)
        return {
            "status": "ignored_noise",
            "speaker": req.speaker,
            "raw": req.transcript,
            "reason": card_info.get("reason", "Filtered by epistemic noise layer")
        }

    # Check if this speech turn is an extension / revision of a recent turn from the same speaker
    now_ms = time.time() * 1000
    existing_cards = await db.load_speech_slates(meeting_id=meeting_id, limit=5)
    matching_card = None

    for prev in existing_cards:
        if prev.get("speaker") == req.speaker:
            elapsed = now_ms - prev.get("createdAt", 0)
            if elapsed < 20000:  # within 20 seconds
                prev_text = prev.get("rawText", "").strip().lower()
                new_text = req.transcript.strip().lower()
                if (
                    new_text.startswith(prev_text[:12])
                    or prev_text.startswith(new_text[:12])
                    or prev_text in new_text
                    or new_text in prev_text
                ):
                    matching_card = prev
                    break

    if matching_card:
        card_id_str = matching_card["id"]
        try:
            numeric_id = int(card_id_str.replace("card_", ""))
            await db.update_speech_slate(
                slate_id=numeric_id,
                transcript=req.transcript,
                distilled_text=card_info["distilled_text"],
                intent=card_info["intent"]
            )
        except Exception as e:
            logger.warning(f"DB slate update failed for card {card_id_str}: {e}")

        # This revision already has a real-time card (just updated above) -- mark it
        # extracted immediately so the periodic batch pass doesn't re-derive and duplicate it.
        transcript_id = await db.save_transcript(meeting_id=meeting_id, speaker=req.speaker, text=req.transcript)
        await db.mark_transcripts_extracted([transcript_id])

        card_obj = {
            "id": card_id_str,
            "speaker": req.speaker,
            "rawText": req.transcript,
            "distilledText": card_info["distilled_text"],
            "intent": card_info["intent"],
            "extractedQuery": card_info.get("extracted_query", ""),
            "createdAt": matching_card["createdAt"],
            "isStaged": matching_card.get("isStaged", False)
        }
        await hub.broadcast(meeting_id, {
            "event": "SPEECH_CARD_UPDATED",
            "card": card_obj,
            "timestamp": time.time()
        })
        return {
            "status": "updated_turn",
            "speaker": req.speaker,
            "raw": req.transcript,
            "card": card_info,
            "extracted_query": card_info.get("extracted_query", ""),
            "card_id": card_id_str
        }

    # New distinct speech turn
    transcript_id = await db.save_transcript(
        meeting_id=meeting_id,
        speaker=req.speaker,
        text=req.transcript
    )

    slate_id = await db.save_speech_slate(
        meeting_id=meeting_id,
        speaker=req.speaker,
        transcript=req.transcript,
        distilled_text=card_info["distilled_text"],
        intent=card_info["intent"]
    )

    # A real-time card already exists for this turn -- mark it extracted immediately so the
    # periodic batch pass (/session/extract-ideas) never re-derives and duplicates it. This
    # is the fix for that duplication: previously every transcript row started and stayed
    # unextracted until a batch run touched it, regardless of whether real-time had already
    # made a card for it, so batch was guaranteed to re-create a card for everything real-time
    # just handled.
    await db.mark_transcripts_extracted([transcript_id])

    card_obj = {
        "id": f"card_{slate_id or int(time.time()*1000)}",
        "speaker": req.speaker,
        "rawText": req.transcript,
        "distilledText": card_info["distilled_text"],
        "intent": card_info["intent"],
        "extractedQuery": card_info.get("extracted_query", ""),
        "createdAt": time.time() * 1000,
        "isStaged": False
    }

    # Broadcast new speech card to all attendees in this room via WebSocket
    await hub.broadcast(meeting_id, {
        "event": "SPEECH_CARD_INGESTED",
        "card": card_obj,
        "timestamp": time.time()
    })

    return {
        "speaker": req.speaker,
        "raw": req.transcript,
        "card": card_info,
        "extracted_query": card_info.get("extracted_query", "")
    }



@app.get("/transcripts")
async def get_transcripts(meeting_id: str = Query("meet-session-01"), limit: int = Query(500)):
    """
    Returns the chronological, speaker-labeled conversation log for the meeting.
    """
    transcripts = await db.get_all_transcripts(meeting_id=meeting_id, limit=limit)
    return {
        "meeting_id": meeting_id,
        "total": len(transcripts),
        "transcripts": transcripts
    }


_extraction_locks: Dict[str, asyncio.Lock] = {}


def _get_extraction_lock(meeting_id: str) -> asyncio.Lock:
    if meeting_id not in _extraction_locks:
        _extraction_locks[meeting_id] = asyncio.Lock()
    return _extraction_locks[meeting_id]


@app.post("/session/extract-ideas")
async def extract_session_ideas(
    meeting_id: str = Query("meet-session-01"),
    force_all: bool = Query(False)
):
    """
    Periodic (interval set client-side, currently 5m) or on-demand batch extraction:
    Extracts all substantive ideas, proposals, actions, and claims from the multi-speaker
    dialogue transcript, labels them with speaker attribution, saves them to the slate,
    and broadcasts to all peers in the room.

    Every attendee's browser runs its own timer and can call this independently. Without
    the lock below, two attendees' timers landing close together would both fetch the same
    unextracted rows before either marked them done, and both create cards for them --
    the same duplication bug this endpoint exists to avoid, just from a race instead of a
    design gap. The lock makes the fetch-extract-mark sequence atomic per meeting: the
    second call only proceeds once the first has fully finished, and finds nothing left.
    """
    async with _get_extraction_lock(meeting_id):
        if force_all:
            transcripts = await db.get_all_transcripts(meeting_id=meeting_id, limit=300)
        else:
            transcripts = await db.get_unextracted_transcripts(meeting_id=meeting_id, limit=300)

        if not transcripts:
            return {
                "status": "no_new_transcripts",
                "extracted_count": 0,
                "ideas": []
            }

        return await _run_batch_extraction(meeting_id, transcripts)


async def _run_batch_extraction(meeting_id: str, transcripts: List[Dict]) -> Dict:
    dag = await session_manager.get_or_create_dag(meeting_id)
    agenda = dag.nodes[dag.root_id].text if dag.root_id and dag.root_id in dag.nodes else None

    try:
        ideas = await deliberation_engine.extract_batch_ideas(transcripts, agenda=agenda, tree_context=dag.summarize_committed())
    except RuntimeError as e:
        logger.error(f"/session/extract-ideas LLM failure: {e}")
        raise HTTPException(status_code=503, detail=f"LLM unavailable: {e}")

    cards = []
    now_ms = time.time() * 1000
    for idx, idea in enumerate(ideas):
        # Save each idea to speech slates
        await db.save_speech_slate(
            meeting_id=meeting_id,
            speaker=idea["speaker"],
            transcript=idea.get("rationale", idea["text"]),
            distilled_text=idea["text"],
            intent=idea["intent"]
        )

        card_obj = {
            "id": f"card_batch_{int(now_ms)}_{idx}",
            "speaker": idea["speaker"],
            "rawText": idea.get("rationale", idea["text"]),
            "distilledText": idea["text"],
            "intent": idea["intent"],
            "extractedQuery": idea.get("extracted_query", ""),
            "createdAt": now_ms + idx,
            "isStaged": False
        }

        cards.append(card_obj)

    # Mark transcripts as extracted in SQLite
    transcript_ids = [t["id"] for t in transcripts if "id" in t]
    await db.mark_transcripts_extracted(transcript_ids)

    # Broadcast batch extracted ideas to the room
    await hub.broadcast(meeting_id, {
        "event": "BATCH_IDEAS_EXTRACTED",
        "count": len(cards),
        "cards": cards,
        "timestamp": time.time()
    })

    return {
        "status": "success",
        "transcripts_processed": len(transcripts),
        "extracted_count": len(cards),
        "ideas": cards
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
    Diffs candidate proposal branch against active Merkle DAG using topological ancestry.
    Returns trade-off analysis, alignment score, and Habermas compromise if conflicting.
    The author's own approval is recorded immediately (a PR opens with the author's vote counted).
    """
    meeting_id = req.meeting_id or "meet-session-01"
    dag = await session_manager.get_or_create_dag(meeting_id)

    clean_type = req.node_type.lower()
    node_type_enum = NodeType(clean_type) if clean_type in NodeType._value2member_map_ else NodeType.PROPOSAL

    diff = await deliberation_engine.analyze_proposal(
        dag=dag,
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

    # Persist proposal diff in DB, then record the author's own vote (a PR opens pre-approved by its author)
    await db.save_proposal_diff(result, meeting_id=meeting_id)
    await db.record_vote(meeting_id, diff.proposal_id, req.author)

    result["votes"] = [req.author]
    result["required_votes"] = settings.REQUIRED_VOTES

    # Broadcast ghost sprout strictly to attendees in this meeting room
    await hub.broadcast(meeting_id, {
        "event": "GHOST_SPROUT_STAGED",
        "data": result,
        "timestamp": time.time()
    })

    return result


@app.get("/proposals")
async def get_pending_proposals(meeting_id: str = Query("meet-session-01")):
    """
    Returns every staged proposal (ghost sprout) not yet merged into the canonical tree,
    with its live vote tally. Lets a freshly-opened or reconnected client rehydrate the
    same pending proposals every other attendee sees -- no idea is ever silently dropped.
    """
    pending = await db.get_pending_proposals(meeting_id)
    return {
        "meeting_id": meeting_id,
        "required_votes": settings.REQUIRED_VOTES,
        "proposals": [
            {
                "proposal_id": p["proposal_id"],
                "parent_id": p["parent_id"],
                "text": p["candidate_text"],
                "author": p["author"],
                "node_type": p["node_type"],
                "has_conflict": bool(p["has_conflict"]),
                "conflict_reason": p["conflict_reason"],
                "trade_off_analysis": p["trade_off_analysis"],
                "compromise_synthesis": p["compromise_synthesis"],
                "votes": p["voters"],
                "required_votes": settings.REQUIRED_VOTES
            }
            for p in pending
        ]
    }


async def _commit_merge(
    meeting_id: str,
    proposal_id: str,
    parent_id: str,
    candidate_text: str,
    author: str,
    node_type_enum: NodeType,
    additional_parents: Optional[List[str]] = None
) -> Dict:
    """
    Shared merge-and-broadcast path: atomically commits an approved proposal into the
    canonical Merkle DAG, persists it, and broadcasts the mutation to the meeting room.
    Used both by the manual /proposal/merge endpoint and by automatic consensus merges.
    """
    dag = await session_manager.get_or_create_dag(meeting_id)

    if parent_id not in dag.nodes:
        raise HTTPException(
            status_code=404,
            detail=f"Parent node '{parent_id}' does not exist in Merkle DAG."
        )

    merged_node = deliberation_engine.merge_proposal(
        dag=dag,
        proposal_id=proposal_id,
        parent_id=parent_id,
        candidate_text=candidate_text,
        author=author,
        node_type=node_type_enum,
        additional_parents=additional_parents
    )

    await session_manager.persist_dag(dag)
    export = dag.export_json()

    await hub.broadcast(meeting_id, {
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


@app.post("/proposal/vote")
async def vote_proposal(req: VoteRequest):
    """
    Records a vote for a candidate ghost sprout. When the vote tally reaches the required
    consensus threshold, the proposal is atomically merged into the canonical tree and every
    attendee is notified via the same broadcast the manual merge path uses -- no separate
    per-client decision, so two attendees can never race into a double merge.
    """
    meeting_id = req.meeting_id or "meet-session-01"
    vote_count = await db.record_vote(meeting_id, req.proposal_id, req.voter)

    merged_info = None
    if vote_count >= settings.REQUIRED_VOTES:
        # Atomic compare-and-set: only the request that actually flips merged 0->1 proceeds.
        if await db.mark_proposal_merged(meeting_id, req.proposal_id):
            diff = await db.get_proposal_diff(meeting_id, req.proposal_id)
            if diff:
                clean_type = str(diff.get("node_type") or "claim").lower()
                node_type_enum = NodeType(clean_type) if clean_type in NodeType._value2member_map_ else NodeType.CLAIM
                merged_info = await _commit_merge(
                    meeting_id=meeting_id,
                    proposal_id=req.proposal_id,
                    parent_id=diff["parent_id"],
                    candidate_text=diff["candidate_text"],
                    author=diff["author"],
                    node_type_enum=node_type_enum
                )

    await hub.broadcast(meeting_id, {
        "event": "PROPOSAL_VOTED",
        "proposal_id": req.proposal_id,
        "voter": req.voter,
        "vote_count": vote_count,
        "merged": merged_info is not None,
        "timestamp": time.time()
    })

    return {
        "proposal_id": req.proposal_id,
        "voter": req.voter,
        "vote_count": vote_count,
        "required_votes": settings.REQUIRED_VOTES,
        "merged": merged_info is not None,
        "merge_result": merged_info
    }


@app.post("/proposal/merge")
async def merge_proposal(req: MergeRequest):
    """
    Manually commits an approved proposal into the canonical Merkle DAG (chair override /
    testing path). Automatic consensus merges go through the same _commit_merge helper.
    """
    meeting_id = req.meeting_id or "meet-session-01"
    clean_type = req.node_type.lower()
    node_type_enum = NodeType(clean_type) if clean_type in NodeType._value2member_map_ else NodeType.CLAIM

    await db.mark_proposal_merged(meeting_id, req.proposal_id)

    return await _commit_merge(
        meeting_id=meeting_id,
        proposal_id=req.proposal_id,
        parent_id=req.parent_id,
        candidate_text=req.candidate_text,
        author=req.author,
        node_type_enum=node_type_enum,
        additional_parents=req.additional_parents
    )


@app.get("/config/engine")
async def get_engine_config():
    return await gateway.get_engine_status()


@app.post("/config/engine")
async def update_engine_config(req: EngineConfigRequest, meeting_id: str = Query("meet-session-01")):
    gateway.active_provider = req.active_provider
    if req.gemini_api_key is not None:
        settings.GEMINI_API_KEY = req.gemini_api_key.strip()
    if req.lm_studio_url is not None:
        settings.LM_STUDIO_URL = req.lm_studio_url.strip()

    status = await gateway.get_engine_status()
    await hub.broadcast(meeting_id, {
        "event": "ENGINE_CONFIG_CHANGED",
        "status": status,
        "timestamp": time.time()
    })
    return status


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, meeting_id: Optional[str] = Query("meet-session-01")):
    room_id = meeting_id or "meet-session-01"
    await hub.join(room_id, websocket)

    # Send initial snapshot for this specific meeting room
    dag = await session_manager.get_or_create_dag(room_id)
    cards = await db.load_speech_slates(room_id, limit=50)
    export = dag.export_json()
    export["slates"] = cards

    await websocket.send_text(json.dumps({
        "event": "INITIAL_SNAPSHOT",
        "data": export,
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
        hub.leave(room_id, websocket)
    except Exception as e:
        logger.warning(f"WebSocket connection error: {e}")
        hub.leave(room_id, websocket)


@app.websocket("/ws/{meeting_id}")
async def websocket_endpoint_path(websocket: WebSocket, meeting_id: str):
    await websocket_endpoint(websocket, meeting_id=meeting_id)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
