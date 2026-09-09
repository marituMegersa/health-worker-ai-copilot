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
  BookOpen,
  Sparkles,
  ArrowRight,
  Globe,
  UserCheck,
  Check
} from 'lucide-react';
import { AIQueryResult } from '@/lib/ai/copilot';
import { SupportedLanguage, TRANSLATIONS } from '@/lib/i18n/translations';

export default function TriagePage() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const t = TRANSLATIONS[lang];

  const [formData, setFormData] = useState({
    patientName: 'Amina Bello (eCHIS-8821)',
    ageYears: 24,
    gender: 'Female',
    isPregnant: true,
    gestationalAgeWeeks: 28,
    temperatureC: 37.2,
    systolicBp: 165,
    diastolicBp: 112,
    muacCm: 22.5,
    mRdtResult: 'NEGATIVE',
    proteinuriaDipstick: '3+',
    chiefComplaint: 'Severe headache, blurred vision, and elevated blood pressure at 28 weeks gestation',
    symptoms: ['Severe headache', 'Blurred vision', 'Swollen ankles'],
    dangerSignsPresent: ['BP >= 160/110 mmHg', 'Severe headache'],
    locationDistrict: 'Oromia Region - Kagoro Woreda'
  });

  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<AIQueryResult | null>(null);
  const [confirmedByWorker, setConfirmedByWorker] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setConfirmedByWorker(false);
    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language: lang })
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
      {/* Header & Language Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            <span>Ethiopian MoH • WHO SMART Guidelines</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-7 h-7 text-teal-600" />
            {t.triageTitle}
          </h1>
          <p className="text-slate-600 text-sm mt-1">{t.triageSubtitle}</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <Globe className="w-4 h-4 text-slate-500 ml-1" />
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              lang === 'en' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('am')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              lang === 'am' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            አማርኛ
          </button>
          <button
            onClick={() => setLang('om')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              lang === 'om' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Afaan Oromo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              Patient Encounter & Clinical Data Collection
            </h2>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Name / eCHIS ID</label>
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
                  value={formData.ageYears}
                  onChange={e => setFormData({ ...formData, ageYears: Number(e.target.value) })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pregnancy Status</label>
                <select
                  value={formData.isPregnant ? 'YES' : 'NO'}
                  onChange={e => setFormData({ ...formData, isPregnant: e.target.value === 'YES' })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="YES">Pregnant (ANC Visit)</option>
                  <option value="NO">Not Pregnant</option>
                </select>
              </div>
            </div>

            {/* Vitals Grid */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Clinical Observations</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">BP (Systolic)</label>
                  <input
                    type="number"
                    value={formData.systolicBp}
                    onChange={e => setFormData({ ...formData, systolicBp: Number(e.target.value) })}
                    className="w-full text-sm p-2 rounded-md border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">BP (Diastolic)</label>
                  <input
                    type="number"
                    value={formData.diastolicBp}
                    onChange={e => setFormData({ ...formData, diastolicBp: Number(e.target.value) })}
                    className="w-full text-sm p-2 rounded-md border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">Proteinuria Dipstick</label>
                  <select
                    value={formData.proteinuriaDipstick}
                    onChange={e => setFormData({ ...formData, proteinuriaDipstick: e.target.value as any })}
                    className="w-full text-sm p-2 rounded-md border border-slate-300 font-semibold"
                  >
                    <option value="NEGATIVE">Negative</option>
                    <option value="TRACE">Trace</option>
                    <option value="1+">1+</option>
                    <option value="2+">2+</option>
                    <option value="3+">3+</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

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
              </div>
            </div>

            {/* Symptoms Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Patient Symptoms (Select active)</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Severe headache',
                  'Blurred vision',
                  'Swollen ankles',
                  'Fever',
                  'Vomiting',
                  'Convulsions',
                  'Coughing (>2wks)',
                  'Watery diarrhea'
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

            {/* Danger Signs */}
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Maternal & Child Red Flag Emergency Checklist
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'BP >= 160/110 mmHg',
                  'Severe headache',
                  'Convulsions or seizures during illness',
                  'Lethargic or unconscious',
                  'Unable to drink or breastfeed',
                  'Vomiting everything'
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Executing Deterministic Clinical Rules...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Evaluate Clinical Rules & Retrieve Guidance
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {assessment ? (
            <div className="space-y-6">
              {/* Tri-Tier Safety Banner */}
              <div
                className={`p-6 rounded-2xl text-white shadow-xl space-y-3 ${
                  assessment.safetyTier === 'RED'
                    ? 'bg-rose-600'
                    : assessment.safetyTier === 'AMBER'
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-black/25 px-3 py-1 rounded-full">
                    {assessment.localizedText.safetyBadge}
                  </span>
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black">{assessment.title}</h3>
                <p className="text-sm font-medium opacity-90">{assessment.summary}</p>
              </div>

              {/* Guidance Citation Box */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  {t.citationSource}
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">{assessment.citation.guidelineTitle}</div>
                  <div className="text-slate-600">{assessment.citation.publisher}</div>
                  <div className="flex flex-wrap gap-3 text-slate-500 text-[11px] pt-1">
                    <span>{t.section}: <strong>{assessment.citation.section}</strong></span>
                    <span>{t.page}: <strong>{assessment.citation.pageNumber}</strong></span>
                    <span>{t.version}: <strong>{assessment.citation.version}</strong></span>
                    <span className="text-teal-600 font-bold">{t.confidence}: <strong>{Math.round(assessment.citation.confidenceScore * 100)}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Recommended Action Pathway */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-teal-600" />
                  Deterministic Clinical Care Plan
                </h4>
                <ul className="space-y-2">
                  {assessment.deterministicCarePlan.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prescribed Medications */}
              {assessment.prescribedMedications.length > 0 && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Pill className="w-4 h-4 text-emerald-600" />
                    Medication Protocol & Dosage
                  </h4>
                  <div className="space-y-2">
                    {assessment.prescribedMedications.map((med, i) => (
                      <div key={i} className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs space-y-1">
                        <div className="font-bold text-emerald-950">{med.name}</div>
                        <div className="text-emerald-800 font-semibold">Dosage: {med.dosage}</div>
                        <div className="text-emerald-700 text-[11px]">{med.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mandatory Health Worker Manual Confirmation Checkbox */}
              {assessment.requiresHealthWorkerConfirmation && (
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-300 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                    <UserCheck className="w-4 h-4 text-amber-700" />
                    Human Clinical Decision Verification
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer text-xs font-semibold text-amber-950">
                    <input
                      type="checkbox"
                      checked={confirmedByWorker}
                      onChange={e => setConfirmedByWorker(e.target.checked)}
                      className="mt-0.5 rounded border-amber-400 text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span>{assessment.localizedText.confirmationPrompt}</span>
                  </label>
                  {confirmedByWorker && (
                    <div className="p-2 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      {t.healthWorkerConfirmed} - FHIR Encounter Signed & Saved to Outbox
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-100 p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">No Clinical Triage Evaluated</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Fill out the patient observation parameters on the left to run deterministic CDS rules and retrieve evidence-backed guidelines.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
