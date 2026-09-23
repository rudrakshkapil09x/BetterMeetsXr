import React, { useState, useEffect } from 'react';
import { useArbor } from './hooks/useArbor';
import { SidePanel } from './components/SidePanel';
import { MainStage } from './components/MainStage';
import { ProvenanceBar } from './components/ProvenanceBar';
import { SettingsModal } from './components/SettingsModal';
import { AgendaModal } from './components/AgendaModal';
import { initializeMeetSdk, MeetSessionContext } from './services/meetSdk';
import { setMeetingAgenda } from './services/api';
import { SlateCard } from './types/tree';
import { Columns, Square, Maximize2 } from 'lucide-react';

export const App: React.FC = () => {
  const [sessionCtx, setSessionCtx] = useState<MeetSessionContext | null>(null);
  const [viewMode, setViewMode] = useState<'dual' | 'sidePanel' | 'mainStage'>('dual');
  const [currentSpeaker, setCurrentSpeaker] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('user') || 'You';
    }
    return 'You';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAgendaOpen, setIsAgendaOpen] = useState<boolean>(false);
  const [hasPromptedAgenda, setHasPromptedAgenda] = useState<boolean>(false);

  const {
    tree,
    ghostSprouts,
    slateCards,
    setSlateCards,
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

  const rootGoalText = tree?.nodes[tree.root_id || 'node_0000']?.text || '';

  // Prompt the user for the meeting agenda/motive if not configured yet
  useEffect(() => {
    if (tree && !hasPromptedAgenda) {
      if (rootGoalText === 'Discussion' || !rootGoalText) {
        setIsAgendaOpen(true);
      }
      setHasPromptedAgenda(true);
    }
  }, [tree, rootGoalText, hasPromptedAgenda]);

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

  const handleSaveAgenda = async (newAgenda: string) => {
    await setMeetingAgenda(newAgenda);
    if (resetMeetingTree) {
      await resetMeetingTree(newAgenda);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-ink-950 text-[#e8e6e1] overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-10 bg-ink-900 border-b border-ink-700 px-3 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-xs font-semibold tracking-tight text-[#e8e6e1] flex-shrink-0">
            BetterMeets
          </h1>
          <button
            onClick={() => setIsAgendaOpen(true)}
            className="hidden sm:block px-2 py-0.5 rounded border border-ink-600 text-[11px] text-ash-300 hover:text-[#e8e6e1] hover:border-ash-400 transition max-w-[240px] truncate text-left"
            title="Meeting agenda (click to edit)"
          >
            {rootGoalText || 'Set agenda'}
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center border border-ink-600 rounded p-0.5 text-xs">
          <button
            onClick={() => setViewMode('dual')}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${
              viewMode === 'dual'
                ? 'bg-ink-700 text-[#e8e6e1] font-medium'
                : 'text-ash-400 hover:text-ash-300'
            }`}
          >
            <Columns className="w-3 h-3" />
            Split
          </button>
          <button
            onClick={() => setViewMode('sidePanel')}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${
              viewMode === 'sidePanel'
                ? 'bg-ink-700 text-[#e8e6e1] font-medium'
                : 'text-ash-400 hover:text-ash-300'
            }`}
          >
            <Square className="w-3 h-3" />
            Slate
          </button>
          <button
            onClick={() => setViewMode('mainStage')}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${
              viewMode === 'mainStage'
                ? 'bg-ink-700 text-[#e8e6e1] font-medium'
                : 'text-ash-400 hover:text-ash-300'
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            Tree
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
              cards={slateCards}
              setCards={setSlateCards}
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
              onOpenAgenda={() => setIsAgendaOpen(true)}
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

      {/* Agenda & Motive Modal */}
      <AgendaModal
        isOpen={isAgendaOpen}
        currentAgenda={rootGoalText}
        onSave={handleSaveAgenda}
        onClose={() => setIsAgendaOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
