import { NextResponse } from 'next/server';
import { mockLiquidityHealth } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ health: mockLiquidityHealth });
}
