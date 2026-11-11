/**
 * API Service Client.
 * 
 * Why this file exists:
 * Follows the 'Separation of Concerns' principle.
 * React UI components should never make raw fetch calls with hardcoded URLs.
 * By centralizing network logic in this service layer:
 * 1. Base URL changes (e.g. localhost -> production cloud domain) only require updating one variable.
 * 2. Error handling and status code parsing are unified.
 * 3. Components stay clean, declarative, and focused solely on UI state.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export async function generateResearch(query, focus = 'full', provider = null, apiKey = null) {
  const payload = { query, focus };
  if (provider && provider !== 'mock') {
    payload.provider = provider;
    if (apiKey) payload.api_key = apiKey;
  }

  const response = await fetch(`${API_BASE_URL}/research/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to generate research report (${response.status})`);
  }

  return response.json();
}

export async function fetchReports() {
  const response = await fetch(`${API_BASE_URL}/reports`);
  if (!response.ok) {
    throw new Error('Failed to fetch research history');
  }
  return response.json();
}

export async function fetchReportById(reportId) {
  const response = await fetch(`${API_BASE_URL}/reports/${reportId}`);
  if (!response.ok) {
    throw new Error(`Failed to load report ${reportId}`);
  }
  return response.json();
}

export async function deleteReport(reportId) {
  const response = await fetch(`${API_BASE_URL}/reports/${reportId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete report');
  }
  return true;
}

export function getExportPdfUrl(reportId) {
  return `${API_BASE_URL}/reports/${reportId}/export-pdf`;
}
