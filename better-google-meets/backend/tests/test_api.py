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


def test_noise_filtering_on_slate_ingest(client):
    # Noise strings MUST be rejected and ignored
    noise_payload = {
        "speaker": "Participant",
        "transcript": "Leave call",
        "meeting_id": "test-noise-room"
    }
    resp = client.post("/slate/ingest", json=noise_payload)
    assert resp.status_code == 200
    assert resp.json().get("status") == "ignored_noise"


def test_transcripts_and_batch_idea_extraction_endpoint(client):
    meeting_id = "test-batch-room"
    # 1. Ingest multiple speaker turns
    client.post("/slate/ingest", json={
        "speaker": "Alice",
        "transcript": "We should deploy automated canary releases for zero downtime deployments.",
        "meeting_id": meeting_id
    })
    client.post("/slate/ingest", json={
        "speaker": "Bob",
        "transcript": "I propose we set up Prometheus alerting for latency anomalies.",
        "meeting_id": meeting_id
    })

    # 2. Check transcripts endpoint
    t_resp = client.get(f"/transcripts?meeting_id={meeting_id}")
    assert t_resp.status_code == 200
    t_data = t_resp.json()
    assert t_data["total"] >= 2

    # 3. Trigger batch idea extraction
    batch_resp = client.post(f"/session/extract-ideas?meeting_id={meeting_id}")
    assert batch_resp.status_code == 200
    batch_data = batch_resp.json()
    assert batch_data["status"] == "success"
    assert batch_data["extracted_count"] > 0
    assert len(batch_data["ideas"]) > 0


def test_agenda_endpoint_and_grounding(client):
    meeting_id = "test-agenda-room"
    # 1. Update meeting agenda
    agenda_payload = {
        "agenda": "Q3 Distributed Database Migration to DynamoDB",
        "meeting_id": meeting_id,
        "author": "TechLead"
    }
    resp = client.post("/tree/agenda", json=agenda_payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "agenda_updated"
    assert data["agenda"] == "Q3 Distributed Database Migration to DynamoDB"
    assert data["tree"]["nodes"]["node_0000"]["text"] == "Q3 Distributed Database Migration to DynamoDB"

    # 2. Ingest speech and verify it runs with agenda grounding
    ingest_resp = client.post("/slate/ingest", json={
        "speaker": "Elena",
        "transcript": "We should use DynamoDB global tables for multi-region replication.",
        "meeting_id": meeting_id
    })
    assert ingest_resp.status_code == 200
    assert ingest_resp.json()["card"]["intent"] in ["proposal", "claim", "action", "question", "evidence"]
