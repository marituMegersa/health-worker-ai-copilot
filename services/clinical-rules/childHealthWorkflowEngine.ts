import { CDSEngineOutput } from '../../src/lib/clinical-rules/cdsEngine';

export interface IMCIChildInput {
  patientId: string;
  ageMonths: number;
  weightKg: number;
  temperatureC: number;
  muacCm: number;
  mRdtResult: 'POSITIVE' | 'NEGATIVE' | 'NOT_DONE';
  dangerSigns: string[]; // e.g. "Convulsions", "Lethargic", "Vomiting everything"
  diarrheaDays?: number;
  dehydrationLevel?: 'NONE' | 'SOME' | 'SEVERE';
}

export function processIMCIChildWorkflow(input: IMCIChildInput): CDSEngineOutput {
  const hasDangerSigns = input.dangerSigns && input.dangerSigns.length > 0;
  const isSAM = input.muacCm < 11.5;

  if (hasDangerSigns || isSAM || (input.temperatureC >= 39.5 && input.mRdtResult === 'POSITIVE')) {
    return {
      safetyTier: 'RED',
      title: 'EMERGENCY ALERT: IMCI Severe Pediatric Triage Alert',
      summary: `Child (${input.ageMonths}m, ${input.weightKg}kg): MUAC ${input.muacCm}cm, Temp ${input.temperatureC}°C, mRdt: ${input.mRdtResult}. Danger signs: ${input.dangerSigns.join(', ') || 'SAM detected'}.`,
      deterministicCarePlan: [
        'IMMEDIATE EMERGENCY REFERRAL to District Hospital.',
        input.mRdtResult === 'POSITIVE' ? 'Administer pre-referral Rectal Artesunate (50mg for <10kg, 100mg for 10-20kg).' : 'Keep child warm and offer ORS if conscious.',
        isSAM ? 'Provide emergency F-75 stabilization milk if available.' : 'Monitor vitals continuously during transport.'
      ],
      prescribedMedications: [
        { name: 'Rectal Artesunate Capsule', dosage: input.weightKg < 10 ? '50mg single dose' : '100mg single dose', notes: 'Pre-referral emergency antimalarial' }
      ],
      referralServiceRequest: {
        urgency: 'IMMEDIATE_EMERGENCY',
        destinationFacilityType: 'Hospital / Specialized Emergency Unit',
        reasonText: 'IMCI Severe febrile illness / SAM complications'
      },
      citation: {
        guidelineTitle: 'Ethiopian Integrated Management of Newborn and Childhood Illness (IMCI)',
        publisher: 'Ethiopian MoH & EPHI',
        version: '2025.2',
        section: '3.1 Pediatric Emergency Danger Signs',
        pageNumber: 34,
        confidenceScore: 0.99,
        effectiveDate: '2025-06-01'
      },
      requiresHealthWorkerConfirmation: true,
      aiAbstentionTriggered: false
    };
  }

  // Uncomplicated Malaria or Diarrhea
  if (input.mRdtResult === 'POSITIVE') {
    let coartemDosage = '1 tab BD x 3 days (5-14kg)';
    if (input.weightKg >= 15 && input.weightKg < 25) coartemDosage = '2 tabs BD x 3 days';
    if (input.weightKg >= 25 && input.weightKg < 35) coartemDosage = '3 tabs BD x 3 days';

    return {
      safetyTier: 'AMBER',
      title: 'IMCI Uncomplicated Malaria Care Plan (Coartem)',
      summary: `Positive mRDT in child (${input.weightKg}kg) without general danger signs.`,
      deterministicCarePlan: [
        `Administer 3-day Coartem course (${coartemDosage}).`,
        'Give first dose at clinic with fatty food or milk.',
        'Give Paracetamol for fever > 38.5°C.',
        'Advise caregiver to return in 48 hours for re-assessment.'
      ],
      prescribedMedications: [
        { name: 'Artemether + Lumefantrine (Coartem 20/120mg)', dosage: coartemDosage, notes: 'Take with fatty food' },
        { name: 'Paracetamol Syrup', dosage: `${Math.round(input.weightKg * 12.5)}mg QDS as needed`, notes: 'Fever management' }
      ],
      citation: {
        guidelineTitle: 'National Malaria Diagnosis and Treatment Guidelines of Ethiopia',
        publisher: 'Ethiopian Ministry of Health & EPHI',
        version: '2025.4',
        section: '4.1 Pediatric Coartem Weight-Based Dosage Table',
        pageNumber: 42,
        confidenceScore: 0.98,
        effectiveDate: '2025-10-01'
      },
      requiresHealthWorkerConfirmation: true,
      aiAbstentionTriggered: false
    };
  }

  return {
    safetyTier: 'GREEN',
    title: 'IMCI Routine Child Health & Immunization Protocol',
    summary: `Child (${input.ageMonths}m, ${input.weightKg}kg): MUAC ${input.muacCm}cm (Normal range).`,
    deterministicCarePlan: [
      'Check EPI Immunization card for missing vaccines.',
      'Counsel mother on infant & young child feeding (IYCF).',
      'Provide Vitamin A capsule and Deworming tablet if due.'
    ],
    prescribedMedications: [],
    citation: {
      guidelineTitle: 'Ethiopian Community Health Extension Program Manual',
      publisher: 'Ethiopian Ministry of Health',
      version: '2026.1',
      section: '1.4 Routine Child Preventive Health',
      pageNumber: 12,
      confidenceScore: 0.95,
      effectiveDate: '2026-01-01'
    },
    requiresHealthWorkerConfirmation: false,
    aiAbstentionTriggered: false
  };
}
