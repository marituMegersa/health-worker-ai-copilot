import { NextResponse } from 'next/server';
import { syncOutboxService } from '@/lib/offline/syncOutbox';

export async function GET() {
  const summary = syncOutboxService.getOutboxStatusSummary();
  const pending = syncOutboxService.getPendingItems();

  return NextResponse.json({
    success: true,
    summary,
    pendingItems: pending
  });
}

export async function POST() {
  const result = await syncOutboxService.processSyncQueue();
  const summary = syncOutboxService.getOutboxStatusSummary();

  return NextResponse.json({
    success: true,
    syncResult: result,
    summary
  });
}
