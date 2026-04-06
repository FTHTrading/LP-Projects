import { NextResponse } from 'next/server';
import { mockLiquiditySnapshots } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    prices: mockLiquiditySnapshots.map(s => ({
      venue: s.venueName, bestBid: s.bestBid, bestAsk: s.bestAsk, vwap24h: s.vwap24h, timestamp: s.timestamp,
    })),
  });
}
