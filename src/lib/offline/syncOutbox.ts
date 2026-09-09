import { FHIRPatient, FHIRCarePlan, FHIRAuditEvent } from '../fhir/types';
import { hapiFhirClient } from '../../services/interoperability/hapiFhirClient';

export interface OutboxItem {
  id: string;
  timestamp: string;
  resourceType: 'Patient' | 'CarePlan' | 'Encounter' | 'AuditEvent';
  payload: any;
  status: 'PENDING' | 'SYNCING' | 'SYNCED' | 'CONFLICT' | 'FAILED';
  retryCount: number;
  errorMessage?: string;
}

class SyncOutboxService {
  private outbox: OutboxItem[] = [
    {
      id: 'OUT-101',
      timestamp: new Date().toISOString(),
      resourceType: 'Patient',
      payload: {
        resourceType: 'Patient',
        id: 'P-OFFLINE-01',
        name: [{ text: 'Tigist Alemu' }],
        gender: 'female',
        birthDate: '1999-04-12'
      },
      status: 'PENDING',
      retryCount: 0
    },
    {
      id: 'OUT-102',
      timestamp: new Date().toISOString(),
      resourceType: 'CarePlan',
      payload: {
        resourceType: 'CarePlan',
        id: 'CP-OFFLINE-01',
        status: 'active',
        intent: 'plan',
        title: 'Severe Pre-Eclampsia Referral Plan',
        description: 'Administer MgSO4 loading dose and refer immediately'
      },
      status: 'PENDING',
      retryCount: 0
    }
  ];

  getPendingItems(): OutboxItem[] {
    return this.outbox.filter(item => item.status === 'PENDING' || item.status === 'FAILED');
  }

  getOutboxStatusSummary() {
    const pending = this.outbox.filter(i => i.status === 'PENDING').length;
    const synced = this.outbox.filter(i => i.status === 'SYNCED').length;
    const failed = this.outbox.filter(i => i.status === 'FAILED').length;
    const conflict = this.outbox.filter(i => i.status === 'CONFLICT').length;
    return { pending, synced, failed, conflict, total: this.outbox.length };
  }

  async processSyncQueue(): Promise<{ processed: number; succeeded: number; failed: number }> {
    const itemsToSync = this.getPendingItems();
    let succeeded = 0;
    let failed = 0;

    for (const item of itemsToSync) {
      item.status = 'SYNCING';
      try {
        if (item.resourceType === 'Patient') {
          await hapiFhirClient.savePatientRecord(item.payload);
        } else if (item.resourceType === 'CarePlan') {
          await hapiFhirClient.saveCarePlan(item.payload);
        }
        item.status = 'SYNCED';
        succeeded++;
      } catch (err: any) {
        item.status = 'FAILED';
        item.retryCount += 1;
        item.errorMessage = err.message;
        failed++;
      }
    }

    return { processed: itemsToSync.length, succeeded, failed };
  }
}

export const syncOutboxService = new SyncOutboxService();
