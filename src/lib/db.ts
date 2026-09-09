export interface PatientRecord {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male';
  villageDistrict: string;
  contactNumber?: string;
  registeredDate: string;
  muacCm?: number;
  isHighRisk: boolean;
  notes?: string;
}

export interface ConsultationRecord {
  id: string;
  patientId: string;
  patientName: string;
  healthWorkerName: string;
  date: string;
  chiefComplaint: string;
  symptoms: string[];
  vitals: {
    tempC?: number;
    bpSystolic?: number;
    bpDiastolic?: number;
    heartRate?: number;
    muacCm?: number;
  };
  triageRisk: 'GREEN (Low Risk)' | 'YELLOW (Moderate Risk / Clinic Follow-up)' | 'RED (Emergency / Immediate Referral)';
  protocolUsed: string;
  actionTaken: string[];
  medicationsPrescribed: { name: string; dosage: string }[];
  locationDistrict: string;
}

export interface SupplyItem {
  id: string;
  name: string;
  category: 'Essential Medicine' | 'Diagnostic' | 'Nutrition' | 'Maternal Care';
  stockCount: number;
  minThreshold: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Critical Stockout';
  clinicLocation: string;
}

// In-Memory store initialized with rich realistic clinic & NGO field data
export const MOCK_PATIENTS: PatientRecord[] = [
  {
    id: 'P001',
    patientId: 'PAT-2026-081',
    name: 'Amina Bello',
    age: 3,
    gender: 'Female',
    villageDistrict: 'Kagoro Health Center - Sector A',
    registeredDate: '2026-09-01',
    muacCm: 11.2,
    isHighRisk: true,
    notes: 'Enrolled in SAM Outpatient Therapeutic Program.'
  },
  {
    id: 'P002',
    patientId: 'PAT-2026-082',
    name: 'Grace Mwangi',
    age: 26,
    gender: 'Female',
    villageDistrict: 'Central Clinic - Sector B',
    registeredDate: '2026-09-03',
    isHighRisk: true,
    notes: 'ANC 28 Weeks. Monitored for elevated BP.'
  },
  {
    id: 'P003',
    patientId: 'PAT-2026-083',
    name: 'Kofi Mensah',
    age: 4,
    gender: 'Male',
    villageDistrict: 'North Outpost - Sector C',
    registeredDate: '2026-09-05',
    muacCm: 13.5,
    isHighRisk: false,
    notes: 'Routine vaccination and vitamin A administration.'
  },
  {
    id: 'P004',
    patientId: 'PAT-2026-084',
    name: 'Fatima Zahra',
    age: 1,
    gender: 'Female',
    villageDistrict: 'Kagoro Health Center - Sector A',
    registeredDate: '2026-09-07',
    muacCm: 11.8,
    isHighRisk: false,
    notes: 'MAM tracking.'
  }
];

export const MOCK_CONSULTATIONS: ConsultationRecord[] = [
  {
    id: 'C101',
    patientId: 'P001',
    patientName: 'Amina Bello',
    healthWorkerName: 'CHW Samuel Osei',
    date: '2026-09-08 09:30',
    chiefComplaint: 'High fever for 2 days, poor feeding, lethargy',
    symptoms: ['Fever', 'Lethargy', 'Vomiting', 'Loss of appetite'],
    vitals: { tempC: 39.2, heartRate: 135, muacCm: 11.2 },
    triageRisk: 'RED (Emergency / Immediate Referral)',
    protocolUsed: 'Integrated Pediatric Fever & Malaria Protocol',
    actionTaken: ['Administered pre-referral Rectal Artesunate 50mg', 'Referred to Kagoro District Hospital emergency transport'],
    medicationsPrescribed: [{ name: 'Rectal Artesunate', dosage: '50mg single dose' }],
    locationDistrict: 'Kagoro District'
  },
  {
    id: 'C102',
    patientId: 'P002',
    patientName: 'Grace Mwangi',
    healthWorkerName: 'Nurse Mary Njeri',
    date: '2026-09-08 11:15',
    chiefComplaint: 'Severe headache and blurred vision at 28 weeks gestation',
    symptoms: ['Severe headache', 'Blurred vision', 'Swollen ankles'],
    vitals: { bpSystolic: 165, bpDiastolic: 112, tempC: 36.8 },
    triageRisk: 'RED (Emergency / Immediate Referral)',
    protocolUsed: 'Antenatal Care & Hypertensive Triage',
    actionTaken: ['Administered Nifedipine 10mg PO', 'Prepared emergency ambulance dispatch to Regional Maternal Unit'],
    medicationsPrescribed: [{ name: 'Nifedipine', dosage: '10mg immediate release' }],
    locationDistrict: 'Central District'
  },
  {
    id: 'C103',
    patientId: 'P003',
    patientName: 'Kofi Mensah',
    healthWorkerName: 'CHW Samuel Osei',
    date: '2026-09-07 14:00',
    chiefComplaint: 'Watery diarrhea 4 times today, mild fever',
    symptoms: ['Diarrhea', 'Mild fever', 'Thirst'],
    vitals: { tempC: 37.8, heartRate: 110 },
    triageRisk: 'YELLOW (Moderate Risk / Clinic Follow-up)',
    protocolUsed: 'Acute Watery Diarrhea & Dehydration Management',
    actionTaken: ['Initiated ORS Plan B 4-hour clinic rehydration', 'Provided 14-day Zinc tablet supply'],
    medicationsPrescribed: [
      { name: 'Low-osmolarity ORS', dosage: '500ml over 4 hours' },
      { name: 'Zinc Sulfate', dosage: '20mg daily for 14 days' }
    ],
    locationDistrict: 'North District'
  }
];

export const MOCK_SUPPLIES: SupplyItem[] = [
  {
    id: 'S01',
    name: 'Coartem (Artemether + Lumefantrine 20/120mg)',
    category: 'Essential Medicine',
    stockCount: 45,
    minThreshold: 100,
    unit: 'boxes (24 tabs)',
    status: 'Low Stock',
    clinicLocation: 'Kagoro Health Center'
  },
  {
    id: 'S02',
    name: 'Malaria Rapid Diagnostic Test (mRDT Kits)',
    category: 'Diagnostic',
    stockCount: 18,
    minThreshold: 150,
    unit: 'kits',
    status: 'Critical Stockout',
    clinicLocation: 'Kagoro Health Center'
  },
  {
    id: 'S03',
    name: 'PlumpyNut Ready-to-Use Therapeutic Food (RUTF)',
    category: 'Nutrition',
    stockCount: 320,
    minThreshold: 200,
    unit: 'sachets',
    status: 'In Stock',
    clinicLocation: 'Kagoro Health Center'
  },
  {
    id: 'S04',
    name: 'Oral Rehydration Salts (ORS Sachets)',
    category: 'Essential Medicine',
    stockCount: 500,
    minThreshold: 250,
    unit: 'sachets',
    status: 'In Stock',
    clinicLocation: 'Central Clinic'
  },
  {
    id: 'S05',
    name: 'Zinc Sulfate Dispersible 20mg',
    category: 'Essential Medicine',
    stockCount: 80,
    minThreshold: 200,
    unit: 'blister packs',
    status: 'Low Stock',
    clinicLocation: 'Central Clinic'
  },
  {
    id: 'S06',
    name: 'Magnesium Sulfate 50% Inj 10ml',
    category: 'Maternal Care',
    stockCount: 12,
    minThreshold: 30,
    unit: 'ampoules',
    status: 'Low Stock',
    clinicLocation: 'Central Clinic'
  }
];
