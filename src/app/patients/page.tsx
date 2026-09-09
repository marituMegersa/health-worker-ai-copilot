'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  FileText,
  Heart,
  PlusCircle,
  X
} from 'lucide-react';
import { PatientRecord, ConsultationRecord } from '@/lib/db';

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHighRisk, setFilterHighRisk] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: 2,
    gender: 'Female',
    villageDistrict: 'Kagoro Health Center - Sector A',
    contactNumber: '+254 700 123 456',
    muacCm: 11.5,
    isHighRisk: false,
    notes: 'Routine intake screening'
  });

  const fetchData = async () => {
    try {
      const resPatients = await fetch('/api/patients');
      const dataPatients = await resPatients.json();
      if (dataPatients.success) setPatients(dataPatients.patients);

      const resAnalytics = await fetch('/api/analytics');
      const dataAnalytics = await resAnalytics.json();
      if (dataAnalytics.success) setConsultations(dataAnalytics.recentConsultations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient)
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchData();
        setNewPatient({
          name: '',
          age: 2,
          gender: 'Female',
          villageDistrict: 'Kagoro Health Center - Sector A',
          contactNumber: '',
          muacCm: 12.0,
          isHighRisk: false,
          notes: ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterHighRisk ? p.isHighRisk : true;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-teal-600" />
            Patient Registry & Digital Intake
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Community health worker patient records, MUAC malnutrition tracking, and historical consultations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all text-sm"
        >
          <UserPlus className="w-4 h-4" />
          Register New Patient
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by patient name or ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setFilterHighRisk(!filterHighRisk)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
            filterHighRisk
              ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
              : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          {filterHighRisk ? 'Showing High Risk Only' : 'Filter High Risk Patients'}
        </button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map(patient => (
          <div
            key={patient.id}
            className={`bg-white p-5 rounded-xl border shadow-sm space-y-4 relative ${
              patient.isHighRisk ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
            }`}
          >
            {patient.isHighRisk && (
              <span className="absolute top-4 right-4 bg-rose-100 text-rose-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-rose-200">
                <AlertTriangle className="w-3 h-3" /> HIGH RISK
              </span>
            )}

            <div>
              <span className="text-xs font-bold text-teal-600 block">{patient.patientId}</span>
              <h3 className="font-extrabold text-lg text-slate-900">{patient.name}</h3>
              <p className="text-xs text-slate-500">{patient.age} yrs • {patient.gender}</p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{patient.villageDistrict}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Registered: {patient.registeredDate}</span>
              </div>
              {patient.muacCm && (
                <div className="flex items-center gap-2 font-semibold">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span className={patient.muacCm < 11.5 ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                    MUAC: {patient.muacCm} cm {patient.muacCm < 11.5 ? '(Severe Acute Malnutrition)' : ''}
                  </span>
                </div>
              )}
            </div>

            {patient.notes && (
              <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 italic border border-slate-200">
                "{patient.notes}"
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Consultation History Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-600" />
          Recent Clinical Consultations Log
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-3 font-bold">Date & Time</th>
                <th className="p-3 font-bold">Patient</th>
                <th className="p-3 font-bold">Chief Complaint</th>
                <th className="p-3 font-bold">Triage Risk</th>
                <th className="p-3 font-bold">Action Taken</th>
                <th className="p-3 font-bold">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {consultations.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 whitespace-nowrap text-slate-500 font-mono">{c.date}</td>
                  <td className="p-3 font-bold text-slate-900">{c.patientName}</td>
                  <td className="p-3 text-slate-700 max-w-xs truncate">{c.chiefComplaint}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        c.triageRisk.includes('RED')
                          ? 'bg-rose-100 text-rose-700'
                          : c.triageRisk.includes('YELLOW')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {c.triageRisk.split(' ')[0]}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700 max-w-xs">{c.actionTaken[0]}</td>
                  <td className="p-3 text-slate-500">{c.locationDistrict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Patient Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-teal-600" />
              Register New Patient
            </h2>

            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newPatient.name}
                  onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full text-sm p-2 rounded-lg border border-slate-300"
                  placeholder="e.g. Samuel Adewale"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    required
                    value={newPatient.age}
                    onChange={e => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                    className="w-full text-sm p-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={e => setNewPatient({ ...newPatient, gender: e.target.value as any })}
                    className="w-full text-sm p-2 rounded-lg border border-slate-300"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Village / District Clinic</label>
                <input
                  type="text"
                  value={newPatient.villageDistrict}
                  onChange={e => setNewPatient({ ...newPatient, villageDistrict: e.target.value })}
                  className="w-full text-sm p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">MUAC Measurement (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newPatient.muacCm}
                  onChange={e => setNewPatient({ ...newPatient, muacCm: Number(e.target.value) })}
                  className="w-full text-sm p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="highRisk"
                  checked={newPatient.isHighRisk}
                  onChange={e => setNewPatient({ ...newPatient, isHighRisk: e.target.checked })}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="highRisk" className="text-xs font-semibold text-slate-800">
                  Flag as High-Risk Patient (SAM / ANC Warning)
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Notes</label>
                <textarea
                  rows={2}
                  value={newPatient.notes}
                  onChange={e => setNewPatient({ ...newPatient, notes: e.target.value })}
                  className="w-full text-sm p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow-sm"
                >
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
