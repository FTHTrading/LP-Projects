import { NextResponse } from 'next/server';
import { mockTradeDeskQualification, mockReferenceTokens } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    qualification: mockTradeDeskQualification,
    referenceTokens: mockReferenceTokens,
  });
}
