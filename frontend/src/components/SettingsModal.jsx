import React from 'react';
import { Settings, X, Key, Cpu, ExternalLink, Check } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  provider,
  setProvider,
  apiKey,
  setApiKey
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Provider Configuration</h3>
              <p className="text-xs text-slate-400">Choose your intelligence engine & API keys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Provider Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Select Active AI Engine
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            
            {/* Grounded Heuristic (Free/Offline) */}
            <button
              type="button"
              onClick={() => setProvider('mock')}
              className={`p-3 rounded-xl border text-left transition-all ${
                provider === 'mock'
                  ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-sm shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Grounded Offline</span>
                {provider === 'mock' && <Check className="h-4 w-4 text-indigo-400" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Live web search + entity extraction. Zero API key needed.</p>
            </button>

            {/* Groq (Llama 3.3 70B - Free tier) */}
            <button
              type="button"
              onClick={() => setProvider('groq')}
              className={`p-3 rounded-xl border text-left transition-all ${
                provider === 'groq'
                  ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-sm shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Groq (Llama 3.3)</span>
                {provider === 'groq' && <Check className="h-4 w-4 text-indigo-400" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Ultra-fast inference. Free API tier available.</p>
            </button>

            {/* OpenAI */}
            <button
              type="button"
              onClick={() => setProvider('openai')}
              className={`p-3 rounded-xl border text-left transition-all ${
                provider === 'openai'
                  ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-sm shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">OpenAI (GPT-4o)</span>
                {provider === 'openai' && <Check className="h-4 w-4 text-indigo-400" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">High-reasoning frontier models.</p>
            </button>

            {/* Google Gemini */}
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`p-3 rounded-xl border text-left transition-all ${
                provider === 'gemini'
                  ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-sm shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Google Gemini</span>
                {provider === 'gemini' && <Check className="h-4 w-4 text-indigo-400" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Gemini 1.5 Flash. Free tier on AI Studio.</p>
            </button>

          </div>
        </div>

        {/* API Key Input (if not mock) */}
        {provider !== 'mock' && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-indigo-400" />
                <span>{provider.toUpperCase()} API Key:</span>
              </label>
              {provider === 'groq' && (
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px]"
                >
                  Get free Groq key <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {provider === 'gemini' && (
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px]"
                >
                  Get free Gemini key <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter your ${provider} API key (e.g. gsk_... or sk-...)`}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500">
              Your key is saved locally in your browser storage and never logged to external disks.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            Save & Close
          </button>
        </div>

      </div>
    </div>
  );
}
