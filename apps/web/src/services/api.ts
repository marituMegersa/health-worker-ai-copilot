export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchApiStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/healthz`);
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: String(err) };
  }
}

export async function postDomainAction(endpoint: string, payload: any) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    return { status: 'error', detail: String(err) };
  }
}
