"""
BetterMeetsXR: Comprehensive Backend Test Suite
Author: Chaitanya Anand et al.
Target: ACM CHI 2027

Validates MerkleDAG state consistency, LM Studio inference, Deliberation Engine,
and FastAPI REST/WebSocket endpoints.
"""

import sys
from pathlib import Path
import pytest
from starlette.testclient import TestClient

# Add project root to sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from backend.models.tree import MerkleDAG, NodeType, ProposalDiff
from backend.services.lm_client import LMStudioClient
from backend.services.deliberation_engine import DeliberationEngine
from backend.app import app


def test_merkle_dag_initialization_and_hashing():
    dag = MerkleDAG(meeting_id="test-session-001")
    root = dag.create_root("Global Water Security Strategy", author="Chair")

    assert root.id == "node_0000"
    assert root.node_type == NodeType.GOAL
    assert len(dag.nodes) == 1

    hash1 = dag.compute_state_hash()
    assert len(hash1) == 16

    child1 = dag.add_node(
        parent_id=root.id,
        text="Deploy solar-powered desalination microplants",
        node_type=NodeType.CLAIM,
        author="Alice"
    )
    assert child1.id == "node_0001"
    assert "node_0001" in dag.nodes[root.id].children_ids

    hash2 = dag.compute_state_hash()
    assert hash1 != hash2, "Merkle state hash must mutate upon node addition"

    # Determinism check: same operations yield exact same hash
    dag_clone = MerkleDAG(meeting_id="test-session-001")
    r_clone = dag_clone.create_root("Global Water Security Strategy", author="Chair")
    dag_clone.add_node(
        parent_id=r_clone.id,
        text="Deploy solar-powered desalination microplants",
        node_type=NodeType.CLAIM,
        author="Alice"
    )
    assert dag.compute_state_hash() == dag_clone.compute_state_hash()


def test_lm_studio_live_inference():
    client = LMStudioClient()
    res = client.generate_completion(
        prompt="Respond with the word 'VERIFIED' only.",
        system_prompt="Return single word response.",
        max_tokens=10
    )
    assert "VERIFIED" in res.upper()


def test_deliberation_engine_diff_and_merge():
    dag = MerkleDAG(meeting_id="test-delib-001")
    root = dag.create_root("Urban Mobility Resilience", author="Chair")

    engine = DeliberationEngine()
    diff = engine.analyze_proposal(
        dag=dag,
        parent_id=root.id,
        candidate_text="Introduce dynamic autonomous micro-bus routing",
        author="Bob",
        node_type=NodeType.PROPOSAL
    )

    assert diff.proposal_id.startswith("pr_")
    assert diff.parent_id == root.id
    assert diff.author == "Bob"
    assert not diff.has_conflict

    # Merge execution
    merged_node = engine.merge_proposal(dag=dag, proposal=diff)
    assert merged_node.id in dag.nodes
    assert merged_node.text == diff.text
    assert dag.revision == 2


def test_fastapi_endpoints():
    client = TestClient(app)

    # Health check
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "online"
    assert "state_hash" in data

    # Tree export
    resp_tree = client.get("/tree")
    assert resp_tree.status_code == 200
    assert "nodes" in resp_tree.json()

    # Slate Ingest
    ingest_resp = client.post(
        "/slate/ingest",
        json={"speaker": "Alice", "transcript": "I think we should prioritize battery storage microgrids"}
    )
    assert ingest_resp.status_code == 200
    assert "card" in ingest_resp.json()

    # Proposal Analyze (validates trade_off_analysis)
    prop_resp = client.post(
        "/proposal/analyze",
        json={
            "parent_id": "node_0000",
            "candidate_text": "Install rooftop solar arrays across all municipal buildings",
            "author": "Alice",
            "node_type": "proposal"
        }
    )
    assert prop_resp.status_code == 200
    prop_data = prop_resp.json()
    assert "proposal_id" in prop_data
    assert "trade_off_analysis" in prop_data
    assert len(prop_data["trade_off_analysis"]) > 0
    assert "alignment_score" in prop_data


if __name__ == "__main__":
    pytest.main(["-v", __file__])
