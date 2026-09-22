import { useState, useEffect, useCallback } from 'react';
import { TreeSnapshot, GhostSprout, IdeaNode, ProposalDiff, NodeType, SlateCard } from '../types/tree';
import { getTree, getSpeechSlates, analyzeProposal, mergeProposal, resetTree as apiResetTree } from '../services/api';
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
      const diff: ProposalDiff = event.data;
      setGhostSprouts((prev) => ({
        ...prev,
        [diff.proposal_id]: {
          ...diff,
          votes: [diff.author], // Proposer votes by default
          requiredVotes: 3,
          isMerging: false
        }
      }));
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
      const [treeData, slatesData] = await Promise.all([
        getTree().catch((e) => { console.error(e); return null; }),
        getSpeechSlates().catch((e) => { console.error(e); return { cards: [] }; })
      ]);
      if (treeData) setTree(treeData);
      if (slatesData && slatesData.cards) setSlateCards(slatesData.cards);
    } catch (e) {
      console.error('Failed to load initial tree & slates:', e);
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
      const diff = await analyzeProposal(parentId, text, author, nodeType);
      const newGhost: GhostSprout = {
        ...diff,
        votes: [author],
        requiredVotes: 3,
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
    if (!ghost || ghost.isMerging) return;

    const currentVotes = new Set(ghost.votes);
    currentVotes.add(voterName);
    const updatedVotes = Array.from(currentVotes);

    // If consensus threshold reached (e.g. 3 votes)
    if (updatedVotes.length >= ghost.requiredVotes) {
      setGhostSprouts((prev) => ({
        ...prev,
        [proposalId]: { ...ghost, votes: updatedVotes, isMerging: true }
      }));

      try {
        await mergeProposal(
          ghost.proposal_id,
          ghost.parent_id,
          ghost.text,
          ghost.author,
          ghost.node_type
        );
      } catch (e) {
        console.error('Failed to merge proposal upon consensus:', e);
        setGhostSprouts((prev) => ({
          ...prev,
          [proposalId]: { ...ghost, votes: updatedVotes, isMerging: false }
        }));
      }
    } else {
      setGhostSprouts((prev) => ({
        ...prev,
        [proposalId]: { ...ghost, votes: updatedVotes }
      }));
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
