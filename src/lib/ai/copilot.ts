import { evaluateClinicalRules, CDSEngineInput, CDSEngineOutput } from '../clinical-rules/cdsEngine';
import { TRANSLATIONS, SupportedLanguage } from '../i18n/translations';

export interface AIQueryResult {
  language: SupportedLanguage;
  safetyTier: 'GREEN' | 'AMBER' | 'RED';
  title: string;
  summary: string;
  deterministicCarePlan: string[];
  prescribedMedications: { name: string; dosage: string; notes: string }[];
  citation: {
    guidelineTitle: string;
    publisher: string;
    version: string;
    section: string;
    pageNumber: number;
    confidenceScore: number;
  };
  requiresHealthWorkerConfirmation: boolean;
  aiAbstentionTriggered: boolean;
  abstentionReason?: string;
  localizedText: {
    safetyBadge: string;
    confirmationPrompt: string;
    citationHeader: string;
  };
}

export async function processEthiopianClinicalCopilot(
  input: CDSEngineInput,
  lang: SupportedLanguage = 'en'
): Promise<AIQueryResult> {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // 1. Run Deterministic CDS Rules Engine (Never let LLM invent clinical rules)
  const cdsResult = evaluateClinicalRules({ ...input, language: lang });

  // 2. Check for AI Abstention Criteria
  let abstentionTriggered = false;
  let abstentionReason: string | undefined;

  if (input.symptoms.length === 0 && !input.isPregnant && !input.vitals.temperatureC && !input.vitals.systolicBp) {
    abstentionTriggered = true;
    abstentionReason = t.aiAbstentionWarning;
  }

  // 3. Render Localized Text
  const safetyBadge =
    cdsResult.safetyTier === 'RED'
      ? t.safetyRed
      : cdsResult.safetyTier === 'AMBER'
      ? t.safetyAmber
      : t.safetyGreen;

  return {
    language: lang,
    safetyTier: cdsResult.safetyTier,
    title: cdsResult.title,
    summary: cdsResult.summary,
    deterministicCarePlan: cdsResult.deterministicCarePlan,
    prescribedMedications: cdsResult.prescribedMedications,
    citation: cdsResult.citation,
    requiresHealthWorkerConfirmation: cdsResult.requiresHealthWorkerConfirmation,
    aiAbstentionTriggered: abstentionTriggered,
    abstentionReason: abstentionReason,
    localizedText: {
      safetyBadge,
      confirmationPrompt: t.confirmHealthWorkerAction,
      citationHeader: t.citationSource
    }
  };
}
