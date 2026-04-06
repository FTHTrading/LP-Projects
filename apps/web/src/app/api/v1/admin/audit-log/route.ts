import { NextResponse } from 'next/server';
import { mockAuditEvents } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ events: mockAuditEvents });
}
