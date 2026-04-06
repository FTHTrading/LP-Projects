import { mockReserveSummary } from '@/lib/mock-data';
import { formatCurrency, formatPercent } from '@/lib/utils';

export const metadata = { title: 'Reserve Management | Admin' };

const attestationColors: Record<string, string> = {
  gold: 'bg-yellow-500',
  silver: 'bg-gray-400',
  cash: 'bg-emerald-500',
  real_estate: 'bg-blue-500',
  treasury_bill: 'bg-indigo-500',
};

export default function AdminReservesPage() {
  const data = mockReserveSummary;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Reserve Management</h1>
        <p className="text-sm text-obsidian-400">
          View, verify, and manage the reserve asset registry. All changes require audit trail.
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Total Reserve Value</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{formatCurrency(parseFloat(data.totalValue))}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Net of Liabilities</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{formatCurrency(parseFloat(data.netValue))}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Attested</p>
          <p className="text-2xl font-bold font-mono text-emerald-400">{formatPercent(data.attestedPct)}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Unverified</p>
          <p className="text-2xl font-bold font-mono text-rose-400">{formatPercent(data.unverifiedPct)}</p>
        </div>
      </div>

      {/* Asset breakdown */}
      <div className="glass-card p-5 mb-8">
        <h2 className="text-sm font-semibold mb-4">Asset Class Breakdown</h2>

        {/* Composition bar */}
        <div className="flex h-4 rounded-full overflow-hidden mb-4">
          {data.assetBreakdown.map((item) => (
            <div
              key={item.assetClass}
              className={`${attestationColors[item.assetClass] ?? 'bg-obsidian-500'}`}
              style={{ width: `${item.pct}%` }}
              title={`${item.assetClass}: ${item.pct}%`}
            />
          ))}
        </div>

        {/* Legend + table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-4">Asset Class</th>
                <th className="text-right py-2 pr-4">Value</th>
                <th className="text-right py-2 pr-4">Allocation</th>
                <th className="text-right py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.assetBreakdown.map((item) => (
                <tr key={item.assetClass} className="border-b border-obsidian-800/50">
                  <td className="py-3 pr-4 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm ${attestationColors[item.assetClass] ?? 'bg-obsidian-500'}`} />
                    <span className="capitalize">{item.assetClass.replace('_', ' ')}</span>
                  </td>
                  <td className="text-right py-3 pr-4 font-mono">{formatCurrency(parseFloat(item.value))}</td>
                  <td className="text-right py-3 pr-4 font-mono">{formatPercent(item.pct)}</td>
                  <td className="text-right py-3">
                    <button className="text-gold-400 hover:text-gold-300 transition text-[10px]">View Assets</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin controls */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Reserve Operations</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Add Reserve Asset', desc: 'Register a new physical or financial asset into the reserve registry. Requires custody proof.' },
            { title: 'Request Re-Valuation', desc: 'Trigger a third-party valuation or internal mark-to-market update for an asset class.' },
            { title: 'Publish Attestation', desc: 'Upload and hash-anchor a new attestation report. Will appear in the public Proof Center.' },
          ].map((item) => (
            <div key={item.title} className="p-4 border border-obsidian-700/50 rounded-lg">
              <h3 className="text-sm font-semibold text-gold-400 mb-1">{item.title}</h3>
              <p className="text-xs text-obsidian-300">{item.desc}</p>
              <button className="mt-3 px-3 py-1.5 text-xs border border-gold-500/40 text-gold-400 rounded-lg hover:bg-gold-500/10 transition">
                {item.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
