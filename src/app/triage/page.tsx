'use client';

import { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Mic, 
  MicOff, 
  Pill, 
  FileText, 
  Activity, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { AssessmentResult } from '@/lib/ai/copilot';

export default function TriagePage() {
  const [formData, setFormData] = useState({
    patientName: 'Amina Bello',
    ageYears: 3,
    gender: 'Female',
    temperatureC: 39.2,
    systolicBp: 100,
    diastolicBp: 65,
    heartRateBpm: 125,
    muacCm: 11.2,
    mRdtResult: 'POSITIVE',
    chiefComplaint: 'High fever for 2 days, vomiting everything, child is very weak',
    symptoms: ['Fever', 'Vomiting', 'Loss of appetite', 'Lethargy'],
    dangerSignsPresent: ['Unable to drink or breastfeed', 'Lethargic or unconscious'],
    locationDistrict: 'Kagoro District'
  });

  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleDangerSignToggle = (sign: string) => {
    setFormData(prev => ({
      ...prev,
      dangerSignsPresent: prev.dangerSignsPresent.includes(sign)
        ? prev.dangerSignsPresent.filter(s => s !== sign)
        : [...prev.dangerSignsPresent, sign]
    }));
  };

  const simulateVoiceRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setFormData(prev => ({
        ...prev,
        chiefComplaint: 'Patient presents with acute high fever (39.2C), severe chills, vomiting after eating, and MUAC measurement of 11.2cm.',
        temperatureC: 39.2,
        muacCm: 11.2,
        symptoms: Array.from(new Set([...prev.symptoms, 'Fever', 'Vomiting', 'Chills']))
      }));
    }, 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setAssessment(data.assessment);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-7 h-7 text-teal-600" />
            AI Clinical Triage Assistant & Protocol Engine
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Aligned with WHO IMCI, ANC & CDC guidelines. Supports instant risk scoring, dosage calculation, and emergency red-flag alerts.
          </p>
        </div>

        <button
          onClick={simulateVoiceRecording}
          disabled={isRecording}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
            isRecording
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-teal-400" />}
          {isRecording ? 'Listening to Consultation Notes...' : 'Simulate Voice Consultation Intake'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              Patient Assessment & Vitals Entry
            </h2>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.ageYears}
                  onChange={e => setFormData({ ...formData, ageYears: Number(e.target.value) })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>

            {/* Vitals Grid */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Clinical Vitals</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Temp (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperatureC}
                    onChange={e => setFormData({ ...formData, temperatureC: Number(e.target.value) })}
                    className="w-full text-sm p-2 rounded-md border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">BP (Systolic)</label>
                  <input
                    type="number"
                    value={formData.systolicBp}
                    onChange={e => setFormData({ ...formData, systolicBp: Number(e.target.value) })}
                    className="w-full text-sm p-2 rounded-md border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">MUAC (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.muacCm}
                    onChange={e => setFormData({ ...formData, muacCm: Number(e.target.value) })}
                    className="w-full text-sm p-2 rounded-md border border-slate-300"
                    placeholder="Pediatric"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Malaria mRDT</label>
                  <select
                    value={formData.mRdtResult}
                    onChange={e => setFormData({ ...formData, mRdtResult: e.target.value as any })}
                    className="w-full text-sm p-2 rounded-md border border-slate-300"
                  >
                    <option value="POSITIVE">POSITIVE (+)</option>
                    <option value="NEGATIVE">NEGATIVE (-)</option>
                    <option value="NOT_PERFORMED">Not Done</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Chief Complaint & Presentation</label>
              <textarea
                rows={2}
                value={formData.chiefComplaint}
                onChange={e => setFormData({ ...formData, chiefComplaint: e.target.value })}
                className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Symptoms Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Active Symptoms (Select all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Fever',
                  'Vomiting',
                  'Lethargy',
                  'Loss of appetite',
                  'Chills',
                  'Severe headache',
                  'Blurred vision',
                  'Diarrhea',
                  'Coughing (>2wks)',
                  'Swollen ankles'
                ].map(symptom => {
                  const active = formData.symptoms.includes(symptom);
                  return (
                    <button
                      type="button"
                      key={symptom}
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        active
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {active ? '✓ ' : '+ '} {symptom}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* WHO Danger Signs Checklist */}
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                WHO Emergency Red Flag Checklist
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Unable to drink or breastfeed',
                  'Vomiting everything',
                  'Convulsions or seizures during illness',
                  'Lethargic or unconscious',
                  'BP >= 160/110 mmHg',
                  'Severe shortness of breath'
                ].map(sign => {
                  const checked = formData.dangerSignsPresent.includes(sign);
                  return (
                    <label key={sign} className="flex items-center gap-2 text-rose-950 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleDangerSignToggle(sign)}
                        className="rounded border-rose-300 text-rose-600 focus:ring-rose-500"
                      />
                      <span>{sign}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Evaluating Clinical Protocols...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Evaluate Triage & Run AI Copilot Assessment
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {assessment ? (
            <div className="space-y-6">
              {/* Triage Risk Banner */}
              <div
                className={`p-6 rounded-2xl text-white shadow-xl space-y-3 ${
                  assessment.riskLevel.includes('RED')
                    ? 'bg-rose-600'
                    : assessment.riskLevel.includes('YELLOW')
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">
                    Triage Classification
                  </span>
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black">{assessment.riskLevel}</h3>
                <p className="text-sm font-medium opacity-90">{assessment.summary}</p>
              </div>

              {/* Matched WHO Protocol Card */}
              {assessment.matchedProtocol && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Matched WHO Protocol
                  </div>
                  <h4 className="font-bold text-slate-900">{assessment.matchedProtocol.name}</h4>
                  <p className="text-xs text-slate-500">Ref: {assessment.matchedProtocol.whoReference}</p>
                </div>
              )}

              {/* Differential Diagnosis */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  AI Differential Diagnosis
                </h4>
                <div className="space-y-2">
                  {assessment.differentialDiagnoses.map((diag, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{diag.condition}</span>
                        <span className="text-teal-600">{Math.round(diag.confidence * 100)}% match</span>
                      </div>
                      <p className="text-slate-600">{diag.justification}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Clinical Actions */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-teal-600" />
                  Recommended Treatment Pathway
                </h4>
                <ul className="space-y-2">
                  {assessment.suggestedActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prescribed Medications & Dosage */}
              {assessment.recommendedMedications.length > 0 && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Pill className="w-4 h-4 text-emerald-600" />
                    Medication Dosage Calculator
                  </h4>
                  <div className="space-y-2">
                    {assessment.recommendedMedications.map((med, i) => (
                      <div key={i} className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs space-y-1">
                        <div className="font-bold text-emerald-950">{med.name}</div>
                        <div className="text-emerald-800 font-medium">Dosage: {med.dosage}</div>
                        <div className="text-emerald-700 text-[11px]">{med.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-100 p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">No Triage Evaluated Yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Fill out the patient vitals and symptoms on the left, or click "Simulate Voice Consultation Intake" to generate an immediate assessment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
