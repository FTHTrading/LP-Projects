import { mockTokens } from '@/lib/mock-data';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';

export const metadata = { title: 'Token Management | Admin' };

export default function AdminTokensPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Token Management</h1>
          <p className="text-sm text-obsidian-400">Manage token classes, issuance, supply, and lifecycle status.</p>
        </div>
        <button className="px-4 py-2 text-sm bg-gold-500 text-obsidian-950 font-semibold rounded-lg hover:bg-gold-400 transition">
          + New Token Class
        </button>
      </div>

      {/* Token cards */}
      <div className="space-y-4 mb-8">
        {mockTokens.map((token) => (
          <div key={token.symbol} className="glass-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-obsidian-50">{token.symbol}</h2>
                  <span className={`text-[10px] uppercase tracking-caps px-2 py-0.5 rounded-full font-mono ${
                    token.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {token.status}
                  </span>
                  <span className="text-[10px] uppercase tracking-caps px-2 py-0.5 rounded-full bg-obsidian-700/60 text-obsidian-300">
                    {token.classification.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-obsidian-400 mt-1">{token.name}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs border border-obsidian-600 rounded-lg hover:border-gold-500/50 transition">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-xs border border-obsidian-600 rounded-lg hover:border-gold-500/50 transition">
                  Mint
                </button>
                <button className="px-3 py-1.5 text-xs border border-obsidian-600 rounded-lg hover:border-gold-500/50 transition">
                  Burn
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-[10px] text-obsidian-400 uppercase tracking-caps">NAV / Token</p>
                <p className="text-lg font-mono font-semibold text-obsidian-50">{formatCurrency(parseFloat(token.navPerToken))}</p>
              </div>
              <div>
                <p className="text-[10px] text-obsidian-400 uppercase tracking-caps">Market Price</p>
                <p className="text-lg font-mono font-semibold text-obsidian-50">{token.marketPrice ? formatCurrency(parseFloat(token.marketPrice)) : '—'}</p>
              </div>
              <div>
                <p className="text-[10px] text-obsidian-400 uppercase tracking-caps">Premium / Discount</p>
                <p className={`text-lg font-mono font-semibold ${
                  (token.premiumDiscountPct ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {token.premiumDiscountPct !== undefined ? `${token.premiumDiscountPct > 0 ? '+' : ''}${token.premiumDiscountPct.toFixed(2)}%` : '—'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-obsidian-400 uppercase tracking-caps">Total Supply</p>
                <p className="text-lg font-mono font-semibold text-obsidian-50">{formatNumber(parseInt(token.totalSupply))}</p>
              </div>
              <div>
                <p className="text-[10px] text-obsidian-400 uppercase tracking-caps">Backing Ratio</p>
                <p className="text-lg font-mono font-semibold text-gold-400">{formatPercent(parseFloat(token.backingRatio) * 100)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Issuance controls */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Issuance & Lifecycle Controls</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Primary Issuance', desc: 'Mint new tokens against verified reserve additions. Requires multi-sig approval and compliance check.' },
            { title: 'Redemption Processing', desc: 'Process investor redemption requests. Token burn + reserve release. T+3 settlement standard.' },
            { title: 'Token Pause / Halt', desc: 'Emergency controls for pausing or halting token transfers. Circuit-breaker integration with market ops.' },
          ].map((item) => (
            <div key={item.title} className="p-4 border border-obsidian-700/50 rounded-lg">
              <h3 className="text-sm font-semibold text-gold-400 mb-1">{item.title}</h3>
              <p className="text-xs text-obsidian-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
