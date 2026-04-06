import { NextResponse } from 'next/server';
import { mockHolderConcentration, mockMpraHolderConcentration } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    svpg: mockHolderConcentration,
    referenceComparisons: {
      MPRA: mockMpraHolderConcentration,
    },
  });
}
