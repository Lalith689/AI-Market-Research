import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

export default function TamSamSomCalculator({ sizing }) {
  const [marketShare, setMarketShare] = useState(sizing.default_som_percentage || 2.5);
  const [acv, setAcv] = useState(2400);

  // Dynamic calculations
  const dynamicSomBillions = (sizing.sam_value * (marketShare / 100)).toFixed(2);
  const dynamicSomDollars = sizing.sam_value * 1_000_000_000 * (marketShare / 100);
  const estimatedCustomersNeeded = Math.round(dynamicSomDollars / (acv || 1)).toLocaleString();

  const samPercentOfTam = Math.min(100, Math.round((sizing.sam_value / sizing.tam_value) * 100));

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 sm:p-7 space-y-6">
      
      {/* Title & Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/70">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">Market Sizing (TAM / SAM / SOM)</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Top-down total market demand down to near-term attainable capture</p>
        </div>
        
        {/* CAGR Projection */}
        <div className="inline-flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800 text-xs self-start sm:self-auto font-mono">
          <TrendingUp className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-zinc-200 font-semibold">+{sizing.cagr_rate}% CAGR</span>
          <span className="text-zinc-500">({sizing.cagr_period})</span>
        </div>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* TAM */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">TAM</span>
            <span className="text-[10px] text-zinc-500 font-mono">Total Market</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">${sizing.tam_value}B</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed pt-1 border-t border-zinc-900">
            {sizing.tam_methodology}
          </p>
        </div>

        {/* SAM */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">SAM</span>
            <span className="text-[10px] text-zinc-500 font-mono">{samPercentOfTam}% of TAM</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">${sizing.sam_value}B</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed pt-1 border-t border-zinc-900">
            {sizing.sam_methodology}
          </p>
        </div>

        {/* SOM */}
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">SOM</span>
            <span className="text-[10px] text-zinc-500 font-mono">{sizing.default_som_percentage}% Base Target</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">${sizing.som_value}B</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed pt-1 border-t border-zinc-900">
            {sizing.som_methodology}
          </p>
        </div>

      </div>

      {/* Interactive Sensitivity Analysis Calculator */}
      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-zinc-400" />
            <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-zinc-200">
              Interactive Sensitivity Modeler
            </h4>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">Real-time dynamic recalculation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          
          {/* Slider 1: Target SAM Share */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Assumed SAM Market Share:</span>
              <span className="text-zinc-100 font-mono font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                {marketShare}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="20.0"
              step="0.1"
              value={marketShare}
              onChange={(e) => setMarketShare(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer accent-zinc-200"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>0.1% Conservative</span>
              <span>{sizing.default_som_percentage}% Base</span>
              <span>20% Aggressive</span>
            </div>
          </div>

          {/* Input 2: Average Revenue Per User / ACV */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Average Contract / Subscriber ARPU:</span>
              <span className="text-zinc-100 font-mono font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                ${acv.toLocaleString()}/yr
              </span>
            </div>
            <input
              type="number"
              min="10"
              max="1000000"
              step="100"
              value={acv}
              onChange={(e) => setAcv(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-100 font-mono focus:outline-none focus:border-zinc-600"
            />
          </div>

        </div>

        {/* Dynamic Model Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-md p-3 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Modeled Attainable Revenue</span>
            <span className="text-xl font-bold font-mono text-zinc-100 mt-0.5 inline-block">${dynamicSomBillions}B</span>
            <span className="text-xs text-zinc-500 ml-1 font-mono">annual run-rate</span>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-md p-3 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Subscribers / Accounts Needed</span>
            <span className="text-xl font-bold font-mono text-zinc-100 mt-0.5 inline-block">~{estimatedCustomersNeeded}</span>
            <span className="text-xs text-zinc-500 ml-1 font-mono">accounts</span>
          </div>
        </div>

      </div>

      {/* Growth Drivers */}
      {sizing.growth_drivers && sizing.growth_drivers.length > 0 && (
        <div className="pt-1">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">Macro Growth Tailwinds</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {sizing.growth_drivers.map((driver, idx) => (
              <div key={idx} className="bg-zinc-950/60 border border-zinc-800/60 rounded-lg p-3 text-xs text-zinc-300 leading-relaxed">
                <span className="text-zinc-500 font-mono mr-1.5">{idx + 1}.</span>
                {driver}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
