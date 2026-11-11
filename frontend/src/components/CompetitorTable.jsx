import React from 'react';
import { Users, DollarSign, Award, CheckCircle2, XCircle } from 'lucide-react';

export default function CompetitorTable({ competitors }) {
  const getTierBadge = (tier) => {
    const t = (tier || '').toLowerCase();
    if (t.includes('leader')) {
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
    if (t.includes('challenger')) {
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Competitive Landscape Matrix</h3>
            <p className="text-xs text-slate-400">Direct & indirect competitors, pricing benchmarks, and differentiators</p>
          </div>
        </div>
      </div>

      {/* Responsive Competitor Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {competitors.map((comp, idx) => (
          <div
            key={idx}
            className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Competitor Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div>
                  <h4 className="text-base font-bold text-white">{comp.name}</h4>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getTierBadge(comp.market_tier)}`}>
                    {comp.market_tier}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Est. Pricing</span>
                  <span className="text-xs font-semibold text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-800/40 inline-block mt-0.5">
                    {comp.estimated_pricing}
                  </span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                
                {/* Strengths */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Core Strengths
                  </span>
                  <ul className="space-y-1">
                    {comp.strengths.map((s, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-300 leading-tight">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> Vulnerabilities
                  </span>
                  <ul className="space-y-1">
                    {comp.weaknesses.map((w, wIdx) => (
                      <li key={wIdx} className="text-xs text-slate-400 leading-tight">
                        • {w}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Differentiator Footer */}
            <div className="pt-3 border-t border-slate-800/80 bg-slate-900/40 -mx-5 -mb-5 p-4 rounded-b-xl">
              <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider block">Key Differentiator</span>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                {comp.differentiator}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
