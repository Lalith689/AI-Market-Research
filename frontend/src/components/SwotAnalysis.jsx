import React from 'react';

export default function SwotAnalysis({ swot }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 sm:p-7 space-y-5">
      
      {/* Section Header */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">SWOT Analysis</h3>
        <p className="text-xs text-zinc-400 mt-0.5">
          Internal core capabilities and structural gaps vs. external market expansion and headwinds
        </p>
      </div>

      {/* 2x2 Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Strengths */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-zinc-200">
              Strengths
            </h4>
            <span className="text-[10px] text-zinc-500 font-mono">Internal Advantage</span>
          </div>
          <ul className="space-y-2">
            {swot.strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                <span className="text-zinc-500 font-mono select-none mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-zinc-200">
              Weaknesses
            </h4>
            <span className="text-[10px] text-zinc-500 font-mono">Internal Vulnerability</span>
          </div>
          <ul className="space-y-2">
            {swot.weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                <span className="text-zinc-500 font-mono select-none mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-zinc-200">
              Opportunities
            </h4>
            <span className="text-[10px] text-zinc-500 font-mono">External Vectors</span>
          </div>
          <ul className="space-y-2">
            {swot.opportunities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                <span className="text-zinc-500 font-mono select-none mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
            <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-zinc-200">
              Threats
            </h4>
            <span className="text-[10px] text-zinc-500 font-mono">External Risks</span>
          </div>
          <ul className="space-y-2">
            {swot.threats.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                <span className="text-zinc-500 font-mono select-none mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
