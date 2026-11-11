import React from 'react';
import { Target, DollarSign, Megaphone, AlertCircle } from 'lucide-react';

export default function CustomerSegments({ segments }) {
  const getWtpBadge = (wtp) => {
    const val = (wtp || '').toLowerCase();
    if (val.includes('very high') || val.includes('enterprise')) {
      return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
    }
    if (val.includes('high')) {
      return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    }
    return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Customer Segmentation & ICP Personas</h3>
            <p className="text-xs text-slate-400">Target buyer profiles, willingness to pay, and acquisition channels</p>
          </div>
        </div>
      </div>

      {/* Segments Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Persona Title & Willingness to Pay */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div>
                  <h4 className="text-base font-bold text-white">{seg.persona}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">{seg.description}</p>
                </div>
              </div>

              {/* Willingness to pay banner */}
              <div className="mt-3 flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" /> Willingness to Pay:
                </span>
                <span className={`px-2 py-0.5 rounded-full font-semibold border ${getWtpBadge(seg.willingness_to_pay)}`}>
                  {seg.willingness_to_pay}
                </span>
              </div>

              {/* Pain points */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Core Pain Points
                </span>
                <ul className="space-y-1">
                  {seg.pain_points.map((p, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-300 leading-snug">
                      • {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Acquisition channels */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                <Megaphone className="h-3 w-3" /> Acquisition Channels
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seg.acquisition_channels.map((ch, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
