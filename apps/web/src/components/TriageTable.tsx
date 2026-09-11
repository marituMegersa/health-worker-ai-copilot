import React from 'react';

export function TriageTable({ records }: { records: any[] }) {
  return (
    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>📋 Clinical Triage Evaluation History</h3>
      {records.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '14px' }}>No clinical triage records evaluated yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '0.75rem' }}>Patient ID</th>
              <th style={{ padding: '0.75rem' }}>Protocol</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Gestational Age</th>
              <th style={{ padding: '0.75rem' }}>Systolic BP</th>
              <th style={{ padding: '0.75rem' }}>Evaluated At</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{r.patient_id}</td>
                <td style={{ padding: '0.75rem' }}>{r.protocol_type}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: r.triage_category === 'AMBER' ? '#fef3c7' : '#dcfce7', color: r.triage_category === 'AMBER' ? '#b45309' : '#15803d', fontWeight: 'bold', fontSize: '12px' }}>
                    {r.triage_category}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>{r.gestational_age_weeks} wks</td>
                <td style={{ padding: '0.75rem' }}>{r.systolic_bp} mmHg</td>
                <td style={{ padding: '0.75rem', color: '#64748b' }}>{r.evaluated_at || r.created_at || 'Just now'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
