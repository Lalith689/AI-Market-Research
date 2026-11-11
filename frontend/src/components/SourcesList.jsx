import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export default function SourcesList({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Research Citations & Grounding Sources</h3>
            <p className="text-xs text-slate-400">Live intelligence links gathered during the research process</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Fact Grounded</span>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-slate-950/70 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/40 hover:bg-slate-950 transition-all space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors line-clamp-1">
                {source.title}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0 transition-colors mt-0.5" />
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              "{source.snippet}"
            </p>

            <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-400">
                {source.domain}
              </span>
              <span>Source #{idx + 1}</span>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}
