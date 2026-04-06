import { NextResponse } from 'next/server';

// Stub: check if a transfer is eligible
export async function POST() {
  return NextResponse.json({
    allowed: true,
    details: [
      { rule: 'kyc_check', passed: true },
      { rule: 'jurisdiction_filter', passed: true },
      { rule: 'accreditation_check', passed: true },
    ],
    message: 'Transfer check stub. Connect to compliance-engine.',
  });
}
