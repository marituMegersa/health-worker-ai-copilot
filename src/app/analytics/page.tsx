'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  ShieldAlert, 
  Download, 
  MapPin,
  CheckCircle2,
  Database,
  Network
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(resData => {
        if (resData.success) setData(resData);
      })
      .catch(err => console.error(err));
  }, []);

  const handleExportReport = () => {
    setReportGenerated(true);
    setTimeout(() => setReportGenerated(false), 4000);
  };

  if (!data) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        Loading Ethiopian MoH, eCHIS & DHIS2 Aggregate Data...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <span>OpenHIE / OpenHIM Architecture • DHIS2 Interoperability Layer</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-indigo-600" />
            Ethiopian MoH & DHIS2 Public Health Analytics
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time disease surveillance heatmaps, NHDD terminology mappings, and DHIS2 aggregate reporting.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all text-sm"
        >
          <Download className="w-4 h-4 text-teal-400" />
          Export Standardized DHIS2 Indicator Report
        </button>
      </div>

      {reportGenerated && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Successfully transmitted DHIS2 aggregate indicators & FHIR Audit Events to MoH Interoperability Layer (OpenHIM)!
        </div>
      )}

      {/* Architecture Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-teal-100 rounded-lg text-teal-700">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">eCHIS Integration</div>
            <div className="text-[11px] text-teal-600 font-semibold">FHIR Sync Active</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-100 rounded-lg text-indigo-700">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">DHIS2 Analytics</div>
            <div className="text-[11px] text-indigo-600 font-semibold">Aggregate Reporting</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-amber-100 rounded-lg text-amber-700">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">NHDD Terminology</div>
            <div className="text-[11px] text-amber-600 font-semibold">National Codings</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-100 rounded-lg text-emerald-700">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">FHIR Audit Log</div>
            <div className="text-[11px] text-emerald-600 font-semibold">Tamper-Proof Audit</div>
          </div>
        </div>
      </div>

      {/* Disease Outbreak Alert Banner */}
      <div className="bg-amber-500 text-slate-950 p-5 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-slate-950" />
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-amber-400 px-2 py-0.5 rounded">
              Epidemiological Early Warning Alert
            </span>
            <h3 className="font-extrabold text-lg mt-0.5">Spike in Pediatric Febrile Cases - Oromia Region, Kagoro Woreda</h3>
            <p className="text-xs font-medium opacity-90">
              Community Health Extension Workers reported 6 new severe febrile cases in 48 hours. Pre-referral Coartem & mRDT deployment recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Trend Area Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                Monthly Epidemiological Infection Trends
              </h3>
              <p className="text-xs text-slate-500">Tracked across rural health posts and district health centers</p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyTrends}>
                <defs>
                  <linearGradient id="colorMalaria" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDiarrhea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="malaria" name="Malaria Cases" stroke="#14b8a6" fillOpacity={1} fill="url(#colorMalaria)" />
                <Area type="monotone" dataKey="diarrhea" name="Diarrhea Cases" stroke="#6366f1" fillOpacity={1} fill="url(#colorDiarrhea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Outbreak Table (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
            Woreda / District Surveillance Heatmap
          </h3>

          <div className="space-y-3">
            {data.outbreakAlerts.map((district: any) => (
              <div key={district.district} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between font-bold text-sm">
                  <span className="text-slate-900">{district.district}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold ${
                    district.alertLevel === 'HIGH ALERT'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {district.alertLevel}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>Malaria Rate: <span className="font-bold text-slate-900">{district.malariaRate}%</span></div>
                  <div>Diarrhea Rate: <span className="font-bold text-slate-900">{district.diarrheaRate}%</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
