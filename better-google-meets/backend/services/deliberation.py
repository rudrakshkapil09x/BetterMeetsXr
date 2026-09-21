"""
BetterGoogleMeets: Deliberation Engine & Conflict Resolution
Implements Branch-Commit-Merge protocol, Habermas Machine consensus synthesis,
and Texterial text-as-material operations.
"""

from __future__ import annotations
import json
import logging
import uuid
from typing import Dict, List, Optional

from models.tree import MerkleDAG, IdeaNode, NodeType, ProposalDiff
from services.llm_gateway import LLMGateway

logger = logging.getLogger("DeliberationEngine")


class DeliberationEngine:
    def __init__(self, gateway: Optional[LLMGateway] = None):
        self.gateway = gateway or LLMGateway()

    async def distill_speech(self, speaker: str, raw_transcript: str) -> Dict:
        """
        Converts raw verbal transcript into a clean, typed epistemic card.
        """
        system_prompt = (
            "You are an epistemic knowledge extractor for meeting dialogue. "
            "Given a raw utterance and speaker, output raw JSON only with format:\n"
            "{\"distilled_text\": \"concise single sentence\", \"intent\": \"claim|proposal|question|action|evidence\"}"
        )
        prompt = f"Speaker: {speaker}\nUtterance: {raw_transcript}"

        raw_resp, provider = await self.gateway.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=0.1,
            max_tokens=100
        )
        data = self.gateway._extract_json(raw_resp)

        intent = data.get("intent", "claim").lower()
        if intent not in ["claim", "proposal", "question", "action", "evidence"]:
            intent = "claim"

        distilled = data.get("distilled_text", raw_transcript.strip())
        return {
            "distilled_text": distilled,
            "intent": intent,
            "provider_used": provider
        }

    async def analyze_proposal(
        self,
        dag: MerkleDAG,
        parent_id: str,
        candidate_text: str,
        author: str,
        node_type: NodeType = NodeType.PROPOSAL
    ) -> ProposalDiff:
        """
        Diffs a candidate branch against the active Merkle DAG.
        Evaluates semantic alignment, detects collisions, and synthesizes
        integrative Habermasian compromises when conflicts exist.
        """
        proposal_id = f"pr_{uuid.uuid4().hex[:8]}"

        if parent_id not in dag.nodes:
            return ProposalDiff(
                proposal_id=proposal_id,
                parent_id=parent_id,
                node_type=node_type,
                text=candidate_text,
                author=author,
                has_conflict=True,
                conflict_reason=f"Target parent '{parent_id}' does not exist in Merkle DAG.",
                alignment_score=0.0
            )

        parent_node = dag.nodes[parent_id]
        context_nodes = [
            f"[{n.node_type.upper()}] {n.id}: {n.text} (by {n.author})"
            for n in list(dag.nodes.values())[-6:]
        ]
        context_str = "\n".join(context_nodes)

        system_prompt = (
            "You are an objective meeting deliberation engine (Habermas Machine). "
            "Analyze the candidate proposal in the context of existing meeting nodes. "
            "Evaluate if it contradicts or collides with constraints. "
            "If there is a conflict, synthesize an integrative compromise statement that reconciles both perspectives.\n"
            "Return JSON only with keys:\n"
            "{\"has_conflict\": bool, \"conflict_reason\": str, \"trade_off_analysis\": str, "
            "\"alignment_score\": float (0.0 to 1.0), \"compromise_synthesis\": str or null}"
        )

        prompt = (
            f"Active Agenda Goal / Context:\n{context_str}\n\n"
            f"Parent Node ({parent_node.id}): {parent_node.text}\n"
            f"Candidate Proposal by {author}: {candidate_text}\n"
        )

        raw_resp, provider = await self.gateway.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=0.15,
            max_tokens=180
        )
        data = self.gateway._extract_json(raw_resp)

        has_conflict = bool(data.get("has_conflict", False))
        conflict_reason = str(data.get("conflict_reason", "No semantic collision detected."))
        trade_off = str(data.get("trade_off_analysis", "Synergistic proposal extending the parent solution node."))
        alignment = float(data.get("alignment_score", 0.90 if not has_conflict else 0.45))
        compromise = data.get("compromise_synthesis")

        return ProposalDiff(
            proposal_id=proposal_id,
            parent_id=parent_id,
            node_type=node_type,
            text=candidate_text,
            author=author,
            has_conflict=has_conflict,
            conflict_reason=conflict_reason,
            trade_off_analysis=trade_off,
            alignment_score=alignment,
            compromise_synthesis=compromise
        )

    def merge_proposal(
        self,
        dag: MerkleDAG,
        proposal_id: str,
        parent_id: str,
        candidate_text: str,
        author: str,
        node_type: NodeType,
        additional_parents: Optional[List[str]] = None
    ) -> IdeaNode:
        """
        Atomically commits an approved proposal branch into the canonical Merkle DAG.
        """
        merged = dag.add_node(
            parent_id=parent_id,
            text=candidate_text,
            node_type=node_type,
            author=author,
            metadata={
                "proposal_id": proposal_id,
                "committed_by": author
            },
            additional_parent_ids=additional_parents
        )
        return merged

    async def transform_card(self, action: str, text: str) -> str:
        """
        Texterial Text-as-Material interaction operations:
        - "knead": condensifies / summarizes into an executive one-liner.
        - "stretch": elaborates with operational context and rationale.
        """
        action = action.lower().strip()
        if action == "knead":
            system_prompt = "You are a text compression engine. Condense the input into a single sharp 5-10 word statement. Return text only."
            prompt = f"Text: {text}"
            res, _ = await self.gateway.generate(prompt, system_prompt, max_tokens=40)
            return res.strip()
        elif action == "stretch":
            system_prompt = "You are an idea elaboration engine. Expand the input with concrete implementation details and rationale in 2 concise sentences. Return text only."
            prompt = f"Text: {text}"
            res, _ = await self.gateway.generate(prompt, system_prompt, max_tokens=100)
            return res.strip()
        return text
