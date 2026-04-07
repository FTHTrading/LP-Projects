// Reserve Registry — asset registration, valuation, NAV computation
import { prisma } from '@sov/db';
import type { ReserveSummary, NavSnapshot, ReserveAsset } from '@sov/shared-types';

export async function getReserveSummary(): Promise<ReserveSummary> {
  const assets = await prisma.reserveAsset.findMany({ where: { active: true } });

  let totalValue = 0;
  let attestedValue = 0;
  let selfReportedValue = 0;
  let unverifiedValue = 0;
  const byClass: Record<string, number> = {};

  for (const asset of assets) {
    const value = parseFloat(asset.lastValuationAmount?.toString() ?? '0');
    totalValue += value;
    const cls = asset.assetClass.toLowerCase();
    byClass[cls] = (byClass[cls] ?? 0) + value;

    if (asset.attestationLevel === 'ATTESTED') attestedValue += value;
    else if (asset.attestationLevel === 'SELF_REPORTED') selfReportedValue += value;
    else unverifiedValue += value;
  }

  const netValue = totalValue; // No liabilities model yet — will expand in Phase 3

  return {
    totalValue: totalValue.toFixed(2),
    totalLiabilities: '0',
    netValue: netValue.toFixed(2),
    attestedPct: totalValue > 0 ? (attestedValue / totalValue) * 100 : 0,
    selfReportedPct: totalValue > 0 ? (selfReportedValue / totalValue) * 100 : 0,
    unverifiedPct: totalValue > 0 ? (unverifiedValue / totalValue) * 100 : 0,
    assetBreakdown: Object.entries(byClass).map(([assetClass, value]) => ({
      assetClass: assetClass as ReserveSummary['assetBreakdown'][0]['assetClass'],
      value: value.toFixed(2),
      pct: totalValue > 0 ? (value / totalValue) * 100 : 0,
    })),
  };
}

export async function computeNav(tokenSymbol: string): Promise<NavSnapshot> {
  const token = await prisma.tokenClass.findUnique({ where: { symbol: tokenSymbol } });
  if (!token) throw new Error(`Token not found: ${tokenSymbol}`);

  // Get all reserve assets linked to this token
  const links = await prisma.reserveTokenLink.findMany({
    where: { tokenId: token.id },
    include: { reserve: true },
  });

  let reserveValue = 0;
  for (const link of links) {
    const baseValue = parseFloat(link.reserve.lastValuationAmount?.toString() ?? '0');
    const allocationPct = parseFloat(link.allocationPct.toString()) / 100;
    // Apply attestation discount
    const discountFactor =
      link.reserve.attestationLevel === 'ATTESTED'
        ? 1.0
        : link.reserve.attestationLevel === 'SELF_REPORTED'
          ? 0.9
          : 0.7;
    reserveValue += baseValue * allocationPct * discountFactor;
  }

  const totalSupply = parseFloat(token.totalSupply.toString());
  const navPerToken = totalSupply > 0 ? reserveValue / totalSupply : 0;
  const backingRatio = totalSupply > 0 ? reserveValue / (navPerToken * totalSupply) : 0;

  const snap = await prisma.navSnapshot.create({
    data: {
      tokenId: token.id,
      totalReserveValue: reserveValue,
      totalLiabilities: 0,
      netReserveValue: reserveValue,
      tokenSupply: totalSupply,
      navPerToken,
      backingRatio: isFinite(backingRatio) ? backingRatio : 1,
      methodology: 'reserve_weighted_nav',
      sources: links.map((l) => ({
        reserveId: l.reserveId,
        reserveName: l.reserve.name,
        allocationPct: l.allocationPct,
        attestationLevel: l.reserve.attestationLevel,
      })),
    },
  });

  return {
    id: snap.id,
    tokenId: snap.tokenId ?? undefined,
    timestamp: snap.timestamp.toISOString(),
    totalReserveValue: snap.totalReserveValue.toString(),
    totalLiabilities: snap.totalLiabilities.toString(),
    netReserveValue: snap.netReserveValue.toString(),
    tokenSupply: snap.tokenSupply.toString(),
    navPerToken: snap.navPerToken.toString(),
    backingRatio: snap.backingRatio.toString(),
    methodology: snap.methodology,
  };
}

export async function registerAsset(
  asset: Omit<ReserveAsset, 'id'>,
  actorId: string,
): Promise<ReserveAsset> {
  const created = await prisma.reserveAsset.create({
    data: {
      name: asset.name,
      assetClass: asset.assetClass.toUpperCase() as never,
      description: asset.description,
      location: asset.location,
      custodian: asset.custodian,
      custodianVerified: asset.custodianVerified,
      lastValuationDate: asset.lastValuationDate
        ? new Date(asset.lastValuationDate)
        : undefined,
      lastValuationAmount: asset.lastValuationAmount
        ? parseFloat(asset.lastValuationAmount)
        : undefined,
      valuationCurrency: asset.valuationCurrency,
      valuationMethodology: asset.valuationMethodology,
      attestationLevel: asset.attestationLevel.toUpperCase() as never,
      weight: asset.weight ? parseFloat(asset.weight) : undefined,
      purity: asset.purity ? parseFloat(asset.purity) : undefined,
      active: true,
    },
  });
  void actorId; // will be used for audit event in Phase 3
  return {
    id: created.id,
    name: created.name,
    assetClass: created.assetClass.toLowerCase() as ReserveAsset['assetClass'],
    description: created.description,
    location: created.location ?? undefined,
    custodian: created.custodian ?? undefined,
    custodianVerified: created.custodianVerified,
    lastValuationDate: created.lastValuationDate?.toISOString(),
    lastValuationAmount: created.lastValuationAmount?.toString(),
    valuationCurrency: created.valuationCurrency,
    valuationMethodology: created.valuationMethodology ?? undefined,
    attestationLevel: created.attestationLevel.toLowerCase() as ReserveAsset['attestationLevel'],
    weight: created.weight?.toString(),
    purity: created.purity?.toString(),
  };
}

export async function getNavHistory(
  tokenSymbol: string,
  days: number,
): Promise<NavSnapshot[]> {
  const token = await prisma.tokenClass.findUnique({ where: { symbol: tokenSymbol } });
  if (!token) return [];

  const since = new Date();
  since.setDate(since.getDate() - days);

  const snaps = await prisma.navSnapshot.findMany({
    where: { tokenId: token.id, timestamp: { gte: since } },
    orderBy: { timestamp: 'asc' },
  });

  return snaps.map((s) => ({
    id: s.id,
    tokenId: s.tokenId ?? undefined,
    timestamp: s.timestamp.toISOString(),
    totalReserveValue: s.totalReserveValue.toString(),
    totalLiabilities: s.totalLiabilities.toString(),
    netReserveValue: s.netReserveValue.toString(),
    tokenSupply: s.tokenSupply.toString(),
    navPerToken: s.navPerToken.toString(),
    backingRatio: s.backingRatio.toString(),
    methodology: s.methodology,
  }));
}
