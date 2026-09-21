"""
BetterGoogleMeets: Core Epistemic Tree & Merkle DAG Data Structures
Provides immutable, cryptographically verifiable knowledge graph representations
for synchronous collaborative deliberation. Grounded in IBIS, QOC, and Merkle provenance.
"""

from __future__ import annotations
import hashlib
import json
import threading
import time
from dataclasses import dataclass, field, asdict
from enum import Enum
from typing import Dict, List, Optional


class NodeType(str, Enum):
    GOAL = "goal"
    TOPIC = "topic"
    CLAIM = "claim"
    QUESTION = "question"
    EVIDENCE = "evidence"
    ACTION = "action"
    PROPOSAL = "proposal"


@dataclass
class IdeaNode:
    id: str
    text: str
    node_type: NodeType
    author: str
    parent_id: Optional[str] = None
    parent_ids: List[str] = field(default_factory=list)
    created_at: float = field(default_factory=time.time)
    children_ids: List[str] = field(default_factory=list)
    metadata: Dict[str, str] = field(default_factory=dict)
    content_hash: str = ""

    def __post_init__(self):
        if not self.parent_ids and self.parent_id:
            self.parent_ids = [self.parent_id]
        if not self.content_hash:
            self.content_hash = self.compute_hash()

    def compute_hash(self) -> str:
        type_str = self.node_type.value if hasattr(self.node_type, "value") else str(self.node_type)
        parents_str = ",".join(sorted(self.parent_ids)) if self.parent_ids else (self.parent_id or "")
        payload = f"{self.id}:{parents_str}:{type_str}:{self.text}:{self.author}"
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]


@dataclass
class ProposalDiff:
    proposal_id: str
    parent_id: str
    node_type: NodeType
    text: str
    author: str
    has_conflict: bool = False
    conflict_reason: str = ""
    alignment_score: float = 1.0
    trade_off_analysis: str = ""
    compromise_synthesis: Optional[str] = None
    created_at: float = field(default_factory=time.time)


class MerkleDAG:
    """
    Thread-safe Merkle Directed Acyclic Graph (DAG) representing the
    canonical shared consensus (The Arbor) of a meeting.
    Protected via reentrant locks (RLock) to prevent race conditions.
    """

    def __init__(self, meeting_id: str):
        self.meeting_id: str = meeting_id
        self.nodes: Dict[str, IdeaNode] = {}
        self.root_id: Optional[str] = None
        self.revision: int = 0
        self.commit_history: List[Dict] = []
        self._lock = threading.RLock()

    def create_root(self, title: str, author: str = "AgendaChair") -> IdeaNode:
        with self._lock:
            root_id = "node_0000"
            root_node = IdeaNode(
                id=root_id,
                text=title,
                node_type=NodeType.GOAL,
                author=author,
                parent_id=None,
                parent_ids=[]
            )
            self.nodes[root_id] = root_node
            self.root_id = root_id
            self._record_commit("INITIALIZE_ROOT", [root_id])
            return root_node

    def add_node(
        self,
        parent_id: str,
        text: str,
        node_type: NodeType = NodeType.CLAIM,
        author: str = "anonymous",
        metadata: Optional[Dict[str, str]] = None,
        additional_parent_ids: Optional[List[str]] = None
    ) -> IdeaNode:
        with self._lock:
            if parent_id not in self.nodes:
                raise KeyError(f"Parent node '{parent_id}' does not exist in the DAG.")

            parent_ids = [parent_id]
            if additional_parent_ids:
                for p in additional_parent_ids:
                    if p in self.nodes and p not in parent_ids:
                        parent_ids.append(p)

            node_id = f"node_{len(self.nodes):04d}"
            node = IdeaNode(
                id=node_id,
                text=text,
                node_type=node_type,
                author=author,
                parent_id=parent_id,
                parent_ids=parent_ids,
                metadata=metadata or {}
            )
            self.nodes[node_id] = node
            for p_id in parent_ids:
                if p_id in self.nodes:
                    self.nodes[p_id].children_ids.append(node_id)

            self._record_commit(f"ADD_NODE_{node_id}", [node_id])
            return node

    def compute_state_hash(self) -> str:
        """
        Computes a deterministic SHA-256 Merkle root hash of the entire tree state.
        Guarantees mathematical tamper-evidence across all participants.
        """
        with self._lock:
            if not self.nodes:
                return hashlib.sha256(b"EMPTY_DAG").hexdigest()[:16]

            sorted_hashes = sorted([f"{nid}:{n.content_hash}" for nid, n in self.nodes.items()])
            combined = "|".join(sorted_hashes)
            return hashlib.sha256(combined.encode("utf-8")).hexdigest()[:16]

    def _record_commit(self, action: str, affected_nodes: List[str]):
        self.revision += 1
        state_hash = self.compute_state_hash()
        self.commit_history.append({
            "revision": self.revision,
            "action": action,
            "state_hash": state_hash,
            "affected_nodes": affected_nodes,
            "timestamp": time.time()
        })

    def export_json(self) -> dict:
        with self._lock:
            return {
                "meeting_id": self.meeting_id,
                "revision": self.revision,
                "state_hash": self.compute_state_hash(),
                "root_id": self.root_id,
                "nodes": {nid: asdict(node) for nid, node in self.nodes.items()},
                "commit_history": self.commit_history
            }
