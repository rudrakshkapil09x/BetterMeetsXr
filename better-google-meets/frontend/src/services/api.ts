import { TreeSnapshot, SlateCard, ProposalDiff, EngineStatus, NodeType } from '../types/tree';

const API_BASE = '/api';

export async function getHealth(): Promise<any> {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function getTree(): Promise<TreeSnapshot> {
  const res = await fetch(`${API_BASE}/tree`);
  if (!res.ok) throw new Error(`Fetch tree failed: ${res.statusText}`);
  return res.json();
}

export async function resetTree(goalTitle: string = 'Municipal Climate Resilience Strategy'): Promise<TreeSnapshot> {
  const encoded = encodeURIComponent(goalTitle);
  const res = await fetch(`${API_BASE}/tree/reset?goal_title=${encoded}`, { method: 'POST' });
  if (!res.ok) throw new Error(`Reset tree failed: ${res.statusText}`);
  return res.json();
}

export async function ingestSpeech(speaker: string, transcript: string): Promise<{ speaker: string; raw: string; card: { distilled_text: string; intent: NodeType; provider_used: string } }> {
  const res = await fetch(`${API_BASE}/slate/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ speaker, transcript })
  });
  if (!res.ok) throw new Error(`Ingest speech failed: ${res.statusText}`);
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
      node_type: nodeType
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
      additional_parents: additionalParents
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
