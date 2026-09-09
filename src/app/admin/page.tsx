'use client';

import { useState } from 'react';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Activity,
  Plus
} from 'lucide-react';
import { ETHIOPIAN_MOH_GUIDELINES } from '../../../packages/clinical-content';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<'workers' | 'guidelines' | 'i18n' | 'audit'>('workers');

  const workers = [
    { name: 'Tigist Alemu', role: 'Health Extension Worker (HEW)', facility: 'Kagoro Health Post', woreda: 'Kagoro Woreda', status: 'Active' },
    { name: 'Nurse Samuel Osei', role: 'Clinic Nurse', facility: 'Kagoro Health Center', woreda: 'Kagoro Woreda', status: 'Active' },
    { name: 'Midwife Mary Njeri', role: 'Midwife', facility: 'Central Regional Maternal Unit', woreda: 'Central Woreda', status: 'Active' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            Ethiopian Ministry of Health • Health Extension Program Governance
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-teal-600" />
            Health Worker AI Copilot Web Administration Portal
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage Health Extension Workers, publish approved clinical guidelines, review translations, and monitor tamper-proof FHIR audit logs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('workers')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'workers' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Health Extension Workers & Facilities
        </button>

        <button
          onClick={() => setActiveTab('guidelines')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'guidelines' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Approved Guidelines Registry
        </button>

        <button
          onClick={() => setActiveTab('i18n')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'i18n' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          Multilingual Terminology (Amharic / Afaan Oromo)
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'audit' ? 'bg-teal-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          FHIR Audit & Safety Traces
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'workers' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Registered Health Workers & Roles</h2>
            <button className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Provision Health Worker Account
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="p-3 font-bold">Health Worker Name</th>
                  <th className="p-3 font-bold">Role</th>
                  <th className="p-3 font-bold">Facility</th>
                  <th className="p-3 font-bold">Woreda</th>
                  <th className="p-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workers.map((w, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{w.name}</td>
                    <td className="p-3 text-slate-700">{w.role}</td>
                    <td className="p-3 text-slate-700">{w.facility}</td>
                    <td className="p-3 text-slate-500">{w.woreda}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'guidelines' && (
        <div className="space-y-4">
          {ETHIOPIAN_MOH_GUIDELINES.map(g => (
            <div key={g.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-teal-100 text-teal-800 uppercase">
                  {g.jurisdiction} • Version {g.version}
                </span>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved & Active
                </span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900">{g.title}</h3>
              <p className="text-xs text-slate-500">Publisher: {g.publisher} • Effective: {g.effectiveDate}</p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700">Embedded Guideline Sections:</span>
                {g.sections.map((sec, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-slate-800">Section {sec.sectionId}: {sec.heading} (Page {sec.pageNumber})</div>
                    <div className="text-slate-600 italic">"{sec.text}"</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
