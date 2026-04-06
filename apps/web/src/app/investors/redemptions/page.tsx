import { formatCurrency } from '@/lib/utils';

export const metadata = { title: 'Redemptions | Investor Portal' };

const redemptions = [
  { id: 'r1', token: 'SVPG', amount: '10000', navAtRequest: '48.50', estimatedValue: '485000.00', status: 'completed', requestedAt: '2026-02-15', settledAt: '2026-02-18' },
  { id: 'r2', token: 'SVCS', amount: '5000', navAtRequest: '12.25', estimatedValue: '61250.00', status: 'completed', requestedAt: '2026-03-01', settledAt: '2026-03-04' },
  { id: 'r3', token: 'SVPG', amount: '2000', navAtRequest: '48.75', estimatedValue: '97500.00', status: 'processing', requestedAt: '2026-04-10', settledAt: null },
];

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-500/20 text-emerald-400',
  processing: 'bg-blue-500/20 text-blue-400',
  pending: 'bg-amber-500/20 text-amber-400',
  rejected: 'bg-rose-500/20 text-rose-400',
};

export default function RedemptionsPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Redemptions</h1>
          <p className="text-sm text-obsidian-400">
            Request token redemptions and track settlement status. Standard settlement: T+3.
          </p>
        </div>
        <button className="px-4 py-2 text-sm bg-gold-500 text-obsidian-950 font-semibold rounded-lg hover:bg-gold-400 transition">
          + New Redemption
        </button>
      </div>

      {/* Process overview */}
      <div className="glass-card p-5 mb-8">
        <h2 className="text-sm font-semibold mb-4">Redemption Process</h2>
        <div className="grid grid-cols-5 gap-2">
          {[
            { step: '1', label: 'Request', desc: 'Submit redemption with token & amount' },
            { step: '2', label: 'Compliance', desc: 'Automated compliance & restriction check' },
            { step: '3', label: 'NAV Lock', desc: 'NAV locked at next pricing window' },
            { step: '4', label: 'Settlement', desc: 'Token burn + proceeds released' },
            { step: '5', label: 'Transfer', desc: 'Funds deposited to your account' },
          ].map((s, i) => (
            <div key={s.step} className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold">
                {s.step}
              </div>
              <p className="text-xs font-semibold mb-0.5">{s.label}</p>
              <p className="text-[10px] text-obsidian-400">{s.desc}</p>
              {i < 4 && <div className="hidden md:block absolute" />}
            </div>
          ))}
        </div>
      </div>

      {/* Redemption history */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Redemption History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-3">ID</th>
                <th className="text-left py-2 pr-3">Token</th>
                <th className="text-right py-2 pr-3">Amount</th>
                <th className="text-right py-2 pr-3">NAV at Request</th>
                <th className="text-right py-2 pr-3">Est. Value</th>
                <th className="text-left py-2 pr-3">Status</th>
                <th className="text-left py-2 pr-3">Requested</th>
                <th className="text-left py-2">Settled</th>
              </tr>
            </thead>
            <tbody>
              {redemptions.map((r) => (
                <tr key={r.id} className="border-b border-obsidian-800/50">
                  <td className="py-3 pr-3 font-mono text-obsidian-400">{r.id}</td>
                  <td className="py-3 pr-3 font-semibold">{r.token}</td>
                  <td className="py-3 pr-3 text-right font-mono">{parseInt(r.amount).toLocaleString()}</td>
                  <td className="py-3 pr-3 text-right font-mono">{formatCurrency(parseFloat(r.navAtRequest))}</td>
                  <td className="py-3 pr-3 text-right font-mono font-semibold">{formatCurrency(parseFloat(r.estimatedValue))}</td>
                  <td className="py-3 pr-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[r.status] ?? 'bg-obsidian-700 text-obsidian-400'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-mono text-obsidian-300">{r.requestedAt}</td>
                  <td className="py-3 font-mono text-obsidian-300">{r.settledAt ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms */}
      <div className="mt-6 p-4 border border-obsidian-700/50 rounded-lg">
        <p className="text-[10px] text-obsidian-400">
          <strong className="text-obsidian-300">Redemption Terms:</strong> Redemptions are processed at the NAV calculated at the next pricing window (typically end-of-day).
          Settlement occurs within T+3 business days. Early redemption penalties may apply to tokens with active lockup periods.
          All redemptions are subject to compliance verification and available reserve liquidity.
        </p>
      </div>
    </div>
  );
}
