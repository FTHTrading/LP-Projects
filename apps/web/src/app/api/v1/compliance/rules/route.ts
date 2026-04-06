import { NextResponse } from 'next/server';

// Stub: compliance rules
export async function GET() {
  return NextResponse.json({ rules: [], message: 'Compliance rules stub. Connect to compliance-engine package.' });
}

export async function POST() {
  return NextResponse.json({ message: 'Create compliance rule stub. Requires compliance officer auth.' }, { status: 501 });
}
