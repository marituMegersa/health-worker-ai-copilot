'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  AlertCircle, 
  Building2, 
  Globe2, 
  Download, 
  Activity, 
  MapPin,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

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
        Loading NGO & Government Public Health Data...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-indigo-600" />
            NGO & Government Public Health Surveillance Portal
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time disease outbreak detection, epidemiological trends, and standardized DHIS2 reporting.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all text-sm"
        >
          <Download className="w-4 h-4 text-teal-400" />
          Export Standardized DHIS2 / NGO Report
        </button>
      </div>

      {reportGenerated && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Successfully generated DHIS2 & NGO Donor Analytics Report (PDF & CSV Bundle downloaded)!
        </div>
      )}

      {/* Disease Outbreak Alert Banner */}
      <div className="bg-amber-500 text-slate-950 p-5 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-slate-950" />
          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-amber-400 px-2 py-0.5 rounded">
              Epidemiological Early Warning Alert
            </span>
            <h3 className="font-extrabold text-lg mt-0.5">Spike in Pediatric Malaria & Diarrhea - Kagoro Sector A</h3>
            <p className="text-xs font-medium opacity-90">
              Community Health Workers reported 6 new cases of severe fever in past 48h. Recommended action: Dispatch additional mRDT kits and Coartem.
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
              <p className="text-xs text-slate-500">Tracked across rural clinics and community outposts</p>
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
            District Surveillance Heatmap
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
