import React, { useState, useEffect } from 'react';
import { SlateCard, NodeType } from '../types/tree';
import { ingestSpeech, transformCard, extractBatchIdeas } from '../services/api';
import {
  Send,
  Minimize2,
  Maximize2,
  Mic,
  MicOff,
  CornerDownRight,
} from 'lucide-react';

interface SidePanelProps {
  currentSpeaker: string;
  setCurrentSpeaker: (name: string) => void;
  targetParentId: string;
  cards: SlateCard[];
  setCards: React.Dispatch<React.SetStateAction<SlateCard[]>>;
  onStageCard: (card: SlateCard, targetParentId: string) => Promise<void>;
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
  const [secondsToNextBatch, setSecondsToNextBatch] = useState(300);
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
      setSecondsToNextBatch(300);
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
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleRecording = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Web Speech API is not supported in this browser. Type instead, or use Google Meet captions.");
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

  return (
    <div className="flex flex-col h-full bg-ink-900 border-r border-ink-700 p-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-ink-700">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold text-[#e8e6e1]">
            Slate
          </h2>
          <button
            onClick={() => handleBatchExtract(false)}
            disabled={isExtractingBatch}
            title="Check now for ideas missed by real-time extraction (auto-runs every 5m)"
            className="px-2 py-0.5 rounded text-[10px] font-mono text-ash-400 hover:text-ash-300 border border-ink-600 transition disabled:opacity-50"
          >
            {isExtractingBatch ? 'Extracting…' : `Extract now (${formatTimer(secondsToNextBatch)})`}
          </button>
        </div>

        {/* Speaker Picker -- also doubles as the voter identity in the tree view, so one
            tester can simulate several participants approving a proposal before real
            multi-device testing. */}
        <select
          value={currentSpeaker}
          onChange={(e) => setCurrentSpeaker(e.target.value)}
          title="Acting as (used for both new cards and votes)"
          className="bg-ink-800 text-xs text-[#e8e6e1] border border-ink-600 rounded px-2 py-0.5 focus:outline-none focus:border-ash-400 transition max-w-[140px] truncate"
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

      {/* Input Box -- types or speaks a line as the selected speaker, exactly as if Meet
          had captioned it. Useful for testing without a live call: pick a name above,
          type what they'd say, and it runs through the real ingest pipeline. */}
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
            placeholder={`Simulate a caption as ${currentSpeaker}…`}
            rows={2}
            className="w-full bg-ink-950 border border-ink-600 rounded p-2.5 pr-18 text-xs text-[#e8e6e1] placeholder-ash-400 focus:outline-none focus:border-ash-400 resize-none transition"
          />
          <div className="absolute right-2 bottom-2.5 flex items-center gap-1.5">
            <button
              onClick={toggleRecording}
              title={isRecording ? 'Listening…' : 'Dictate with your microphone'}
              className={`p-1.5 rounded border transition ${
                isRecording
                  ? 'border-conflict text-conflict'
                  : 'border-ink-600 text-ash-400 hover:text-ash-300'
              }`}
            >
              {isRecording ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => handleIngest()}
              disabled={isProcessing || !inputText.trim()}
              className="bg-[#e8e6e1] disabled:opacity-30 text-ink-950 p-1.5 rounded transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Stream */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {cards.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-center p-4 rounded border border-dashed border-ink-600 text-ash-400">
            <p className="text-xs">No ideas yet</p>
          </div>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className="rounded border border-ink-600 bg-ink-800 p-3 flex flex-col gap-2 transition hover:border-ash-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-ash-400">
                  <span className="font-mono">{NODE_TYPE_LABEL[card.intent]}</span>
                  <span className="text-[#e8e6e1] font-medium">{card.speaker}</span>
                </div>
                {card.isStaged && (
                  <span className="text-[10px] text-ash-400">staged</span>
                )}
              </div>

              <p className="text-xs text-[#e8e6e1] leading-relaxed">
                {card.distilledText}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-ink-700 text-[11px]">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTexterialAction(card.id, 'knead')}
                    title="Condense"
                    className="flex items-center gap-1 px-1.5 py-0.5 text-ash-400 hover:text-[#e8e6e1] rounded transition"
                  >
                    <Minimize2 className="w-3 h-3" />
                    Condense
                  </button>
                  <button
                    onClick={() => handleTexterialAction(card.id, 'stretch')}
                    title="Expand"
                    className="flex items-center gap-1 px-1.5 py-0.5 text-ash-400 hover:text-[#e8e6e1] rounded transition"
                  >
                    <Maximize2 className="w-3 h-3" />
                    Expand
                  </button>
                </div>

                <button
                  onClick={() => handleStage(card)}
                  disabled={card.isStaged}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium transition ${
                    card.isStaged
                      ? 'text-ash-400 border-ink-600 cursor-not-allowed'
                      : 'text-[#e8e6e1] border-ash-400 hover:bg-ink-700'
                  }`}
                >
                  <CornerDownRight className="w-3 h-3" />
                  {card.isStaged ? 'Staged' : 'Stage'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Staging Target Indicator */}
      <div className="pt-2 text-[11px] text-ash-400 flex items-center justify-between border-t border-ink-700">
        <span>Target</span>
        <span className="font-mono text-[#e8e6e1] bg-ink-950 px-2 py-0.5 rounded border border-ink-600">
          {targetParentId}
        </span>
      </div>
    </div>
  );
};
