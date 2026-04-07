// Audit — immutable event logging, tamper detection, export
// All state-changing operations must emit an audit event through this module.
import { prisma } from '@sov/db';
import type { AuditEvent } from '@sov/shared-types';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require('crypto') as { createHash: (alg: string) => { update: (data: string) => { digest: (enc: string) => string } } };

function computeEventHash(event: Record<string, unknown>, prevHash?: string): string {
  const payload = JSON.stringify({ ...event, prevHash: prevHash ?? null });
  return (crypto.createHash('sha256').update(payload).digest('hex')) as string;
}

export async function emitAuditEvent(
  event: Omit<AuditEvent, 'id' | 'timestamp'>,
): Promise<AuditEvent> {
  // Get hash of the last event in the chain for tamper detection
  const lastEvent = await prisma.auditEvent.findFirst({
    orderBy: { timestamp: 'desc' },
    select: { eventHash: true },
  });

  const eventHash = computeEventHash(
    event as unknown as Record<string, unknown>,
    lastEvent?.eventHash,
  );

  const created = await prisma.auditEvent.create({
    data: {
      eventType: event.eventType,
      actorId: event.actorId,
      actorRole: event.actorRole,
      targetType: event.targetType,
      targetId: event.targetId,
      action: event.action,
      details: event.details as never ?? undefined,
      eventHash,
      prevEventHash: lastEvent?.eventHash ?? null,
    },
  });

  return {
    id: created.id,
    timestamp: created.timestamp.toISOString(),
    eventType: created.eventType,
    actorId: created.actorId ?? undefined,
    actorRole: created.actorRole ?? undefined,
    targetType: created.targetType ?? undefined,
    targetId: created.targetId ?? undefined,
    action: created.action,
    details: (created.details as Record<string, unknown>) ?? undefined,
  };
}

export async function queryAuditLog(filters?: {
  eventType?: string;
  actorId?: string;
  targetType?: string;
  since?: string;
  limit?: number;
}): Promise<AuditEvent[]> {
  const rows = await prisma.auditEvent.findMany({
    where: {
      ...(filters?.eventType ? { eventType: filters.eventType } : {}),
      ...(filters?.actorId ? { actorId: filters.actorId } : {}),
      ...(filters?.targetType ? { targetType: filters.targetType } : {}),
      ...(filters?.since ? { timestamp: { gte: new Date(filters.since) } } : {}),
    },
    orderBy: { timestamp: 'desc' },
    take: filters?.limit ?? 200,
  });

  return rows.map((r) => ({
    id: r.id,
    timestamp: r.timestamp.toISOString(),
    eventType: r.eventType,
    actorId: r.actorId ?? undefined,
    actorRole: r.actorRole ?? undefined,
    targetType: r.targetType ?? undefined,
    targetId: r.targetId ?? undefined,
    action: r.action,
    details: (r.details as Record<string, unknown>) ?? undefined,
  }));
}

export async function exportAuditLog(
  since: string,
  until: string,
  format: 'json' | 'csv',
): Promise<string> {
  const rows = await prisma.auditEvent.findMany({
    where: { timestamp: { gte: new Date(since), lte: new Date(until) } },
    orderBy: { timestamp: 'asc' },
  });

  if (format === 'json') {
    return JSON.stringify(rows, null, 2);
  }

  // CSV format
  const header = 'id,timestamp,eventType,actorId,actorRole,targetType,targetId,action';
  const lines = rows.map((r) =>
    [
      r.id,
      r.timestamp.toISOString(),
      r.eventType,
      r.actorId ?? '',
      r.actorRole ?? '',
      r.targetType ?? '',
      r.targetId ?? '',
      `"${r.action.replace(/"/g, '""')}"`,
    ].join(','),
  );
  return [header, ...lines].join('\n');
}
