import Link from 'next/link';
import { mockVenues, mockLiquiditySnapshots } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export const metadata = {
  title: 'Trading Venues | Liquidity',
  description: 'Source-attributed venue listing with compliance flags, quality scores, and health status.',
};

export default function VenuesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <nav className="flex items-center gap-2 text-xs text-obsidian-400 mb-8">
        <Link href="/liquidity" className="hover:text-obsidian-200 transition-colors">Liquidity</Link>
        <span>/</span>
        <span className="text-obsidian-200">Venues</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Trading Venues</h1>
        <p className="text-obsidian-300 max-w-2xl text-sm leading-relaxed">
          Every connected venue is listed with compliance status, quality score, and real-time health.
          Venues failing quality checks are suspended automatically.
        </p>
      </div>

      <div className="space-y-6">
        {mockVenues.map((venue) => {
          const snap = mockLiquiditySnapshots.find((s) => s.venueName === venue.name);
          return (
            <div key={venue.id} className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${
                    venue.status === 'active' ? 'bg-emerald-400' : venue.status === 'suspended' ? 'bg-red-400' : 'bg-amber-400'
                  }`} />
                  <div>
                    <h2 className="text-lg font-semibold text-obsidian-100">{venue.name}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs uppercase tracking-caps text-obsidian-400">{venue.type}</span>
                      <span className={`text-xs font-medium ${
                        venue.status === 'active' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {venue.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {venue.complianceFlags.map((flag) => (
                    <span
                      key={flag}
                      className="px-2 py-0.5 text-[10px] font-medium border border-obsidian-600 rounded text-obsidian-300"
                    >
                      {flag.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {snap ? (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
                  <div>
                    <p className="text-obsidian-400 mb-0.5">Best Bid</p>
                    <p className="font-mono text-obsidian-200">${snap.bestBid}</p>
                  </div>
                  <div>
                    <p className="text-obsidian-400 mb-0.5">Best Ask</p>
                    <p className="font-mono text-obsidian-200">${snap.bestAsk}</p>
                  </div>
                  <div>
                    <p className="text-obsidian-400 mb-0.5">Spread</p>
                    <p className="font-mono text-obsidian-300">{snap.spreadBps} bps</p>
                  </div>
                  <div>
                    <p className="text-obsidian-400 mb-0.5">24h Volume</p>
                    <p className="font-mono text-obsidian-200">{snap.volume24h ? formatCurrency(parseFloat(snap.volume24h)) : '—'}</p>
                  </div>
                  <div>
                    <p className="text-obsidian-400 mb-0.5">Quality Score</p>
                    <p className={`font-mono font-semibold ${
                      (snap.qualityScore ?? 0) >= 80 ? 'text-emerald-400' : (snap.qualityScore ?? 0) >= 60 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {snap.qualityScore ?? '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-obsidian-400 mb-0.5">Source</p>
                    <p className="uppercase tracking-caps text-obsidian-300">{snap.source}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-obsidian-400">No market data available for this venue.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
