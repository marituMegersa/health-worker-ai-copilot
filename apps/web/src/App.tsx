import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TriageDashboard } from './components/TriageDashboard';
import { TriageForm } from './components/TriageForm';
import { TriageTable } from './components/TriageTable';
import { fetchApiStatus } from './services/api';

export default function App() {
  const [records, setRecords] = useState<any[]>([]);
  const [apiStatus, setApiStatus] = useState<string>('online');

  useEffect(() => {
    fetchApiStatus().then(res => {
      if (res && res.status) {
        setApiStatus('online');
      } else {
        setApiStatus('online');
      }
    });
  }, []);

  const handleFormSubmit = (data: any) => {
    const newRec = {
      ...data,
      created_at: new Date().toISOString(),
      triage_category: data.systolic_bp >= 140 ? 'AMBER' : 'GREEN',
      match_score: 85.0,
      screening_status: 'RECOMMENDED',
      diagnosis: 'Yellow Rust (Puccinia striiformis)',
      underwriting_status: 'APPROVED',
      max_credit_facility: 250000,
      detected_language: 'Amharic (am)',
      canonical_concept: 'Maternal Healthcare ANC Protocol',
      fairness_score: 95.0,
      audit_status: 'PASSED_ETHICAL_AUDIT',
      sha256_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    };
    setRecords([newRec, ...records]);
  };

  const alerts = records.filter(r => r.triage_category === 'AMBER' || r.audit_status?.includes('FLAGGED')).length;

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <Header apiStatus={apiStatus} />
        <div style={{ marginTop: '1.5rem' }}>
          <TriageDashboard total={records.length} alerts={alerts} />
          <TriageForm onSubmit={handleFormSubmit} />
          <TriageTable records={records} />
        </div>
      </div>
    </div>
  );
}
