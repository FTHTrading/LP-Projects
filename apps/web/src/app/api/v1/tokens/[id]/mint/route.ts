import { NextResponse } from 'next/server';

// Stub: mint tokens (admin only)
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: `Mint endpoint stub for ${id}. Requires admin auth.` }, { status: 501 });
}
