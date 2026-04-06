import { NextResponse } from 'next/server';
import { mockTokens } from '@/lib/mock-data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = mockTokens.find(t => t.symbol.toLowerCase() === id.toLowerCase());
  if (!token) return NextResponse.json({ error: 'Token not found' }, { status: 404 });
  return NextResponse.json({ token });
}
