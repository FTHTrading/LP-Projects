// Migration Engine — legacy holder snapshot, eligibility gating, claim window
import { prisma } from '@sov/db';
import type {
  MigrationBatch,
  MigrationHolder,
  MigrationSummary,
  MigrationBatchStatus,
  MigrationHolderStatus,
  KycStatus,
} from '@sov/shared-types';

export async function createBatch(params: {
  name: string;
  legacyTokenSymbol: string;
  legacyContractAddress: string;
  legacyChainId: number;
  targetTokenSymbol: string;
  snapshotBlockNumber?: number;
  kycWindowOpensAt?: string;
  kycWindowClosesAt?: string;
  operators?: string[];
  actorId: string;
}): Promise<MigrationBatch> {
  const batch = await prisma.migrationBatch.create({
    data: {
      name: params.name,
      legacyTokenSymbol: params.legacyTokenSymbol,
      legacyContractAddress: params.legacyContractAddress,
      legacyChainId: params.legacyChainId,
      targetTokenSymbol: params.targetTokenSymbol,
      snapshotBlockNumber: params.snapshotBlockNumber ?? null,
      kycWindowOpensAt: params.kycWindowOpensAt ? new Date(params.kycWindowOpensAt) : null,
      kycWindowClosesAt: params.kycWindowClosesAt ? new Date(params.kycWindowClosesAt) : null,
      status: 'DRAFT',
      operators: params.operators ?? [params.actorId],
    },
  });
  return mapBatch(batch);
}

export async function getBatch(batchId: string): Promise<MigrationBatch | null> {
  const batch = await prisma.migrationBatch.findUnique({ where: { id: batchId } });
  return batch ? mapBatch(batch) : null;
}

export async function importHolders(
  batchId: string,
  holders: Array<{
    legacyAddress: string;
    legacyBalance: string;
    snapshotBlock: number;
    snapshotTimestamp: string;
    countryCode?: string;
    newAddress?: string;
  }>,
): Promise<MigrationHolder[]> {
  const created = await prisma.$transaction(
    holders.map((h) =>
      prisma.migrationHolder.create({
        data: {
          batchId,
          legacyAddress: h.legacyAddress,
          legacyBalance: h.legacyBalance,
          snapshotBlock: h.snapshotBlock,
          snapshotTimestamp: new Date(h.snapshotTimestamp),
          countryCode: h.countryCode ?? null,
          newAddress: h.newAddress ?? null,
          status: 'PENDING_KYC',
        },
      }),
    ),
  );

  await prisma.migrationBatch.update({
    where: { id: batchId },
    data: { totalHolders: created.length },
  });

  return created.map(mapHolder);
}

export async function assessEligibility(
  batchId: string,
  holderId: string,
): Promise<{ eligible: boolean; reason?: string }> {
  const holder = await prisma.migrationHolder.findUnique({ where: { id: holderId } });
  if (!holder || holder.batchId !== batchId) {
    return { eligible: false, reason: 'holder_not_found' };
  }

  const walletAddress = holder.newAddress ?? holder.legacyAddress;
  const investor = await prisma.investorProfile.findFirst({ where: { walletAddress } });

  if (!investor) {
    await prisma.migrationHolder.update({
      where: { id: holderId },
      data: { status: 'INELIGIBLE', ineligibleReason: 'no_investor_profile' },
    });
    return { eligible: false, reason: 'no_investor_profile' };
  }

  if (investor.kycStatus !== 'APPROVED') {
    await prisma.migrationHolder.update({
      where: { id: holderId },
      data: {
        status: 'DEFERRED',
        deferredReason: `kyc_status_${investor.kycStatus}`,
        investorId: investor.id,
        kycStatus: 'PENDING',
      },
    });
    return { eligible: false, reason: `kyc_status_${investor.kycStatus}` };
  }

  await prisma.migrationHolder.update({
    where: { id: holderId },
    data: { status: 'ELIGIBLE', investorId: investor.id, kycStatus: 'APPROVED' },
  });
  return { eligible: true };
}

export async function categorizeHolders(
  batchId: string,
): Promise<{ eligible: number; deferred: number; ineligible: number }> {
  const holders = await prisma.migrationHolder.findMany({ where: { batchId } });
  await Promise.all(holders.map((h) => assessEligibility(batchId, h.id)));

  const counts = await prisma.migrationHolder.groupBy({
    by: ['status'],
    where: { batchId },
    _count: true,
  });

  const cm: Record<string, number> = {};
  for (const c of counts) cm[c.status] = c._count;

  const eligible = cm['ELIGIBLE'] ?? 0;
  const deferred = cm['DEFERRED'] ?? 0;
  const ineligible = cm['INELIGIBLE'] ?? 0;

  await prisma.migrationBatch.update({
    where: { id: batchId },
    data: {
      eligibleHolders: eligible,
      deferredHolders: deferred,
      ineligibleHolders: ineligible,
      status: 'SCREENING_COMPLETE',
    },
  });

  return { eligible, deferred, ineligible };
}

export async function executeMint(batchId: string, actorId: string): Promise<MigrationSummary> {
  const batch = await prisma.migrationBatch.findUniqueOrThrow({ where: { id: batchId } });
  if (batch.status !== 'SCREENING_COMPLETE') {
    throw new Error(`Cannot execute mint for batch in status: ${batch.status}`);
  }

  // DB-side: mark eligible holders as MINTED; on-chain mint handled by contracts layer (Phase 9)
  await prisma.migrationHolder.updateMany({
    where: { batchId, status: 'ELIGIBLE' },
    data: { status: 'MINTED', mintedAt: new Date() },
  });

  await prisma.migrationBatch.update({
    where: { id: batchId },
    data: { status: 'ELIGIBLE_MINTED', mintExecutedAt: new Date() },
  });

  void actorId;
  return getSummary(batchId);
}

export async function completeBatch(batchId: string): Promise<MigrationSummary> {
  await prisma.migrationBatch.update({
    where: { id: batchId },
    data: { status: 'COMPLETE', completedAt: new Date() },
  });
  return getSummary(batchId);
}

export async function processDeferredClaim(
  holderId: string,
  newAddress: string,
): Promise<{ success: boolean; reason?: string }> {
  const holder = await prisma.migrationHolder.findUniqueOrThrow({ where: { id: holderId } });
  if (holder.status !== 'DEFERRED') {
    return { success: false, reason: `holder_status_is_${holder.status}` };
  }

  const batch = await prisma.migrationBatch.findUniqueOrThrow({ where: { id: holder.batchId } });
  if (batch.kycWindowClosesAt && batch.kycWindowClosesAt < new Date()) {
    await prisma.migrationHolder.update({
      where: { id: holderId },
      data: { status: 'INELIGIBLE', ineligibleReason: 'kyc_window_expired' },
    });
    return { success: false, reason: 'kyc_window_expired' };
  }

  await prisma.migrationHolder.update({ where: { id: holderId }, data: { newAddress } });
  const { eligible, reason } = await assessEligibility(holder.batchId, holderId);
  return { success: eligible, reason };
}

export async function getSummary(batchId: string): Promise<MigrationSummary> {
  const batch = await prisma.migrationBatch.findUniqueOrThrow({ where: { id: batchId } });
  const total = batch.totalHolders;

  const minted = await prisma.migrationHolder.count({ where: { batchId, status: 'MINTED' } });
  const eligible = batch.eligibleHolders;
  const kycDone = await prisma.migrationHolder.count({
    where: {
      batchId,
      kycStatus: { in: ['APPROVED', 'IN_REVIEW', 'PENDING'] as never[] },
    },
  });

  return {
    batchId,
    legacyTokenSymbol: batch.legacyTokenSymbol,
    targetTokenSymbol: batch.targetTokenSymbol,
    status: batch.status.toLowerCase() as MigrationBatchStatus,
    progressPct: total > 0 ? Math.round((minted / total) * 100) : 0,
    eligibilityPct: total > 0 ? Math.round((eligible / total) * 100) : 0,
    kycCompletionPct: total > 0 ? Math.round((kycDone / total) * 100) : 0,
  };
}

// ─── Mappers ──────────────────────────────────────────────

function mapBatch(b: {
  id: string;
  name: string;
  legacyTokenSymbol: string;
  legacyContractAddress: string;
  legacyChainId: number;
  targetTokenSymbol: string;
  status: string;
  snapshotBlockNumber: number | null;
  snapshotTimestamp: Date | null;
  totalHolders: number;
  eligibleHolders: number;
  ineligibleHolders: number;
  deferredHolders: number;
  kycWindowOpensAt: Date | null;
  kycWindowClosesAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
}): MigrationBatch {
  return {
    id: b.id,
    name: b.name,
    legacyTokenSymbol: b.legacyTokenSymbol,
    legacyContractAddress: b.legacyContractAddress,
    legacyChainId: b.legacyChainId,
    targetTokenSymbol: b.targetTokenSymbol,
    status: b.status.toLowerCase() as MigrationBatchStatus,
    snapshotBlockNumber: b.snapshotBlockNumber ?? undefined,
    snapshotTimestamp: b.snapshotTimestamp?.toISOString(),
    totalHolders: b.totalHolders,
    eligibleHolders: b.eligibleHolders,
    ineligibleHolders: b.ineligibleHolders,
    deferredHolders: b.deferredHolders,
    kycWindowOpensAt: b.kycWindowOpensAt?.toISOString(),
    kycWindowClosesAt: b.kycWindowClosesAt?.toISOString(),
    completedAt: b.completedAt?.toISOString(),
    createdAt: b.createdAt.toISOString(),
  };
}

function mapHolder(h: {
  id: string;
  batchId: string;
  legacyAddress: string;
  legacyBalance: string;
  snapshotBlock: number;
  snapshotTimestamp: Date;
  investorId: string | null;
  kycStatus: string;
  countryCode: string | null;
  status: string;
  ineligibleReason: string | null;
  deferredReason: string | null;
  newAddress: string | null;
  mintedAmount: string | null;
  mintTxHash: string | null;
  mintedAt: Date | null;
  createdAt: Date;
}): MigrationHolder {
  return {
    id: h.id,
    batchId: h.batchId,
    legacyAddress: h.legacyAddress,
    legacyBalance: h.legacyBalance,
    snapshotBlock: h.snapshotBlock,
    snapshotTimestamp: h.snapshotTimestamp.toISOString(),
    investorId: h.investorId ?? undefined,
    kycStatus: h.kycStatus.toLowerCase() as KycStatus,
    countryCode: h.countryCode ?? undefined,
    status: h.status.toLowerCase() as MigrationHolderStatus,
    ineligibleReason: h.ineligibleReason ?? undefined,
    deferredReason: h.deferredReason ?? undefined,
    newAddress: h.newAddress ?? undefined,
    mintedAmount: h.mintedAmount ?? undefined,
    mintTxHash: h.mintTxHash ?? undefined,
    mintedAt: h.mintedAt?.toISOString(),
    createdAt: h.createdAt.toISOString(),
  };
}

