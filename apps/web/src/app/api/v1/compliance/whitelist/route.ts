import { NextResponse } from 'next/server';

// Stub: whitelist management
export async function GET() {
  return NextResponse.json({ addresses: [], message: 'Whitelist stub. Connect to compliance-engine.' });
}

export async function POST() {
  return NextResponse.json({ message: 'Add to whitelist stub. Requires compliance officer auth.' }, { status: 501 });
}
