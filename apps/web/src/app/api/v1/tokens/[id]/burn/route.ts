import { NextResponse } from 'next/server';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: `Burn endpoint stub for ${id}. Requires admin auth.` }, { status: 501 });
}
