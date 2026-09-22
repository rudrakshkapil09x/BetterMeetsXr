import { TreeSnapshot, SlateCard, ProposalDiff, EngineStatus, NodeType } from '../types/tree';

const API_BASE = (typeof window !== 'undefined' && window.location.protocol === 'chrome-extension:')
  ? 'http://127.0.0.1:8000'
  : '/api';

export function getActiveMeetingId(): string {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('meeting_id') || 'meet-session-01';
  }
  return 'meet-session-01';
}

export async function getHealth(): Promise<any> {
  const res = await fetch(`${API_BASE}/health?meeting_id=${encodeURIComponent(getActiveMeetingId())}`);
  return res.json();
}

export async function getTree(): Promise<TreeSnapshot> {
  const res = await fetch(`${API_BASE}/tree?meeting_id=${encodeURIComponent(getActiveMeetingId())}`);
  if (!res.ok) throw new Error(`Fetch tree failed: ${res.statusText}`);
  return res.json();
}

export async function resetTree(goalTitle: string = 'Municipal Climate Resilience Strategy'): Promise<TreeSnapshot> {
  const encoded = encodeURIComponent(goalTitle);
  const res = await fetch(`${API_BASE}/tree/reset?goal_title=${encoded}&meeting_id=${encodeURIComponent(getActiveMeetingId())}`, { method: 'POST' });
  if (!res.ok) throw new Error(`Reset tree failed: ${res.statusText}`);
  return res.json();
}

type IngestResponse =
  | { status: 'ignored_noise'; reason: string; speaker: string; raw: string }
  | {
      status?: never;
      speaker: string;
      raw: string;
      card_id?: string;
      extracted_query?: string;
      card: {
        distilled_text: string;
        intent: NodeType;
        provider_used: string;
        extracted_query?: string;
        is_noise?: boolean;
        reason?: string;
      };
    };

export async function ingestSpeech(speaker: string, transcript: string): Promise<IngestResponse> {
  const res = await fetch(`${API_BASE}/slate/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ speaker, transcript, meeting_id: getActiveMeetingId() })
  });
  if (!res.ok) throw new Error(`Ingest speech failed: ${res.statusText}`);
  return res.json();
}

export async function getSpeechSlates(): Promise<{ meeting_id: string; cards: SlateCard[] }> {
  const res = await fetch(`${API_BASE}/slate?meeting_id=${encodeURIComponent(getActiveMeetingId())}`);
  if (!res.ok) throw new Error(`Fetch speech slates failed: ${res.statusText}`);
  return res.json();
}

export async function transformCard(text: string, action: 'knead' | 'stretch'): Promise<{ original: string; action: string; transformed: string }> {
  const res = await fetch(`${API_BASE}/card/transform`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, action })
  });
  if (!res.ok) throw new Error(`Card transform failed: ${res.statusText}`);
  return res.json();
}

export async function analyzeProposal(
  parentId: string,
  candidateText: string,
  author: string,
  nodeType: NodeType = 'proposal'
): Promise<ProposalDiff> {
  const res = await fetch(`${API_BASE}/proposal/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parent_id: parentId,
      candidate_text: candidateText,
      author,
      node_type: nodeType,
      meeting_id: getActiveMeetingId()
    })
  });
  if (!res.ok) throw new Error(`Analyze proposal failed: ${res.statusText}`);
  return res.json();
}

export async function mergeProposal(
  proposalId: string,
  parentId: string,
  candidateText: string,
  author: string,
  nodeType: NodeType = 'claim',
  additionalParents?: string[]
): Promise<{ status: string; merged_node_id: string; state_hash: string; revision: number }> {
  const res = await fetch(`${API_BASE}/proposal/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      proposal_id: proposalId,
      parent_id: parentId,
      candidate_text: candidateText,
      author,
      node_type: nodeType,
      additional_parents: additionalParents,
      meeting_id: getActiveMeetingId()
    })
  });
  if (!res.ok) throw new Error(`Merge proposal failed: ${res.statusText}`);
  return res.json();
}

export async function getEngineConfig(): Promise<EngineStatus> {
  const res = await fetch(`${API_BASE}/config/engine`);
  return res.json();
}

export async function updateEngineConfig(
  activeProvider: string,
  geminiApiKey?: string,
  lmStudioUrl?: string
): Promise<EngineStatus> {
  const res = await fetch(`${API_BASE}/config/engine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      active_provider: activeProvider,
      gemini_api_key: geminiApiKey,
      lm_studio_url: lmStudioUrl
    })
  });
  return res.json();
}

export async function extractBatchIdeas(forceAll: boolean = false): Promise<{ status: string; extracted_count: number; ideas: SlateCard[] }> {
  const res = await fetch(`${API_BASE}/session/extract-ideas?meeting_id=${encodeURIComponent(getActiveMeetingId())}&force_all=${forceAll}`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error(`Extract batch ideas failed: ${res.statusText}`);
  return res.json();
}

export async function getTranscripts(): Promise<{ meeting_id: string; total: number; transcripts: Array<{ id: number; speaker: string; text: string; created_at: number; extracted: boolean }> }> {
  const res = await fetch(`${API_BASE}/transcripts?meeting_id=${encodeURIComponent(getActiveMeetingId())}`);
  if (!res.ok) throw new Error(`Fetch transcripts failed: ${res.statusText}`);
  return res.json();
}

export async function setMeetingAgenda(agenda: string): Promise<any> {
  const res = await fetch(`${API_BASE}/tree/agenda`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agenda,
      meeting_id: getActiveMeetingId(),
      author: 'Chair'
    })
  });
  if (!res.ok) {
    return resetTree(agenda);
  }
  return res.json();
}
