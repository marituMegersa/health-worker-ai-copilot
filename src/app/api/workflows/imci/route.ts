import { NextResponse } from 'next/server';
import { processIMCIChildWorkflow, IMCIChildInput } from '../../../../../services/clinical-rules/childHealthWorkflowEngine';

export async function POST(req: Request) {
  try {
    const body: IMCIChildInput = await req.json();
    const result = processIMCIChildWorkflow(body);
    return NextResponse.json({ success: true, assessment: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
