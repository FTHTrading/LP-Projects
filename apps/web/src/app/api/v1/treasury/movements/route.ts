import { NextResponse } from 'next/server';

// Stub: treasury movements
export async function GET() {
  return NextResponse.json({ movements: [], message: 'Treasury movements stub. Connect to treasury package.' });
}
