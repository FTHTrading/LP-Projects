import { mockNavHistory } from '@/lib/mock-data';
import { formatCurrency, formatPercent } from '@/lib/utils';

export const metadata = { title: 'Investor Dashboard | Sovereign' };

const mockHoldings = [
  { symbol: 'SVPG', name: 'Sovereign Preferred Gold', balance: '85000', navPerToken: '48.75', value: '4143750.00', change24h: 0.45 },
  { symbol: 'SVCS', name: 'Sovereign Common Share', balance: '12000', navPerToken: '12.30', value: '147600.00', change24h: -1.20 },
];

export default function InvestorDashboard() {
  const totalValue = mockHoldings.reduce((acc, h) => acc + parseFloat(h.value), 0);
  const latestNav = mockNavHistory[mockNavHistory.length - 1];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Welcome back, Apex Capital</h1>
        <p className="text-sm text-obsidian-400">Your portfolio overview and investment summary.</p>
      </div>

      {/* Portfolio KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Portfolio Value</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{formatCurrency(totalValue)}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Token Holdings</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{mockHoldings.length}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Reserve Backing</p>
          <p className="text-2xl font-bold font-mono text-emerald-400">{formatPercent(parseFloat(latestNav.backingRatio) * 100)}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Account Status</p>
          <p className="text-sm font-semibold text-emerald-400">Verified & Whitelisted</p>
        </div>
      </div>

      {/* Holdings table */}
      <div className="glass-card p-5 mb-8">
        <h2 className="text-sm font-semibold mb-4">Your Holdings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-3">Token</th>
                <th className="text-right py-2 pr-3">Balance</th>
                <th className="text-right py-2 pr-3">NAV/Token</th>
                <th className="text-right py-2 pr-3">Value</th>
                <th className="text-right py-2">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {mockHoldings.map((h) => (
                <tr key={h.symbol} className="border-b border-obsidian-800/50">
                  <td className="py-3 pr-3">
                    <span className="font-semibold">{h.symbol}</span>
                    <span className="block text-obsidian-400 text-[10px]">{h.name}</span>
                  </td>
                  <td className="py-3 pr-3 text-right font-mono">{parseInt(h.balance).toLocaleString()}</td>
                  <td className="py-3 pr-3 text-right font-mono">{formatCurrency(parseFloat(h.navPerToken))}</td>
                  <td className="py-3 pr-3 text-right font-mono font-semibold">{formatCurrency(parseFloat(h.value))}</td>
                  <td className={`py-3 text-right font-mono ${h.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {h.change24h > 0 ? '+' : ''}{h.change24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions + recent activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Request Redemption', desc: 'Submit a redemption request for any token holding.' },
              { label: 'Download Statements', desc: 'Generate account statements for tax or audit purposes.' },
              { label: 'View Proof Center', desc: 'Review public reserve attestation documents.' },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center justify-between p-3 border border-obsidian-700/50 rounded-lg hover:border-gold-500/40 transition text-left"
              >
                <div>
                  <p className="text-xs font-semibold">{action.label}</p>
                  <p className="text-[10px] text-obsidian-400">{action.desc}</p>
                </div>
                <span className="text-obsidian-400">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { action: 'Subscription confirmed', detail: '50,000 SVPG @ $48.75', time: '2 hours ago', type: 'success' },
              { action: 'KYC renewed', detail: 'Annual verification completed.', time: '3 days ago', type: 'info' },
              { action: 'Attestation published', detail: 'Q1 2026 gold reserve report available.', time: '1 week ago', type: 'info' },
              { action: 'Distribution received', detail: '$12,450 quarterly dividend', time: '2 weeks ago', type: 'success' },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${event.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <div>
                  <p className="text-xs font-semibold">{event.action}</p>
                  <p className="text-[10px] text-obsidian-400">{event.detail}</p>
                  <p className="text-[10px] text-obsidian-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
