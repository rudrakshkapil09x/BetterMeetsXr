import React from 'react';
import { TreeSnapshot, GhostSprout, IdeaNode, NodeType } from '../types/tree';
import { 
  GitBranch, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw, 
  ThumbsUp, 
  Layers, 
  Scale, 
  Sparkles,
  ChevronRight,
  Target
} from 'lucide-react';

interface MainStageProps {
  tree: TreeSnapshot | null;
  ghostSprouts: GhostSprout[];
  selectedParentId: string;
  onSelectParent: (id: string) => void;
  onVote: (proposalId: string, voterName: string) => void;
  onResetMeeting: (goalTitle: string) => void;
  onOpenAgenda?: () => void;
  currentVoter: string;
}

export const MainStage: React.FC<MainStageProps> = ({
  tree,
  ghostSprouts,
  selectedParentId,
  onSelectParent,
  onVote,
  onResetMeeting,
  onOpenAgenda,
  currentVoter
}) => {
  if (!tree) {
    return (
      <div className="flex-1 flex items-center justify-center bg-obsidian-950 text-slate-500 text-sm">
        Loading...
      </div>
    );
  }

  const nodes = Object.values(tree.nodes);

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case 'goal': return 'border-amber-400 bg-amber-500/10 text-amber-300';
      case 'proposal': return 'border-amber-500 bg-amber-500/10 text-amber-200';
      case 'claim': return 'border-sky-400 bg-sky-500/10 text-sky-200';
      case 'question': return 'border-purple-400 bg-purple-500/10 text-purple-200';
      case 'action': return 'border-emerald-400 bg-emerald-500/10 text-emerald-200';
      case 'evidence': return 'border-blue-400 bg-blue-500/10 text-blue-200';
      default: return 'border-slate-400 bg-slate-500/10 text-slate-200';
    }
  };

  const rootNode = tree.nodes[tree.root_id || 'node_0000'];

  return (
    <div className="flex-1 flex flex-col h-full bg-obsidian-950 p-4 md:p-6 overflow-y-auto select-none">
      {/* Stage Header */}
      <div className="flex items-center justify-between pb-3 border-b border-obsidian-800/80 mb-3">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-amber-400" />
            Arbor
          </h1>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-obsidian-800 text-slate-400 border border-obsidian-700">
            #{tree.revision}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onOpenAgenda && (
            <button
              onClick={onOpenAgenda}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-700/50 rounded-lg transition"
            >
              <Target className="w-3 h-3 text-amber-400" />
              Agenda
            </button>
          )}
          <button
            onClick={() => {
              const title = prompt('Goal:', 'Discussion');
              if (title) onResetMeeting(title);
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 bg-obsidian-900 hover:bg-obsidian-800 border border-obsidian-700 rounded-lg transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Active Agenda Banner */}
      {rootNode && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-sky-950/40 via-obsidian-900 to-obsidian-950 border border-sky-800/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider block">
                Deliberation Objective
              </span>
              <p className="text-xs font-medium text-slate-200 line-clamp-1">
                {rootNode.text}
              </p>
            </div>
          </div>
          {onOpenAgenda && (
            <button
              onClick={onOpenAgenda}
              className="text-[11px] text-slate-400 hover:text-sky-300 underline underline-offset-2 flex-shrink-0 transition"
            >
              Change
            </button>
          )}
        </div>
      )}

      {/* Interactive Tree View */}
      <div className="flex-1 space-y-5">
        {/* Canonical Tree Nodes Section */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Nodes ({nodes.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map((node) => {
              const isSelected = selectedParentId === node.id;
              const colorClasses = getNodeColor(node.node_type);

              return (
                <div
                  key={node.id}
                  onClick={() => onSelectParent(node.id)}
                  className={`relative p-4 rounded-xl border-2 transition cursor-pointer glass-card ${colorClasses} ${
                    isSelected
                      ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-obsidian-950 scale-[1.02]'
                      : 'hover:border-slate-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-900/80 border border-white/10">
                        {node.id}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider">
                        {node.node_type}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{node.author}</span>
                  </div>

                  <p className="text-sm font-medium text-slate-100 leading-snug mb-2">
                    {node.text}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/5">
                    <span>Parent: {node.parent_id || 'None (Root)'}</span>
                    <span className="font-mono text-[9px] text-slate-500">
                      {node.content_hash ? `#${node.content_hash.substring(0, 8)}` : ''}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-sky-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                      TARGET
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ghost Sprouts & Active Deliberation Branch Section */}
        {ghostSprouts.length > 0 && (
          <div className="mt-6 pt-4 border-t border-obsidian-800">
            <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Proposals ({ghostSprouts.length})
            </h2>

            <div className="space-y-3">
              {ghostSprouts.map((ghost) => {
                const voteCount = ghost.votes.length;
                const hasVoted = ghost.votes.includes(currentVoter);

                return (
                  <div
                    key={ghost.proposal_id}
                    className="p-4 rounded-xl border-2 border-dashed border-amber-400/80 bg-amber-500/5 glass-panel shadow-lg transition"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {ghost.proposal_id}
                        </span>
                        <span><b>{ghost.author}</b> • {ghost.parent_id}</span>
                      </div>

                      {/* Alignment Badge */}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                          ghost.has_conflict
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {ghost.has_conflict ? 'Conflict' : `${(ghost.alignment_score * 100).toFixed(0)}% Match`}
                      </span>
                    </div>

                    {/* Proposal Text */}
                    <p className="text-sm font-semibold text-slate-100 mb-2">
                      "{ghost.text}"
                    </p>

                    {/* Trade-off */}
                    <div className="bg-obsidian-900/90 border border-obsidian-700/80 rounded-lg p-2.5 text-xs space-y-1 mb-3">
                      <div className="flex items-start gap-2 text-slate-300">
                        <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{ghost.trade_off_analysis}</p>
                      </div>
                      {ghost.has_conflict && (
                        <p className="text-red-300 font-medium flex items-center gap-1.5 pt-0.5">
                          <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                          {ghost.conflict_reason}
                        </p>
                      )}
                    </div>

                    {/* Synthesis Banner */}
                    {ghost.compromise_synthesis && (
                      <div className="mb-3 bg-purple-950/40 border border-purple-500/40 rounded-lg p-2.5 text-xs">
                        <div className="flex items-start gap-1.5 text-purple-200">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-purple-300 mr-1">Synthesis:</span>
                            <span className="italic">"{ghost.compromise_synthesis}"</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Consensus Voting Footer */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: ghost.requiredVotes }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full border transition ${
                                i < voteCount
                                  ? 'bg-amber-400 border-amber-300'
                                  : 'bg-obsidian-800 border-obsidian-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-amber-300">
                          {voteCount}/{ghost.requiredVotes}
                        </span>
                        {ghost.votes.length > 0 && (
                          <span className="text-[10px] text-slate-500">
                            ({ghost.votes.join(', ')})
                          </span>
                        )}
                      </div>

                      {/* Vote Button */}
                      <button
                        onClick={() => onVote(ghost.proposal_id, currentVoter)}
                        disabled={hasVoted || ghost.isMerging}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow ${
                          hasVoted
                            ? 'bg-obsidian-800 text-slate-500 border border-obsidian-700 cursor-not-allowed'
                            : 'bg-amber-500 hover:bg-amber-400 text-obsidian-950'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {ghost.isMerging
                          ? 'Merging...'
                          : hasVoted
                          ? 'Voted'
                          : 'Approve'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
