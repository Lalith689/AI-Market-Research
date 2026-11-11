import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ReportHeader from './components/ReportHeader';
import TamSamSomCalculator from './components/TamSamSomCalculator';
import SwotAnalysis from './components/SwotAnalysis';
import CompetitorTable from './components/CompetitorTable';
import CustomerSegments from './components/CustomerSegments';
import StrategicRecommendations from './components/StrategicRecommendations';
import SourcesList from './components/SourcesList';
import HistoryDrawer from './components/HistoryDrawer';
import SettingsModal from './components/SettingsModal';
import {
  generateResearch,
  fetchReports,
  fetchReportById,
  deleteReport
} from './services/api';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentReport, setCurrentReport] = useState(null);
  const [reportsHistory, setReportsHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // User-configured LLM provider & API key (persisted in localStorage)
  const [provider, setProvider] = useState(() => localStorage.getItem('marketlens_provider') || 'mock');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('marketlens_api_key') || '');

  useEffect(() => {
    localStorage.setItem('marketlens_provider', provider);
  }, [provider]);

  useEffect(() => {
    localStorage.setItem('marketlens_api_key', apiKey);
  }, [apiKey]);

  // Load existing reports on first visit
  useEffect(() => {
    loadReportsHistory();
  }, []);

  const loadReportsHistory = async () => {
    try {
      const history = await fetchReports();
      setReportsHistory(history);
      
      // If there are existing reports and no current report, load the latest one
      if (history.length > 0 && !currentReport) {
        const latest = await fetchReportById(history[0].id);
        setCurrentReport(latest);
      } else if (history.length === 0 && !currentReport) {
        // Kick off an initial sample report for instant demo polish
        handleSearch('Figma');
      }
    } catch (err) {
      console.warn('Could not connect to backend on initial load. Ensure backend is running.', err);
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const report = await generateResearch(query, 'full', provider, apiKey);
      setCurrentReport(report);
      // Refresh history list in background
      const updatedHistory = await fetchReports();
      setReportsHistory(updatedHistory);
    } catch (err) {
      setError(err.message || 'An error occurred during research generation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectReport = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const report = await fetchReportById(id);
      setCurrentReport(report);
    } catch (err) {
      setError(err.message || 'Failed to load selected report.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await deleteReport(id);
      setReportsHistory((prev) => prev.filter((r) => r.id !== id));
      if (currentReport && currentReport.id === id) {
        setCurrentReport(null);
      }
    } catch (err) {
      alert('Failed to delete report: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Navbar */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={reportsHistory.length}
        currentReport={currentReport}
        onOpenSettings={() => setIsSettingsOpen(true)}
        provider={provider}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Search & Intelligence Input */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Error Alert */}
        {error && (
          <div className="max-w-4xl mx-auto bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 flex items-center justify-between text-rose-300 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleSearch('Figma')}
              className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-xs font-medium text-rose-200 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Active Research Report Dashboard */}
        {currentReport && !isLoading && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Header & Executive Summary */}
            <ReportHeader
              overview={currentReport.overview}
              executiveSummary={currentReport.executive_summary}
              createdAt={currentReport.created_at}
            />

            {/* TAM / SAM / SOM Interactive Dynamic Calculator */}
            <TamSamSomCalculator sizing={currentReport.market_sizing} />

            {/* 2x2 SWOT Matrix */}
            <SwotAnalysis swot={currentReport.swot} />

            {/* Competitor Comparison Landscape */}
            <CompetitorTable competitors={currentReport.competitors} />

            {/* Customer Segmentation & Buyer Personas */}
            <CustomerSegments segments={currentReport.customer_segments} />

            {/* Strategic Recommendations */}
            <StrategicRecommendations recommendations={currentReport.strategic_recommendations} />

            {/* Verified Sources & Citations */}
            <SourcesList sources={currentReport.sources} />

          </div>
        )}

      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        provider={provider}
        setProvider={setProvider}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {/* History Slide-Over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        reports={reportsHistory}
        onSelectReport={handleSelectReport}
        onDeleteReport={handleDeleteReport}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500 space-y-2">
        <p>
          <strong className="text-slate-400">MarketLens AI</strong> — Built with React, FastAPI, Pydantic, SQLAlchemy & ReportLab.
        </p>
        <p>Architected for deterministic structured outputs, live web grounding, and real-time sensitivity analysis.</p>
      </footer>

    </div>
  );
}
