import { NextResponse } from 'next/server';
import { mockLiquiditySnapshots } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ spreads: mockLiquiditySnapshots.map(s => ({
    venue: s.venueName,
    bestBid: s.bestBid,
    bestAsk: s.bestAsk,
    spreadBps: s.spreadBps,
    timestamp: s.timestamp,
  }))});
}
