import { formatCurrency } from '@/lib/utils';

export const metadata = { title: 'Holdings | Investor Portal' };

const holdings = [
  { symbol: 'SVPG', name: 'Sovereign Preferred Gold', classification: 'preferred', balance: '85000', locked: '0', navPerToken: '48.75', marketPrice: '49.20', value: '4143750.00', costBasis: '3825000.00', unrealizedPnl: '318750.00', pnlPct: 8.33 },
  { symbol: 'SVCS', name: 'Sovereign Common Share', classification: 'common', balance: '12000', locked: '2000', navPerToken: '12.30', marketPrice: '11.85', value: '147600.00', costBasis: '156000.00', unrealizedPnl: '-8400.00', pnlPct: -5.38 },
];

export default function HoldingsPage() {
  const totalValue = holdings.reduce((acc, h) => acc + parseFloat(h.value), 0);
  const totalPnl = holdings.reduce((acc, h) => acc + parseFloat(h.unrealizedPnl), 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Token Holdings</h1>
        <p className="text-sm text-obsidian-400">Detailed view of your positions, cost basis, and unrealized gains/losses.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Total Value</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{formatCurrency(totalValue)}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Unrealized P&L</p>
          <p className={`text-2xl font-bold font-mono ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
          </p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Positions</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{holdings.length}</p>
        </div>
      </div>

      {/* Holdings detail */}
      <div className="space-y-4">
        {holdings.map((h) => (
          <div key={h.symbol} className="glass-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-obsidian-50">{h.symbol}</h2>
                  <span className="text-[10px] uppercase tracking-caps px-2 py-0.5 rounded-full bg-obsidian-700/60 text-obsidian-300">
                    {h.classification}
                  </span>
                </div>
                <p className="text-sm text-obsidian-400 mt-0.5">{h.name}</p>
              </div>
              <button className="px-3 py-1.5 text-xs border border-gold-500/40 text-gold-400 rounded-lg hover:bg-gold-500/10 transition">
                Request Redemption
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-xs">
              <div>
                <p className="text-obsidian-400 mb-0.5">Balance</p>
                <p className="font-mono font-semibold">{parseInt(h.balance).toLocaleString()}</p>
                {parseInt(h.locked) > 0 && (
                  <p className="text-[10px] text-amber-400">{parseInt(h.locked).toLocaleString()} locked</p>
                )}
              </div>
              <div>
                <p className="text-obsidian-400 mb-0.5">NAV / Token</p>
                <p className="font-mono font-semibold">{formatCurrency(parseFloat(h.navPerToken))}</p>
              </div>
              <div>
                <p className="text-obsidian-400 mb-0.5">Market Price</p>
                <p className="font-mono font-semibold">{formatCurrency(parseFloat(h.marketPrice))}</p>
              </div>
              <div>
                <p className="text-obsidian-400 mb-0.5">Current Value</p>
                <p className="font-mono font-semibold">{formatCurrency(parseFloat(h.value))}</p>
              </div>
              <div>
                <p className="text-obsidian-400 mb-0.5">Cost Basis</p>
                <p className="font-mono">{formatCurrency(parseFloat(h.costBasis))}</p>
              </div>
              <div>
                <p className="text-obsidian-400 mb-0.5">Unrealized P&L</p>
                <p className={`font-mono font-semibold ${parseFloat(h.unrealizedPnl) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {parseFloat(h.unrealizedPnl) >= 0 ? '+' : ''}{formatCurrency(parseFloat(h.unrealizedPnl))}
                </p>
              </div>
              <div>
                <p className="text-obsidian-400 mb-0.5">Return</p>
                <p className={`font-mono font-semibold ${h.pnlPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {h.pnlPct > 0 ? '+' : ''}{h.pnlPct.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
