// Attestation — document hashing, on-chain anchoring, verification
// Stub: implement SHA-256 hash + Ethereum tx anchor + Prisma storage

import type { AttestationDocument, AttestationVerification } from '@sov/shared-types';

export async function publishAttestation(_doc: Omit<AttestationDocument, 'id' | 'verified' | 'published'>) {
  // TODO: hash file → anchor on-chain → store in db → emit audit event
  throw new Error('Not implemented');
}

export async function verifyAttestation(_documentId: string): Promise<AttestationVerification> {
  // TODO: retrieve doc → re-hash → check chain anchor → return result
  throw new Error('Not implemented');
}

export async function listAttestations(_filters?: { type?: string; verified?: boolean }) {
  // TODO: query AttestationDocument records with filters
  return [];
}

export function computeFileHash(_fileBuffer: Buffer): string {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(_fileBuffer).digest('hex');
}
