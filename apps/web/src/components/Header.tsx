import React from 'react';

export function Header({ apiStatus }: { apiStatus: string }) {
  return (
    <header style={{ background: '#0f172a', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '20px' }}>Ethiopian Health Worker AI Copilot 🩺🇪🇹</h2>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>MoH Guideline & WHO SMART Clinical Decision Support System</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ background: apiStatus === 'online' ? '#059669' : '#dc2626', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
          API: {apiStatus.toUpperCase()}
        </span>
      </div>
    </header>
  );
}
