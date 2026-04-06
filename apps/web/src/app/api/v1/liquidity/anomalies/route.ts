import { NextResponse } from 'next/server';
import { mockAnomalies } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ anomalies: mockAnomalies });
}
