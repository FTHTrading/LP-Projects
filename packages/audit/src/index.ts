// Audit — immutable event logging, tamper detection, export
// All state-changing operations must emit an audit event through this module.

import type { AuditEvent } from '@sov/shared-types';

export async function emitAuditEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>) {
  // TODO: insert into AuditEvent table with server timestamp → return created event
  // Events are append-only; no update or delete operations exposed.
  throw new Error('Not implemented');
}

export async function queryAuditLog(filters?: {
  eventType?: string;
  actorId?: string;
  targetType?: string;
  since?: string;
  limit?: number;
}): Promise<AuditEvent[]> {
  // TODO: query with filters, ordered by timestamp desc
  return [];
}

export async function exportAuditLog(_since: string, _until: string, _format: 'json' | 'csv') {
  // TODO: stream audit events in requested format for compliance export
  throw new Error('Not implemented');
}
