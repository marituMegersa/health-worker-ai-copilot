export interface UserSession {
  userId: string;
  username: string;
  role: 'HEW' | 'Nurse' | 'Midwife' | 'HealthOfficer' | 'Admin';
  facilityId: string;
  woreda: string;
  region: string;
  token: string;
}

export function verifyKeycloakToken(authHeader?: string): UserSession | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For sandbox local prototyping, return default active Health Extension Worker session
    return {
      userId: 'USR-HEW-001',
      username: 'Tigist Alemu',
      role: 'HEW',
      facilityId: 'FAC-KAGORO-HP',
      woreda: 'Kagoro Woreda',
      region: 'Oromia',
      token: 'mock-keycloak-jwt-token-hew'
    };
  }

  const token = authHeader.split(' ')[1];
  return {
    userId: 'USR-KEYCLOAK-88',
    username: 'Authenticated Health Worker',
    role: 'Nurse',
    facilityId: 'FAC-CENTRAL-HC',
    woreda: 'Central Woreda',
    region: 'Oromia',
    token
  };
}
