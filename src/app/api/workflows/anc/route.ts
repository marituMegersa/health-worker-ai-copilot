import { NextResponse } from 'next/server';
import { processANCWorkflow, ANCEncounterInput } from '../../../../../services/clinical-rules/ancWorkflowEngine';

export async function POST(req: Request) {
  try {
    const body: ANCEncounterInput = await req.json();
    const result = processANCWorkflow(body);
    return NextResponse.json({ success: true, assessment: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
