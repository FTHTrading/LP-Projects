// Market Operations — liquidity monitoring, anomaly detection, circuit breakers
import { prisma } from '@sov/db';
import type { LiquidityHealth, LiquiditySnapshot, AnomalyEvent } from '@sov/shared-types';

export async function getLiquidityHealth(tokenSymbol: string): Promise<LiquidityHealth | null> {
  const token = await prisma.tokenClass.findUnique({ where: { symbol: tokenSymbol } });
  if (!token) return null;

  const snapshots = await getLatestSnapshots(tokenSymbol);

  let totalBid = 0;
  let totalAsk = 0;
  let totalVolume = 0;
  let weightedSpread = 0;
  let venueCount = 0;

  for (const snap of snapshots) {
    if (snap.bestBid) totalBid += parseFloat(snap.bestBid);
    if (snap.bestAsk) totalAsk += parseFloat(snap.bestAsk);
    if (snap.volume24h) totalVolume += parseFloat(snap.volume24h);
    if (snap.spreadBps) { weightedSpread += snap.spreadBps; venueCount++; }
  }

  const aggregateSpreadBps = venueCount > 0 ? weightedSpread / venueCount : 0;
  const healthScore = Math.max(0, Math.min(100, 100 - aggregateSpreadBps / 10));

  const anomalyCount = await prisma.anomalyEvent.count({
    where: { tokenSymbol, acknowledged: false },
  });

  const circuitBreaker = await evaluateCircuitBreakers(tokenSymbol);

  // NAV: get latest snapshot
  const latestNav = await prisma.navSnapshot.findFirst({
    where: { token: { symbol: tokenSymbol } },
    orderBy: { timestamp: 'desc' },
  });
  const navPerToken = latestNav ? latestNav.navPerToken.toString() : '0';

  const midPrice = totalBid > 0 && totalAsk > 0 ? (totalBid + totalAsk) / 2 / snapshots.length : 0;
  const navNum = parseFloat(navPerToken);
  const premiumDiscountPct = navNum > 0 ? ((midPrice - navNum) / navNum) * 100 : 0;

  return {
    tokenSymbol,
    aggregateBid: (totalBid / Math.max(snapshots.length, 1)).toFixed(6),
    aggregateAsk: (totalAsk / Math.max(snapshots.length, 1)).toFixed(6),
    aggregateSpreadBps: Math.round(aggregateSpreadBps),
    totalVolume24h: totalVolume.toFixed(6),
    navPerToken,
    premiumDiscountPct: Math.round(premiumDiscountPct * 100) / 100,
    venueCount: snapshots.length,
    healthScore: Math.round(healthScore),
    circuitBreakerActive: circuitBreaker.triggered,
    anomalyCount,
  };
}

export async function getLatestSnapshots(tokenSymbol: string): Promise<LiquiditySnapshot[]> {
  const token = await prisma.tokenClass.findUnique({ where: { symbol: tokenSymbol } });
  if (!token) return [];

  const venues = await prisma.venue.findMany({ where: { status: 'ACTIVE' } });
  const results: LiquiditySnapshot[] = [];

  for (const venue of venues) {
    const snap = await prisma.liquiditySnapshot.findFirst({
      where: { tokenId: token.id, venueId: venue.id },
      orderBy: { timestamp: 'desc' },
    });
    if (snap) {
      results.push({
        tokenSymbol,
        venueName: venue.name,
        timestamp: snap.timestamp.toISOString(),
        bestBid: snap.bestBid?.toString() ?? undefined,
        bestAsk: snap.bestAsk?.toString() ?? undefined,
        spreadBps: snap.spreadBps ? parseFloat(snap.spreadBps.toString()) : undefined,
        bidDepth: snap.bidDepth?.toString() ?? undefined,
        askDepth: snap.askDepth?.toString() ?? undefined,
        volume24h: snap.volume24h?.toString() ?? undefined,
        vwap24h: snap.vwap24h?.toString() ?? undefined,
        inventoryLevel: snap.inventoryLevel?.toString() ?? undefined,
        qualityScore: snap.qualityScore ? parseFloat(snap.qualityScore.toString()) : undefined,
        source: snap.source,
      });
    }
  }
  return results;
}

export async function detectAnomalies(tokenSymbol: string): Promise<AnomalyEvent[]> {
  const rows = await prisma.anomalyEvent.findMany({
    where: { tokenSymbol, acknowledged: false },
    include: { venue: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return rows.map((r) => ({
    id: r.id,
    venueName: r.venue.name,
    tokenSymbol: r.tokenSymbol,
    anomalyType: r.anomalyType,
    severity: r.severity.toLowerCase() as AnomalyEvent['severity'],
    description: r.description,
    acknowledged: r.acknowledged,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function evaluateCircuitBreakers(
  tokenSymbol: string,
): Promise<{ triggered: boolean; breakers: string[] }> {
  const cutoff = new Date(Date.now() - 15 * 60 * 1000);
  const critical = await prisma.anomalyEvent.count({
    where: {
      tokenSymbol,
      severity: 'CRITICAL',
      acknowledged: false,
      createdAt: { gte: cutoff },
    },
  });
  const breakers: string[] = [];
  if (critical >= 2) breakers.push('too_many_critical_anomalies');
  return { triggered: breakers.length > 0, breakers };
}

export function computeReferencePrice(snapshots: LiquiditySnapshot[]): string {
  let totalWeight = 0;
  let weightedSum = 0;
  for (const snap of snapshots) {
    const bid = snap.bestBid ? parseFloat(snap.bestBid) : 0;
    const ask = snap.bestAsk ? parseFloat(snap.bestAsk) : 0;
    const mid = bid > 0 && ask > 0 ? (bid + ask) / 2 : 0;
    const vol = snap.volume24h ? parseFloat(snap.volume24h) : 0;
    if (mid > 0 && vol > 0) {
      weightedSum += mid * vol;
      totalWeight += vol;
    }
  }
  if (totalWeight === 0) return '0';
  return (weightedSum / totalWeight).toFixed(6);
}
