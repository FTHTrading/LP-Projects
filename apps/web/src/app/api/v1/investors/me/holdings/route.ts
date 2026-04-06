import { NextResponse } from 'next/server';

// Stub: investor holdings (requires auth)
export async function GET() {
  return NextResponse.json({
    holdings: [
      { tokenSymbol: 'SVPG', tokenName: 'Sovereign Preferred Gold', balance: '85000', lockedAmount: '0', currentValue: '4143750.00', navPerToken: '48.75' },
      { tokenSymbol: 'SVCS', tokenName: 'Sovereign Common Share', balance: '12000', lockedAmount: '2000', currentValue: '147600.00', navPerToken: '12.30' },
    ],
  });
}
