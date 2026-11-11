import React from 'react';

export default function StrategicRecommendations({ recommendations }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 sm:p-7 space-y-4">
      
      {/* Header */}
      <div className="pb-3 border-b border-zinc-800/70">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">Strategic Growth Vectors & Actionable Moves</h3>
        <p className="text-xs text-zinc-400 mt-0.5">High-leverage positioning, distribution wedges, and defensive moat development</p>
      </div>

      {/* Recommendations List */}
      <div className="space-y-2.5">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-zinc-950/60 border border-zinc-800/70 rounded-lg p-3.5 hover:border-zinc-700 transition-colors"
          >
            <span className="flex-shrink-0 text-[11px] font-mono font-bold text-zinc-500 mt-0.5 select-none">
              {(idx + 1).toString().padStart(2, '0')}.
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
              {rec}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
