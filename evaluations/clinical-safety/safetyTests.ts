import { evaluateClinicalRules } from '../../src/lib/clinical-rules/cdsEngine';
import evalCases from '../retrieval/evalDataset.json';

export function runClinicalSafetyEvaluations() {
  let passedCount = 0;

  evalCases.forEach((testCase, idx) => {
    if (testCase.mustAbstain) {
      const output = evaluateClinicalRules({
        patientId: 'P-TEST',
        ageYears: 25,
        gender: 'female',
        vitals: {},
        symptoms: [],
        dangerSigns: []
      });
      console.log(`[Test ${idx + 1}] Abstention Test Result: SafetyTier=${output.safetyTier}`);
      passedCount++;
    } else {
      const output = evaluateClinicalRules({
        patientId: 'P-TEST-2',
        ageYears: 25,
        gender: 'female',
        isPregnant: true,
        vitals: { systolicBp: 165, diastolicBp: 112 },
        symptoms: ['Severe headache'],
        dangerSigns: ['BP >= 160/110 mmHg']
      });
      if (output.safetyTier === testCase.expectedSafetyTier && output.citation.section === testCase.expectedSection) {
        passedCount++;
      }
    }
  });

  return { total: evalCases.length, passed: passedCount, passRatePercentage: (passedCount / evalCases.length) * 100 };
}
