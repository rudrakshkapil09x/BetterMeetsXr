import pytest
import asyncio
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from models.tree import MerkleDAG, NodeType
from services.deliberation import DeliberationEngine
from services.llm_gateway import LLMGateway


def test_merkle_dag_invariants():
    dag = MerkleDAG(meeting_id="test-session")
    root = dag.create_root("Core Strategy", author="Chair")

    assert root.id == "node_0000"
    assert dag.revision == 1
    initial_hash = dag.compute_state_hash()
    assert len(initial_hash) == 16

    # Add child node
    child = dag.add_node(
        parent_id=root.id,
        text="Implement distributed caching",
        node_type=NodeType.PROPOSAL,
        author="Alice"
    )
    assert child.id == "node_0001"
    assert child.parent_id == "node_0000"
    assert dag.revision == 2

    # State hash must deterministically change
    new_hash = dag.compute_state_hash()
    assert new_hash != initial_hash


def test_deliberation_proposal_analysis_and_merge():
    async def _test():
        gateway = LLMGateway()
        engine = DeliberationEngine(gateway=gateway)

        dag = MerkleDAG(meeting_id="deliberation-test")
        root = dag.create_root("Sub-15ms Latency SLA", author="Chair")

        # Analyze proposal
        diff = await engine.analyze_proposal(
            dag=dag,
            parent_id=root.id,
            candidate_text="Deploy Redis cluster in Availability Zone 2",
            author="Bob",
            node_type=NodeType.PROPOSAL
        )
        assert diff.proposal_id.startswith("pr_")
        assert diff.parent_id == root.id
        assert 0.0 <= diff.alignment_score <= 1.0
        assert len(diff.trade_off_analysis) > 0

        # Merge proposal
        merged = engine.merge_proposal(
            dag=dag,
            proposal_id=diff.proposal_id,
            parent_id=diff.parent_id,
            candidate_text=diff.text,
            author=diff.author,
            node_type=diff.node_type
        )
        assert merged.id == "node_0001"
        assert dag.nodes["node_0001"].text == diff.text
        assert dag.revision == 2

    asyncio.run(_test())


def test_speech_distillation():
    async def _test():
        gateway = LLMGateway()
        engine = DeliberationEngine(gateway=gateway)

        res = await engine.distill_speech(
            speaker="Alice",
            raw_transcript="I really think we should enforce strict database replication rules by next week."
        )
        assert "distilled_text" in res
        assert "intent" in res
        assert res["intent"] in ["claim", "proposal", "question", "action", "evidence"]

    asyncio.run(_test())


def test_texterial_transforms():
    async def _test():
        gateway = LLMGateway()
        engine = DeliberationEngine(gateway=gateway)

        original = "We need to set up comprehensive multi-region automated health check monitoring before the next major release."
        kneaded = await engine.transform_card("knead", original)
        assert len(kneaded) > 0
        assert len(kneaded) <= len(original) or len(kneaded.split()) <= 12

        stretched = await engine.transform_card("stretch", "Deploy Redis.")
        assert len(stretched) > 0

    asyncio.run(_test())

