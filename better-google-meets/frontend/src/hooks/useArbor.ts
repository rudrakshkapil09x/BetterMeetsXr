import { useState, useEffect, useCallback } from 'react';
import { TreeSnapshot, GhostSprout, IdeaNode, ProposalDiff, NodeType, SlateCard } from '../types/tree';
import { getTree, getSpeechSlates, getPendingProposals, analyzeProposal, voteProposal, resetTree as apiResetTree } from '../services/api';
import { useWebSocket, WebSocketEvent } from './useWebSocket';

export function useArbor() {
  const [tree, setTree] = useState<TreeSnapshot | null>(null);
  const [ghostSprouts, setGhostSprouts] = useState<Record<string, GhostSprout>>({});
  const [slateCards, setSlateCards] = useState<SlateCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedParentId, setSelectedParentId] = useState<string>('node_0000');

  const handleWsEvent = useCallback((event: WebSocketEvent) => {
    if (event.event === 'INITIAL_SNAPSHOT' && event.data) {
      setTree(event.data);
      if (event.data.slates && Array.isArray(event.data.slates)) {
        setSlateCards(event.data.slates);
      }
      setIsLoading(false);
    } else if (event.event === 'SPEECH_CARD_INGESTED' && (event as any).card) {
      const newCard = (event as any).card;
      setSlateCards((prev) => [newCard, ...prev.filter((c) => c.id !== newCard.id)]);
    } else if (event.event === 'SPEECH_CARD_UPDATED' && (event as any).card) {
      const updatedCard = (event as any).card as SlateCard;
      setSlateCards((prev) =>
        prev.map((c) => (c.id === updatedCard.id ? { ...c, ...updatedCard } : c))
      );
    } else if (event.event === 'BATCH_IDEAS_EXTRACTED' && (event as any).cards) {
      const newCards = (event as any).cards as SlateCard[];
      setSlateCards((prev) => {
        const existingIds = new Set(prev.map(c => c.id));
        const filteredNew = newCards.filter(c => !existingIds.has(c.id));
        return [...filteredNew, ...prev];
      });
    } else if (event.event === 'TREE_MUTATED' && event.node) {
      setTree((prev) => {
        if (!prev) return prev;
        const updatedNodes: Record<string, IdeaNode> = {
          ...prev.nodes,
          [event.node.id]: {
            ...event.node,
            created_at: event.timestamp || Date.now(),
            children_ids: [],
            metadata: {},
            content_hash: ''
          }
        };
        // Add child link to parent
        const parentId = event.node.parent_id;
        if (parentId && updatedNodes[parentId]) {
          const parent = updatedNodes[parentId];
          if (!parent.children_ids.includes(event.node.id)) {
            parent.children_ids = [...parent.children_ids, event.node.id];
          }
        }
        return {
          ...prev,
          revision: event.revision || prev.revision + 1,
          state_hash: event.state_hash || prev.state_hash,
          nodes: updatedNodes
        };
      });

      // Remove matching ghost sprout if merged
      setGhostSprouts((prev) => {
        const next = { ...prev };
        for (const [id, sprout] of Object.entries(next)) {
          if (sprout.text === event.node.text && sprout.parent_id === event.node.parent_id) {
            delete next[id];
          }
        }
        return next;
      });
    } else if (event.event === 'GHOST_SPROUT_STAGED' && event.data) {
      const diff: ProposalDiff & { votes?: string[]; required_votes?: number } = event.data;
      setGhostSprouts((prev) => ({
        ...prev,
        [diff.proposal_id]: {
          ...diff,
          votes: diff.votes ?? [diff.author],
          requiredVotes: diff.required_votes ?? 3,
          isMerging: false
        }
      }));
    } else if (event.event === 'PROPOSAL_VOTED') {
      // Server-authoritative vote tally, broadcast to every attendee -- this is what makes
      // voting actually shared across browsers instead of a per-tab illusion.
      const { proposal_id, voter, merged } = event as any;
      setGhostSprouts((prev) => {
        const ghost = prev[proposal_id];
        if (!ghost) return prev;
        if (merged) {
          const next = { ...prev };
          delete next[proposal_id];
          return next;
        }
        const votes = ghost.votes.includes(voter) ? ghost.votes : [...ghost.votes, voter];
        return { ...prev, [proposal_id]: { ...ghost, votes } };
      });
    } else if (event.event === 'TREE_RESET' && event.data) {
      setTree(event.data);
      setGhostSprouts({});
      setSlateCards([]);
    }
  }, []);

  const { isConnected, lastStateHash, lastRevision } = useWebSocket(handleWsEvent);

  const fetchInitialTree = useCallback(async () => {
    try {
      setIsLoading(true);
      const [treeData, slatesData, proposalsData] = await Promise.all([
        getTree().catch((e) => { console.error(e); return null; }),
        getSpeechSlates().catch((e) => { console.error(e); return { cards: [] }; }),
        getPendingProposals().catch((e) => { console.error(e); return { proposals: [] }; })
      ]);
      if (treeData) setTree(treeData);
      if (slatesData && slatesData.cards) setSlateCards(slatesData.cards);
      // Rehydrate every still-pending proposal so a refresh or a newly-joined attendee
      // sees the exact same open ideas everyone else does -- nothing gets silently dropped.
      if (proposalsData && proposalsData.proposals) {
        const hydrated: Record<string, GhostSprout> = {};
        for (const p of proposalsData.proposals) {
          hydrated[p.proposal_id] = { ...p, votes: p.votes, requiredVotes: p.required_votes, isMerging: false };
        }
        setGhostSprouts(hydrated);
      }
    } catch (e) {
      console.error('Failed to load initial tree, slates & proposals:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialTree();
  }, [fetchInitialTree]);

  const stageProposal = useCallback(async (
    parentId: string,
    text: string,
    author: string,
    nodeType: NodeType = 'proposal'
  ) => {
    try {
      // Backend records the author's own approval vote and returns the real tally --
      // don't assume it client-side, since REQUIRED_VOTES and the author's vote are
      // both server state.
      const diff = await analyzeProposal(parentId, text, author, nodeType);
      const newGhost: GhostSprout = {
        ...diff,
        votes: diff.votes,
        requiredVotes: diff.required_votes,
        isMerging: false
      };
      setGhostSprouts((prev) => ({
        ...prev,
        [diff.proposal_id]: newGhost
      }));
      return newGhost;
    } catch (e) {
      console.error('Failed to stage proposal:', e);
      throw e;
    }
  }, []);

  const castVote = useCallback(async (proposalId: string, voterName: string) => {
    const ghost = ghostSprouts[proposalId];
    if (!ghost || ghost.isMerging || ghost.votes.includes(voterName)) return;

    setGhostSprouts((prev) => {
      const g = prev[proposalId];
      return g ? { ...prev, [proposalId]: { ...g, isMerging: true } } : prev;
    });

    try {
      // The backend is the sole authority on vote tally and on whether consensus was
      // reached: it persists the vote, and if this vote crosses REQUIRED_VOTES it merges
      // the proposal itself and broadcasts PROPOSAL_VOTED{merged:true} + TREE_MUTATED to
      // every attendee. We never decide to merge locally -- that's what let two browsers'
      // vote counts drift out of sync with each other.
      const result = await voteProposal(proposalId, voterName);
      setGhostSprouts((prev) => {
        const g = prev[proposalId];
        if (!g) return prev; // PROPOSAL_VOTED broadcast may have already removed it (merged)
        if (result.merged) {
          const next = { ...prev };
          delete next[proposalId];
          return next;
        }
        const votes = g.votes.includes(voterName) ? g.votes : [...g.votes, voterName];
        return { ...prev, [proposalId]: { ...g, votes, isMerging: false } };
      });
    } catch (e) {
      console.error('Failed to cast vote:', e);
      setGhostSprouts((prev) => {
        const g = prev[proposalId];
        return g ? { ...prev, [proposalId]: { ...g, isMerging: false } } : prev;
      });
    }
  }, [ghostSprouts]);

  const resetMeetingTree = useCallback(async (goalTitle: string) => {
    const data = await apiResetTree(goalTitle);
    setTree(data);
    setGhostSprouts({});
    setSelectedParentId(data.root_id || 'node_0000');
  }, []);

  return {
    tree,
    ghostSprouts: Object.values(ghostSprouts),
    slateCards,
    setSlateCards,
    selectedParentId,
    setSelectedParentId,
    stageProposal,
    castVote,
    resetMeetingTree,
    isConnected,
    lastStateHash: tree?.state_hash || lastStateHash,
    lastRevision: tree?.revision || lastRevision,
    isLoading
  };
}
