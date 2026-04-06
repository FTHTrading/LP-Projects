'use client';

import Link from 'next/link';
import { LiquidityHealthWidget } from '@/components/liquidity/liquidity-health-widget';
import { mockLiquiditySnapshots, mockAnomalies, mockLiquidityHealth } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function LiquidityPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="section-heading mb-2">Liquidity Infrastructure</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Market <span className="gold-text">Integrity</span> Dashboard
        </h1>
        <p className="text-obsidian-300 max-w-2xl leading-relaxed">
          Source-attributed pricing, anomaly detection, circuit breakers, and venue quality scoring.
          Every data point carries provenance. Manufactured confidence is replaced with market reality.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-1 border-b border-obsidian-800 mb-10">
        {[
          { label: 'Overview', href: '/liquidity', active: true },
          { label: 'Venues', href: '/liquidity/venues' },
          { label: 'OTC / RFQ', href: '/liquidity/otc' },
        ].map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab.active
                ? 'border-gold-500 text-gold-400'
                : 'border-transparent text-obsidian-400 hover:text-obsidian-200'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Health widget */}
      <div className="mb-10">
        <LiquidityHealthWidget />
      </div>

      {/* Venue snapshots */}
      <div className="glass-card overflow-hidden mb-10">
        <div className="p-5 border-b border-obsidian-800">
          <h2 className="text-lg font-semibold">Venue-Level Snapshots</h2>
          <p className="text-xs text-obsidian-400 mt-1">Source-attributed, timestamped market data per venue</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-obsidian-800">
                {['Venue', 'Best Bid', 'Best Ask', 'Spread (bps)', 'Bid Depth', 'Ask Depth', '24h Vol', 'VWAP', 'Quality', 'Source'].map((h) => (
                  <th key={h} className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-caps text-obsidian-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockLiquiditySnapshots.map((snap) => (
                <tr key={snap.venueName} className="border-b border-obsidian-800/50 hover:bg-obsidian-800/20">
                  <td className="py-3 px-4 font-medium text-obsidian-200">{snap.venueName}</td>
                  <td className="py-3 px-4 font-mono text-obsidian-200">${snap.bestBid}</td>
                  <td className="py-3 px-4 font-mono text-obsidian-200">${snap.bestAsk}</td>
                  <td className="py-3 px-4 font-mono text-obsidian-300">{snap.spreadBps}</td>
                  <td className="py-3 px-4 font-mono text-obsidian-300">{snap.bidDepth ? formatCurrency(parseFloat(snap.bidDepth)) : '—'}</td>
                  <td className="py-3 px-4 font-mono text-obsidian-300">{snap.askDepth ? formatCurrency(parseFloat(snap.askDepth)) : '—'}</td>
                  <td className="py-3 px-4 font-mono text-obsidian-200">{snap.volume24h ? formatCurrency(parseFloat(snap.volume24h)) : '—'}</td>
                  <td className="py-3 px-4 font-mono text-obsidian-300">${snap.vwap24h}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-mono font-semibold ${
                      (snap.qualityScore ?? 0) >= 80 ? 'text-emerald-400' : (snap.qualityScore ?? 0) >= 60 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {snap.qualityScore ?? '—'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[10px] uppercase tracking-caps text-obsidian-400">{snap.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anomalies */}
      <div className="glass-card p-5 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Anomaly Events</h2>
          <span className="text-xs text-obsidian-400">
            {mockAnomalies.length} event{mockAnomalies.length !== 1 ? 's' : ''} in last 24h
          </span>
        </div>
        {mockAnomalies.length === 0 ? (
          <p className="text-sm text-obsidian-400">No anomalies detected in the monitoring window.</p>
        ) : (
          <div className="space-y-3">
            {mockAnomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className={`p-4 rounded-lg border ${
                  anomaly.severity === 'critical'
                    ? 'border-red-500/30 bg-red-500/5'
                    : anomaly.severity === 'high'
                      ? 'border-red-500/20 bg-red-500/5'
                      : anomaly.severity === 'warning'
                        ? 'border-amber-500/20 bg-amber-500/5'
                        : 'border-obsidian-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold uppercase ${
                      anomaly.severity === 'critical' || anomaly.severity === 'high'
                        ? 'text-red-400'
                        : anomaly.severity === 'warning'
                          ? 'text-amber-400'
                          : 'text-obsidian-300'
                    }`}>
                      {anomaly.severity}
                    </span>
                    <span className="text-xs text-obsidian-400">{anomaly.anomalyType.replace(/_/g, ' ')}</span>
                  </div>
                  <span className="text-[10px] text-obsidian-400">
                    {new Date(anomaly.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-obsidian-200">{anomaly.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-obsidian-400">
                  <span>Venue: {anomaly.venueName}</span>
                  <span>Token: {anomaly.tokenSymbol}</span>
                  {anomaly.acknowledged && (
                    <span className="text-emerald-400">Acknowledged</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Circuit breaker status */}
      <div className="glass-card p-5">
        <h2 className="text-lg font-semibold mb-4">Circuit Breaker Status</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Price Deviation Halt', description: '>15% deviation from reference for >5 min', status: mockLiquidityHealth.circuitBreakerActive ? 'TRIGGERED' : 'CLEAR' },
            { name: 'Stale Quote Suspension', description: 'No quote update for >30 min', status: 'CLEAR' },
            { name: 'Volume Anomaly Halt', description: '>500% normal volume in 1h window', status: 'CLEAR' },
            { name: 'Venue Health Check', description: 'API connectivity + response time', status: 'CLEAR' },
          ].map((cb) => (
            <div key={cb.name} className="flex items-center justify-between py-3 px-4 border border-obsidian-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-obsidian-200">{cb.name}</p>
                <p className="text-[10px] text-obsidian-400">{cb.description}</p>
              </div>
              <span className={`text-xs font-bold ${
                cb.status === 'CLEAR' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {cb.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
