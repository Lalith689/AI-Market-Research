import React from 'react';
import { Building2, Globe, Calendar, Briefcase, TrendingUp, Sparkles, FileText } from 'lucide-react';

export default function ReportHeader({ overview, executiveSummary, createdAt }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
      
      {/* Top Meta Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {overview.industry}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {overview.stage || 'Active'}
            </span>
            {createdAt && (
              <span className="text-xs text-slate-500">
                Generated {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {overview.name}
          </h2>
          <p className="mt-1 text-sm text-slate-300 max-w-3xl leading-relaxed">
            {overview.summary}
          </p>
        </div>

        {/* Firmographic badges */}
        <div className="flex flex-wrap md:flex-col gap-2 text-xs text-slate-400">
          {overview.headquarters && (
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Globe className="h-3.5 w-3.5 text-indigo-400" />
              <span>{overview.headquarters}</span>
            </div>
          )}
          {overview.founded_year && (
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span>Founded {overview.founded_year}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
            <span>{overview.business_model}</span>
          </div>
        </div>
      </div>

      {/* Core Value Proposition Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/40 border border-indigo-500/20 rounded-xl p-4 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-indigo-300">Core Value Proposition</h4>
          <p className="text-sm font-medium text-white mt-0.5 leading-snug">
            {overview.value_proposition}
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      {overview.key_metrics && Object.keys(overview.key_metrics).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(overview.key_metrics).map(([key, value]) => (
            <div key={key} className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">{key}</p>
              <p className="text-sm font-bold text-white mt-1 truncate">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Executive Summary Narrative */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
          <FileText className="h-4 w-4" />
          <span>Executive Synthesis & Macro Context</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {executiveSummary}
        </p>
      </div>

    </div>
  );
}
