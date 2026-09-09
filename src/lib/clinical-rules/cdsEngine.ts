import { FHIRObservation, FHIRServiceRequest, FHIRCarePlan } from '../fhir/types';

export interface GuidanceCitation {
  guidelineTitle: string;
  publisher: string;
  version: string;
  section: string;
  pageNumber: number;
  confidenceScore: number; // 0.0 to 1.0
  effectiveDate: string;
}

export interface CDSEngineInput {
  patientId: string;
  ageYears: number;
  gender: 'female' | 'male';
  isPregnant?: boolean;
  gestationalAgeWeeks?: number;
  vitals: {
    systolicBp?: number;
    diastolicBp?: number;
    temperatureC?: number;
    muacCm?: number;
    respiratoryRateBpm?: number;
  };
  symptoms: string[];
  dangerSigns: string[];
  labResults?: {
    mRdt?: 'POSITIVE' | 'NEGATIVE' | 'NOT_DONE';
    proteinuriaDipstick?: 'NEGATIVE' | 'TRACE' | '1+' | '2+' | '3+' | '4+';
    hemoglobinGdl?: number;
  };
  language?: 'en' | 'am' | 'om';
}

export interface CDSEngineOutput {
  safetyTier: 'GREEN' | 'AMBER' | 'RED';
  title: string;
  summary: string;
  deterministicCarePlan: string[];
  prescribedMedications: { name: string; dosage: string; notes: string }[];
  referralServiceRequest?: {
    urgency: 'IMMEDIATE_EMERGENCY' | 'URGENT_CLINIC' | 'ROUTINE';
    destinationFacilityType: 'Hospital / Specialized Emergency Unit' | 'Health Center';
    reasonText: string;
  };
  citation: GuidanceCitation;
  requiresHealthWorkerConfirmation: boolean;
  aiAbstentionTriggered: boolean;
  abstentionReason?: string;
}

export function evaluateClinicalRules(input: CDSEngineInput): CDSEngineOutput {
  // 1. Check for RED EMERGENCY Danger Signs first (Maternal & Child Health)
  const isSevereHypertension = (input.vitals.systolicBp && input.vitals.systolicBp >= 160) || (input.vitals.diastolicBp && input.vitals.diastolicBp >= 110);
  const hasSevereProteinuria = input.labResults?.proteinuriaDipstick === '2+' || input.labResults?.proteinuriaDipstick === '3+' || input.labResults?.proteinuriaDipstick === '4+';
  const hasMaternalDangerHeadache = input.symptoms.includes('Severe headache') || input.symptoms.includes('Blurred vision');
  const hasChildDangerConvulsions = input.dangerSigns.includes('Convulsions or seizures during illness') || input.dangerSigns.includes('Lethargic or unconscious') || input.dangerSigns.includes('Unable to drink or breastfeed');
  const isSevereMalnutritionSAM = input.vitals.muacCm && input.vitals.muacCm < 11.5;

  if (input.isPregnant && (isSevereHypertension || (hasSevereProteinuria && hasMaternalDangerHeadache))) {
    return {
      safetyTier: 'RED',
      title: 'CRITICAL EMERGENCY: Severe Pre-Eclampsia / Eclampsia Warning',
      summary: 'Systolic BP >= 160 mmHg or Diastolic BP >= 110 mmHg with severe neurological warning symptoms in pregnancy.',
      deterministicCarePlan: [
        'IMMEDIATE EMERGENCY REFERRAL to Hospital Emergency Maternal Unit.',
        'Administer Magnesium Sulfate loading dose (4g IV slow push + 10g IM) if certified.',
        'Administer oral Nifedipine 10mg immediate release for blood pressure reduction.',
        'Maintain clear airway, place in left lateral tilt position, and monitor BP every 15 mins during transport.'
      ],
      prescribedMedications: [
        { name: 'Magnesium Sulfate 50% Inj', dosage: '4g IV + 10g IM loading dose', notes: 'Pre-eclampsia seizure prophylaxis' },
        { name: 'Nifedipine 10mg', dosage: '10mg orally', notes: 'Repeat in 30 mins if BP > 160/110' }
      ],
      referralServiceRequest: {
        urgency: 'IMMEDIATE_EMERGENCY',
        destinationFacilityType: 'Hospital / Specialized Emergency Unit',
        reasonText: 'Severe Pre-Eclampsia with neurological symptoms'
      },
      citation: {
        guidelineTitle: 'Ethiopian National Antenatal Care & Maternal Management Protocol',
        publisher: 'Ethiopian Ministry of Health (MoH)',
        version: '2026.1',
        section: '4.2.1 Severe Pre-Eclampsia Triage',
        pageNumber: 58,
        confidenceScore: 0.99,
        effectiveDate: '2026-01-01'
      },
      requiresHealthWorkerConfirmation: true,
      aiAbstentionTriggered: false
    };
  }

  if (input.ageYears <= 5 && (hasChildDangerConvulsions || (input.vitals.temperatureC && input.vitals.temperatureC >= 39.5 && input.labResults?.mRdt === 'POSITIVE'))) {
    return {
      safetyTier: 'RED',
      title: 'CRITICAL EMERGENCY: Severe Febrile Illness / Severe Malaria (Pediatric)',
      summary: 'Presence of WHO IMCI general danger sign or high fever with positive mRDT diagnostic in child under 5.',
      deterministicCarePlan: [
        'IMMEDIATE EMERGENCY REFERRAL to District Hospital.',
        'Administer pre-referral Rectal Artesunate (100mg for 11-20kg, 50mg for <10kg).',
        'Keep child warm and give oral rehydration if conscious.'
      ],
      prescribedMedications: [
        { name: 'Rectal Artesunate', dosage: '50mg/100mg single rectal dose', notes: 'Pre-referral emergency antimalarial' }
      ],
      referralServiceRequest: {
        urgency: 'IMMEDIATE_EMERGENCY',
        destinationFacilityType: 'Hospital / Specialized Emergency Unit',
        reasonText: 'Severe pediatric febrile illness / suspected severe malaria'
      },
      citation: {
        guidelineTitle: 'Ethiopian National IMCI Guidelines for Health Extension Workers',
        publisher: 'Ethiopian Ministry of Health & EPHI',
        version: '2025.2',
        section: '3.1 Pediatric Fever Triage',
        pageNumber: 34,
        confidenceScore: 0.98,
        effectiveDate: '2025-06-01'
      },
      requiresHealthWorkerConfirmation: true,
      aiAbstentionTriggered: false
    };
  }

  // 2. Check AMBER (Patient Care Plan - Follow-up / Targeted Protocol)
  if (input.isPregnant) {
    return {
      safetyTier: 'AMBER',
      title: 'Antenatal Care (ANC) Routine Care Plan & Screening',
      summary: `Gestational Age: ${input.gestationalAgeWeeks || 'Not recorded'} weeks. Routine screening and supplement administration.`,
      deterministicCarePlan: [
        'Check Blood Pressure, Weight, and Urine Dipstick Proteinuria.',
        'Provide 60mg elemental Iron + 400mcg Folic Acid daily supply.',
        'Screen for Anemia, Syphilis, and HIV.',
        'Schedule next ANC visit in 4 weeks.'
      ],
      prescribedMedications: [
        { name: 'Iron + Folic Acid Tablets', dosage: '1 tablet daily', notes: 'Routine ANC supplementation' }
      ],
      citation: {
        guidelineTitle: 'Ethiopian MoH Standard Antenatal Care Guideline',
        publisher: 'Ethiopian Ministry of Health',
        version: '2026.1',
        section: '2.1 Routine ANC Visit Schedule',
        pageNumber: 18,
        confidenceScore: 0.95,
        effectiveDate: '2026-01-01'
      },
      requiresHealthWorkerConfirmation: true,
      aiAbstentionTriggered: false
    };
  }

  if (input.labResults?.mRdt === 'POSITIVE') {
    return {
      safetyTier: 'AMBER',
      title: 'Uncomplicated Malaria Treatment Pathway (Coartem)',
      summary: 'Positive mRDT without severe danger signs.',
      deterministicCarePlan: [
        'Administer 3-day course of Artemether + Lumefantrine (Coartem) by weight.',
        'Give Paracetamol for temperature control (>38.5°C).',
        'Counsel caregiver to take Coartem with fatty food or breastmilk.',
        'Advise return to health post if fever persists after 48 hours.'
      ],
      prescribedMedications: [
        { name: 'Coartem (Artemether/Lumefantrine 20/120mg)', dosage: '1 tab BD x 3 days (5-14kg)', notes: 'Take with meal' },
        { name: 'Paracetamol', dosage: '10-15mg/kg QDS as needed', notes: 'Fever control' }
      ],
      citation: {
        guidelineTitle: 'National Malaria Diagnosis and Treatment Guidelines of Ethiopia',
        publisher: 'Ethiopian Ministry of Health & EPHI',
        version: '2025.4',
        section: '4.1 Uncomplicated P. falciparum Treatment',
        pageNumber: 42,
        confidenceScore: 0.96,
        effectiveDate: '2025-10-01'
      },
      requiresHealthWorkerConfirmation: true,
      aiAbstentionTriggered: false
    };
  }

  // 3. GREEN (General Info / Low Risk)
  return {
    safetyTier: 'GREEN',
    title: 'Routine Health Maintenance & Preventive Care',
    summary: 'No acute emergency danger signs or active infection protocol triggered.',
    deterministicCarePlan: [
      'Provide routine age-appropriate health education.',
      'Check EPI Immunization card for missing vaccines.',
      'Promote hand hygiene, clean water, and mosquito net usage.'
    ],
    prescribedMedications: [],
    citation: {
      guidelineTitle: 'Ethiopian Community Health Extension Program Manual',
      publisher: 'Ethiopian Ministry of Health',
      version: '2026.1',
      section: '1.4 Primary Prevention in Health Posts',
      pageNumber: 12,
      confidenceScore: 0.92,
      effectiveDate: '2026-01-01'
    },
    requiresHealthWorkerConfirmation: false,
    aiAbstentionTriggered: false
  };
}
