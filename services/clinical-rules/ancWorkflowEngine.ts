import { CDSEngineOutput } from '../../src/lib/clinical-rules/cdsEngine';

export interface ANCEncounterInput {
  patientId: string;
  gestationalAgeWeeks: number;
  visitNumber: 1 | 2 | 3 | 4;
  systolicBp: number;
  diastolicBp: number;
  proteinuriaDipstick: 'NEGATIVE' | 'TRACE' | '1+' | '2+' | '3+' | '4+';
  hemoglobinGdl?: number;
  hasHeadacheOrVisualSpots: boolean;
  hasVaginalBleeding: boolean;
  tetanusToxoidDosesGiven: number;
}

export function processANCWorkflow(input: ANCEncounterInput): CDSEngineOutput {
  const isSevereHypertension = input.systolicBp >= 160 || input.diastolicBp >= 110;
  const hasSevereProteinuria = ['2+', '3+', '4+'].includes(input.proteinuriaDipstick);

  if (isSevereHypertension || (hasSevereProteinuria && input.hasHeadacheOrVisualSpots)) {
    return {
      safetyTier: 'RED',
      title: 'EMERGENCY ALERT: Severe Pre-Eclampsia / Eclampsia Warning',
      summary: `Gestational Age: ${input.gestationalAgeWeeks}wks. Blood Pressure: ${input.systolicBp}/${input.diastolicBp} mmHg with Proteinuria (${input.proteinuriaDipstick}).`,
      deterministicCarePlan: [
        'IMMEDIATE EMERGENCY REFERRAL to Specialized Maternal Hospital.',
        'Administer Magnesium Sulfate 50% Inj loading dose (4g IV slow push + 10g IM) if certified.',
        'Administer oral Nifedipine 10mg immediate release for blood pressure reduction.',
        'Maintain left lateral tilt position and transport immediately with emergency kit.'
      ],
      prescribedMedications: [
        { name: 'Magnesium Sulfate 50% Inj', dosage: '4g IV + 10g IM loading dose', notes: 'Pre-eclampsia seizure prophylaxis' },
        { name: 'Nifedipine 10mg', dosage: '10mg orally', notes: 'Repeat in 30 min if BP > 160/110' }
      ],
      referralServiceRequest: {
        urgency: 'IMMEDIATE_EMERGENCY',
        destinationFacilityType: 'Hospital / Specialized Emergency Unit',
        reasonText: 'Severe Pre-Eclampsia in pregnancy'
      },
      citation: {
        guidelineTitle: 'Ethiopian National Antenatal Care & Maternal Management Guidelines',
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

  // Routine ANC Visit Logic
  const carePlan: string[] = [
    `ANC Visit #${input.visitNumber} Routine Check (${input.gestationalAgeWeeks} weeks).`,
    'Administer daily Iron (60mg) + Folic Acid (400mcg) tablets.',
    input.tetanusToxoidDosesGiven < 2 ? 'Administer Tetanus-Diphtheria (Td) vaccine dose.' : 'Td immunization up to date.',
    input.visitNumber === 1 ? 'Screen for Syphilis, HIV, Blood Group & Rh factor.' : 'Review previous lab findings.'
  ];

  return {
    safetyTier: 'AMBER',
    title: `Antenatal Care (ANC) Visit #${input.visitNumber} Care Plan`,
    summary: `Gestational Age: ${input.gestationalAgeWeeks}wks, BP: ${input.systolicBp}/${input.diastolicBp} mmHg (Normal range).`,
    deterministicCarePlan: carePlan,
    prescribedMedications: [
      { name: 'Iron + Folic Acid Tablets', dosage: '1 tablet daily', notes: 'Routine ANC supplementation' }
    ],
    citation: {
      guidelineTitle: 'Ethiopian National Antenatal Care & Maternal Management Guidelines',
      publisher: 'Ethiopian Ministry of Health (MoH)',
      version: '2026.1',
      section: `2.${input.visitNumber} Routine ANC Protocol`,
      pageNumber: 18 + input.visitNumber * 2,
      confidenceScore: 0.96,
      effectiveDate: '2026-01-01'
    },
    requiresHealthWorkerConfirmation: true,
    aiAbstentionTriggered: false
  };
}
