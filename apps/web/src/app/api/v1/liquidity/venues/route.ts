import { NextResponse } from 'next/server';
import { mockVenues } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ venues: mockVenues });
}
