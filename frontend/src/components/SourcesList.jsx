import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function SourcesList({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 sm:p-7 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/70">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">Verified Grounding Sources</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Primary encyclopedic data and market intelligence links gathered during research</p>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
          Fact Grounded
        </span>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-3 hover:border-zinc-600 transition-colors space-y-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                {source.title}
              </span>
              <ExternalLink className="h-3 w-3 text-zinc-500 group-hover:text-zinc-300 flex-shrink-0 transition-colors mt-0.5" />
            </div>

            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              "{source.snippet}"
            </p>

            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
              <span className="text-zinc-400">{source.domain}</span>
              <span>•</span>
              <span>Source #{idx + 1}</span>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}
