import React, { useState, useEffect } from 'react';
import { EngineStatus } from '../types/tree';
import { getEngineConfig, updateEngineConfig, getApiBase } from '../services/api';
import { X, Check, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_BACKEND_URL = 'http://127.0.0.1:8000';
const isExtension = typeof window !== 'undefined' && window.location.protocol === 'chrome-extension:';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<EngineStatus | null>(null);
  const [provider, setProvider] = useState<string>('auto');
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [lmUrl, setLmUrl] = useState<string>('http://localhost:1234/v1');
  const [backendUrl, setBackendUrl] = useState<string>(DEFAULT_BACKEND_URL);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [backendSaved, setBackendSaved] = useState(false);

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
      getApiBase().then((base) => setBackendUrl(base === '/api' ? DEFAULT_BACKEND_URL : base));
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

  const handleSaveBackend = async () => {
    const cleaned = backendUrl.trim().replace(/\/+$/, '') || DEFAULT_BACKEND_URL;
    setBackendUrl(cleaned);
    try {
      if (isExtension && typeof chrome !== 'undefined' && chrome.storage?.sync) {
        await chrome.storage.sync.set({ backendUrl: cleaned });
      }
      setBackendSaved(true);
      setTimeout(() => setBackendSaved(false), 2000);
      // Backend host changed: existing WS connection and cached API base are stale.
      window.location.reload();
    } catch (e) {
      console.error('Failed to save backend URL:', e);
    }
  };

  const PROVIDERS: Array<{ id: string; label: string; sub: string }> = [
    { id: 'auto', label: 'Auto', sub: 'Local, then cloud' },
    { id: 'lm_studio', label: 'LM Studio', sub: 'Local' },
    { id: 'gemini_flash', label: 'Gemini', sub: 'Cloud' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 select-none">
      <div className="bg-ink-900 border border-ink-600 rounded-lg w-full max-w-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ink-700">
          <h3 className="text-sm font-semibold text-[#e8e6e1]">Settings</h3>
          <button
            onClick={onClose}
            className="text-ash-400 hover:text-[#e8e6e1] p-1 rounded hover:bg-ink-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Active Provider Selection */}
          <div>
            <label className="block text-ash-300 font-medium mb-2">LLM engine</label>
            <div className="flex border border-ink-600 rounded overflow-hidden">
              {PROVIDERS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvider(p.id)}
                  className={`flex-1 p-2 flex flex-col items-center gap-0.5 transition ${
                    i > 0 ? 'border-l border-ink-600' : ''
                  } ${provider === p.id ? 'bg-ink-700 text-[#e8e6e1]' : 'text-ash-400 hover:text-ash-300'}`}
                >
                  <span className="font-medium text-[11px]">{p.label}</span>
                  <span className="text-[9px] text-ash-400">{p.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Backend Server Location (LAN beta hosting) */}
          <div className="border border-ink-600 rounded p-3 space-y-2">
            <div className="font-medium text-[#e8e6e1]">Backend server</div>
            <p className="text-[10px] text-ash-400 leading-relaxed">
              Point at a shared machine's LAN address (e.g. http://192.168.1.42:8000) so everyone
              in the meeting talks to the same deliberation tree. Reloads the panel on save.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder={DEFAULT_BACKEND_URL}
                disabled={!isExtension}
                className="flex-1 bg-ink-950 border border-ink-600 rounded p-2 text-[#e8e6e1] font-mono text-[11px] focus:outline-none focus:border-ash-400 disabled:opacity-50"
              />
              <button
                onClick={handleSaveBackend}
                disabled={!isExtension}
                className="flex items-center gap-1 px-2.5 py-2 rounded border border-ash-400 disabled:opacity-40 text-[#e8e6e1] text-[11px] font-medium transition shrink-0 hover:bg-ink-700"
              >
                {backendSaved ? <Check className="w-3 h-3" /> : null}
                {backendSaved ? 'Saved' : 'Save'}
              </button>
            </div>
            {!isExtension && (
              <p className="text-[10px] text-pending">Only configurable when running as the installed extension.</p>
            )}
          </div>

          {/* LM Studio Config */}
          <div className="border border-ink-600 rounded p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-[#e8e6e1]">LM Studio</div>
              <span className={`text-[10px] font-mono ${status?.lm_studio.online ? 'text-merged' : 'text-conflict'}`}>
                {status?.lm_studio.online ? 'online' : 'offline'}
              </span>
            </div>
            <div>
              <label className="block text-[11px] text-ash-400 mb-1">URL</label>
              <input
                type="text"
                value={lmUrl}
                onChange={(e) => setLmUrl(e.target.value)}
                placeholder="http://localhost:1234/v1"
                className="w-full bg-ink-950 border border-ink-600 rounded p-2 text-[#e8e6e1] font-mono text-[11px] focus:outline-none focus:border-ash-400"
              />
            </div>
          </div>

          {/* Gemini Flash Config */}
          <div className="border border-ink-600 rounded p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-[#e8e6e1]">Gemini API (optional cloud fallback)</div>
              <span className="text-[10px] font-mono text-ash-400">
                {status?.gemini_flash.configured ? 'configured' : 'unset'}
              </span>
            </div>
            <div>
              <label className="block text-[11px] text-ash-400 mb-1">API key</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-ink-950 border border-ink-600 rounded p-2 text-[#e8e6e1] font-mono text-[11px] focus:outline-none focus:border-ash-400"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3.5 border-t border-ink-700">
          <button
            onClick={fetchStatus}
            className="flex items-center gap-1 text-xs text-ash-400 hover:text-[#e8e6e1] transition"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-ash-400 hover:text-[#e8e6e1] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#e8e6e1] text-ink-950 font-medium text-xs transition disabled:opacity-50"
            >
              {saveSuccess ? <Check className="w-3 h-3" /> : null}
              {saveSuccess ? 'Saved' : isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
