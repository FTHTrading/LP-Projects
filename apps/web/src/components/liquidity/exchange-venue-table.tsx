'use client';

import type { Venue, LiquiditySnapshot } from '@sov/shared-types';
import { mockVenues, mockLiquiditySnapshots } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-400/10 text-emerald-400',
  suspended: 'bg-red-400/10 text-red-400',
  probation: 'bg-amber-400/10 text-amber-400',
  denied: 'bg-obsidian-600/20 text-obsidian-400',
};

const typeIcons: Record<string, string> = {
  cex: '🏦',
  dex: '🔗',
  otc: '🤝',
  internal: '⚡',
};

interface ExchangeVenueTableProps {
  venues?: Venue[];
  snapshots?: LiquiditySnapshot[];
}

export function ExchangeVenueTable({
  venues = mockVenues,
  snapshots = mockLiquiditySnapshots,
}: ExchangeVenueTableProps) {
  const rows = venues.map((venue) => {
    const snap = snapshots.find((s) => s.venueName === venue.name);
    return { venue, snap };
  });

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-obsidian-800">
        <h3 className="text-sm font-semibold text-obsidian-200">Exchange & Venue Registry</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-obsidian-800 text-obsidian-400">
              <th className="text-left px-4 py-2.5 font-medium">Venue</th>
              <th className="text-left px-4 py-2.5 font-medium">Type</th>
              <th className="text-left px-4 py-2.5 font-medium">Status</th>
              <th className="text-right px-4 py-2.5 font-medium">Best Bid</th>
              <th className="text-right px-4 py-2.5 font-medium">Best Ask</th>
              <th className="text-right px-4 py-2.5 font-medium">Spread (bps)</th>
              <th className="text-right px-4 py-2.5 font-medium">Vol 24h</th>
              <th className="text-right px-4 py-2.5 font-medium">Quality</th>
              <th className="text-left px-4 py-2.5 font-medium">Health</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ venue, snap }) => (
              <tr key={venue.id} className="border-b border-obsidian-800/50 hover:bg-obsidian-900/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>{typeIcons[venue.type] || '📊'}</span>
                    <span className="font-medium text-obsidian-200">{venue.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 uppercase text-obsidian-400 tracking-wider">{venue.type}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${statusStyles[venue.status]}`}>
                    {venue.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-obsidian-200 font-mono">
                  {snap?.bestBid ? formatCurrency(snap.bestBid) : '—'}
                </td>
                <td className="px-4 py-3 text-right text-obsidian-200 font-mono">
                  {snap?.bestAsk ? formatCurrency(snap.bestAsk) : '—'}
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  <span className={snap?.spreadBps && snap.spreadBps > 80 ? 'text-amber-400' : 'text-obsidian-200'}>
                    {snap?.spreadBps ?? '—'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-obsidian-200 font-mono">
                  {snap?.volume24h ? formatCurrency(snap.volume24h) : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  {snap?.qualityScore != null ? (
                    <span className={`font-semibold ${snap.qualityScore >= 80 ? 'text-emerald-400' : snap.qualityScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                      {snap.qualityScore}
                    </span>
                  ) : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`h-2.5 w-2.5 rounded-full inline-block ${venue.lastHealthStatus ? 'bg-emerald-400' : 'bg-red-400'}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
