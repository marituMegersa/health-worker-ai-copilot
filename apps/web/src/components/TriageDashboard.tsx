import React from 'react';

export function TriageDashboard({ total, alerts }: { total: number, alerts: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>TOTAL PATIENTS SCREENED</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginTop: '0.25rem' }}>{total}</div>
      </div>
      <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>PRE-ECLAMPSIA RISK ALERTS</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginTop: '0.25rem' }}>{alerts}</div>
      </div>
      <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>CLINICAL GUIDELINE STATUS</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', marginTop: '0.25rem' }}>MoH 2024 ACTIVE</div>
      </div>
    </div>
  );
}
