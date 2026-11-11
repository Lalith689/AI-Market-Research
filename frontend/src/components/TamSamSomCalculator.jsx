import React, { useState } from 'react';
import { Calculator, TrendingUp, PieChart, Info, HelpCircle } from 'lucide-react';

export default function TamSamSomCalculator({ sizing }) {
  const [marketShare, setMarketShare] = useState(sizing.default_som_percentage || 2.5);
  const [acv, setAcv] = useState(2500); // Default $2,500 ACV

  // Dynamic client-side recalculation:
  // Dynamically recalculate SOM in Billions based on current SAM and market share slider
  const dynamicSomBillions = (sizing.sam_value * (marketShare / 100)).toFixed(2);
  const dynamicSomDollars = (sizing.sam_value * 1_000_000_000 * (marketShare / 100));
  const estimatedCustomersNeeded = Math.round(dynamicSomDollars / (acv || 1)).toLocaleString();

  // Proportional percentages for visual representation
  const samPercentOfTam = Math.min(100, Math.round((sizing.sam_value / sizing.tam_value) * 100));
  const somPercentOfSam = Math.min(100, Math.round((sizing.som_value / sizing.sam_value) * 100));

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-6">
      
      {/* Title & Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PieChart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Market Sizing (TAM / SAM / SOM)</h3>
            <p className="text-xs text-slate-400">Top-down & bottom-up addressable market breakdown</p>
          </div>
        </div>
        
        {/* CAGR Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-300">
            +{sizing.cagr_rate}% CAGR ({sizing.cagr_period})
          </span>
        </div>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* TAM Card */}
        <div className="bg-slate-950/70 border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">TAM</span>
            <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Total Demand</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white">${sizing.tam_value}B</span>
            <span className="text-sm font-semibold text-slate-400">Total</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {sizing.tam_methodology}
          </p>
        </div>

        {/* SAM Card */}
        <div className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SAM</span>
            <span className="text-[10px] text-purple-300/80 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
              {samPercentOfTam}% of TAM
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white">${sizing.sam_value}B</span>
            <span className="text-sm font-semibold text-slate-400">Target</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {sizing.sam_methodology}
          </p>
        </div>

        {/* SOM Card */}
        <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SOM (Target)</span>
            <span className="text-[10px] text-emerald-300/80 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              {sizing.default_som_percentage}% Target
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-white">${sizing.som_value}B</span>
            <span className="text-sm font-semibold text-slate-400">Attainable</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {sizing.som_methodology}
          </p>
        </div>

      </div>

      {/* Proportional Concentric Funnel Bar */}
      <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Market Filter Distribution</span>
          <span>TAM ($ {sizing.tam_value}B) → SAM (${sizing.sam_value}B) → Target SOM (${sizing.som_value}B)</span>
        </div>
        <div className="h-4 bg-slate-900 rounded-full overflow-hidden flex p-0.5 gap-1 border border-slate-800">
          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '100%' }} title="TAM: 100%" />
          <div className="bg-purple-500 h-full rounded-full -ml-full opacity-70" style={{ width: `${samPercentOfTam}%` }} title={`SAM: ${samPercentOfTam}%`} />
        </div>
      </div>

      {/* Interactive Dynamic Market Share Calculator */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/20 border border-indigo-500/20 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Calculator className="h-4 w-4 text-indigo-400" />
          <span>Interactive Sensitivity Analysis & Dynamic TAM/SAM/SOM Calculator</span>
        </div>
        <p className="text-xs text-slate-400">
          Adjust the sliders below to test scenario modeling: simulate varying penetration percentages of the Serviceable Addressable Market (${sizing.sam_value}B).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Slider 1: Target Market Share */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Target SAM Market Share:</span>
              <span className="text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                {marketShare}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="15.0"
              step="0.1"
              value={marketShare}
              onChange={(e) => setMarketShare(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.1% (Conservative)</span>
              <span>2.5% (Base)</span>
              <span>15.0% (Aggressive)</span>
            </div>
          </div>

          {/* Input 2: Target ACV / Pricing */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Estimated Annual Contract Value (ACV):</span>
              <span className="text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                ${acv.toLocaleString()}/yr
              </span>
            </div>
            <input
              type="number"
              min="100"
              max="1000000"
              step="500"
              value={acv}
              onChange={(e) => setAcv(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

        </div>

        {/* Dynamic Calculation Output Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Dynamic Attainable Revenue (SOM)</span>
            <p className="text-xl font-extrabold text-emerald-400 mt-0.5">
              ${dynamicSomBillions}B <span className="text-xs text-slate-400 font-normal">/ year</span>
            </p>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider">Customers Needed at Target ACV</span>
            <p className="text-xl font-extrabold text-indigo-300 mt-0.5">
              ~{estimatedCustomersNeeded} <span className="text-xs text-slate-400 font-normal">paying accounts</span>
            </p>
          </div>
        </div>

      </div>

      {/* Growth Drivers */}
      {sizing.growth_drivers && sizing.growth_drivers.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Macro Tailwinds & Growth Drivers</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sizing.growth_drivers.map((driver, idx) => (
              <div key={idx} className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                <span className="text-indigo-400 font-bold mr-1.5">{idx + 1}.</span>
                {driver}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
