import { NextResponse } from 'next/server';
import { ingestionPipeline } from '../../../../../services/document-processing/ingestionPipeline';

export async function GET() {
  const chunks = ingestionPipeline.getActiveChunks();
  return NextResponse.json({
    success: true,
    totalActiveChunks: chunks.length,
    chunks
  });
}
