import React from 'react';
import { X, Trash2, Clock, ChevronRight, FileText } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, reports, onSelectReport, onDeleteReport }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 p-5 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-100">Research History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* List of Reports */}
          <div className="flex-1 overflow-y-auto py-3 space-y-2">
            {reports.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                <FileText className="h-6 w-6 mx-auto mb-2 opacity-40" />
                No saved research yet.
              </div>
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="group relative bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-lg p-3 transition-colors flex items-start justify-between gap-3 cursor-pointer"
                  onClick={() => {
                    onSelectReport(report.id);
                    onClose();
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-zinc-100 group-hover:text-white truncate">
                        {report.company_name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {report.tam_summary}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{report.industry}</p>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1.5 block">
                      {new Date(report.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReport(report.id);
                      }}
                      className="p-1.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                      title="Delete Report"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-500 text-center">
            Persisted locally in SQLite engine.
          </div>

        </div>
      </div>
    </div>
  );
}
