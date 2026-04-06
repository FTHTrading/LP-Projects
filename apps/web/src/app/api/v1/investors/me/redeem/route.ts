import { NextResponse } from 'next/server';

// Stub: submit redemption request (requires auth)
export async function POST() {
  return NextResponse.json({ message: 'Redemption request stub. Requires auth and compliance check.' }, { status: 501 });
}
