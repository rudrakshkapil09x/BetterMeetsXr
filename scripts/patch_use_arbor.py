import os

path = os.path.join("better-google-meets", "frontend", "src", "hooks", "useArbor.ts")
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add seedDemoScenario to import
content = content.replace(
    "import { getTree, getSpeechSlates, getPendingProposals, analyzeProposal, voteProposal, resetTree as apiResetTree } from '../services/api';",
    "import { getTree, getSpeechSlates, getPendingProposals, analyzeProposal, voteProposal, resetTree as apiResetTree, seedDemoScenario } from '../services/api';"
)

# In fetchInitialTree, if tree has <= 1 node, auto-seed
old_fetch_body = '''      if (treeData) setTree(treeData);
      if (slatesData && slatesData.cards) setSlateCards(slatesData.cards);'''

new_fetch_body = '''      if (treeData && Object.keys(treeData.nodes || {}).length <= 1) {
        try {
          await seedDemoScenario();
          const [t, s, p] = await Promise.all([getTree(), getSpeechSlates(), getPendingProposals()]);
          if (t) setTree(t);
          if (s?.cards) setSlateCards(s.cards);
          if (p?.proposals) {
            const hydrated: Record<string, GhostSprout> = {};
            for (const item of p.proposals) {
              hydrated[item.proposal_id] = { ...item, votes: item.votes, requiredVotes: item.required_votes, isMerging: false };
            }
            setGhostSprouts(hydrated);
          }
          return;
        } catch (err) {
          console.warn('Auto-seed fallback error:', err);
        }
      }
      if (treeData) setTree(treeData);
      if (slatesData && slatesData.cards) setSlateCards(slatesData.cards);'''

content = content.replace(old_fetch_body, new_fetch_body)

# Add seedScenario callback and return it
old_return = '''  return {
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
  };'''

new_return = '''  const seedScenario = useCallback(async () => {
    setIsLoading(true);
    try {
      await seedDemoScenario();
      await fetchInitialTree();
    } catch (e) {
      console.error('Seed scenario error:', e);
    } finally {
      setIsLoading(false);
    }
  }, [fetchInitialTree]);

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
    seedScenario,
    refreshTree: fetchInitialTree,
    isConnected,
    lastStateHash: tree?.state_hash || lastStateHash,
    lastRevision: tree?.revision || lastRevision,
    isLoading
  };'''

content = content.replace(old_return, new_return)

with open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)
print("Successfully patched useArbor.ts")
