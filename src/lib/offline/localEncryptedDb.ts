import { PatientRecord } from '../db';

export interface EncryptedSessionCache {
  workerId: string;
  workerName: string;
  role: string;
  facility: string;
  cachedPatients: PatientRecord[];
  cachedGuidelinesVersion: string;
  lastSyncedAt: string;
}

export const LOCAL_ENCRYPTED_CACHE: EncryptedSessionCache = {
  workerId: 'HEW-0881',
  workerName: 'Tigist Alemu',
  role: 'Health Extension Worker (HEW)',
  facility: 'Kagoro Health Post - Kebele 02',
  cachedPatients: [],
  cachedGuidelinesVersion: '2026.1',
  lastSyncedAt: new Date().toISOString()
};

export function getLocalEncryptedSession(): EncryptedSessionCache {
  return LOCAL_ENCRYPTED_CACHE;
}
