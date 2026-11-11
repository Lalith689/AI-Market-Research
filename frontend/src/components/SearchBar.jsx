import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Loader2, ArrowRight } from 'lucide-react';

const PRESETS = [
  'Cursor',
  'Linear',
  'Stripe',
  'Figma',
  'Datadog',
  'AI Coding Agents'
];

const LOADING_STEPS = [
  'Querying web indices for live market signals...',
  'Extracting competitors and pricing benchmarks...',
  'Calculating TAM, SAM & SOM formula models...',
  'Synthesizing SWOT matrix & buyer personas...',
  'Compiling executive report with verified citations...'
];

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSearch(query.trim());
  };

  const handlePresetClick = (preset) => {
    if (isLoading) return;
    setQuery(preset);
    onSearch(preset);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Strategic Intelligence, <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Grounded in Data</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Enter any company, startup, or market sector to generate an investor-grade research report.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 shadow-2xl shadow-indigo-950/40 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <div className="pl-3 pr-2 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. Cursor, Stripe, AI Code Generation, Cybersecurity..."
            className="w-full bg-transparent border-none text-white text-base sm:text-lg placeholder:text-slate-500 focus:outline-none focus:ring-0 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-600/30 flex-shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span className="hidden sm:inline">Researching...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-indigo-200" />
                <span>Generate Report</span>
                <ArrowRight className="h-4 w-4 hidden sm:inline" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Animated Loading Status */}
      {isLoading && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-indigo-500/30 text-center animate-pulse">
          <div className="flex items-center justify-center gap-2 text-indigo-400 text-xs sm:text-sm font-medium">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{LOADING_STEPS[stepIndex]}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden max-w-md mx-auto">
            <div
              className="bg-indigo-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${((stepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Preset Suggested Queries */}
      {!isLoading && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Try researching:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all"
            >
              {preset}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
