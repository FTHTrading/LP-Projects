import { NextResponse } from 'next/server';
import { mockReserveSummary, mockNavHistory } from '@/lib/mock-data';

export async function GET() {
  const latestNav = mockNavHistory[mockNavHistory.length - 1];
  return NextResponse.json({
    summary: mockReserveSummary,
    currentNav: latestNav,
  });
}
