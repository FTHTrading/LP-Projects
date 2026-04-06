import { mockVenues, mockLiquidityHealth, mockLiquiditySnapshots, mockAnomalies } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export const metadata = { title: 'Market Operations | Admin' };

export default function AdminMarketOpsPage() {
  const health = mockLiquidityHealth;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Market Operations</h1>
        <p className="text-sm text-obsidian-400">
          Venue management, liquidity monitoring, anomaly response, and circuit-breaker controls.
        </p>
      </div>

      {/* Health KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Health Score</p>
          <p className={`text-2xl font-bold font-mono ${health.healthScore >= 70 ? 'text-emerald-400' : health.healthScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
            {health.healthScore}/100
          </p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Spread (bps)</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{health.aggregateSpreadBps}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">24h Volume</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{formatCurrency(parseFloat(health.totalVolume24h))}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Active Venues</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{health.venueCount}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Circuit Breaker</p>
          <p className={`text-2xl font-bold font-mono ${health.circuitBreakerActive ? 'text-rose-400' : 'text-emerald-400'}`}>
            {health.circuitBreakerActive ? 'ACTIVE' : 'Normal'}
          </p>
        </div>
      </div>

      {/* Venue management */}
      <div className="glass-card p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Venue Registry</h2>
          <button className="px-3 py-1.5 text-xs border border-gold-500/40 text-gold-400 rounded-lg hover:bg-gold-500/10 transition">
            + Add Venue
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-3">Venue</th>
                <th className="text-left py-2 pr-3">Type</th>
                <th className="text-left py-2 pr-3">Status</th>
                <th className="text-right py-2 pr-3">Best Bid</th>
                <th className="text-right py-2 pr-3">Best Ask</th>
                <th className="text-right py-2 pr-3">Spread</th>
                <th className="text-right py-2 pr-3">Volume 24h</th>
                <th className="text-right py-2 pr-3">Quality</th>
                <th className="text-left py-2">Flags</th>
              </tr>
            </thead>
            <tbody>
              {mockVenues.map((venue) => {
                const snapshot = mockLiquiditySnapshots.find(s => s.venueName === venue.name);
                return (
                  <tr key={venue.id} className="border-b border-obsidian-800/50">
                    <td className="py-3 pr-3 font-semibold">{venue.name}</td>
                    <td className="py-3 pr-3 uppercase font-mono text-obsidian-300">{venue.type}</td>
                    <td className="py-3 pr-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        venue.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                        venue.status === 'suspended' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {venue.status}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-right font-mono">{snapshot?.bestBid ? formatCurrency(parseFloat(snapshot.bestBid)) : '—'}</td>
                    <td className="py-3 pr-3 text-right font-mono">{snapshot?.bestAsk ? formatCurrency(parseFloat(snapshot.bestAsk)) : '—'}</td>
                    <td className="py-3 pr-3 text-right font-mono">{snapshot?.spreadBps ?? '—'}</td>
                    <td className="py-3 pr-3 text-right font-mono">{snapshot?.volume24h ? formatCurrency(parseFloat(snapshot.volume24h)) : '—'}</td>
                    <td className="py-3 pr-3 text-right font-mono">{snapshot?.qualityScore ?? '—'}</td>
                    <td className="py-3 text-obsidian-400">
                      {venue.complianceFlags.map(f => (
                        <span key={f} className="inline-block text-[9px] bg-obsidian-700/60 px-1.5 py-0.5 rounded mr-1 mb-0.5">{f}</span>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active anomalies */}
      <div className="glass-card p-5 mb-8">
        <h2 className="text-sm font-semibold mb-4">Active Anomalies ({mockAnomalies.length})</h2>
        {mockAnomalies.length === 0 ? (
          <p className="text-xs text-obsidian-400">No active anomalies.</p>
        ) : (
          <div className="space-y-3">
            {mockAnomalies.map((a) => (
              <div key={a.id} className={`p-4 border rounded-lg ${
                a.severity === 'critical' ? 'border-rose-500/50 bg-rose-500/5' :
                a.severity === 'high' ? 'border-orange-500/50 bg-orange-500/5' :
                a.severity === 'warning' ? 'border-amber-500/50 bg-amber-500/5' :
                'border-obsidian-700/50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                      a.severity === 'critical' ? 'bg-rose-500/20 text-rose-400' :
                      a.severity === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-obsidian-700 text-obsidian-300'
                    }`}>
                      {a.severity}
                    </span>
                    <span className="text-xs text-obsidian-300">{a.venueName}</span>
                    <span className="text-xs font-mono text-obsidian-400">{a.anomalyType}</span>
                  </div>
                  <span className={`text-[10px] ${a.acknowledged ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {a.acknowledged ? 'Acknowledged' : 'Pending'}
                  </span>
                </div>
                <p className="text-xs text-obsidian-300">{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Circuit breaker controls */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Circuit Breaker Controls</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { type: 'Spread Breaker', desc: 'Trigger: spread >500bps for 5+ minutes. Action: halt on affected venue.', active: true },
            { type: 'Volume Anomaly', desc: 'Trigger: 24h volume >300% of 30d average. Action: alert + manual review.', active: true },
            { type: 'Price Deviation', desc: 'Trigger: market price deviates >10% from NAV. Action: halt all venues + admin alert.', active: true },
            { type: 'Venue Health', desc: 'Trigger: venue API failure >3 consecutive checks. Action: suspend venue adapter.', active: true },
          ].map((cb) => (
            <div key={cb.type} className="p-4 border border-obsidian-700/50 rounded-lg flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-obsidian-50 mb-1">{cb.type}</h3>
                <p className="text-xs text-obsidian-300">{cb.desc}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ml-3 ${
                cb.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-obsidian-700 text-obsidian-400'
              }`}>
                {cb.active ? 'Armed' : 'Disabled'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
