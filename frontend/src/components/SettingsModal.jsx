import React from 'react';
import { X, Key, ExternalLink, Check } from 'lucide-react';

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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">AI Engine Configuration</h3>
            <p className="text-[11px] text-zinc-400">Select model provider & configure API credentials</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Engine Grid */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-semibold block">
            Select Active Engine
          </label>

          <div className="grid grid-cols-2 gap-2">
            
            {/* Grounded Offline */}
            <button
              type="button"
              onClick={() => setProvider('mock')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                provider === 'mock'
                  ? 'bg-zinc-900 border-zinc-500 text-white'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-100">Grounded Offline</span>
                {provider === 'mock' && <Check className="h-3.5 w-3.5 text-zinc-100" />}
              </div>
              <p className="text-[10px] text-zinc-500 mt-0.5">Wikipedia + local extraction. Free.</p>
            </button>

            {/* Groq Llama 3.3 */}
            <button
              type="button"
              onClick={() => setProvider('groq')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                provider === 'groq'
                  ? 'bg-zinc-900 border-zinc-500 text-white'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-100">Groq (Llama 3.3)</span>
                {provider === 'groq' && <Check className="h-3.5 w-3.5 text-zinc-100" />}
              </div>
              <p className="text-[10px] text-zinc-500 mt-0.5">Ultra-fast. Free tier available.</p>
            </button>

            {/* OpenAI */}
            <button
              type="button"
              onClick={() => setProvider('openai')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                provider === 'openai'
                  ? 'bg-zinc-900 border-zinc-500 text-white'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-100">OpenAI (GPT-4o)</span>
                {provider === 'openai' && <Check className="h-3.5 w-3.5 text-zinc-100" />}
              </div>
              <p className="text-[10px] text-zinc-500 mt-0.5">Frontier reasoning models.</p>
            </button>

            {/* Google Gemini */}
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                provider === 'gemini'
                  ? 'bg-zinc-900 border-zinc-500 text-white'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-100">Google Gemini</span>
                {provider === 'gemini' && <Check className="h-3.5 w-3.5 text-zinc-100" />}
              </div>
              <p className="text-[10px] text-zinc-500 mt-0.5">Gemini 1.5 Flash. Free tier.</p>
            </button>

          </div>
        </div>

        {/* API Key Input */}
        {provider !== 'mock' && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-1">
                <Key className="h-3 w-3 text-zinc-400" />
                <span>{provider.toUpperCase()} API Key:</span>
              </label>
              {provider === 'groq' && (
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 text-[10px] font-mono"
                >
                  Get free key <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
              {provider === 'gemini' && (
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 text-[10px] font-mono"
                >
                  Get free key <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter your ${provider} key (e.g. gsk_... or sk-...)`}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-100 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
            <p className="text-[10px] text-zinc-500 font-mono">
              Stored locally in browser localStorage.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 border-t border-zinc-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-colors"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
}
