import React, { useState, useEffect } from 'react';
import { EngineStatus } from '../types/tree';
import { getEngineConfig, updateEngineConfig } from '../services/api';
import { X, Cpu, Cloud, Zap, Shield, Check, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<EngineStatus | null>(null);
  const [provider, setProvider] = useState<string>('auto');
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [lmUrl, setLmUrl] = useState<string>('http://localhost:1234/v1');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchStatus = async () => {
    try {
      const data = await getEngineConfig();
      setStatus(data);
      setProvider(data.active_provider);
      setLmUrl(data.lm_studio.url);
    } catch (e) {
      console.error('Failed to fetch engine status:', e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await updateEngineConfig(provider, geminiKey || undefined, lmUrl || undefined);
      setStatus(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (e) {
      console.error('Failed to update config:', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 select-none">
      <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden glass-panel animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-obsidian-800">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100">Dual-Engine LLM Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-obsidian-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Active Provider Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Active Inference Strategy</label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setProvider('auto')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                  provider === 'auto'
                    ? 'border-amber-400 bg-amber-500/15 text-amber-300'
                    : 'border-obsidian-700 bg-obsidian-950 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="font-semibold text-[11px]">Auto Routing</span>
                <span className="text-[9px] text-slate-500">Local $\to$ Gemini</span>
              </button>

              <button
                type="button"
                onClick={() => setProvider('lm_studio')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                  provider === 'lm_studio'
                    ? 'border-sky-400 bg-sky-500/15 text-sky-300'
                    : 'border-obsidian-700 bg-obsidian-950 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span className="font-semibold text-[11px]">LM Studio</span>
                <span className="text-[9px] text-slate-500">$0.00 / Air-Gapped</span>
              </button>

              <button
                type="button"
                onClick={() => setProvider('gemini_flash')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                  provider === 'gemini_flash'
                    ? 'border-purple-400 bg-purple-500/15 text-purple-300'
                    : 'border-obsidian-700 bg-obsidian-950 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Cloud className="w-4 h-4" />
                <span className="font-semibold text-[11px]">Gemini Flash</span>
                <span className="text-[9px] text-slate-500">Cloud Scalable</span>
              </button>
            </div>
          </div>

          {/* LM Studio Config */}
          <div className="bg-obsidian-950/80 border border-obsidian-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                Local LM Studio Engine
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  status?.lm_studio.online
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {status?.lm_studio.online ? 'Online (Ready)' : 'Offline (localhost:1234)'}
              </span>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Endpoint URL</label>
              <input
                type="text"
                value={lmUrl}
                onChange={(e) => setLmUrl(e.target.value)}
                placeholder="http://localhost:1234/v1"
                className="w-full bg-obsidian-900 border border-obsidian-700 rounded-lg p-2 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {/* Gemini Flash Config */}
          <div className="bg-obsidian-950/80 border border-obsidian-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                <Cloud className="w-3.5 h-3.5 text-purple-400" />
                Google Gemini Flash Engine
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  status?.gemini_flash.configured
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-obsidian-800 text-slate-500'
                }`}
              >
                {status?.gemini_flash.configured ? 'Configured' : 'No Key Set'}
              </span>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">GEMINI_API_KEY (Optional if set in .env)</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-obsidian-900 border border-obsidian-700 rounded-lg p-2 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 bg-obsidian-950 border-t border-obsidian-800">
          <button
            onClick={fetchStatus}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Pings
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-semibold text-xs transition shadow"
            >
              {saveSuccess ? <Check className="w-3.5 h-3.5" /> : null}
              {saveSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Apply Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
