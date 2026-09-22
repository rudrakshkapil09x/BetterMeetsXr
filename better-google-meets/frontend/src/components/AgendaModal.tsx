import React, { useState, useEffect } from 'react';
import { Target, Sparkles, X, Check, ArrowRight } from 'lucide-react';

interface AgendaModalProps {
  isOpen: boolean;
  currentAgenda: string;
  onSave: (agenda: string) => Promise<void>;
  onClose: () => void;
}

const SUGGESTIONS = [
  "Technical Architecture: Cloud Migration",
  "Sprint Planning & Task Prioritization",
  "Incident Post-Mortem & Root Cause Analysis",
  "Product Roadmap & Design Spec Deliberation"
];

export const AgendaModal: React.FC<AgendaModalProps> = ({
  isOpen,
  currentAgenda,
  onSave,
  onClose
}) => {
  const [agendaText, setAgendaText] = useState(currentAgenda || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentAgenda && currentAgenda !== 'Discussion') {
      setAgendaText(currentAgenda);
    }
  }, [currentAgenda]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalAgenda = agendaText.trim() || 'General Deliberation';
    setIsSaving(true);
    try {
      await onSave(finalAgenda);
      onClose();
    } catch (err) {
      console.error('Failed to save agenda:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-obsidian-900 border border-obsidian-700/80 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative flex flex-col gap-5 text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-amber-400 flex items-center justify-center text-obsidian-950 shadow-md">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Set Meeting Agenda & Motive
              </h2>
              <p className="text-xs text-slate-400">
                Grounds speech distillation and 30m batch idea extraction.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-obsidian-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-sky-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Core Objective / Question
            </label>
            <textarea
              value={agendaText}
              onChange={(e) => setAgendaText(e.target.value)}
              placeholder="e.g. Q3 Cloud Migration: Moving from PostgreSQL to DynamoDB"
              rows={3}
              autoFocus
              className="w-full px-3.5 py-2.5 bg-obsidian-950 border border-obsidian-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 transition resize-none"
            />
          </div>

          {/* Quick Preset Suggestions */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium">
              Quick Archetypes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAgendaText(preset)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-obsidian-800/80 hover:bg-obsidian-800 border border-obsidian-700/60 text-slate-300 hover:text-sky-300 transition text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-obsidian-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded-lg transition"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isSaving || !agendaText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md transition"
            >
              <Check className="w-3.5 h-3.5" />
              {isSaving ? "Setting..." : "Set Agenda & Begin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
