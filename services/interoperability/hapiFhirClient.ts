import { FHIRPatient, FHIRObservation, FHIRCarePlan, FHIRAuditEvent } from '../../packages/fhir-profiles';

export interface HAPIFhirConfig {
  baseUrl: string;
  authHeader?: string;
  timeoutMs: number;
}

export class HAPIFhirClient {
  private config: HAPIFhirConfig;

  constructor(config?: Partial<HAPIFhirConfig>) {
    this.config = {
      baseUrl: config?.baseUrl || process.env.HAPI_FHIR_URL || 'http://localhost:8080/fhir',
      authHeader: config?.authHeader,
      timeoutMs: config?.timeoutMs || 10000
    };
  }

  async savePatientRecord(patient: FHIRPatient): Promise<{ success: boolean; id: string }> {
    // Simulates posting Patient resource to HAPI FHIR server
    return { success: true, id: patient.id };
  }

  async saveCarePlan(carePlan: FHIRCarePlan): Promise<{ success: boolean; id: string }> {
    // Simulates posting CarePlan resource to HAPI FHIR server
    return { success: true, id: carePlan.id };
  }

  async logAuditEvent(auditEvent: FHIRAuditEvent): Promise<{ success: boolean; id: string }> {
    // Simulates recording FHIR AuditEvent for tamper-proof compliance
    return { success: true, id: auditEvent.id };
  }

  async executeFhirTransactionBundle(bundle: { resourceType: 'Bundle'; type: 'transaction'; entry: any[] }) {
    return {
      resourceType: 'Bundle',
      type: 'transaction-response',
      entry: bundle.entry.map(e => ({ status: '201 Created', location: `${e.resource.resourceType}/${e.resource.id}` }))
    };
  }
}

export const hapiFhirClient = new HAPIFhirClient();
