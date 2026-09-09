import { NextResponse } from 'next/server';
import { MOCK_PATIENTS, PatientRecord } from '@/lib/db';

export async function GET() {
  return NextResponse.json({ success: true, patients: MOCK_PATIENTS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPatient: PatientRecord = {
      id: `P${(MOCK_PATIENTS.length + 1).toString().padStart(3, '0')}`,
      patientId: `PAT-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: body.name,
      age: Number(body.age),
      gender: body.gender,
      villageDistrict: body.villageDistrict || 'Kagoro Health District',
      contactNumber: body.contactNumber,
      registeredDate: new Date().toISOString().split('T')[0],
      muacCm: body.muacCm ? Number(body.muacCm) : undefined,
      isHighRisk: body.isHighRisk || false,
      notes: body.notes
    };

    MOCK_PATIENTS.unshift(newPatient);

    return NextResponse.json({ success: true, patient: newPatient });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
