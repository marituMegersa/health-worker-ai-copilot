import React from 'react';

export function CitationInspector({ triageResult }: { triageResult: any }) {
  if (!triageResult) return null;
  const isAmber = triageResult.triageCategory === 'AMBER';

  return (
    <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: isAmber ? '#fffbebf' : '#f0fdf4', border: `1px solid ${isAmber ? '#fde68a' : '#bbf7d0'}`, borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: isAmber ? '#92400e' : '#166534' }}>
          Triage Status: {triageResult.triageCategory}
        </h4>
        <span style={{ padding: '0.25rem 0.75rem', background: isAmber ? '#f59e0b' : '#22c55e', color: '#fff', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
          {isAmber ? 'Requires HEW Confirmation' : 'Routine Care'}
        </span>
      </div>
      <p style={{ marginTop: '0.75rem', color: '#334155' }}>{triageResult.recommendation}</p>
      
      <div style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
        <strong style={{ fontSize: '12px', color: '#64748b' }}>WHO / MoH Evidence Citations:</strong>
        <ul style={{ margin: '0.5rem 0 0 1.25rem', color: '#475569', fontSize: '13px' }}>
          {triageResult.citations.map((c: string, idx: number) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
