import React from 'react';
import { Layers, History, Download, Settings, ExternalLink } from 'lucide-react';
import { getExportPdfUrl } from '../services/api';

export default function Navbar({ onOpenHistory, historyCount, currentReport, onOpenSettings, provider }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand identity - Ultra clean, institutional */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-zinc-900 border border-zinc-700/80 flex items-center justify-center">
            <Layers className="h-3.5 w-3.5 text-zinc-200" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-sm tracking-tight text-zinc-100">MarketLens</span>
            <span className="h-3.5 w-[1px] bg-zinc-800" />
            <span className="text-xs text-zinc-400 hidden sm:inline">Research & Strategy Terminal</span>
          </div>
        </div>

        {/* Action Controls - Refined, subtle, no neon */}
        <div className="flex items-center gap-2">
          
          {/* AI Engine Status & Selector */}
          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.2 h-8 rounded-md text-xs font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
            title="Configure AI Engine & API Keys"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${provider === 'mock' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span className="text-zinc-400 hidden sm:inline">Engine:</span>
            <span className="font-mono text-[11px] text-zinc-200 uppercase">{provider}</span>
          </button>

          {/* History Drawer Trigger */}
          <button
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.2 h-8 rounded-md text-xs font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <History className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                {historyCount}
              </span>
            )}
          </button>

          {/* PDF Export Button */}
          {currentReport && (
            <a
              href={getExportPdfUrl(currentReport.id)}
              download
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-xs font-medium bg-zinc-100 hover:bg-white text-zinc-950 shadow-sm transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export PDF</span>
            </a>
          )}

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors ml-1"
            title="View on GitHub"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

        </div>

      </div>
    </header>
  );
}
