"""
BetterMeetsXR: Deliberation & Diffing Engine
Author: Chaitanya Anand et al.
Target: ACM CHI 2027

Analyzes candidate proposals (Pull Requests) against the canonical MerkleDAG,
identifies semantic overlaps, detects contradictions, and computes Deliberation Cards.
"""

from __future__ import annotations
import json
import uuid
from typing import Optional
from backend.models.tree import MerkleDAG, IdeaNode, NodeType, ProposalDiff
from backend.services.lm_client import LMStudioClient


class DeliberationEngine:
    """
    Manages the Branch-Commit-Merge protocol for human thought in XR.
    """

    def __init__(self, lm_client: Optional[LMStudioClient] = None):
        self.lm_client = lm_client or LMStudioClient()

    def analyze_proposal(
        self,
        dag: MerkleDAG,
        parent_id: str,
        candidate_text: str,
        author: str,
        node_type: NodeType = NodeType.PROPOSAL
    ) -> ProposalDiff:
        proposal_id = f"pr_{uuid.uuid4().hex[:8]}"

        if parent_id not in dag.nodes:
            return ProposalDiff(
                proposal_id=proposal_id,
                parent_id=parent_id,
                node_type=node_type,
                text=candidate_text,
                author=author,
                has_conflict=True,
                conflict_reason=f"Parent node '{parent_id}' does not exist in current Arbor.",
                alignment_score=0.0
            )

        parent_node = dag.nodes[parent_id]
        context_nodes = [
            f"Node {nid} ({n.node_type}): {n.text}"
            for nid, n in dag.nodes.items()
        ]
        context_str = "\n".join(context_nodes[-5:])  # recent context

        prompt = f"""Target Parent Node: {parent_node.text}
Candidate Proposal by {author}: {candidate_text}

Current Agenda Context:
{context_str}

Analyze this proposal for:
1. Does it contradict or duplicate existing nodes?
2. Alignment score (0.0 to 1.0).
3. Trade-off analysis or operational synergy.
Return ONLY JSON: {{"has_conflict": bool, "conflict_reason": str, "trade_off_analysis": str, "alignment_score": float}}"""

        try:
            raw_eval = self.lm_client.generate_completion(
                prompt=prompt,
                system_prompt="You are a strict, objective conflict-detection and trade-off analysis engine for collaborative meetings. Return raw JSON only.",
                temperature=0.1,
                max_tokens=150
            )
            clean_json = raw_eval.replace("```json", "").replace("```", "").strip()
            data = json.loads(clean_json)
            has_conflict = bool(data.get("has_conflict", False))
            conflict_reason = str(data.get("conflict_reason", ""))
            trade_off_analysis = str(data.get("trade_off_analysis", "Synergistic proposal extending the parent solution node." if not has_conflict else "Constraint collision detected."))
            alignment_score = float(data.get("alignment_score", 0.95))
        except Exception as e:
            raise RuntimeError(f"Direct LM Studio proposal analysis failed: {e}. Fallbacks are disabled.")


        return ProposalDiff(
            proposal_id=proposal_id,
            parent_id=parent_id,
            node_type=node_type,
            text=candidate_text,
            author=author,
            has_conflict=has_conflict,
            conflict_reason=conflict_reason,
            trade_off_analysis=trade_off_analysis,
            alignment_score=alignment_score
        )

    def merge_proposal(self, dag: MerkleDAG, proposal: ProposalDiff) -> IdeaNode:
        """
        Executes atomic merge of approved proposal into the canonical Arbor.
        Preserves original epistemic node_type (claim, action, question, evidence).
        """
        node_type = proposal.node_type if hasattr(proposal, "node_type") and proposal.node_type else NodeType.CLAIM
        merged_node = dag.add_node(
            parent_id=proposal.parent_id,
            text=proposal.text,
            node_type=node_type,
            author=proposal.author,
            metadata={
                "proposal_id": proposal.proposal_id,
                "alignment_score": str(proposal.alignment_score)
            }
        )
        return merged_node

