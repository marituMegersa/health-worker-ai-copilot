'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Activity,
  Heart,
  Globe2,
  Building2,
  FileText
} from 'lucide-react';

export default function Home() {
  const [metrics, setMetrics] = useState({
    totalPatients: 4,
    highRiskPatients: 2,
    emergencyReferrals: 2,
    lowStockCount: 4,
    totalConsultations: 3
  });
  const [activeRole, setActiveRole] = useState<'chw' | 'nurse' | 'ngo' | 'govt'>('chw');

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.summary) {
          setMetrics(data.summary);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-2xl p-8 shadow-xl border border-teal-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Stethoscope className="w-96 h-96 text-teal-400" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Activity className="w-3.5 h-3.5" />
            Empowering Frontline Health Workers Worldwide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Health Worker <span className="text-teal-400">AI Copilot</span>
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Designed for **NGOs, rural health posts, and government public health programs**. 
            Combines offline-capable WHO clinical guidelines, voice-enabled patient intake, AI triage scoring, and real-time epidemiological surveillance.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/triage"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 px-5 py-3 rounded-lg font-bold shadow-lg transition-all"
            >
              <Stethoscope className="w-5 h-5" />
              Launch Clinical AI Triage
            </Link>
            <Link
              href="/analytics"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg font-semibold border border-slate-700 transition-all"
            >
              <BarChart3Icon className="w-5 h-5 text-teal-400" />
              View NGO Outbreak Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Registered Patients</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{metrics.totalPatients}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">{metrics.highRiskPatients} high-risk</span> monitored
            </p>
          </div>
          <div className="p-3 bg-teal-50 rounded-lg">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Emergency Referrals (RED)</p>
            <p className="text-2xl font-black text-rose-600 mt-1">{metrics.emergencyReferrals}</p>
            <p className="text-xs text-rose-600 mt-1 font-medium flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Urgent hospital transfers
            </p>
          </div>
          <div className="p-3 bg-rose-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Consultations</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{metrics.totalConsultations}</p>
            <p className="text-xs text-teal-600 font-medium mt-1">WHO Protocol Aligned</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            <Activity className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medication Stock Alerts</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{metrics.lowStockCount}</p>
            <p className="text-xs text-amber-600 mt-1 font-medium">Critical items low/out</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <Package className="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </section>

      {/* Role-Based Workflow Explorer */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tailored Workflows by Stakeholder Role</h2>
          <p className="text-sm text-slate-600">
            Select a stakeholder perspective to see how the Health Worker AI Copilot accelerates health delivery and decision-making.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveRole('chw')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeRole === 'chw' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            Community Health Worker (CHW)
          </button>

          <button
            onClick={() => setActiveRole('nurse')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeRole === 'nurse' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Clinic Nurse / Midwife
          </button>

          <button
            onClick={() => setActiveRole('ngo')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeRole === 'ngo' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            NGO Program Manager
          </button>

          <button
            onClick={() => setActiveRole('govt')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeRole === 'govt' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            Government Public Health Officer
          </button>
        </div>

        {/* Role Details Content */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          {activeRole === 'chw' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-lg">
                <Heart className="w-5 h-5" />
                Community Health Worker Field Assistant
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Empowers CHWs in remote villages with step-by-step WHO Integrated Management of Childhood Illness (IMCI) triage, MUAC malnutrition screening, and voice-to-text intake.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Offline-first cache for zero-connectivity zones</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Automated emergency red flag warnings</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Simple weight-based pediatric dosage lookup</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Guided voice consultation note generator</li>
              </ul>
            </div>
          )}

          {activeRole === 'nurse' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-lg">
                <Stethoscope className="w-5 h-5" />
                Clinic Nurse & Midwife Decision Support
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Assists clinic nurses in managing maternal antenatal care (ANC), severe pre-eclampsia screening, acute watery diarrhea Plan B/C rehydration, and diagnostic mRDT tracking.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Maternal BP & proteinuria risk classification</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Magnesium Sulfate emergency loading protocols</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Electronic patient chart & history tracking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Clinic inventory stock alert integrations</li>
              </ul>
            </div>
          )}

          {activeRole === 'ngo' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-lg">
                <Building2 className="w-5 h-5" />
                NGO Health Program Management & Impact Tracking
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Provides NGO leadership real-time visibility into field operations, severe acute malnutrition (SAM) recovery rates, medication distribution, and donor reporting metrics.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Automated donor & KPI report generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> RUTF therapeutic food supply chain monitoring</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Outbreak pattern detection by village/district</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> CHW field activity audit trails</li>
              </ul>
            </div>
          )}

          {activeRole === 'govt' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-lg">
                <Globe2 className="w-5 h-5" />
                Government Ministry of Health Epidemiological Officer
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Aggregates community-level diagnostic data to give health ministries early warning alerts for infectious disease outbreaks (Malaria, Cholera, Measles) and regional coverage gaps.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Real-time disease surveillance heatmaps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Epidemiological trend forecasting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Essential medicine stockout prevention</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Standardized DHIS2 / WHO report exports</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-teal-500 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">AI Clinical Triage Assistant</h3>
          <p className="text-sm text-slate-600">
            Input patient symptoms, vital signs, and MUAC to receive immediate WHO-guided triage ratings (Red/Yellow/Green) and dosage suggestions.
          </p>
          <Link
            href="/triage"
            className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700"
          >
            Start Triage Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-teal-500 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Patient Intake & Registry</h3>
          <p className="text-sm text-slate-600">
            Register new community members, manage medical history, track high-risk maternal cases, and record voice consultation summaries.
          </p>
          <Link
            href="/patients"
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            Manage Patient Registry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-teal-500 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">NGO & Public Health Analytics</h3>
          <p className="text-sm text-slate-600">
            Monitor regional epidemiological trends, detect localized disease spikes early, and track essential medical supplies.
          </p>
          <Link
            href="/analytics"
            className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            Open Analytics Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function BarChart3Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}
