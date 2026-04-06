import { mockTokens, mockReserveSummary, mockLiquidityHealth, mockTreasuryAccounts, mockAuditEvents, mockAnomalies, mockTradeDeskQualification, mockConversionRequests } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export const metadata = { title: 'Admin Dashboard | SAP' };

export default function AdminDashboard() {
  const totalTreasury = mockTreasuryAccounts
    .filter((a) => a.currency === 'USD' || a.currency === 'USDC')
    .reduce((sum, a) => sum + parseFloat(a.balance), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Issuer Dashboard</h1>
        <p className="text-sm text-obsidian-400">Real-time operational overview — all figures illustrative.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Reserve Value" value={formatCurrency(parseFloat(mockReserveSummary.totalValue))} />
        <KpiCard label="Attested %" value={`${mockReserveSummary.attestedPct}%`} highlight />
        <KpiCard label="Liquidity Score" value={`${mockLiquidityHealth.healthScore}/100`} />
        <KpiCard label="Treasury (Fiat+USDC)" value={formatCurrency(totalTreasury)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Token summary */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Token Classes</h2>
            <Link href="/admin/tokens" className="text-xs text-gold-400 hover:text-gold-300">Manage →</Link>
          </div>
          <div className="space-y-3">
            {mockTokens.map((t) => (
              <div key={t.symbol} className="flex items-center justify-between py-2 border-b border-obsidian-800/50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-gold-500/10 text-gold-400 text-[10px] font-bold flex items-center justify-center">{t.symbol.slice(0, 2)}</span>
                  <span className="text-sm text-obsidian-200">{t.symbol}</span>
                </div>
                <div className="text-right text-xs">
                  <p className="text-obsidian-200 font-mono">${t.navPerToken}</p>
                  <p className="text-obsidian-400">{parseInt(t.totalSupply).toLocaleString()} supply</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anomalies */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Active Anomalies</h2>
            <Link href="/admin/market-ops" className="text-xs text-gold-400 hover:text-gold-300">Market Ops →</Link>
          </div>
          {mockAnomalies.length === 0 ? (
            <p className="text-sm text-obsidian-400">No active anomalies.</p>
          ) : (
            <div className="space-y-3">
              {mockAnomalies.map((a) => (
                <div key={a.id} className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-amber-400 uppercase">{a.severity}</span>
                    <span className="text-[10px] text-obsidian-400">{new Date(a.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-xs text-obsidian-300">{a.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Treasury accounts */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Trade Desk Readiness</h2>
          <Link href="/admin/trade-desk" className="text-xs text-gold-400 hover:text-gold-300">Full Dashboard →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 border border-obsidian-700/50 rounded-lg">
            <p className="text-xs text-obsidian-400 mb-1">Qualification Score</p>
            <p className={`text-lg font-bold font-mono ${mockTradeDeskQualification.score >= 85 ? 'text-emerald-400' : mockTradeDeskQualification.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
              {mockTradeDeskQualification.score}/100
            </p>
            <p className="text-[10px] text-obsidian-400 capitalize">{mockTradeDeskQualification.status.replace('_', ' ')}</p>
          </div>
          <div className="p-3 border border-obsidian-700/50 rounded-lg">
            <p className="text-xs text-obsidian-400 mb-1">Gates Passing</p>
            <p className="text-lg font-bold font-mono text-obsidian-100">
              {mockTradeDeskQualification.gates.filter(g => g.status === 'pass').length}/{mockTradeDeskQualification.gates.length}
            </p>
          </div>
          <div className="p-3 border border-obsidian-700/50 rounded-lg">
            <p className="text-xs text-obsidian-400 mb-1">Active Conversions</p>
            <p className="text-lg font-bold font-mono text-obsidian-100">
              {mockConversionRequests.filter(r => r.status !== 'completed' && r.status !== 'failed').length}
            </p>
          </div>
          <div className="p-3 border border-obsidian-700/50 rounded-lg">
            <p className="text-xs text-obsidian-400 mb-1">Gates Failing</p>
            <p className="text-lg font-bold font-mono text-red-400">
              {mockTradeDeskQualification.gates.filter(g => g.status === 'fail').length}
            </p>
          </div>
        </div>
      </div>

      {/* Treasury accounts */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Treasury Accounts</h2>
          <Link href="/admin/treasury" className="text-xs text-gold-400 hover:text-gold-300">Manage →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockTreasuryAccounts.map((acct) => (
            <div key={acct.id} className="p-3 border border-obsidian-700/50 rounded-lg">
              <p className="text-xs text-obsidian-400 mb-1">{acct.name}</p>
              <p className="text-lg font-bold font-mono text-obsidian-100">
                {acct.currency === 'ETH' ? `${acct.balance} ETH` : formatCurrency(parseFloat(acct.balance))}
              </p>
              <p className="text-[10px] text-obsidian-400">{acct.custodian}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent audit events */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Recent Audit Events</h2>
          <Link href="/admin/audit" className="text-xs text-gold-400 hover:text-gold-300">Full Log →</Link>
        </div>
        <div className="space-y-2">
          {mockAuditEvents.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center justify-between py-2 border-b border-obsidian-800/50 last:border-0 text-xs">
              <div>
                <p className="text-obsidian-200">{event.action}</p>
                <p className="text-obsidian-400 mt-0.5">{event.actorRole ?? 'system'} · {event.eventType}</p>
              </div>
              <span className="text-obsidian-400 text-[10px]">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="glass-card p-4">
      <p className={`text-xl font-bold font-mono ${highlight ? 'text-gold-400' : 'text-obsidian-50'}`}>{value}</p>
      <p className="text-[11px] text-obsidian-400 mt-1">{label}</p>
    </div>
  );
}
