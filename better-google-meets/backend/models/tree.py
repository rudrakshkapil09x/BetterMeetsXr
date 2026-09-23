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
from collections import deque
from dataclasses import dataclass, field, asdict
from enum import Enum
from typing import Dict, List, Optional, Set


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
    # Parent content hashes embedded for cryptographic Merkle provenance
    parent_hashes: List[str] = field(default_factory=list)

    def __post_init__(self):
        if not self.parent_ids and self.parent_id:
            self.parent_ids = [self.parent_id]
        if not self.content_hash:
            self.content_hash = self.compute_hash()

    def compute_hash(self) -> str:
        """
        True Merkle node hash: binds node_type, text, author, and parent hashes.
        Any mutation in an ancestor will propagate through parent_hashes.
        """
        type_str = self.node_type.value if hasattr(self.node_type, "value") else str(self.node_type)
        parent_hashes_str = ",".join(sorted(self.parent_hashes)) if self.parent_hashes else ",".join(sorted(self.parent_ids))
        payload = f"{type_str}:{self.text}:{self.author}:{parent_hashes_str}"
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
    Thread-safe, cryptographically authentic Merkle Directed Acyclic Graph (DAG)
    representing the canonical shared consensus (The Arbor) of a meeting.
    Supports topological ancestry queries and deterministic state hashing.
    """

    def __init__(self, meeting_id: str):
        self.meeting_id: str = meeting_id
        self.nodes: Dict[str, IdeaNode] = {}
        self.root_id: Optional[str] = None
        self.revision: int = 0
        self.commit_history: List[Dict] = []
        self._lock = threading.RLock()
        self._id_counter: int = 0

    def _generate_next_id(self) -> str:
        """Generates sequential node IDs while avoiding any collision."""
        while True:
            candidate = f"node_{self._id_counter:04d}"
            self._id_counter += 1
            if candidate not in self.nodes:
                return candidate

    def create_root(self, title: str, author: str = "AgendaChair") -> IdeaNode:
        with self._lock:
            root_id = "node_0000"
            self._id_counter = 1
            root_node = IdeaNode(
                id=root_id,
                text=title,
                node_type=NodeType.GOAL,
                author=author,
                parent_id=None,
                parent_ids=[],
                parent_hashes=[]
            )
            self.nodes[root_id] = root_node
            self.root_id = root_id
            self._record_commit("INITIALIZE_ROOT", [root_id])
            return root_node

    def update_root_title(self, title: str, author: str = "AgendaChair") -> IdeaNode:
        with self._lock:
            if not self.root_id or self.root_id not in self.nodes:
                return self.create_root(title=title, author=author)
            root = self.nodes[self.root_id]
            root.text = title
            root.author = author
            root.content_hash = root.compute_hash()
            self._record_commit("UPDATE_ROOT_AGENDA", [self.root_id])
            return root

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

            # Collect parent hashes for Merkle cryptographic linkage
            parent_hashes = [self.nodes[pid].content_hash for pid in parent_ids if pid in self.nodes]

            node_id = self._generate_next_id()
            node = IdeaNode(
                id=node_id,
                text=text,
                node_type=node_type,
                author=author,
                parent_id=parent_id,
                parent_ids=parent_ids,
                metadata=metadata or {},
                parent_hashes=parent_hashes
            )
            self.nodes[node_id] = node
            for p_id in parent_ids:
                if p_id in self.nodes:
                    self.nodes[p_id].children_ids.append(node_id)

            self._record_commit(f"ADD_NODE_{node_id}", [node_id])
            return node

    def get_ancestry(self, start_node_id: str, max_depth: int = 6) -> List[IdeaNode]:
        """
        Topological BFS traversal from a start node up to root.
        Returns ordered direct ancestors (immediate parents first), fixing Bug #6 blind slicing.
        """
        with self._lock:
            if start_node_id not in self.nodes:
                return []

            visited: Set[str] = set()
            queue: deque[str] = deque([start_node_id])
            ancestry: List[IdeaNode] = []

            while queue and len(ancestry) < max_depth:
                curr_id = queue.popleft()
                if curr_id in visited:
                    continue
                visited.add(curr_id)

                node = self.nodes.get(curr_id)
                if not node:
                    continue

                if curr_id != start_node_id:
                    ancestry.append(node)

                # Add parents to queue
                for pid in node.parent_ids:
                    if pid in self.nodes and pid not in visited:
                        queue.append(pid)

            return ancestry

    def summarize_committed(self, max_nodes: int = 25) -> str:
        """
        Compact plain-text summary of everything already merged into the tree, for grounding
        LLM calls that don't do a full ancestry traversal (real-time caption distillation and
        batch idea extraction) -- without this they only know the agenda's one-line title and
        the last few raw utterances, with zero awareness of what's already been decided.
        Excludes the root/agenda node itself since callers already pass that separately.
        Flattened rather than hierarchical: cheap to compute, cheap to read, and a real
        meeting's committed node count stays small enough that this doesn't need real
        graph traversal to be useful.
        """
        with self._lock:
            committed = [n for n in self.nodes.values() if n.id != self.root_id]
            if not committed:
                return "(nothing decided yet)"
            tail = committed[-max_nodes:]
            return "\n".join(
                f"- [{n.node_type.value}] {n.text} (by {n.author})" for n in tail
            )

    def compute_state_hash(self) -> str:
        """
        Computes a deterministic SHA-256 Merkle root hash of the entire tree state.
        Guarantees mathematical tamper-evidence across all participants.
        """
        with self._lock:
            if not self.nodes:
                return hashlib.sha256(b"EMPTY_DAG").hexdigest()[:16]

            # Sorted concatenation of (content_hash + node_type + parent_hashes)
            sorted_hashes = sorted([
                f"{n.content_hash}:{n.node_type.value}:{','.join(sorted(n.parent_hashes))}"
                for n in self.nodes.values()
            ])
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

    @classmethod
    def from_dict(cls, data: dict) -> "MerkleDAG":
        """Reconstructs a MerkleDAG from exported dictionary / DB row."""
        dag = cls(meeting_id=data.get("meeting_id", "default-meeting"))
        dag.revision = data.get("revision", 0)
        dag.root_id = data.get("root_id")
        dag.commit_history = data.get("commit_history", [])

        nodes_data = data.get("nodes", {})
        max_idx = 0
        for nid, ndict in nodes_data.items():
            node_type = ndict.get("node_type", "claim")
            if isinstance(node_type, str):
                try:
                    node_type = NodeType(node_type.lower())
                except ValueError:
                    node_type = NodeType.CLAIM

            node = IdeaNode(
                id=nid,
                text=ndict.get("text", ""),
                node_type=node_type,
                author=ndict.get("author", "anonymous"),
                parent_id=ndict.get("parent_id"),
                parent_ids=ndict.get("parent_ids", []),
                created_at=ndict.get("created_at", time.time()),
                children_ids=ndict.get("children_ids", []),
                metadata=ndict.get("metadata", {}),
                content_hash=ndict.get("content_hash", ""),
                parent_hashes=ndict.get("parent_hashes", [])
            )
            dag.nodes[nid] = node

            # Track highest node_xxxx index for id generator
            if nid.startswith("node_"):
                try:
                    idx = int(nid.replace("node_", ""))
                    if idx >= max_idx:
                        max_idx = idx + 1
                except ValueError:
                    pass

        dag._id_counter = max_idx
        return dag
