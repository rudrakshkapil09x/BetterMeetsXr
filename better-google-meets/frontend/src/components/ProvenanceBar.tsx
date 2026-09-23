import React from 'react';
import { TreeSnapshot } from '../types/tree';
import { Download, Settings as SettingsIcon } from 'lucide-react';

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
    <footer className="h-9 bg-ink-950 border-t border-ink-700 px-4 flex items-center justify-between text-xs select-none z-20">
      {/* Left: Connection & Revision */}
      <div className="flex items-center gap-3">
        <span className={`flex items-center gap-1.5 ${isConnected ? 'text-merged' : 'text-conflict'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-merged' : 'bg-conflict'}`} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>

        <span className="text-ink-600">|</span>

        <span className="text-ash-400 font-mono text-[11px]">
          rev {revision}
        </span>
      </div>

      {/* Center: Hash */}
      <span className="font-mono text-ash-400 text-[11px]">
        {stateHash ? `#${stateHash}` : '…'}
      </span>

      {/* Right: Export & Settings */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleExportDRR}
          disabled={!tree}
          className="flex items-center gap-1 px-2.5 py-1 rounded border border-ink-600 text-ash-300 hover:text-[#e8e6e1] hover:border-ash-400 transition text-xs disabled:opacity-40"
          title="Export the tree as JSON"
        >
          <Download className="w-3 h-3" />
          Export
        </button>

        <button
          onClick={onOpenSettings}
          className="p-1 rounded text-ash-400 hover:text-[#e8e6e1] hover:bg-ink-800 transition"
          title="Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
