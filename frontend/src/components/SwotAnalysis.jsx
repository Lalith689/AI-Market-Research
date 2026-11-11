import React from 'react';
import { ShieldCheck, AlertCircle, Compass, ShieldAlert } from 'lucide-react';

export default function SwotAnalysis({ swot }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
      
      {/* Section Header */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight">SWOT Analysis</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Internal core competencies & vulnerabilities vs. external market tailwinds & threats
        </p>
      </div>

      {/* 2x2 Quadrant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strengths (Internal Positive) */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/20">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Strengths</h4>
              <span className="text-[10px] text-emerald-500/80">Internal Competitive Advantages</span>
            </div>
          </div>
          <ul className="space-y-2.5">
            {swot.strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses (Internal Negative) */}
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-500/20">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Weaknesses</h4>
              <span className="text-[10px] text-rose-500/80">Internal Gaps & Vulnerabilities</span>
            </div>
          </div>
          <ul className="space-y-2.5">
            {swot.weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities (External Positive) */}
        <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-indigo-500/20">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Opportunities</h4>
              <span className="text-[10px] text-indigo-400/80">External Market Tailwinds & Expansion</span>
            </div>
          </div>
          <ul className="space-y-2.5">
            {swot.opportunities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats (External Negative) */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-amber-500/20">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Threats</h4>
              <span className="text-[10px] text-amber-500/80">External Headwinds & Incumbent Moves</span>
            </div>
          </div>
          <ul className="space-y-2.5">
            {swot.threats.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
