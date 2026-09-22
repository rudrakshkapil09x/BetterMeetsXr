import React, { useState } from 'react';
import { SlateCard, NodeType } from '../types/tree';
import { ingestSpeech, transformCard } from '../services/api';
import { 
  Sparkles, 
  Send, 
  Minimize2, 
  Maximize2, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  FileText, 
  Activity,
  Mic,
  MicOff,
  CornerDownRight
} from 'lucide-react';

interface SidePanelProps {
  currentSpeaker: string;
  setCurrentSpeaker: (name: string) => void;
  targetParentId: string;
  onStageCard: (card: SlateCard, targetParentId: string) => Promise<void>;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  currentSpeaker,
  setCurrentSpeaker,
  targetParentId,
  onStageCard
}) => {
  const [cards, setCards] = useState<SlateCard[]>([
    {
      id: 'card_demo_1',
      speaker: 'You',
      rawText: 'We should deploy regional Redis clusters with 15ms cache SLA',
      distilledText: 'Deploy regional Redis clusters to guarantee 15ms SLA',
      intent: 'proposal',
      createdAt: Date.now() - 60000,
      isStaged: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleIngest = async (textToIngest?: string) => {
    const text = textToIngest || inputText;
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const resp = await ingestSpeech(currentSpeaker, text);
      const newCard: SlateCard = {
        id: `card_${Date.now()}`,
        speaker: currentSpeaker,
        rawText: text,
        distilledText: resp.card.distilled_text,
        intent: resp.card.intent,
        createdAt: Date.now(),
        isStaged: false
      };
      setCards((prev) => [newCard, ...prev]);
      if (!textToIngest) setInputText('');
    } catch (e) {
      console.error('Failed to ingest speech card:', e);
      // Local fallback card
      const fallback: SlateCard = {
        id: `card_${Date.now()}`,
        speaker: currentSpeaker,
        rawText: text,
        distilledText: text,
        intent: 'claim',
        createdAt: Date.now(),
        isStaged: false
      };
      setCards((prev) => [fallback, ...prev]);
      if (!textToIngest) setInputText('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTexterialAction = async (cardId: string, action: 'knead' | 'stretch') => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;

    try {
      const resp = await transformCard(card.distilledText, action);
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, distilledText: resp.transformed } : c))
      );
    } catch (e) {
      console.error(`Failed Texterial ${action}:`, e);
    }
  };

  const handleStage = async (card: SlateCard) => {
    try {
      await onStageCard(card, targetParentId);
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, isStaged: true } : c))
      );
    } catch (e) {
      console.error('Stage card failed:', e);
    }
  };

  const getIntentStyle = (intent: NodeType) => {
    switch (intent) {
      case 'proposal':
        return { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Lightbulb, accent: 'border-l-amber-400' };
      case 'question':
        return { badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40', icon: HelpCircle, accent: 'border-l-purple-400' };
      case 'action':
        return { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: CheckCircle2, accent: 'border-l-emerald-400' };
      case 'evidence':
        return { badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: Activity, accent: 'border-l-blue-400' };
      case 'claim':
      default:
        return { badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40', icon: FileText, accent: 'border-l-sky-400' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-obsidian-900 border-r border-obsidian-700/60 p-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-obsidian-700/60">
        <div>
          <h2 className="text-sm font-semibold tracking-wider text-slate-200 uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Personal Slate
          </h2>
          <p className="text-xs text-slate-400">Private Upwelling Draft Layer</p>
        </div>

        {/* Speaker Picker */}
        <select
          value={currentSpeaker}
          onChange={(e) => setCurrentSpeaker(e.target.value)}
          className="bg-obsidian-800 text-xs font-medium text-slate-200 border border-obsidian-600 rounded px-2.5 py-1 focus:outline-none focus:border-amber-400 transition"
        >
          <option value="You">You (Proposer)</option>
          <option value="Alice">Alice (Architect)</option>
          <option value="Bob">Bob (Security)</option>
          <option value="Charlie">Charlie (Engineering)</option>
        </select>
      </div>

      {/* Input Box / Speech Ingestion */}
      <div className="my-3 space-y-2">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleIngest();
              }
            }}
            placeholder="Type a thought, claim, or proposal..."
            rows={2}
            className="w-full bg-obsidian-950 border border-obsidian-700 rounded-lg p-2.5 pr-20 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 resize-none transition"
          />
          <div className="absolute right-2 bottom-2.5 flex items-center gap-1.5">
            <button
              onClick={() => setIsRecording(!isRecording)}
              title={isRecording ? 'Mute Mic' : 'Dictate Thought'}
              className={`p-1.5 rounded-md text-xs transition ${
                isRecording
                  ? 'bg-red-500/30 text-red-300 border border-red-500/50 animate-pulse'
                  : 'bg-obsidian-800 text-slate-400 hover:text-slate-200 border border-obsidian-700'
              }`}
            >
              {isRecording ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => handleIngest()}
              disabled={isProcessing || !inputText.trim()}
              className="bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white p-1.5 rounded-md text-xs transition shadow"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Presets for Demo / Testing */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px] text-slate-400">
          <span className="text-slate-500 shrink-0 self-center">Presets:</span>
          <button
            onClick={() => handleIngest('Deploy regional Redis clusters to guarantee sub-15ms SLA')}
            className="px-2 py-0.5 rounded bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-700 text-amber-300 shrink-0 transition"
          >
            + Redis SLA
          </button>
          <button
            onClick={() => handleIngest('Zero budget allocated for dedicated multi-region cache')}
            className="px-2 py-0.5 rounded bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-700 text-red-300 shrink-0 transition"
          >
            + Zero Budget (Conflict)
          </button>
          <button
            onClick={() => handleIngest('Conduct cold cache failover benchmark by Friday')}
            className="px-2 py-0.5 rounded bg-obsidian-800 hover:bg-obsidian-700 border border-obsidian-700 text-emerald-300 shrink-0 transition"
          >
            + Bench Action
          </button>
        </div>
      </div>

      {/* Cards Stream */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {cards.map((card) => {
          const style = getIntentStyle(card.intent);
          const Icon = style.icon;

          return (
            <div
              key={card.id}
              className={`glass-card rounded-lg p-3 border-l-4 ${style.accent} flex flex-col justify-between space-y-2 transition hover:border-slate-500/40`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${style.badge} flex items-center gap-1`}>
                    <Icon className="w-2.5 h-2.5" />
                    {card.intent.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{card.speaker}</span>
                </div>
                {card.isStaged && (
                  <span className="text-[10px] text-amber-400/80 font-mono tracking-wide">
                    STAGED ◌
                  </span>
                )}
              </div>

              {/* Distilled Text */}
              <p className="text-xs text-slate-100 font-medium leading-relaxed">
                {card.distilledText}
              </p>

              {/* Texterial Operations & Stage Button */}
              <div className="flex items-center justify-between pt-1 border-t border-obsidian-800/80 text-[11px]">
                {/* Texterial: Knead & Stretch */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTexterialAction(card.id, 'knead')}
                    title="Knead: Condense into executive one-liner"
                    className="flex items-center gap-1 px-1.5 py-0.5 text-slate-400 hover:text-amber-300 rounded hover:bg-obsidian-800 transition"
                  >
                    <Minimize2 className="w-3 h-3" />
                    Knead
                  </button>
                  <button
                    onClick={() => handleTexterialAction(card.id, 'stretch')}
                    title="Stretch: Elaborate with implementation details"
                    className="flex items-center gap-1 px-1.5 py-0.5 text-slate-400 hover:text-sky-300 rounded hover:bg-obsidian-800 transition"
                  >
                    <Maximize2 className="w-3 h-3" />
                    Stretch
                  </button>
                </div>

                {/* Stage to Arbor */}
                <button
                  onClick={() => handleStage(card)}
                  disabled={card.isStaged}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition shadow-sm ${
                    card.isStaged
                      ? 'bg-obsidian-800 text-slate-500 cursor-not-allowed'
                      : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 hover:border-amber-400'
                  }`}
                >
                  <CornerDownRight className="w-3 h-3" />
                  {card.isStaged ? 'Staged' : 'Stage to Arbor'}
                </button>
              </div>
            </div>
          );
        })}

        {cards.length === 0 && (
          <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-xs text-center p-4">
            <p>Your personal slate is empty.</p>
            <p className="text-[11px] text-slate-600 mt-1">Speak or type above to formulate private thoughts.</p>
          </div>
        )}
      </div>

      {/* Staging Target Indicator */}
      <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-obsidian-800">
        <span>Staging target:</span>
        <span className="font-mono text-amber-300 bg-obsidian-950 px-2 py-0.5 rounded border border-obsidian-700">
          {targetParentId}
        </span>
      </div>
    </div>
  );
};
