import { NextResponse } from 'next/server';

// Stub: list attestation documents
export async function GET() {
  return NextResponse.json({ attestations: [], message: 'Attestation list stub. Connect to attestation service.' });
}

// Stub: publish attestation (admin)
export async function POST() {
  return NextResponse.json({ message: 'Publish attestation stub. Requires admin auth.' }, { status: 501 });
}
