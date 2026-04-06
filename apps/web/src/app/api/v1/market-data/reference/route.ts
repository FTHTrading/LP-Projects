import { NextResponse } from 'next/server';
import { mockLiquidityHealth, mockNavHistory } from '@/lib/mock-data';

export async function GET() {
  const latestNav = mockNavHistory[mockNavHistory.length - 1];
  return NextResponse.json({
    referencePrice: latestNav.navPerToken,
    aggregateBid: mockLiquidityHealth.aggregateBid,
    aggregateAsk: mockLiquidityHealth.aggregateAsk,
    premiumDiscountPct: mockLiquidityHealth.premiumDiscountPct,
    timestamp: new Date().toISOString(),
  });
}
