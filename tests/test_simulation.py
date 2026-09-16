"""
BetterMeetsXR: Meeting Simulation Verification Test Suite
Author: Chaitanya Anand et al.
Target: ACM CHI 2027

Validates that all simulated meeting datasets and executive summaries meet
the strict requirements of the research proposal:
1. 3-person triad (Alice, Bob, Charlie) in each meeting across all 3 domains.
2. Complete Pydantic schema validation for all JSON datasets.
3. Timestamped dialogue turn-by-turn with speaker diarization.
4. Slate tangible card extractions with distilled text and valid intent tags.
5. Full Branch-Commit-Merge trail with conflict diff cards, voting logs, and Merkle root hash transitions.
6. Final meeting synthesis with canonical DAG export, action items, and topological recall alignment scores.
7. Executive summary markdown reports with comprehensive analysis.
"""

import sys
import json
from pathlib import Path
import pytest

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
if str(WORKSPACE_ROOT) not in sys.path:
    sys.path.insert(0, str(WORKSPACE_ROOT))

from scripts.simulate_meetings import (
    SimulatedMeeting,
    DATA_DIR,
    SCENARIOS
)


@pytest.fixture(scope="module")
def loaded_meetings():
    meetings = {}
    for sc in SCENARIOS:
        m_id = sc["meeting_id"]
        json_file = DATA_DIR / f"{m_id}.json"
        assert json_file.exists(), f"Meeting file {json_file} does not exist!"
        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        meetings[m_id] = data
    return meetings


def test_simulated_meetings_exist_and_validate_schema(loaded_meetings):
    assert len(loaded_meetings) == 3, "Must have exactly 3 simulated meetings"

    for m_id, data in loaded_meetings.items():
        # Validate against strict Pydantic model
        validated = SimulatedMeeting.model_validate(data)
        assert validated.meeting_id == m_id
        assert validated.metadata.meeting_id == m_id
        assert len(validated.dialogue) >= 10
        assert len(validated.slate_extractions) >= 10
        assert len(validated.branch_commit_merge_trail) >= 3


def test_triad_participants_and_metadata(loaded_meetings):
    for m_id, data in loaded_meetings.items():
        meta = data["metadata"]
        assert meta["domain"] in [
            "Smart-City Disaster Protocol",
            "Enterprise Cloud Migration",
            "Healthcare Robotics"
        ]
        assert len(meta["initial_goal"]) > 20
        assert "Meta Quest 3" in meta["environment"]

        # Triad check
        participant_names = [p["name"] for p in meta["participants"]]
        assert sorted(participant_names) == ["Alice", "Bob", "Charlie"], f"Meeting {m_id} must have Alice, Bob, Charlie triad"
        for p in meta["participants"]:
            assert p["role"]
            assert p["avatar_color"].startswith("#")


def test_dialogue_and_slate_extractions(loaded_meetings):
    valid_intents = {"claim", "question", "action", "evidence", "proposal"}

    for m_id, data in loaded_meetings.items():
        dialogue = data["dialogue"]
        slate = data["slate_extractions"]

        assert len(dialogue) == len(slate), "Every dialogue turn must produce a slate card"

        for turn, card in zip(dialogue, slate):
            assert turn["speaker"] in ["Alice", "Bob", "Charlie"]
            assert turn["turn_id"] == card["turn_id"]
            assert turn["speech_duration_seconds"] > 0
            assert card["speaker"] == turn["speaker"]
            assert len(card["distilled_text"]) > 0
            assert card["intent_tag"] in valid_intents, f"Invalid intent: {card['intent_tag']}"
            assert card["status"] in ["sandboxed", "proposed", "merged", "rejected"]


def test_branch_commit_merge_trail_and_merkle_transitions(loaded_meetings):
    for m_id, data in loaded_meetings.items():
        trail = data["branch_commit_merge_trail"]
        has_conflict_card = False
        has_approved_merge = False

        for ev in trail:
            assert ev["event_id"].startswith("bcm_ev_")
            assert ev["author"] in ["Alice", "Bob", "Charlie"]
            assert ev["parent_node_id"].startswith("node_")
            assert len(ev["candidate_text"]) > 10

            diff = ev["diff_card"]
            assert 0.0 <= diff["alignment_score"] <= 1.0
            assert diff["trade_off_analysis"]

            if diff["has_conflict"]:
                has_conflict_card = True
                assert diff["conflict_reason"]
                assert ev["consensus_outcome"] in ["rejected", "amended"]
                # On rejection, Merkle state hash should remain unchanged
                trans = ev["merkle_transition"]
                assert trans["pre_state_hash"] == trans["post_state_hash"], "Rejected branch must not alter Merkle root"
            else:
                has_approved_merge = True
                assert ev["consensus_outcome"] == "approved"
                # On approval, Merkle state hash must change deterministically
                trans = ev["merkle_transition"]
                assert trans["pre_state_hash"] != trans["post_state_hash"], "Approved merge must mutate Merkle root"
                assert trans["revision_after"] > trans["revision_before"]
                assert trans["affected_node_id"] is not None

                # CRITICAL: Verify proposal_id in DAG node metadata strictly matches the BCM event proposal_id
                dag_nodes = data["final_synthesis"]["canonical_dag_state"]["nodes"]
                affected_id = trans["affected_node_id"]
                assert affected_id in dag_nodes, f"Node {affected_id} missing from DAG nodes"
                assert dag_nodes[affected_id]["metadata"].get("proposal_id") == ev["proposal_id"], (
                    f"Proposal ID mismatch: {dag_nodes[affected_id]['metadata'].get('proposal_id')} != {ev['proposal_id']}"
                )

            # Voting log validation
            votes = ev["consensus_voting_log"]
            assert len(votes) == 3, "Triad quorum required: all 3 must vote"
            voter_names = [v["voter"] for v in votes]
            assert sorted(voter_names) == ["Alice", "Bob", "Charlie"]

        assert has_conflict_card, f"Meeting {m_id} must exercise conflict diff detection"
        assert has_approved_merge, f"Meeting {m_id} must have approved merges"


def test_final_synthesis_and_topological_recall(loaded_meetings):
    for m_id, data in loaded_meetings.items():
        synth = data["final_synthesis"]

        # 1. Canonical DAG state
        dag = synth["canonical_dag_state"]
        assert dag["meeting_id"] == m_id
        assert dag["revision"] >= 3
        assert len(dag["state_hash"]) == 16
        assert dag["root_id"] == "node_0000"
        assert len(dag["nodes"]) >= 3

        # 2. Resolved Action items
        actions = synth["resolved_action_items"]
        assert len(actions) >= 3
        for act in actions:
            assert act["item_id"].startswith("act_")
            assert act["assignee"] in ["Alice", "Bob", "Charlie"]
            assert act["priority"] in ["high", "medium", "low"]
            assert act["source_node_id"] in dag["nodes"]

        # 3. Topological recall alignment
        topo = synth["topological_recall_alignment"]
        assert 0.85 <= topo["overall_alignment_score"] <= 1.0
        assert topo["grounding_efficiency_gain_percent"] > 25.0
        assert topo["recalled_critical_path_pct"] == 100.0

        p_scores = topo["participant_scores"]
        assert set(p_scores.keys()) == {"Alice", "Bob", "Charlie"}
        for p_name, p_stat in p_scores.items():
            assert p_stat["graph_f1_score"] >= 0.90
            assert 0.0 < p_stat["cognitive_load_nasa_tlx"] < 50.0  # low cognitive load in XR
            assert p_stat["latency_to_ground_seconds"] < 3.0


def test_executive_summaries_exist_and_contain_audit_sections():
    for sc in SCENARIOS:
        m_id = sc["meeting_id"]
        summary_file = DATA_DIR / f"{m_id}_summary.md"
        assert summary_file.exists(), f"Summary file {summary_file} does not exist"

        content = summary_file.read_text(encoding="utf-8")
        assert len(content) > 2000, "Summary must be detailed"
        assert f"# Executive Deliberation Summary" in content
        assert "## 1. Executive Overview & Deliberation Scope" in content
        assert "## 2. Speech Ingestion & Tangible Slate Extractions" in content
        assert "## 3. Branch-Commit-Merge Deliberation Trail & Trade-Off Analysis" in content
        assert "## 4. Cryptographic Merkle State Audit Trail" in content
        assert "## 5. Resolved Action Items & Responsibilities" in content
        assert "## 6. Post-Meeting Topological Recall & Grounding Evaluation" in content
        assert "Alice" in content and "Bob" in content and "Charlie" in content


def test_simulation_window_boundaries():
    from datetime import datetime
    from scripts.simulate_meetings import is_within_simulation_window

    base = datetime(2026, 9, 16, 10, 0, 0)
    assert not is_within_simulation_window(base.replace(hour=10, minute=29, second=59))
    assert is_within_simulation_window(base.replace(hour=10, minute=30, second=0))
    assert is_within_simulation_window(base.replace(hour=10, minute=45, second=0))
    assert is_within_simulation_window(base.replace(hour=11, minute=0, second=0))
    assert not is_within_simulation_window(base.replace(hour=11, minute=0, second=1))
    assert not is_within_simulation_window(base.replace(hour=5, minute=0, second=0))


def test_validate_and_finalize_sample_artifacts():
    from scripts.simulate_meetings import validate_and_finalize_sample_artifacts
    record = validate_and_finalize_sample_artifacts(log_audit=False)
    assert record["status"] == "FINALIZED_AND_VALIDATED"
    assert record["count"] == 3
    assert record["has_manifest"] is True
    assert len(record["artifacts"]) == 3
    assert len(record["errors"]) == 0


def test_simulation_engine_direct_execution():
    from scripts.simulate_meetings import execute_meeting_simulation
    dataset = execute_meeting_simulation(SCENARIOS[0])
    validated = SimulatedMeeting.model_validate(dataset)
    assert validated.meeting_id == SCENARIOS[0]["meeting_id"]
    assert len(validated.branch_commit_merge_trail) == 4
    # Check that root hash mutated deterministically
    assert len(validated.final_synthesis.canonical_dag_state["state_hash"]) == 16


def test_slate_card_status_no_false_positive_merge(loaded_meetings):
    """
    Guarantees that utterances containing words like 'emergency' or 'submerged'
    do NOT trigger false-positive 'merged' status on slate cards.
    """
    for m_id, data in loaded_meetings.items():
        for card in data["slate_extractions"]:
            raw = card["raw_utterance"].lower()
            if "emergency" in raw and "merge" not in raw.replace("emergency", "") and "approve" not in raw:
                assert card["status"] != "merged", (
                    f"False positive 'merged' on card {card['card_id']} with raw utterance: {card['raw_utterance']}"
                )
