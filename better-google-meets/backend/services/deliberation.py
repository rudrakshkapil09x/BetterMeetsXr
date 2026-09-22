"""
BetterGoogleMeets: Deliberation Engine & Conflict Resolution
Implements Branch-Commit-Merge protocol, Habermas Machine consensus synthesis,
topological ancestry context extraction, and Texterial text-as-material operations.
"""

from __future__ import annotations
import json
import logging
import uuid
from typing import Dict, List, Optional

from models.tree import MerkleDAG, IdeaNode, NodeType, ProposalDiff
from services.llm_gateway import LLMGateway

logger = logging.getLogger("DeliberationEngine")


UI_BLACKLIST_KEYWORDS = {
    "leave call", "turn off microphone", "turn on microphone", "turn off camera",
    "turn on camera", "raise hand", "lower hand", "more options", "meeting details",
    "people", "chat with everyone", "activities", "show captions", "turn on captions",
    "turn off captions", "share screen", "stop sharing", "you're presenting",
    "audio settings", "video settings", "device settings", "in-call messages"
}


def is_noise(text: str) -> bool:
    if not text:
        return True
    clean = text.strip().lower()
    if len(clean) < 8:
        return True
    if clean in UI_BLACKLIST_KEYWORDS:
        return True
    for phrase in UI_BLACKLIST_KEYWORDS:
        if clean.startswith(phrase) or clean.endswith(phrase):
            return True
    # At least 3 words
    words = [w for w in clean.split() if w.isalnum()]
    if len(words) < 3:
        return True
    return False


class DeliberationEngine:
    def __init__(self, gateway: Optional[LLMGateway] = None):
        self.gateway = gateway or LLMGateway()

    async def distill_speech(
        self,
        speaker: str,
        raw_transcript: str,
        agenda: Optional[str] = None,
        padding_context: Optional[List[Dict[str, str]]] = None
    ) -> Dict:
        """
        Converts raw verbal transcript into a clean, typed epistemic card with extracted query,
        optionally grounded in the meeting agenda/motive and surrounding dialogue padding so no idea is cut off.
        """
        # 1. Quick lexical pre-filter for instant rejection of obvious greetings/audio checks
        if is_noise(raw_transcript):
            return {
                "distilled_text": "",
                "intent": "claim",
                "extracted_query": "",
                "is_noise": True,
                "reason": "Filtered by lexical noise rules",
                "provider_used": "filter"
            }

        agenda_context = f"\nMeeting Agenda / Motive: \"{agenda}\"" if agenda and agenda.strip() and agenda != "Discussion" else ""
        padding_context_str = ""
        if padding_context:
            context_turns = [
                f"  [{turn.get('speaker', 'Participant')}]: \"{turn.get('text', '').strip()}\""
                for turn in padding_context[-4:]
                if turn.get("text") and turn.get("text").strip() != raw_transcript.strip()
            ]
            if context_turns:
                padding_context_str = (
                    "Recent Surrounding Dialogue Context (Padding to prevent cutoff ideas):\n"
                    + "\n".join(context_turns)
                    + "\n\n"
                )

        system_prompt = (
            "You are an epistemic knowledge filter and query extractor for collaborative meeting deliberation.\n"
            f"{agenda_context}\n"
            "Analyze the spoken user utterance along with the speaker label. "
            "Use the recent dialogue padding so ideas aren't missed or cut off by mid-speech pauses.\n"
            "CRITICAL RULES FOR EXTRACTION:\n"
            "1. NOISE (is_noise: true):\n"
            "   - Small talk, pleasantries, greetings, broken disfluent muttering with no coherent proposition or query.\n"
            "   - Meta-chatter about audio, video, or testing (e.g. 'can you hear me', 'text to extract').\n"
            "2. SUBSTANTIVE (is_noise: false):\n"
            "   - Definite proposals, technical claims, decisions, meaningful questions, action items, or evidence.\n"
            "   - Formulate 'distilled_text': ONE crisp, authoritative proposition sentence.\n"
            "   - Formulate 'extracted_query': The precise conceptual query or decision problem represented by this speaker's thought.\n"
            "Output strict JSON only with format:\n"
            "{\n"
            "  \"is_noise\": boolean,\n"
            "  \"distilled_text\": \"concise proposition from target speaker, or empty string if noise\",\n"
            "  \"intent\": \"claim|proposal|question|action|evidence\",\n"
            "  \"extracted_query\": \"search or deliberation query for this user thought\",\n"
            "  \"reason\": \"brief explanation of the extraction or noise classification\"\n"
            "}"
        )
        prompt = (
            f"{padding_context_str}"
            f"Target Spoken Turn To Process:\n"
            f"Speaker: {speaker}\n"
            f"Utterance: \"{raw_transcript}\""
        )

        raw_resp, provider = await self.gateway.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=0.1,
            max_tokens=150
        )
        data = self.gateway._extract_json(raw_resp)

        # Evaluate LLM filtration decision
        is_llm_noise = bool(data.get("is_noise", False))
        reason = data.get("reason", "")
        distilled = data.get("distilled_text", "").strip()
        extracted_query = data.get("extracted_query", "").strip()

        # If LLM classified as noise, or returned an empty distilled text
        if is_llm_noise or not distilled:
            logger.info(f"LLM Filtration: Rejected noise from {speaker}: '{raw_transcript[:60]}' (Reason: {reason})")
            return {
                "distilled_text": "",
                "intent": "claim",
                "extracted_query": "",
                "is_noise": True,
                "reason": reason or "Filtered by LLM epistemic filtration layer",
                "provider_used": provider
            }

        intent = data.get("intent", "claim").lower()
        if intent not in ["claim", "proposal", "question", "action", "evidence"]:
            intent = "claim"

        if not distilled:
            distilled = raw_transcript.strip()

        return {
            "distilled_text": distilled,
            "intent": intent,
            "extracted_query": extracted_query,
            "is_noise": False,
            "reason": reason,
            "provider_used": provider
        }

    async def extract_batch_ideas(self, transcripts: List[Dict], agenda: Optional[str] = None) -> List[Dict]:
        """
        Extracts all substantive ideas, proposals, actions, and claims from a chronological
        multi-speaker dialogue transcript (e.g. accumulated over 30 minutes),
        grounded in the meeting agenda/motive.
        """
        if not transcripts:
            return []

        clean_turns = [
            t for t in transcripts
            if not is_noise(t.get("text", ""))
        ]
        if not clean_turns:
            return []

        formatted_lines = []
        for t in clean_turns:
            speaker = t.get("speaker", "Participant")
            text = t.get("text", "").strip()
            formatted_lines.append(f"{speaker}: \"{text}\"")

        dialogue_text = "\n".join(formatted_lines)
        agenda_clause = f"\nMeeting Agenda / Motive: \"{agenda}\"\nFocus on ideas, proposals, decisions, and claims relevant to this agenda.\n" if agenda and agenda.strip() and agenda != "Discussion" else "\n"

        system_prompt = (
            "You are an executive epistemic intelligence engine for video meetings."
            f"{agenda_clause}"
            "Analyze the multi-speaker dialogue transcript below. "
            "Identify and extract every distinct substantive idea, proposal, decision, action item, or core claim made by the participants. "
            "Ignore small talk, greetings, filler utterances, and repetitions. "
            "Return JSON only: a JSON array of objects with keys:\n"
            "[\n"
            "  {\n"
            "    \"speaker\": \"Name of person who proposed/stated it\",\n"
            "    \"text\": \"Crisp, authoritative one-line summary of the idea\",\n"
            "    \"intent\": \"proposal|claim|action|question|evidence\",\n"
            "    \"extracted_query\": \"Precise conceptual query or decision problem\",\n"
            "    \"rationale\": \"Brief 1-sentence reason why it was proposed\"\n"
            "  }\n"
            "]"
        )

        prompt = f"Meeting Dialogue Transcript ({len(clean_turns)} turns):\n{dialogue_text}"

        raw_resp, provider = await self.gateway.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=0.2,
            max_tokens=600
        )

        extracted = []
        try:
            text_str = raw_resp.strip()
            start = text_str.find("[")
            end = text_str.rfind("]")
            if start != -1 and end != -1 and end > start:
                json_content = text_str[start:end+1]
                items = json.loads(json_content)
                if isinstance(items, list):
                    for item in items:
                        if isinstance(item, dict) and "text" in item and len(item["text"].strip()) > 3:
                            intent = str(item.get("intent", "claim")).lower()
                            if intent not in ["claim", "proposal", "question", "action", "evidence"]:
                                intent = "claim"

                            raw_speaker = str(item.get("speaker", clean_turns[0]["speaker"])).strip()
                            matched_speaker = raw_speaker
                            for ct in clean_turns:
                                ct_spk = ct.get("speaker", "")
                                if ct_spk.lower() == raw_speaker.lower() or raw_speaker.lower() in ct_spk.lower() or ct_spk.lower() in raw_speaker.lower():
                                    matched_speaker = ct_spk
                                    break

                            extracted.append({
                                "speaker": matched_speaker,
                                "text": str(item.get("text", "")).strip(),
                                "intent": intent,
                                "extracted_query": str(item.get("extracted_query", "")).strip(),
                                "rationale": str(item.get("rationale", "")).strip()
                            })

        except Exception as e:
            logger.warning(f"Failed to parse batch ideas JSON: {e}")

        # Fallback heuristic if LLM response couldn't be parsed
        if not extracted and clean_turns:
            for t in clean_turns[:6]:
                extracted.append({
                    "speaker": t["speaker"],
                    "text": t["text"],
                    "intent": "proposal" if any(w in t["text"].lower() for w in ["propose", "should", "adopt", "migrate"]) else "claim",
                    "extracted_query": f"Query: {t['text'][:40]}",
                    "rationale": "Extracted from meeting speech"
                })


        return extracted

    async def analyze_proposal(
        self,
        dag: MerkleDAG,
        parent_id: str,
        candidate_text: str,
        author: str,
        node_type: NodeType = NodeType.PROPOSAL
    ) -> ProposalDiff:
        """
        Diffs a candidate branch against the active Merkle DAG using topological ancestry.
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

        # Topological BFS ancestry: direct ancestors from root to immediate parent
        ancestors = dag.get_ancestry(parent_id, max_depth=6)
        # Ensure root node is included for overarching agenda context
        if dag.root_id and dag.root_id in dag.nodes and not any(a.id == dag.root_id for a in ancestors) and parent_id != dag.root_id:
            ancestors.append(dag.nodes[dag.root_id])

        # Reverse so context flows logically from root down to parent
        context_nodes = [
            f"[{n.node_type.value.upper() if hasattr(n.node_type, 'value') else str(n.node_type).upper()}] {n.id}: {n.text} (by {n.author})"
            for n in reversed(ancestors)
        ]
        context_str = "\n".join(context_nodes) if context_nodes else f"[GOAL] {parent_node.id}: {parent_node.text}"

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
            f"Active Agenda Goal / Direct Ancestry Context:\n{context_str}\n\n"
            f"Target Parent Node ({parent_node.id}): {parent_node.text}\n"
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
        conflict_reason = str(data.get("conflict_reason") or ("Constraint collision detected." if has_conflict else "No semantic collision detected."))
        trade_off = str(data.get("trade_off_analysis") or ("Operational constraint clash requires compromise." if has_conflict else "Synergistic proposal extending the parent solution node."))
        try:
            alignment = float(data.get("alignment_score", 0.90 if not has_conflict else 0.45))
        except (ValueError, TypeError):
            alignment = 0.90 if not has_conflict else 0.45
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
