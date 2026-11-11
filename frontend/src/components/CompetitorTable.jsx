import React from 'react';
import { Users } from 'lucide-react';

export default function CompetitorTable({ competitors }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 sm:p-7 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/70">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">Competitive Landscape Matrix</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Direct peers, tier positioning, pricing benchmarks, and structural differentiators</p>
        </div>
      </div>

      {/* Competitor Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {competitors.map((comp, idx) => (
          <div
            key={idx}
            className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-3 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-zinc-800/70">
                <div>
                  <h4 className="text-sm font-bold text-zinc-100 tracking-tight">{comp.name}</h4>
                  <span className="inline-block mt-1 px-2 py-0.2 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    {comp.market_tier}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Pricing Profile</span>
                  <span className="text-xs font-mono font-medium text-zinc-300 inline-block mt-0.5">
                    {comp.estimated_pricing}
                  </span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5">
                
                {/* Strengths */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                    Core Strengths
                  </span>
                  <ul className="space-y-1">
                    {comp.strengths.map((s, sIdx) => (
                      <li key={sIdx} className="text-xs text-zinc-300 leading-snug">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                    Vulnerabilities
                  </span>
                  <ul className="space-y-1">
                    {comp.weaknesses.map((w, wIdx) => (
                      <li key={wIdx} className="text-xs text-zinc-400 leading-snug">
                        • {w}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Differentiator Strip */}
            <div className="pt-2.5 border-t border-zinc-800/70 bg-zinc-900/30 -mx-4 -mb-4 p-3 rounded-b-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">Key Differentiator</span>
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                {comp.differentiator}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
