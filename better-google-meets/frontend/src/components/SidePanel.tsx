import React, { useState, useEffect } from 'react';
import { SlateCard, NodeType } from '../types/tree';
import { ingestSpeech, transformCard, extractBatchIdeas } from '../services/api';
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
  CornerDownRight,
  Clock
} from 'lucide-react';

interface SidePanelProps {
  currentSpeaker: string;
  setCurrentSpeaker: (name: string) => void;
  targetParentId: string;
  cards: SlateCard[];
  setCards: React.Dispatch<React.SetStateAction<SlateCard[]>>;
  onStageCard: (card: SlateCard, targetParentId: string) => Promise<void>;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  currentSpeaker,
  setCurrentSpeaker,
  targetParentId,
  cards,
  setCards,
  onStageCard
}) => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [secondsToNextBatch, setSecondsToNextBatch] = useState(1800); // 30 minutes
  const [isExtractingBatch, setIsExtractingBatch] = useState(false);
  const recognitionRef = React.useRef<any>(null);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleBatchExtract = async (forceAll: boolean = false) => {
    if (isExtractingBatch) return;
    setIsExtractingBatch(true);
    try {
      const resp = await extractBatchIdeas(forceAll);
      if (resp && resp.ideas && resp.ideas.length > 0) {
        setCards((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const newOnes = resp.ideas.filter((c) => !existingIds.has(c.id));
          return [...newOnes, ...prev];
        });
      }
      setSecondsToNextBatch(1800);
    } catch (e) {
      console.error('Batch idea extraction error:', e);
    } finally {
      setIsExtractingBatch(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsToNextBatch((prev) => {
        if (prev <= 1) {
          handleBatchExtract(false);
          return 1800;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleRecording = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Web Speech API is not supported in this browser. Please type your thoughts or use Google Meet captions.");
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsRecording(false);
    }
  };

  const handleIngest = async (textToIngest?: string) => {
    const text = textToIngest || inputText;
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const resp = await ingestSpeech(currentSpeaker, text);
      if (resp.status === 'ignored_noise') {
        console.log('[SidePanel] Noise filtered by epistemic layer:', resp.reason);
        if (!textToIngest) setInputText('');
        return;
      }
      if (resp.card) {
        const newCard: SlateCard = {
          id: resp.card_id || `card_${Date.now()}`,
          speaker: resp.speaker || currentSpeaker,
          rawText: text,
          distilledText: resp.card.distilled_text,
          intent: resp.card.intent,
          extractedQuery: resp.extracted_query || resp.card.extracted_query || '',
          createdAt: Date.now(),
          isStaged: false
        };
        setCards((prev) => [newCard, ...prev.filter(c => c.id !== newCard.id)]);
        if (!textToIngest) setInputText('');
      }
    } catch (e) {
      console.error('Failed to ingest speech card via LLM:', e);
      // Universal policy: zero heuristic proxies or fallbacks.
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
      <div className="flex items-center justify-between pb-2 border-b border-obsidian-700/60">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold tracking-wider text-slate-200 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Slate
          </h2>
          <button
            onClick={() => handleBatchExtract(true)}
            disabled={isExtractingBatch}
            title="Extract substantive ideas from conversation transcripts (Auto-runs every 30m)"
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-obsidian-800 text-amber-300 hover:bg-obsidian-700 border border-obsidian-700 transition disabled:opacity-50"
          >
            <Sparkles className={`w-2.5 h-2.5 ${isExtractingBatch ? 'animate-spin' : ''}`} />
            {isExtractingBatch ? 'Extracting...' : `30m (${formatTimer(secondsToNextBatch)})`}
          </button>
        </div>

        {/* Speaker Picker */}
        <select
          value={currentSpeaker}
          onChange={(e) => setCurrentSpeaker(e.target.value)}
          className="bg-obsidian-800 text-xs font-medium text-slate-200 border border-obsidian-600 rounded px-2 py-0.5 focus:outline-none focus:border-amber-400 transition max-w-[140px] truncate"
        >
          {Array.from(
            new Set([
              currentSpeaker,
              'You',
              'Alice',
              'Bob',
              'Charlie',
              ...cards.map((c) => c.speaker).filter((s) => s && s !== 'Participant')
            ])
          ).map((spk) => (
            <option key={spk} value={spk}>{spk}</option>
          ))}
        </select>
      </div>

      {/* Input Box / Speech Ingestion */}
      <div className="my-2.5">
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
            placeholder="Type or speak..."
            rows={2}
            className="w-full bg-obsidian-950 border border-obsidian-700 rounded-lg p-2.5 pr-18 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 resize-none transition"
          />
          <div className="absolute right-2 bottom-2.5 flex items-center gap-1.5">
            <button
              onClick={toggleRecording}
              title={isRecording ? 'Listening...' : 'Mic'}
              className={`p-1.5 rounded-md text-xs transition ${
                isRecording
                  ? 'bg-red-500/30 text-red-300 border border-red-500/50 animate-pulse'
                  : 'bg-obsidian-800 text-slate-400 hover:text-slate-200 border border-obsidian-700'
              }`}
            >
              {isRecording ? <Mic className="w-3.5 h-3.5 text-red-400" /> : <MicOff className="w-3.5 h-3.5" />}
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
      </div>

      {/* Cards Stream */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center p-4 rounded-lg border border-dashed border-obsidian-800 text-slate-500">
            <p className="text-xs text-slate-500">No notes yet</p>
          </div>
        ) : (
          cards.map((card) => {
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
                    <span className="text-[10px] text-amber-400/80 font-mono">
                      Staged
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
                      title="Condense"
                      className="flex items-center gap-1 px-1.5 py-0.5 text-slate-400 hover:text-amber-300 rounded hover:bg-obsidian-800 transition"
                    >
                      <Minimize2 className="w-3 h-3" />
                      Knead
                    </button>
                    <button
                      onClick={() => handleTexterialAction(card.id, 'stretch')}
                      title="Expand"
                      className="flex items-center gap-1 px-1.5 py-0.5 text-slate-400 hover:text-sky-300 rounded hover:bg-obsidian-800 transition"
                    >
                      <Maximize2 className="w-3 h-3" />
                      Stretch
                    </button>
                  </div>

                  {/* Stage Button */}
                  <button
                    onClick={() => handleStage(card)}
                    disabled={card.isStaged}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition shadow-sm ${
                      card.isStaged
                        ? 'bg-obsidian-800 text-slate-500 cursor-not-allowed'
                        : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 hover:border-amber-400'
                    }`}
                  >
                    <CornerDownRight className="w-3 h-3" />
                    {card.isStaged ? 'Staged' : 'Stage'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Staging Target Indicator */}
      <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-obsidian-800">
        <span>Target:</span>
        <span className="font-mono text-amber-300 bg-obsidian-950 px-2 py-0.5 rounded border border-obsidian-700">
          {targetParentId}
        </span>
      </div>
    </div>
  );
};
