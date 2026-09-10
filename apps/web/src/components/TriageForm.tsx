import React, { useState } from 'react';

export function TriageForm({ onTriage }: { onTriage: (result: any) => void }) {
  const [patientId, setPatientId] = useState('PAT-9842');
  const [protocol, setProtocol] = useState('ANC_VISIT_1');
  const [gestationalAge, setGestationalAge] = useState(24);
  const [systolicBp, setSystolicBp] = useState(135);
  const [symptoms, setSymptoms] = useState('Severe headache, epigastric pain');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAmber = systolicBp >= 140 || symptoms.includes('headache');
    onTriage({
      patientId,
      protocol,
      triageCategory: isAmber ? 'AMBER' : 'GREEN',
      recommendation: isAmber 
        ? 'Protocol Warning: Possible Pre-Eclampsia. Administer MgSO4 per MoH guidelines & schedule emergency referral.' 
        : 'Routine ANC Visit 2 protocol: Administer Iron + Folic Acid.',
      citations: ['Ethiopian MoH ANC Clinical Directive 2024, Sec 4.2', 'WHO SMART ANC Guidelines Module 3']
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>🩺 Clinical Decision Support Intake</h3>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Patient ID</label>
          <input value={patientId} onChange={e => setPatientId(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Guideline Workflow</label>
          <select value={protocol} onChange={e => setProtocol(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            <option value="ANC_VISIT_1">MoH ANC Visit 1-4</option>
            <option value="PRE_ECLAMPSIA">Severe Pre-Eclampsia Screening</option>
            <option value="PEDIATRIC_IMCI">Pediatric IMCI (Fever/Malaria)</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Gestational Age (Weeks)</label>
          <input type="number" value={gestationalAge} onChange={e => setGestationalAge(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Systolic BP (mmHg)</label>
          <input type="number" value={systolicBp} onChange={e => setSystolicBp(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Observed Symptoms</label>
        <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', height: '60px' }} />
      </div>
      <button type="submit" style={{ marginTop: '1rem', background: '#0284c7', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
        Evaluate Guideline Rules
      </button>
    </form>
  );
}
