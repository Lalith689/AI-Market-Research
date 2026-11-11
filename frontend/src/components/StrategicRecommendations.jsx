import React from 'react';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

export default function StrategicRecommendations({ recommendations }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Strategic Recommendations</h3>
          <p className="text-xs text-slate-400">High-leverage growth vectors, distribution wedges, and moat-building actions</p>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 hover:border-indigo-500/30 transition-all"
          >
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold flex items-center justify-center mt-0.5">
              {idx + 1}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {rec}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
