import React, { useState } from 'react';

export default function App() {
  const [data, setData] = useState<any>(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ padding: '1rem', background: '#0f172a', color: '#fff', borderRadius: '8px' }}>
        <h2>Health Worker AI Copilot</h2>
        <p style={{ fontSize: '14px', color: '#94a3b8' }}>WHO SMART Guidelines & Ethiopian MoH Decision Support Platform</p>
      </header>

      <main style={{ marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h3>System Status</h3>
          <p><strong>Backend Engine:</strong> Python 3.12 FastAPI (`apps/api`)</p>
          <p><strong>Frontend Interface:</strong> React 18 TypeScript (`apps/web`)</p>
          <button
            onClick={() => setData({ status: 'Active', timestamp: new Date().toISOString() })}
            style={{ padding: '0.75rem 1.5rem', background: '#0d9488', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Check API Status
          </button>
          {data && <pre style={{ marginTop: '1rem', background: '#fff', padding: '1rem', borderRadius: '4px' }}>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      </main>
    </div>
  );
}
