import { NextResponse } from 'next/server';
import { MOCK_CONSULTATIONS, MOCK_SUPPLIES, MOCK_PATIENTS } from '@/lib/db';
import { synthesizeOutbreakData } from '@/lib/ai/copilot';

export async function GET() {
  const outbreakData = synthesizeOutbreakData(MOCK_CONSULTATIONS);

  const totalPatients = MOCK_PATIENTS.length;
  const highRiskPatients = MOCK_PATIENTS.filter(p => p.isHighRisk).length;
  const emergencyReferrals = MOCK_CONSULTATIONS.filter(c => c.triageRisk.includes('RED')).length;
  const lowStockCount = MOCK_SUPPLIES.filter(s => s.status !== 'In Stock').length;

  // Monthly symptom trend simulation
  const monthlyTrends = [
    { month: 'May', malaria: 42, diarrhea: 18, respiratory: 25 },
    { month: 'Jun', malaria: 55, diarrhea: 22, respiratory: 30 },
    { month: 'Jul', malaria: 88, diarrhea: 35, respiratory: 28 },
    { month: 'Aug', malaria: 110, diarrhea: 40, respiratory: 32 },
    { month: 'Sep (YTD)', malaria: 125, diarrhea: 48, respiratory: 39 },
  ];

  return NextResponse.json({
    success: true,
    summary: {
      totalPatients,
      highRiskPatients,
      emergencyReferrals,
      lowStockCount,
      totalConsultations: MOCK_CONSULTATIONS.length
    },
    outbreakAlerts: outbreakData,
    monthlyTrends,
    recentConsultations: MOCK_CONSULTATIONS,
    supplyStatus: MOCK_SUPPLIES
  });
}
