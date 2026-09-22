import React, { useMemo, useRef, useEffect, useState } from 'react';
import { TreeSnapshot, GhostSprout, IdeaNode, NodeType } from '../types/tree';
import {
  GitBranch,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  ThumbsUp,
  Scale,
  Sparkles,
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

// ── Layout constants ──────────────────────────────────────────────────────────
const NODE_W = 240;
const NODE_H = 96;
const COL_GAP = 32;   // horizontal gap between sibling branches
const ROW_GAP = 56;   // vertical gap between depth levels

interface LayoutNode {
  node: IdeaNode;
  x: number;  // centre-x of node card
  y: number;  // top-y of node card
  depth: number;
  lane: number;
}

/** DFS layout: assigns each node a lane (column) and depth (row). */
function buildLayout(tree: TreeSnapshot): LayoutNode[] {
  const rootId = tree.root_id || Object.keys(tree.nodes).find((id) => !tree.nodes[id].parent_id) || '';
  if (!rootId || !tree.nodes[rootId]) return [];

  const result: LayoutNode[] = [];
  let nextLane = 0;

  function dfs(id: string, depth: number): number {
    const node = tree.nodes[id];
    if (!node) return nextLane;

    const children = node.children_ids?.filter((cid) => tree.nodes[cid]) ?? [];

    if (children.length === 0) {
      // Leaf: occupies one lane
      const lane = nextLane++;
      result.push({ node, x: lane * (NODE_W + COL_GAP) + NODE_W / 2, y: depth * (NODE_H + ROW_GAP), depth, lane });
      return lane;
    }

    // Process children first to get their lanes
    const childLanes: number[] = children.map((cid) => dfs(cid, depth + 1));

    // Centre parent over its children
    const minLane = Math.min(...childLanes);
    const maxLane = Math.max(...childLanes);
    const centreX = ((minLane + maxLane) / 2) * (NODE_W + COL_GAP) + NODE_W / 2;
    result.push({ node, x: centreX, y: depth * (NODE_H + ROW_GAP), depth, lane: Math.round((minLane + maxLane) / 2) });

    return Math.round((minLane + maxLane) / 2);
  }

  dfs(rootId, 0);
  return result;
}

// ── Node colour helpers ───────────────────────────────────────────────────────
function nodeBorderColor(type: NodeType) {
  switch (type) {
    case 'goal':     return '#f59e0b';
    case 'proposal': return '#f97316';
    case 'claim':    return '#38bdf8';
    case 'question': return '#a78bfa';
    case 'action':   return '#34d399';
    case 'evidence': return '#60a5fa';
    default:         return '#94a3b8';
  }
}

function nodeBgClass(type: NodeType) {
  switch (type) {
    case 'goal':     return 'border-amber-400 bg-amber-500/10 text-amber-200';
    case 'proposal': return 'border-orange-400 bg-orange-500/10 text-orange-200';
    case 'claim':    return 'border-sky-400 bg-sky-500/10 text-sky-200';
    case 'question': return 'border-purple-400 bg-purple-500/10 text-purple-200';
    case 'action':   return 'border-emerald-400 bg-emerald-500/10 text-emerald-200';
    case 'evidence': return 'border-blue-400 bg-blue-500/10 text-blue-200';
    default:         return 'border-slate-400 bg-slate-500/10 text-slate-200';
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export const MainStage: React.FC<MainStageProps> = ({
  tree,
  ghostSprouts,
  selectedParentId,
  onSelectParent,
  onVote,
  onResetMeeting,
  onOpenAgenda,
  currentVoter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const layout = useMemo(() => (tree ? buildLayout(tree) : []), [tree]);

  const canvasW = useMemo(() => {
    if (layout.length === 0) return 600;
    return Math.max(...layout.map((l) => l.x + NODE_W / 2)) + COL_GAP;
  }, [layout]);

  const canvasH = useMemo(() => {
    if (layout.length === 0) return 400;
    return Math.max(...layout.map((l) => l.y + NODE_H)) + ROW_GAP;
  }, [layout]);

  const byId = useMemo(() => {
    const m: Record<string, LayoutNode> = {};
    layout.forEach((l) => (m[l.node.id] = l));
    return m;
  }, [layout]);

  // SVG connector paths: for each node, draw a Bezier from parent bottom-centre to child top-centre
  const connectorPaths = useMemo(() => {
    const paths: Array<{ d: string; color: string; key: string }> = [];
    layout.forEach((ln) => {
      const { node } = ln;
      const childIds = node.children_ids?.filter((cid) => byId[cid]) ?? [];
      childIds.forEach((cid) => {
        const child = byId[cid];
        if (!child) return;
        const x1 = ln.x;
        const y1 = ln.y + NODE_H;
        const x2 = child.x;
        const y2 = child.y;
        const midY = (y1 + y2) / 2;
        const d = `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;
        paths.push({ d, color: nodeBorderColor(child.node.node_type), key: `${node.id}->${cid}` });
      });
    });
    return paths;
  }, [layout, byId]);

  if (!tree) {
    return (
      <div className="flex-1 flex items-center justify-center bg-obsidian-950 text-slate-500 text-sm">
        Loading...
      </div>
    );
  }

  const rootNode = tree.nodes[tree.root_id || 'node_0000'];

  return (
    <div className="flex-1 flex flex-col h-full bg-obsidian-950 overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-obsidian-800/80 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-amber-400" />
            Arbor
          </h1>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-obsidian-800 text-slate-400 border border-obsidian-700">
            #{tree.revision}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-obsidian-800 text-slate-400 border border-obsidian-700">
            {Object.keys(tree.nodes).length} nodes
          </span>
        </div>

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

      {/* ── Agenda Banner ── */}
      {rootNode && (
        <div className="mx-4 mt-3 mb-2 p-3 rounded-xl bg-gradient-to-r from-sky-950/40 via-obsidian-900 to-obsidian-950 border border-sky-800/30 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider block">
                Deliberation Objective
              </span>
              <p className="text-xs font-medium text-slate-200 line-clamp-1">{rootNode.text}</p>
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

      {/* ── DAG Canvas (scrollable) ── */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4">
        <div
          style={{ position: 'relative', width: canvasW, height: canvasH + (ghostSprouts.length > 0 ? 260 : 0) }}
        >
          {/* SVG connector layer */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, width: canvasW, height: canvasH, pointerEvents: 'none', overflow: 'visible' }}
          >
            <defs>
              {connectorPaths.map((cp) => (
                <marker
                  key={`arrow-${cp.key}`}
                  id={`arrow-${cp.key}`}
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill={cp.color} opacity="0.7" />
                </marker>
              ))}
            </defs>
            {connectorPaths.map((cp) => (
              <path
                key={cp.key}
                d={cp.d}
                fill="none"
                stroke={cp.color}
                strokeWidth="1.5"
                strokeOpacity="0.55"
                strokeDasharray="none"
                markerEnd={`url(#arrow-${cp.key})`}
              />
            ))}
          </svg>

          {/* Tree nodes (absolutely positioned) */}
          {layout.map((ln) => {
            const { node } = ln;
            const isSelected = selectedParentId === node.id;
            const colorClass = nodeBgClass(node.node_type);
            const borderColor = nodeBorderColor(node.node_type);

            return (
              <div
                key={node.id}
                onClick={() => onSelectParent(node.id)}
                style={{
                  position: 'absolute',
                  left: ln.x - NODE_W / 2,
                  top: ln.y,
                  width: NODE_W,
                  height: NODE_H,
                }}
                className={`rounded-xl border-2 transition cursor-pointer select-none glass-card ${colorClass} ${
                  isSelected
                    ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-obsidian-950 scale-[1.03] z-10'
                    : 'hover:border-slate-400/60'
                }`}
              >
                <div className="p-2.5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-obsidian-900/80 border border-white/10 truncate max-w-[100px]">
                      {node.id}
                    </span>
                    <span
                      className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded"
                      style={{ background: `${borderColor}22`, color: borderColor }}
                    >
                      {node.node_type}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-100 leading-snug line-clamp-2 flex-1 my-1">
                    {node.text}
                  </p>

                  <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-white/5">
                    <span className="truncate max-w-[120px]">{node.author}</span>
                    <span className="font-mono text-[8px]">
                      {node.content_hash ? `#${node.content_hash.substring(0, 6)}` : ''}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-sky-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow z-20">
                    TARGET
                  </div>
                )}
              </div>
            );
          })}

          {/* Ghost Sprouts (proposals) rendered below the tree */}
          {ghostSprouts.length > 0 && (
            <div
              style={{ position: 'absolute', top: canvasH + 16, left: 0, width: Math.max(canvasW, 480) }}
            >
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
                          <span>
                            <b>{ghost.author}</b> • {ghost.parent_id}
                          </span>
                        </div>
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

                      <p className="text-sm font-semibold text-slate-100 mb-2">"{ghost.text}"</p>

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
                          {ghost.isMerging ? 'Merging...' : hasVoted ? 'Voted' : 'Approve'}
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
    </div>
  );
};
