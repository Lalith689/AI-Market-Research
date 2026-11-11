import React from 'react';
import { X, Trash2, Clock, ChevronRight, FileText } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, reports, onSelectReport, onDeleteReport }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 p-6 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Research History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List of Reports */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {reports.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                No saved reports yet. Run a search to create your first market analysis!
              </div>
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="group relative bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-4 transition-all flex items-start justify-between gap-3 cursor-pointer"
                  onClick={() => {
                    onSelectReport(report.id);
                    onClose();
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {report.company_name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {report.tam_summary}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 truncate">{report.industry}</p>
                    <span className="text-[10px] text-slate-500 mt-2 block">
                      {new Date(report.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReport(report.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Report"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
            Persisted securely in local SQLite database.
          </div>

        </div>
      </div>
    </div>
  );
}
