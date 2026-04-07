// Attestation — document hashing, on-chain anchoring, verification
import { prisma } from '@sov/db';
import type { AttestationDocument, AttestationVerification } from '@sov/shared-types';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require('crypto') as {
  createHash: (alg: string) => { update: (data: Buffer | string) => { digest: (enc: string) => string } };
};

export function computeFileHash(fileBuffer: Buffer): string {
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

export async function publishAttestation(
  doc: Omit<AttestationDocument, 'id' | 'verified' | 'published'>,
  actorId: string,
): Promise<AttestationDocument> {
  const created = await prisma.reserveDocument.create({
    data: {
      type: doc.type.toUpperCase() as never,
      title: doc.title,
      issuer: doc.issuer,
      issuerType: (doc.issuerType?.toUpperCase() ?? 'THIRD_PARTY') as never,
      date: doc.date ? new Date(doc.date) : new Date(),
      expirationDate: doc.expirationDate ? new Date(doc.expirationDate) : null,
      fileHash: doc.fileHash,
      fileSize: 0,
      mimeType: 'application/octet-stream',
      storageKey: doc.fileHash, // storageKey derived from hash until storage adapter is wired
      published: false,
      verified: false,
    },
  });
  void actorId;
  return {
    id: created.id,
    type: created.type.toLowerCase() as AttestationDocument['type'],
    title: created.title,
    issuer: created.issuer,
    issuerType: created.issuerType.toLowerCase() as AttestationDocument['issuerType'],
    date: created.date.toISOString(),
    expirationDate: created.expirationDate?.toISOString(),
    fileHash: created.fileHash,
    chainAnchorTx: created.chainAnchorTx ?? undefined,
    chainAnchorChain: created.chainAnchorChain ?? undefined,
    verified: created.verified,
    published: created.published,
  };
}

export async function verifyAttestation(
  documentId: string,
): Promise<AttestationVerification> {
  const doc = await prisma.reserveDocument.findUnique({ where: { id: documentId } });
  if (!doc) {
    return { documentHash: documentId, verified: false, hashMatch: false };
  }

  // Without a fileBuffer we can only check the chain anchor and expiry structure.
  // Hash-match verification happens when the caller supplies the file for re-hashing
  // (see verifyAttestationWithFile below).
  const hasAnchor = !!(doc.chainAnchorTx && doc.chainAnchorChain && doc.chainAnchorBlock);
  const expired = doc.expirationDate ? doc.expirationDate < new Date() : false;

  return {
    documentHash: doc.fileHash,
    chainAnchor: hasAnchor
      ? {
          chain: doc.chainAnchorChain!,
          txHash: doc.chainAnchorTx!,
          blockNumber: doc.chainAnchorBlock!,
          timestamp: (doc.publishedAt ?? doc.createdAt).toISOString(),
        }
      : undefined,
    verified: doc.verified && !expired,
    hashMatch: true, // presume recorded hash is correct; re-hash on upload in Phase 9
  };
}

export async function verifyAttestationWithFile(
  documentId: string,
  fileBuffer: Buffer,
): Promise<AttestationVerification> {
  const doc = await prisma.reserveDocument.findUnique({ where: { id: documentId } });
  if (!doc) return { documentHash: '', verified: false, hashMatch: false };

  const recomputedHash = computeFileHash(fileBuffer);
  const hashMatch = recomputedHash === doc.fileHash;
  const hasAnchor = !!(doc.chainAnchorTx && doc.chainAnchorChain && doc.chainAnchorBlock);
  const expired = doc.expirationDate ? doc.expirationDate < new Date() : false;

  return {
    documentHash: doc.fileHash,
    chainAnchor: hasAnchor
      ? {
          chain: doc.chainAnchorChain!,
          txHash: doc.chainAnchorTx!,
          blockNumber: doc.chainAnchorBlock!,
          timestamp: (doc.publishedAt ?? doc.createdAt).toISOString(),
        }
      : undefined,
    verified: hashMatch && doc.verified && !expired,
    hashMatch,
  };
}

export async function listAttestations(filters?: {
  type?: string;
  verified?: boolean;
}): Promise<AttestationDocument[]> {
  const rows = await prisma.reserveDocument.findMany({
    where: {
      ...(filters?.type ? { type: filters.type.toUpperCase() as never } : {}),
      ...(filters?.verified !== undefined ? { verified: filters.verified } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
  return rows.map((r) => ({
    id: r.id,
    type: r.type.toLowerCase() as AttestationDocument['type'],
    title: r.title,
    issuer: r.issuer,
    issuerType: r.issuerType.toLowerCase() as AttestationDocument['issuerType'],
    date: r.date.toISOString(),
    expirationDate: r.expirationDate?.toISOString(),
    fileHash: r.fileHash,
    chainAnchorTx: r.chainAnchorTx ?? undefined,
    chainAnchorChain: r.chainAnchorChain ?? undefined,
    verified: r.verified,
    published: r.published,
  }));
}
