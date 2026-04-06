'use client';

import { mockHolderConcentration, mockMpraHolderConcentration } from '@/lib/mock-data';
import type { HolderConcentration } from '@sov/shared-types';

function ConcentrationPanel({ data }: { data: HolderConcentration }) {
  const isHealthy = data.distributionHealthy;
  const statusColor = isHealthy ? 'text-emerald-400' : 'text-rose-400';
  const statusBg = isHealthy ? 'bg-emerald-400/10' : 'bg-rose-400/10';
  const statusLabel = isHealthy ? 'HEALTHY' : 'CONCENTRATED';

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-obsidian-200">{data.tokenSymbol} — Holder Distribution</h3>
          <p className="text-[10px] text-obsidian-500">{data.totalHolders} unique holders</p>
        </div>
        <span className={`text-[10px] uppercase tracking-caps px-2 py-0.5 rounded-full font-mono ${statusBg} ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KPI label="Total Holders" value={data.totalHolders.toString()} warn={data.totalHolders < 25} />
        <KPI label="Top 5 %" value={`${data.top5Pct.toFixed(1)}%`} warn={data.top5Pct > 80} />
        <KPI label="Top 10 %" value={`${data.top10Pct.toFixed(1)}%`} warn={data.top10Pct > 95} />
        <KPI label="Largest Holder" value={`${data.largestHolderPct.toFixed(1)}%`} warn={data.largestHolderPct > 20} />
        <KPI label="Gini Coefficient" value={data.giniCoefficient.toFixed(2)} warn={data.giniCoefficient > 0.8} />
      </div>

      {/* Distribution bar */}
      <div>
        <p className="text-[10px] text-obsidian-400 mb-1.5 uppercase tracking-caps">Supply Distribution</p>
        <div className="h-4 w-full rounded-full bg-obsidian-800 overflow-hidden flex">
          {data.holders.map((h, i) => (
            <div
              key={h.address}
              className="h-full transition-all"
              style={{
                width: `${h.pctOfSupply}%`,
                backgroundColor: h.isIssuer
                  ? '#c9850a'
                  : h.isLocked
                    ? '#6366f1'
                    : HOLDER_COLORS[i % HOLDER_COLORS.length],
              }}
              title={`${h.label || h.address}: ${h.pctOfSupply}%`}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-2 text-[9px] text-obsidian-500">
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-gold-500" /> Issuer/Treasury</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-indigo-500" /> Locked</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> Free Float</span>
        </div>
      </div>

      {/* Holder Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-obsidian-700/50 text-obsidian-400 text-left">
              <th className="pb-2 pr-4 font-medium">Address</th>
              <th className="pb-2 pr-4 font-medium">Label</th>
              <th className="pb-2 pr-4 font-medium text-right">Balance</th>
              <th className="pb-2 pr-4 font-medium text-right">% Supply</th>
              <th className="pb-2 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-obsidian-800/40">
            {data.holders.map((h) => (
              <tr key={h.address} className="text-obsidian-200">
                <td className="py-2 pr-4 font-mono text-[10px]">{h.address}</td>
                <td className="py-2 pr-4 text-obsidian-300">{h.label || '—'}</td>
                <td className="py-2 pr-4 text-right font-mono">{parseInt(h.balance).toLocaleString()}</td>
                <td className="py-2 pr-4 text-right font-mono">
                  <span className={h.pctOfSupply > 20 ? 'text-rose-400' : ''}>{h.pctOfSupply.toFixed(1)}%</span>
                </td>
                <td className="py-2 text-center">
                  {h.isIssuer && <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-400">Issuer</span>}
                  {h.isLocked && <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 ml-1">Locked</span>}
                  {!h.isIssuer && !h.isLocked && <span className="text-[9px] px-1.5 py-0.5 rounded bg-obsidian-700/50 text-obsidian-400">Float</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPI({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div>
      <p className="text-[10px] text-obsidian-400 uppercase tracking-caps">{label}</p>
      <p className={`text-base font-mono font-semibold ${warn ? 'text-rose-400' : 'text-obsidian-50'}`}>{value}</p>
    </div>
  );
}

const HOLDER_COLORS = ['#34d399', '#22d3ee', '#a78bfa', '#f472b6', '#fbbf24', '#f87171', '#818cf8', '#6ee7b7'];

export function HolderConcentrationMonitor() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Holder Concentration Monitor</h2>
        <p className="text-sm text-obsidian-400">
          Track token distribution across wallets. Concentrated holdings disqualify tokens from institutional trade desks.
          Minimum 25 unique holders required.
        </p>
      </div>
      <ConcentrationPanel data={mockHolderConcentration} />

      {/* Comparison: MPRA */}
      <div>
        <h3 className="text-sm font-semibold text-obsidian-300 mb-2">Competitive Reference — MPRA (4 holders)</h3>
        <ConcentrationPanel data={mockMpraHolderConcentration} />
      </div>
    </div>
  );
}
