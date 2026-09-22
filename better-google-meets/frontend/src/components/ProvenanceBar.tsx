import React from 'react';
import { TreeSnapshot } from '../types/tree';
import { ShieldCheck, Download, Settings as SettingsIcon, Wifi, WifiOff } from 'lucide-react';

interface ProvenanceBarProps {
  stateHash: string;
  revision: number;
  isConnected: boolean;
  tree: TreeSnapshot | null;
  onOpenSettings: () => void;
}

export const ProvenanceBar: React.FC<ProvenanceBarProps> = ({
  stateHash,
  revision,
  isConnected,
  tree,
  onOpenSettings
}) => {
  const handleExportDRR = () => {
    if (!tree) return;
    const payload = JSON.stringify(tree, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-drr-rev${revision}-${stateHash.substring(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="h-11 bg-obsidian-950 border-t border-obsidian-800/80 px-4 flex items-center justify-between text-xs select-none z-20">
      {/* Left: Connection & Revision */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {isConnected ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Disconnected
            </span>
          )}
        </div>

        <span className="text-slate-600">|</span>

        <span className="text-slate-400">
          State Revision: <b className="text-slate-200 font-mono">#{revision}</b>
        </span>
      </div>

      {/* Center: Merkle State Hash */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-slate-400">Merkle Root Hash:</span>
        <span className="font-mono text-amber-300 bg-obsidian-900 px-2 py-0.5 rounded border border-obsidian-700 tracking-wider">
          {stateHash ? `#${stateHash}` : 'COMPUTING...'}
        </span>
      </div>

      {/* Right: Export DRR & Settings */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleExportDRR}
          disabled={!tree}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 hover:text-white border border-obsidian-700 transition"
          title="Download Immutable Decision Rationale Record"
        >
          <Download className="w-3 h-3 text-sky-400" />
          Export DRR
        </button>

        <button
          onClick={onOpenSettings}
          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-obsidian-800 transition"
          title="Configure LLM Engines"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
