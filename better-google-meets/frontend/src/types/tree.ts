export type NodeType = 'goal' | 'topic' | 'claim' | 'question' | 'evidence' | 'action' | 'proposal';

export interface IdeaNode {
  id: string;
  text: string;
  node_type: NodeType;
  author: string;
  parent_id: string | null;
  parent_ids: string[];
  created_at: number;
  children_ids: string[];
  metadata: Record<string, string>;
  content_hash: string;
}

export interface ProposalDiff {
  proposal_id: string;
  parent_id: string;
  text: string;
  author: string;
  node_type: NodeType;
  has_conflict: boolean;
  conflict_reason: string;
  alignment_score: number;
  trade_off_analysis: string;
  compromise_synthesis?: string | null;
}

export interface GhostSprout extends ProposalDiff {
  votes: string[]; // List of voter names/IDs
  requiredVotes: number;
  isMerging?: boolean;
}

export interface TreeSnapshot {
  meeting_id: string;
  revision: number;
  state_hash: string;
  root_id: string;
  nodes: Record<string, IdeaNode>;
  commit_history?: Array<{
    revision: number;
    action: string;
    state_hash: string;
    affected_nodes: string[];
    timestamp: number;
  }>;
}

export interface SlateCard {
  id: string;
  speaker: string;
  rawText: string;
  distilledText: string;
  intent: NodeType;
  createdAt: number;
  isStaged?: boolean;
}

export interface EngineStatus {
  active_provider: string;
  lm_studio: {
    online: boolean;
    url: string;
    model: string;
    last_latency_ms: number;
  };
  gemini_flash: {
    configured: boolean;
    model: string;
    last_latency_ms: number;
  };
}
