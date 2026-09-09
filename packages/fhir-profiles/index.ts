export * from '../../src/lib/fhir/types';

export interface FHIRQuestionnaireResponse {
  resourceType: 'QuestionnaireResponse';
  id: string;
  questionnaire: string;
  status: 'in-progress' | 'completed';
  subject: { reference: string };
  authored: string;
  author: { reference: string }; // Practitioner (HEW)
  item: {
    linkId: string;
    text: string;
    answer: {
      valueString?: string;
      valueInteger?: number;
      valueDecimal?: number;
      valueBoolean?: boolean;
      valueCoding?: { system: string; code: string; display: string };
    }[];
  }[];
}
