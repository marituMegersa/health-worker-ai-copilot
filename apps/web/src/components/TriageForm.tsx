import React, { useState } from 'react';

export function TriageForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [patientId, setPatientId] = useState('PAT-9842');
  const [protocol, setProtocol] = useState('ANC_VISIT_2');
  const [gestationalAge, setGestationalAge] = useState(24);
  const [systolicBp, setSystolicBp] = useState(142);
  const [symptoms, setSymptoms] = useState('Severe headache, blurred vision');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      patient_id: patientId,
      protocol_type: protocol,
      gestational_age_weeks: Number(gestationalAge),
      systolic_bp: Number(systolicBp),
      symptoms: symptoms.split(',').map(s => s.trim())
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>🩺 Patient Clinical Intake Form</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Patient ID</label>
          <input value={patientId} onChange={e => setPatientId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Protocol Workflow</label>
          <select value={protocol} onChange={e => setProtocol(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            <option value="ANC_VISIT_1">ANC Visit 1</option>
            <option value="ANC_VISIT_2">ANC Visit 2</option>
            <option value="PRE_ECLAMPSIA">Pre-Eclampsia Screening</option>
            <option value="PEDIATRIC_IMCI">Pediatric IMCI</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Gestational Age (Weeks)</label>
          <input type="number" value={gestationalAge} onChange={e => setGestationalAge(Number(e.target.value))} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Systolic BP (mmHg)</label>
          <input type="number" value={systolicBp} onChange={e => setSystolicBp(Number(e.target.value))} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Observed Symptoms (Comma separated)</label>
        <input value={symptoms} onChange={e => setSymptoms(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
      </div>
      <button type="submit" style={{ marginTop: '1rem', background: '#0284c7', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
        Evaluate Guidelines & Save Record
      </button>
    </form>
  );
}
