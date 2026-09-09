import { NextResponse } from 'next/server';
import { processEthiopianClinicalCopilot } from '@/lib/ai/copilot';
import { CDSEngineInput } from '@/lib/clinical-rules/cdsEngine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lang = body.language || 'en';

    const input: CDSEngineInput = {
      patientId: body.patientId || `PAT-ETH-${Math.floor(100 + Math.random() * 900)}`,
      ageYears: Number(body.ageYears || 2),
      gender: (body.gender?.toLowerCase() === 'male' ? 'male' : 'female'),
      isPregnant: body.isPregnant || false,
      gestationalAgeWeeks: body.gestationalAgeWeeks ? Number(body.gestationalAgeWeeks) : undefined,
      vitals: {
        systolicBp: body.systolicBp ? Number(body.systolicBp) : undefined,
        diastolicBp: body.diastolicBp ? Number(body.diastolicBp) : undefined,
        temperatureC: body.temperatureC ? Number(body.temperatureC) : undefined,
        muacCm: body.muacCm ? Number(body.muacCm) : undefined
      },
      symptoms: body.symptoms || [],
      dangerSigns: body.dangerSignsPresent || [],
      labResults: {
        mRdt: body.mRdtResult || 'NOT_DONE',
        proteinuriaDipstick: body.proteinuriaDipstick || 'NEGATIVE'
      },
      language: lang
    };

    const assessment = await processEthiopianClinicalCopilot(input, lang);

    return NextResponse.json({
      success: true,
      assessment
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
