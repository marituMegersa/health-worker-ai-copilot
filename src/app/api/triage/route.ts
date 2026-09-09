import { NextResponse } from 'next/server';
import { processClinicalTriage, PatientIntakeData } from '@/lib/ai/copilot';
import { MOCK_CONSULTATIONS, ConsultationRecord } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const intake: PatientIntakeData = await req.json();
    
    // Process clinical reasoning with AI copilot
    const result = await processClinicalTriage(intake);

    // Record consultation in mock database
    const newConsultation: ConsultationRecord = {
      id: `C${Date.now().toString().slice(-4)}`,
      patientId: `PAT-${Math.floor(100 + Math.random() * 900)}`,
      patientName: intake.patientName,
      healthWorkerName: 'Health Worker (Active Session)',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      chiefComplaint: intake.chiefComplaint,
      symptoms: intake.symptoms,
      vitals: {
        tempC: intake.temperatureC,
        bpSystolic: intake.systolicBp,
        bpDiastolic: intake.diastolicBp,
        heartRate: intake.heartRateBpm,
        muacCm: intake.muacCm
      },
      triageRisk: result.riskLevel,
      protocolUsed: result.matchedProtocol?.name || 'General Triage',
      actionTaken: result.suggestedActions,
      medicationsPrescribed: result.recommendedMedications.map(m => ({ name: m.name, dosage: m.dosage })),
      locationDistrict: intake.locationDistrict || 'Kagoro District'
    };

    MOCK_CONSULTATIONS.unshift(newConsultation);

    return NextResponse.json({
      success: true,
      assessment: result,
      consultationId: newConsultation.id
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
