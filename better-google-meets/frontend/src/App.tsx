import React, { useState, useEffect } from 'react';
import { useArbor } from './hooks/useArbor';
import { SidePanel } from './components/SidePanel';
import { MainStage } from './components/MainStage';
import { ProvenanceBar } from './components/ProvenanceBar';
import { SettingsModal } from './components/SettingsModal';
import { initializeMeetSdk, MeetSessionContext } from './services/meetSdk';
import { SlateCard } from './types/tree';
import { Layout, Columns, Square, Maximize2 } from 'lucide-react';

export const App: React.FC = () => {
  const [sessionCtx, setSessionCtx] = useState<MeetSessionContext | null>(null);
  const [viewMode, setViewMode] = useState<'dual' | 'sidePanel' | 'mainStage'>('dual');
  const [currentSpeaker, setCurrentSpeaker] = useState<string>('You');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const {
    tree,
    ghostSprouts,
    selectedParentId,
    setSelectedParentId,
    stageProposal,
    castVote,
    resetMeetingTree,
    isConnected,
    lastStateHash,
    lastRevision,
    isLoading
  } = useArbor();

  useEffect(() => {
    initializeMeetSdk().then((ctx) => {
      setSessionCtx(ctx);
      if (ctx.mode === 'sidePanel') setViewMode('sidePanel');
      else if (ctx.mode === 'mainStage') setViewMode('mainStage');
    });
  }, []);

  const handleStageCard = async (card: SlateCard, targetParentId: string) => {
    await stageProposal(targetParentId, card.distilledText, card.speaker, card.intent);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-obsidian-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-12 bg-obsidian-900 border-b border-obsidian-800/90 px-4 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-sky-400 flex items-center justify-center font-bold text-obsidian-950 text-sm shadow">
            BM
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-tight text-slate-100 flex items-center gap-2">
              BetterGoogleMeets
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                v2.0
              </span>
            </h1>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-obsidian-950 border border-obsidian-800 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setViewMode('dual')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
              viewMode === 'dual'
                ? 'bg-obsidian-800 text-sky-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            Dual Stage
          </button>
          <button
            onClick={() => setViewMode('sidePanel')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
              viewMode === 'sidePanel'
                ? 'bg-obsidian-800 text-sky-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Square className="w-3.5 h-3.5" />
            Meet Side Panel
          </button>
          <button
            onClick={() => setViewMode('mainStage')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
              viewMode === 'mainStage'
                ? 'bg-obsidian-800 text-sky-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Meet Main Stage
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Side Panel (Private Upwelling Slate) */}
        {(viewMode === 'dual' || viewMode === 'sidePanel') && (
          <div className={viewMode === 'dual' ? 'w-80 md:w-96 flex-shrink-0' : 'w-full'}>
            <SidePanel
              currentSpeaker={currentSpeaker}
              setCurrentSpeaker={setCurrentSpeaker}
              targetParentId={selectedParentId}
              onStageCard={handleStageCard}
            />
          </div>
        )}

        {/* Main Stage (Shared Merkle Arbor Canvas) */}
        {(viewMode === 'dual' || viewMode === 'mainStage') && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <MainStage
              tree={tree}
              ghostSprouts={ghostSprouts}
              selectedParentId={selectedParentId}
              onSelectParent={setSelectedParentId}
              onVote={castVote}
              onResetMeeting={resetMeetingTree}
              currentVoter={currentSpeaker}
            />
          </div>
        )}
      </main>

      {/* Bottom Provenance Bar */}
      <ProvenanceBar
        stateHash={lastStateHash}
        revision={lastRevision}
        isConnected={isConnected}
        tree={tree}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
