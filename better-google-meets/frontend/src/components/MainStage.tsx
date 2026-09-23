import React, { useMemo, useRef } from 'react';
import { TreeSnapshot, GhostSprout, IdeaNode, NodeType } from '../types/tree';
import { GitBranch, RotateCcw } from 'lucide-react';

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
const NODE_H = 92;
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
      const lane = nextLane++;
      result.push({ node, x: lane * (NODE_W + COL_GAP) + NODE_W / 2, y: depth * (NODE_H + ROW_GAP), depth, lane });
      return lane;
    }

    const childLanes: number[] = children.map((cid) => dfs(cid, depth + 1));

    const minLane = Math.min(...childLanes);
    const maxLane = Math.max(...childLanes);
    const centreX = ((minLane + maxLane) / 2) * (NODE_W + COL_GAP) + NODE_W / 2;
    result.push({ node, x: centreX, y: depth * (NODE_H + ROW_GAP), depth, lane: Math.round((minLane + maxLane) / 2) });

    return Math.round((minLane + maxLane) / 2);
  }

  dfs(rootId, 0);
  return result;
}

const NODE_TYPE_LABEL: Record<NodeType, string> = {
  goal: 'agenda',
  topic: 'topic',
  claim: 'claim',
  question: 'question',
  evidence: 'evidence',
  action: 'action',
  proposal: 'proposal',
};

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
    const paths: Array<{ d: string; key: string }> = [];
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
        paths.push({ d, key: `${node.id}->${cid}` });
      });
    });
    return paths;
  }, [layout, byId]);

  if (!tree) {
    return (
      <div className="flex-1 flex items-center justify-center bg-ink-950 text-ash-400 text-sm">
        Loading…
      </div>
    );
  }

  const rootNode = tree.nodes[tree.root_id || 'node_0000'];

  return (
    <div className="flex-1 flex flex-col h-full bg-ink-950 overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-ink-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-[#e8e6e1] flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-ash-300" />
            Arbor
          </h1>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ink-800 text-ash-400 border border-ink-600">
            rev {tree.revision}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ink-800 text-ash-400 border border-ink-600">
            {Object.keys(tree.nodes).length} nodes
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAgenda && (
            <button
              onClick={onOpenAgenda}
              className="px-2.5 py-1 text-xs text-ash-300 hover:text-[#e8e6e1] border border-ink-600 hover:border-ash-400 rounded transition"
            >
              Agenda
            </button>
          )}
          <button
            onClick={() => {
              const title = prompt('New agenda:', 'Discussion');
              if (title) onResetMeeting(title);
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-ash-300 hover:text-[#e8e6e1] border border-ink-600 hover:border-ash-400 rounded transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* ── Agenda Banner ── */}
      {rootNode && (
        <div className="mx-4 mt-3 mb-2 px-3 py-2.5 rounded border border-ink-600 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="min-w-0">
            <span className="text-[10px] text-ash-400 block">Agenda</span>
            <p className="text-xs font-medium text-[#e8e6e1] line-clamp-1">{rootNode.text}</p>
          </div>
          {onOpenAgenda && (
            <button
              onClick={onOpenAgenda}
              className="text-[11px] text-ash-400 hover:text-[#e8e6e1] flex-shrink-0 transition"
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
            {connectorPaths.map((cp) => (
              <path
                key={cp.key}
                d={cp.d}
                fill="none"
                stroke="#2a2c30"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Tree nodes (absolutely positioned) */}
          {layout.map((ln) => {
            const { node } = ln;
            const isSelected = selectedParentId === node.id;
            const isRoot = node.id === tree.root_id;

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
                className={`rounded border bg-ink-800 transition cursor-pointer select-none ${
                  isSelected ? 'border-[#e8e6e1]' : 'border-ink-600 hover:border-ash-400'
                } ${isRoot ? 'border-l-4' : ''}`}
              >
                <div className="p-2.5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1 gap-1">
                    <span className="text-[9px] font-mono text-ash-400 truncate">
                      {node.id}
                    </span>
                    <span className="text-[9px] font-mono text-ash-400 flex-shrink-0">
                      {NODE_TYPE_LABEL[node.node_type]}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-[#e8e6e1] leading-snug line-clamp-2 flex-1 my-1">
                    {node.text}
                  </p>

                  <div className="flex items-center justify-between text-[9px] text-ash-400 pt-1 border-t border-ink-700">
                    <span className="truncate max-w-[120px]">{node.author}</span>
                    <span className="font-mono text-[8px]">
                      {node.content_hash ? `#${node.content_hash.substring(0, 6)}` : ''}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-[#e8e6e1] text-ink-950 text-[9px] font-semibold px-1.5 py-0.5 rounded shadow z-20">
                    target
                  </div>
                )}
              </div>
            );
          })}

          {/* Ghost Sprouts (staged proposals awaiting votes) rendered below the tree */}
          {ghostSprouts.length > 0 && (
            <div
              style={{ position: 'absolute', top: canvasH + 16, left: 0, width: Math.max(canvasW, 480) }}
            >
              <h2 className="text-xs font-semibold text-[#e8e6e1] mb-3">
                Open proposals ({ghostSprouts.length})
              </h2>
              <div className="space-y-3">
                {ghostSprouts.map((ghost) => {
                  const voteCount = ghost.votes.length;
                  const hasVoted = ghost.votes.includes(currentVoter);
                  return (
                    <div
                      key={ghost.proposal_id}
                      className={`p-4 rounded border-2 border-dashed bg-ink-800 transition ${
                        ghost.has_conflict ? 'border-conflict' : 'border-pending'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 text-xs text-ash-300">
                          <span className="font-mono text-[10px] text-ash-400">
                            {ghost.proposal_id}
                          </span>
                          <span>
                            {ghost.author} → {ghost.parent_id}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            ghost.has_conflict ? 'text-conflict' : 'text-ash-400'
                          }`}
                        >
                          {ghost.has_conflict ? 'conflict' : `${(ghost.alignment_score * 100).toFixed(0)}% aligned`}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-[#e8e6e1] mb-2">{ghost.text}</p>

                      <div className="bg-ink-900 border border-ink-700 rounded p-2.5 text-xs mb-3">
                        <p className="text-ash-300 leading-relaxed">{ghost.trade_off_analysis}</p>
                        {ghost.has_conflict && (
                          <p className="text-conflict font-medium pt-1.5">
                            {ghost.conflict_reason}
                          </p>
                        )}
                      </div>

                      {ghost.compromise_synthesis && (
                        <div className="mb-3 bg-ink-900 border border-ink-700 rounded p-2.5 text-xs">
                          <span className="font-medium text-[#e8e6e1] mr-1">Suggested compromise:</span>
                          <span className="text-ash-300">{ghost.compromise_synthesis}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2.5 border-t border-ink-700 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: ghost.requiredVotes }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full border ${
                                  i < voteCount ? 'bg-pending border-pending' : 'border-ink-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-mono text-ash-300">
                            {voteCount}/{ghost.requiredVotes}
                          </span>
                          {ghost.votes.length > 0 && (
                            <span className="text-[10px] text-ash-400">
                              ({ghost.votes.join(', ')})
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onVote(ghost.proposal_id, currentVoter)}
                          disabled={hasVoted || ghost.isMerging}
                          className={`px-3 py-1.5 rounded text-xs font-medium border transition ${
                            hasVoted
                              ? 'text-ash-400 border-ink-600 cursor-not-allowed'
                              : 'text-[#e8e6e1] border-ash-400 hover:bg-ink-700'
                          }`}
                        >
                          {ghost.isMerging ? 'Merging…' : hasVoted ? 'Voted' : `Vote as ${currentVoter}`}
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
