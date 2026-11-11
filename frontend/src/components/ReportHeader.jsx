import React from 'react';
import { Globe, Calendar, Briefcase, FileText } from 'lucide-react';

export default function ReportHeader({ overview, executiveSummary, createdAt }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 sm:p-7 space-y-6">
      
      {/* Top Meta Bar */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-zinc-800/70">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              {overview.industry}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800/60 text-zinc-400 border border-zinc-700/40">
              {overview.stage || 'Operating'}
            </span>
            {createdAt && (
              <span className="text-[11px] text-zinc-500 font-mono">
                Report: {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {overview.name}
          </h2>
          
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            {overview.summary}
          </p>
        </div>

        {/* Firmographic Attributes */}
        <div className="flex flex-wrap md:flex-col gap-1.5 text-xs text-zinc-400 flex-shrink-0">
          {overview.headquarters && (
            <div className="flex items-center gap-1.5 bg-zinc-950/70 px-2.5 py-1 rounded border border-zinc-800/80">
              <Globe className="h-3 w-3 text-zinc-500" />
              <span>{overview.headquarters}</span>
            </div>
          )}
          {overview.founded_year && (
            <div className="flex items-center gap-1.5 bg-zinc-950/70 px-2.5 py-1 rounded border border-zinc-800/80">
              <Calendar className="h-3 w-3 text-zinc-500" />
              <span>Est. {overview.founded_year}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-zinc-950/70 px-2.5 py-1 rounded border border-zinc-800/80">
            <Briefcase className="h-3 w-3 text-zinc-500" />
            <span className="truncate max-w-[200px]">{overview.business_model}</span>
          </div>
        </div>
      </div>

      {/* Value Proposition Callout - Refined editorial styling, no neon */}
      <div className="border-l-2 border-zinc-400 bg-zinc-950/50 p-3.5 rounded-r-lg">
        <h4 className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-semibold">Value Proposition</h4>
        <p className="text-xs sm:text-sm font-medium text-zinc-200 mt-0.5 leading-relaxed">
          {overview.value_proposition}
        </p>
      </div>

      {/* Key Metrics Grid */}
      {overview.key_metrics && Object.keys(overview.key_metrics).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {Object.entries(overview.key_metrics).map(([key, value]) => (
            <div key={key} className="bg-zinc-950/60 border border-zinc-800/70 rounded-lg p-3">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider truncate">{key}</p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1 truncate">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Executive Summary Narrative */}
      <div className="bg-zinc-950/60 border border-zinc-800/70 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px] tracking-wider uppercase">
          <FileText className="h-3.5 w-3.5 text-zinc-500" />
          <span>Executive Summary & Strategic Synthesis</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {executiveSummary}
        </p>
      </div>

    </div>
  );
}
