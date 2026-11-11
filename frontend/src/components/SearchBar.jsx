import React, { useState, useEffect } from 'react';
import { Search, Loader2, CornerDownLeft } from 'lucide-react';

const PRESETS = [
  'Reliance Jio',
  'Figma',
  'Stripe',
  'Linear',
  'Datadog',
  'Airtel'
];

const LOADING_STEPS = [
  'Querying Wikipedia and live market indices...',
  'Extracting market metrics, revenues & competitors...',
  'Computing TAM, SAM & SOM formula assumptions...',
  'Structuring strategic SWOT quadrants & personas...',
  'Synthesizing final executive intelligence report...'
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
    }, 1400);
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
    <div className="w-full max-w-3xl mx-auto pt-6 pb-4">
      {/* Editorial Header - Restrained, clean, institutional */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
          Strategic Market Intelligence
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Structured competitive landscapes, addressable market sizing, and strategic analysis for any global enterprise.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-zinc-900/90 border border-zinc-800 rounded-lg p-1.5 shadow-sm transition-all focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600">
          
          <div className="pl-3 pr-2 text-zinc-500">
            <Search className="h-4 w-4" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder="Search any company, ticker, or vertical (e.g. Reliance Jio, Figma, Stripe)..."
            className="w-full bg-transparent border-none text-zinc-100 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-0 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-900" />
                <span>Researching</span>
              </>
            ) : (
              <>
                <span>Analyze</span>
                <CornerDownLeft className="h-3 w-3 text-zinc-500" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading state tracker */}
      {isLoading && (
        <div className="mt-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-center">
          <div className="flex items-center justify-center gap-2 text-zinc-300 text-xs font-mono">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
            <span>{LOADING_STEPS[stepIndex]}</span>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-2.5 overflow-hidden max-w-xs mx-auto">
            <div
              className="bg-zinc-300 h-full transition-all duration-500 ease-out"
              style={{ width: `${((stepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Minimal presets */}
      {!isLoading && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          <span className="text-[11px] text-zinc-500 font-mono">Quick test:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className="text-[11px] px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
