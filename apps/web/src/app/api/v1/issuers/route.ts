import { NextResponse } from 'next/server';
import { mockIssuerApplications } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    issuers: mockIssuerApplications,
    summary: {
      total: mockIssuerApplications.length,
      avgScore: Math.round(
        mockIssuerApplications.reduce((sum, iss) => sum + iss.qualificationScore, 0) /
        (mockIssuerApplications.length || 1)
      ),
      blockedChannels: mockIssuerApplications.reduce(
        (sum, iss) => sum + iss.fundingChannels.filter(f => f.status === 'blocked').length, 0
      ),
      totalChannels: mockIssuerApplications.reduce(
        (sum, iss) => sum + iss.fundingChannels.length, 0
      ),
    },
  });
}
