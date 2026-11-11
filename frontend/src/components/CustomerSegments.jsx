import React from 'react';

export default function CustomerSegments({ segments }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 sm:p-7 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/70">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">Customer Segmentation & ICP Personas</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Target buyer profiles, price tolerance, pain points, and distribution channels</p>
        </div>
      </div>

      {/* Segments Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-3 flex flex-col justify-between"
          >
            <div>
              {/* Persona Title & Willingness to Pay */}
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-zinc-800/70">
                <div>
                  <h4 className="text-sm font-bold text-zinc-100 tracking-tight">{seg.persona}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{seg.description}</p>
                </div>
              </div>

              {/* Willingness to Pay Strip */}
              <div className="mt-2.5 flex items-center justify-between bg-zinc-900/50 px-2.5 py-1.5 rounded border border-zinc-800/60 text-xs">
                <span className="text-zinc-400 text-[11px] font-mono">Willingness to Pay:</span>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-zinc-800 text-zinc-200 border border-zinc-700">
                  {seg.willingness_to_pay}
                </span>
              </div>

              {/* Pain points */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                  Core Pain Points
                </span>
                <ul className="space-y-1">
                  {seg.pain_points.map((p, pIdx) => (
                    <li key={pIdx} className="text-xs text-zinc-300 leading-snug">
                      • {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Acquisition channels */}
            <div className="pt-2.5 border-t border-zinc-800/70">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold mb-1">
                Acquisition Channels
              </span>
              <div className="flex flex-wrap gap-1">
                {seg.acquisition_channels.map((ch, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
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
