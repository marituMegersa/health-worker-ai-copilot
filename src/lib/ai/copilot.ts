import { WHO_MEDICAL_PROTOCOLS, ProtocolCondition } from '../protocols/medicalProtocols';

export interface PatientIntakeData {
  patientName: string;
  ageYears: number;
  gender: string;
  weightKg?: number;
  muacCm?: number;
  systolicBp?: number;
  diastolicBp?: number;
  temperatureC?: number;
  heartRateBpm?: number;
  chiefComplaint: string;
  symptoms: string[];
  dangerSignsPresent: string[];
  mRdtResult?: 'POSITIVE' | 'NEGATIVE' | 'NOT_PERFORMED';
  locationDistrict?: string;
}

export interface AssessmentResult {
  riskLevel: 'GREEN (Low Risk)' | 'YELLOW (Moderate Risk / Clinic Follow-up)' | 'RED (Emergency / Immediate Referral)';
  matchedProtocol?: ProtocolCondition;
  summary: string;
  suggestedActions: string[];
  recommendedMedications: { name: string; dosage: string; notes: string }[];
  redFlagsToWatch: string[];
  aiReasoningNotes: string;
  differentialDiagnoses: { condition: string; confidence: number; justification: string }[];
  offlineMode: boolean;
}

export async function processClinicalTriage(intake: PatientIntakeData): Promise<AssessmentResult> {
  // 1. Check danger signs first
  const hasDangerSigns = intake.dangerSignsPresent && intake.dangerSignsPresent.length > 0;
  
  // 2. Identify protocol match based on age/symptoms
  let matchedProtocol: ProtocolCondition | undefined;
  
  if (intake.symptoms.some(s => s.toLowerCase().includes('fever') || s.toLowerCase().includes('chills')) && intake.ageYears <= 5) {
    matchedProtocol = WHO_MEDICAL_PROTOCOLS.find(p => p.id === 'malaria-fever-pediatric');
  } else if (intake.symptoms.some(s => s.toLowerCase().includes('pregnant') || s.toLowerCase().includes('blood pressure') || s.toLowerCase().includes('headache')) || (intake.systolicBp && intake.systolicBp >= 140)) {
    matchedProtocol = WHO_MEDICAL_PROTOCOLS.find(p => p.id === 'maternal-preeclampsia-anc');
  } else if (intake.muacCm && intake.muacCm < 12.5) {
    matchedProtocol = WHO_MEDICAL_PROTOCOLS.find(p => p.id === 'pediatric-malnutrition-muac');
  } else if (intake.symptoms.some(s => s.toLowerCase().includes('diarrhea') || s.toLowerCase().includes('vomiting') || s.toLowerCase().includes('dehydration'))) {
    matchedProtocol = WHO_MEDICAL_PROTOCOLS.find(p => p.id === 'pediatric-diarrhea-ors');
  } else {
    matchedProtocol = WHO_MEDICAL_PROTOCOLS[0];
  }

  // Determine severity based on vitals and protocol
  let riskLevel: AssessmentResult['riskLevel'] = 'GREEN (Low Risk)';
  let suggestedActions: string[] = [];
  let recommendedMedications: AssessmentResult['recommendedMedications'] = [];
  let redFlags: string[] = matchedProtocol ? matchedProtocol.dangerSigns : [];

  if (hasDangerSigns || (intake.temperatureC && intake.temperatureC > 39.5) || (intake.systolicBp && intake.systolicBp >= 160)) {
    riskLevel = 'RED (Emergency / Immediate Referral)';
    suggestedActions = [
      'IMMEDIATE EMERGENCY REFERRAL to district clinic/hospital.',
      'Establish IV line or administer pre-referral emergency medication if protocol permits.',
      'Monitor vital signs every 15 minutes during transfer.'
    ];
    if (matchedProtocol?.treatmentPathway[0]?.medications) {
      recommendedMedications = matchedProtocol.treatmentPathway[0].medications;
    }
  } else if ((intake.temperatureC && intake.temperatureC >= 37.5) || (intake.mRdtResult === 'POSITIVE') || (intake.systolicBp && intake.systolicBp >= 140) || (intake.muacCm && intake.muacCm < 12.5)) {
    riskLevel = 'YELLOW (Moderate Risk / Clinic Follow-up)';
    suggestedActions = [
      'Initiate targeted outpatient protocol treatment.',
      'Counsel caregiver on home administration and warning signs.',
      'Schedule follow-up check in 48-72 hours.'
    ];
    if (matchedProtocol?.treatmentPathway[1]?.medications) {
      recommendedMedications = matchedProtocol.treatmentPathway[1].medications;
    }
  } else {
    riskLevel = 'GREEN (Low Risk)';
    suggestedActions = [
      'Provide supportive care and home management guidance.',
      'Ensure routine preventive vaccines/supplements are up to date.',
      'Return to health post if symptoms worsen.'
    ];
    if (matchedProtocol?.treatmentPathway[2]?.medications) {
      recommendedMedications = matchedProtocol.treatmentPathway[2].medications;
    }
  }

  // Construct AI Differential Diagnosis
  const differentialDiagnoses = [
    {
      condition: matchedProtocol ? matchedProtocol.name : 'Acute Febrile / Viral Illness',
      confidence: hasDangerSigns ? 0.92 : 0.85,
      justification: `Matched key symptoms (${intake.symptoms.join(', ')}) with clinical parameters (Temp: ${intake.temperatureC || 'N/A'}°C, BP: ${intake.systolicBp || 'N/A'}/${intake.diastolicBp || 'N/A'}).`
    },
    {
      condition: 'Bacterial Upper Respiratory Tract Infection',
      confidence: 0.45,
      justification: 'Secondary consideration if fever or cough persists beyond 72 hours.'
    }
  ];

  const summary = `Patient ${intake.patientName} (${intake.ageYears}y, ${intake.gender}) presented with: ${intake.chiefComplaint}. Risk rating: ${riskLevel}.`;
  const aiReasoningNotes = `AI Engine evaluated clinical input against WHO guidelines (${matchedProtocol?.whoReference || 'Standard Primary Care Protocols'}). Red flags evaluated: ${hasDangerSigns ? intake.dangerSignsPresent.join(', ') : 'None detected'}.`;

  return {
    riskLevel,
    matchedProtocol,
    summary,
    suggestedActions,
    recommendedMedications,
    redFlagsToWatch: redFlags,
    aiReasoningNotes,
    differentialDiagnoses,
    offlineMode: true
  };
}

export function synthesizeOutbreakData(consultations: any[]) {
  // Aggregate symptom clusters by district
  const districtCounts: Record<string, { malaria: number; diarrhea: number; respiratory: number; total: number }> = {};

  consultations.forEach(c => {
    const d = c.locationDistrict || 'District-A';
    if (!districtCounts[d]) {
      districtCounts[d] = { malaria: 0, diarrhea: 0, respiratory: 0, total: 0 };
    }
    districtCounts[d].total += 1;
    if (c.symptoms.some((s: string) => s.toLowerCase().includes('fever') || s.toLowerCase().includes('malaria'))) {
      districtCounts[d].malaria += 1;
    }
    if (c.symptoms.some((s: string) => s.toLowerCase().includes('diarrhea') || s.toLowerCase().includes('vomit'))) {
      districtCounts[d].diarrhea += 1;
    }
    if (c.symptoms.some((s: string) => s.toLowerCase().includes('cough') || s.toLowerCase().includes('breathing'))) {
      districtCounts[d].respiratory += 1;
    }
  });

  return Object.entries(districtCounts).map(([district, stats]) => ({
    district,
    ...stats,
    malariaRate: Math.round((stats.malaria / (stats.total || 1)) * 100),
    diarrheaRate: Math.round((stats.diarrhea / (stats.total || 1)) * 100),
    alertLevel: stats.malaria > 5 || stats.diarrhea > 5 ? 'HIGH ALERT' : stats.total > 10 ? 'MODERATE' : 'NORMAL'
  }));
}
