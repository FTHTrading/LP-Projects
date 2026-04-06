import { NextResponse } from 'next/server';

// Stub: current investor profile (requires auth)
export async function GET() {
  return NextResponse.json({
    id: 'inv-001',
    entityName: 'Apex Capital Partners',
    investorType: 'fund',
    countryCode: 'US',
    kycStatus: 'approved',
    accreditationStatus: 'verified',
    whitelisted: true,
    onboardingComplete: true,
  });
}
