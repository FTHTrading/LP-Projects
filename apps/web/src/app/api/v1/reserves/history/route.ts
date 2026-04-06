import { NextResponse } from 'next/server';
import { mockNavHistory } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ snapshots: mockNavHistory });
}
