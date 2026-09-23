import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-ink-900 border border-ink-600 rounded-lg w-full max-w-lg shadow-xl p-6 relative flex flex-col gap-5 text-[#e8e6e1]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#e8e6e1]">
              Set the meeting agenda
            </h2>
            <p className="text-xs text-ash-400 mt-0.5">
              Grounds every idea extraction and conflict check in what this meeting is actually about.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-ash-400 hover:text-[#e8e6e1] hover:bg-ink-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ash-300">
              Core objective or question
            </label>
            <textarea
              value={agendaText}
              onChange={(e) => setAgendaText(e.target.value)}
              placeholder="e.g. Q3 Cloud Migration: Moving from PostgreSQL to DynamoDB"
              rows={3}
              autoFocus
              className="w-full px-3.5 py-2.5 bg-ink-950 border border-ink-600 rounded text-sm text-[#e8e6e1] placeholder-ash-400 focus:outline-none focus:border-ash-400 transition resize-none"
            />
          </div>

          {/* Quick Preset Suggestions */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-ash-400">
              Or start from:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAgendaText(preset)}
                  className="text-[11px] px-2.5 py-1 rounded border border-ink-600 text-ash-300 hover:text-[#e8e6e1] hover:border-ash-400 transition text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-ink-700">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-ash-400 hover:text-[#e8e6e1] rounded transition"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isSaving || !agendaText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-ink-950 bg-[#e8e6e1] disabled:opacity-40 rounded transition"
            >
              <Check className="w-3.5 h-3.5" />
              {isSaving ? "Setting…" : "Set agenda"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
