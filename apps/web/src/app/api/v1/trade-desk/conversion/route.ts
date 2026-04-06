import { NextResponse } from 'next/server';
import { mockConversionRequests, mockSettlementWallets } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    conversions: mockConversionRequests,
    wallets: mockSettlementWallets,
  });
}
