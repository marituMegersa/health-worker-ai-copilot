import { NextResponse } from 'next/server';
import { ragEngine } from '../../../../../services/ai/ragEngine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const results = ragEngine.search({
      queryText: body.query || body.q || 'antenatal care pre-eclampsia',
      minConfidenceThreshold: body.minConfidence || 0.70
    });

    return NextResponse.json({
      success: true,
      totalMatches: results.length,
      results
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
