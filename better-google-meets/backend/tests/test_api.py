import pytest
import sys
import os
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import app


@pytest.fixture
def client():
    return TestClient(app)


def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "revision" in data
    assert "state_hash" in data
    assert "engine_status" in data


def test_tree_and_reset_endpoints(client):
    # Get tree
    resp1 = client.get("/tree")
    assert resp1.status_code == 200
    tree = resp1.json()
    assert "root_id" in tree
    assert "nodes" in tree

    # Reset tree
    resp2 = client.post("/tree/reset?goal_title=New%20Strategy%20Goal")
    assert resp2.status_code == 200
    reset_tree = resp2.json()
    assert reset_tree["nodes"]["node_0000"]["text"] == "New Strategy Goal"


def test_slate_ingest_endpoint(client):
    payload = {
        "speaker": "Alice",
        "transcript": "We should optimize our server payload serialization."
    }
    response = client.post("/slate/ingest", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["speaker"] == "Alice"
    assert "card" in data
    assert "distilled_text" in data["card"]
    assert "intent" in data["card"]


def test_proposal_analyze_and_merge(client):
    # Analyze
    analyze_payload = {
        "parent_id": "node_0000",
        "candidate_text": "Adopt protobuf for internal RPC serialization",
        "author": "Charlie",
        "node_type": "proposal"
    }
    resp1 = client.post("/proposal/analyze", json=analyze_payload)
    assert resp1.status_code == 200
    diff = resp1.json()
    assert "proposal_id" in diff
    assert "trade_off_analysis" in diff

    # Merge
    merge_payload = {
        "proposal_id": diff["proposal_id"],
        "parent_id": diff["parent_id"],
        "candidate_text": diff["text"],
        "author": diff["author"],
        "node_type": diff["node_type"]
    }
    resp2 = client.post("/proposal/merge", json=merge_payload)
    assert resp2.status_code == 200
    merge_res = resp2.json()
    assert merge_res["status"] == "MERGED"
    assert "merged_node_id" in merge_res


def test_card_transform_endpoint(client):
    payload = {
        "text": "Comprehensive load testing must be completed across all microservices prior to production.",
        "action": "knead"
    }
    response = client.post("/card/transform", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "transformed" in data
    assert len(data["transformed"]) > 0


def test_engine_config_endpoints(client):
    # GET config
    resp1 = client.get("/config/engine")
    assert resp1.status_code == 200

    # POST config update
    update_payload = {
        "active_provider": "auto",
        "lm_studio_url": "http://localhost:1234/v1"
    }
    resp2 = client.post("/config/engine", json=update_payload)
    assert resp2.status_code == 200
    assert resp2.json()["active_provider"] == "auto"
