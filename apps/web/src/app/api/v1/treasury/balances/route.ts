import { NextResponse } from 'next/server';
import { mockTreasuryAccounts } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ accounts: mockTreasuryAccounts });
}
