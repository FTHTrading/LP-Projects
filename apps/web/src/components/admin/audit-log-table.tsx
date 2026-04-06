'use client';

import { useState } from 'react';
import type { AuditEvent } from '@sov/shared-types';
import { mockAuditEvents } from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

const eventTypeColors: Record<string, string> = {
  'token.minted': 'text-emerald-400',
  'token.burned': 'text-red-400',
  'compliance.whitelist_add': 'text-sky-400',
  'compliance.whitelist_remove': 'text-amber-400',
  'reserve.attestation_published': 'text-gold-400',
  'market.anomaly_detected': 'text-orange-400',
  'treasury.settlement': 'text-violet-400',
  'admin.action': 'text-obsidian-300',
};

interface AuditLogTableProps {
  events?: AuditEvent[];
  title?: string;
  showFilters?: boolean;
}

export function AuditLogTable({
  events = mockAuditEvents,
  title = 'Audit Log',
  showFilters = true,
}: AuditLogTableProps) {
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const eventTypes = Array.from(new Set(events.map((e) => e.eventType)));

  const filtered = events.filter((e) => {
    const matchesType = typeFilter === 'all' || e.eventType === typeFilter;
    const matchesText = !filter ||
      e.action.toLowerCase().includes(filter.toLowerCase()) ||
      e.eventType.toLowerCase().includes(filter.toLowerCase()) ||
      (e.actorRole || '').toLowerCase().includes(filter.toLowerCase());
    return matchesType && matchesText;
  });

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-obsidian-800 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-sm font-semibold text-obsidian-200">{title}</h3>
        {showFilters && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search events..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2.5 py-1 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200 placeholder-obsidian-500 focus:outline-none focus:border-gold-500/50"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200 focus:outline-none focus:border-gold-500/50"
            >
              <option value="all">All Types</option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-obsidian-800 text-obsidian-400">
              <th className="text-left px-4 py-2.5 font-medium">Timestamp</th>
              <th className="text-left px-4 py-2.5 font-medium">Event Type</th>
              <th className="text-left px-4 py-2.5 font-medium">Actor</th>
              <th className="text-left px-4 py-2.5 font-medium">Action</th>
              <th className="text-left px-4 py-2.5 font-medium">Target</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((event) => (
              <tr key={event.id} className="border-b border-obsidian-800/50 hover:bg-obsidian-900/50">
                <td className="px-4 py-2.5 text-obsidian-300 font-mono whitespace-nowrap">
                  {formatDateTime(event.timestamp)}
                </td>
                <td className="px-4 py-2.5">
                  <span className={`font-mono ${eventTypeColors[event.eventType] || 'text-obsidian-300'}`}>
                    {event.eventType}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div>
                    {event.actorId && <span className="text-obsidian-200">{event.actorId}</span>}
                    {event.actorRole && (
                      <span className="ml-1.5 text-[10px] text-obsidian-500">({event.actorRole})</span>
                    )}
                    {!event.actorId && <span className="text-obsidian-500">system</span>}
                  </div>
                </td>
                <td className="px-4 py-2.5 text-obsidian-200 max-w-xs truncate">{event.action}</td>
                <td className="px-4 py-2.5 text-obsidian-400 font-mono">
                  {event.targetType && event.targetId
                    ? `${event.targetType}:${event.targetId}`
                    : '—'}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-obsidian-500">
                  No events match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-obsidian-800 flex items-center justify-between text-[10px] text-obsidian-500">
        <span>{filtered.length} event{filtered.length !== 1 ? 's' : ''}</span>
        <span>Append-only • Tamper-evident</span>
      </div>
    </div>
  );
}
