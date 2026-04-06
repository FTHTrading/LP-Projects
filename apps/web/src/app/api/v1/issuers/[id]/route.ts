import { NextResponse } from 'next/server';
import { mockIssuerApplications } from '@/lib/mock-data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const issuer = mockIssuerApplications.find(iss => iss.id === id);
  if (!issuer) {
    return NextResponse.json({ error: 'Issuer not found' }, { status: 404 });
  }
  return NextResponse.json({ issuer });
}
