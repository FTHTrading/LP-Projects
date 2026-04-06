'use client';

import { mockLiquidityHealth, mockVenues, mockLiquiditySnapshots } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export function LiquidityHealthWidget() {
  const health = mockLiquidityHealth;

  const scoreColor =
    health.healthScore >= 80
      ? 'text-emerald-400'
      : health.healthScore >= 60
        ? 'text-amber-400'
        : 'text-red-400';

  const scoreRing =
    health.healthScore >= 80
      ? 'stroke-emerald-500'
      : health.healthScore >= 60
        ? 'stroke-amber-500'
        : 'stroke-red-500';

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Health score */}
      <div className="glass-card p-6 flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18" cy="18" r="15.9155"
              fill="none" stroke="currentColor"
              strokeWidth="2" className="text-obsidian-800"
            />
            <circle
              cx="18" cy="18" r="15.9155"
              fill="none" strokeWidth="2.5"
              strokeDasharray={`${health.healthScore} ${100 - health.healthScore}`}
              strokeLinecap="round"
              className={scoreRing}
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${scoreColor}`}>
            {health.healthScore}
          </span>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-obsidian-200">{health.tokenSymbol} Liquidity Health</h4>
          <p className="text-xs text-obsidian-400 mt-1">
            Score considers depth, spread, venue diversity, and 24h volume vs. supply.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
            <MetricRow label="Agg. Bid" value={formatCurrency(parseFloat(health.aggregateBid))} />
            <MetricRow label="Agg. Ask" value={formatCurrency(parseFloat(health.aggregateAsk))} />
            <MetricRow label="Spread (bps)" value={`${health.aggregateSpreadBps}`} />
            <MetricRow label="Active Venues" value={`${health.venueCount}`} />
          </div>
        </div>
      </div>

      {/* Venue list */}
      <div className="glass-card p-5">
        <h4 className="text-sm font-semibold text-obsidian-200 mb-3">Active Venues</h4>
        <div className="space-y-3">
          {mockVenues.filter(v => v.status === 'active').map((venue) => {
              const snap = mockLiquiditySnapshots.find(s => s.venueName === venue.name);
              return (
            <div
              key={venue.id}
              className="flex items-center justify-between py-2 border-b border-obsidian-800/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    venue.status === 'active' ? 'bg-emerald-400' : 'bg-obsidian-500'
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-obsidian-200">{venue.name}</p>
                  <p className="text-[10px] uppercase tracking-caps text-obsidian-400">
                    {venue.type}
                  </p>
                </div>
              </div>
              <div className="text-right text-xs">
                <p className="text-obsidian-200 font-mono">
                  {snap?.volume24h ? formatCurrency(parseFloat(snap.volume24h)) : '—'}
                </p>
                <p className="text-obsidian-400">24h vol</p>
              </div>
            </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-obsidian-400">{label}</span>
      <span className="text-obsidian-200 font-mono">{value}</span>
    </div>
  );
}
