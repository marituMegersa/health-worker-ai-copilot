export interface FHIRCoding {
  system: string;
  code: string;
  display: string;
}

export interface FHIRCodeableConcept {
  coding: FHIRCoding[];
  text?: string;
}

export interface FHIRReference {
  reference: string;
  display?: string;
}

export interface FHIRPatient {
  resourceType: 'Patient';
  id: string;
  identifier: {
    system: string; // e.g. "http://moh.gov.et/echis/patient-id"
    value: string;
  }[];
  active: boolean;
  name: {
    use: string;
    text: string;
    family?: string;
    given?: string[];
  }[];
  telecom?: {
    system: 'phone' | 'email';
    value: string;
  }[];
  gender: 'female' | 'male' | 'other' | 'unknown';
  birthDate?: string;
  address?: {
    text: string;
    city?: string; // Woreda
    district?: string; // Zone / Region
    country?: string; // "Ethiopia"
  }[];
}

export interface FHIRObservation {
  resourceType: 'Observation';
  id: string;
  status: 'final' | 'amended';
  category?: FHIRCodeableConcept[];
  code: FHIRCodeableConcept; // LOINC / NHDD code
  subject: FHIRReference; // Patient/P123
  effectiveDateTime: string;
  valueQuantity?: {
    value: number;
    unit: string;
    code: string;
  };
  valueString?: string;
  valueCodeableConcept?: FHIRCodeableConcept;
}

export interface FHIRCondition {
  resourceType: 'Condition';
  id: string;
  clinicalStatus: FHIRCodeableConcept;
  verificationStatus: FHIRCodeableConcept;
  category: FHIRCodeableConcept[];
  code: FHIRCodeableConcept; // ICD-11 / NHDD
  subject: FHIRReference;
  onsetDateTime?: string;
}

export interface FHIRServiceRequest {
  resourceType: 'ServiceRequest';
  id: string;
  status: 'draft' | 'active' | 'completed';
  intent: 'proposal' | 'plan' | 'order';
  code: FHIRCodeableConcept; // Referral code
  subject: FHIRReference;
  requester?: FHIRReference; // Practitioner/HEW01
  reasonCode?: FHIRCodeableConcept[];
  occurrenceDateTime?: string;
}

export interface FHIRCarePlan {
  resourceType: 'CarePlan';
  id: string;
  status: 'draft' | 'active' | 'completed';
  intent: 'proposal' | 'plan';
  subject: FHIRReference;
  title: string;
  description: string;
  author: FHIRReference;
  activity: {
    detail: {
      code?: FHIRCodeableConcept;
      status: 'not-started' | 'in-progress' | 'completed';
      scheduledString?: string;
      description?: string;
    };
  }[];
}

export interface FHIRAuditEvent {
  resourceType: 'AuditEvent';
  id: string;
  type: FHIRCoding;
  action: 'C' | 'R' | 'U' | 'D' | 'E'; // Create, Read, Update, Delete, Execute
  recorded: string;
  outcome: '0' | '4' | '8'; // Success, Minor failure, Serious failure
  agent: {
    who: FHIRReference;
    role?: FHIRCodeableConcept[];
  }[];
  entity: {
    what: FHIRReference;
    type?: FHIRCoding;
  }[];
}
