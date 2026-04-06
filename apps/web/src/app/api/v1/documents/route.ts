import { NextResponse } from 'next/server';

// Stub: document management
export async function GET() {
  return NextResponse.json({ documents: [], message: 'Document list stub. Connect to document service.' });
}

export async function POST() {
  return NextResponse.json({ message: 'Document upload stub. Requires admin auth.' }, { status: 501 });
}
