// Basic API helpers to keep things organized.
// This file is intentionally simple; replace with real API calls as needed.

export const API_BASE = "https://example.com/api";

export async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Network error");
  }

  return response.json();
}
