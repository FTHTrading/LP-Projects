// Documents — file storage, versioning, access control, download
// Stub: implement with S3-compatible storage + Prisma Document model

import type { AttestationDocument } from '@sov/shared-types';

export async function uploadDocument(_file: Buffer, _metadata: {
  title: string;
  type: string;
  issuer: string;
  issuerType: string;
}) {
  // TODO: hash file → upload to storage → insert db record → return document
  throw new Error('Not implemented');
}

export async function getDocument(_documentId: string) {
  // TODO: fetch metadata + signed download URL
  return null;
}

export async function listDocuments(_filters?: { type?: string; investorId?: string }) {
  // TODO: query documents with access control filtering
  return [];
}

export async function getDownloadUrl(_documentId: string, _userId: string) {
  // TODO: verify access → generate pre-signed URL
  throw new Error('Not implemented');
}
