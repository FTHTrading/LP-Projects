'use client';

import { mockConversionRequests, mockSettlementWallets } from '@/lib/mock-data';
import type { ConversionMethod, ConversionStatus } from '@sov/shared-types';

const methodLabels: Record<ConversionMethod, string> = {
  otc_desk: 'OTC Desk',
  dex_aggregation: 'DEX Aggregation',
  reserve_backed: 'Reserve-Backed',
  atomic_swap: 'Atomic Swap',
};

const methodFees: Record<ConversionMethod, { label: string; bps: number; minSize: string; speed: string }> = {
  otc_desk: { label: 'OTC Desk', bps: 75, minSize: '$500K', speed: '4–24h' },
  dex_aggregation: { label: 'DEX Aggregator', bps: 30, minSize: '$1K', speed: '< 5 min' },
  reserve_backed: { label: 'Reserve Redemption', bps: 50, minSize: '$100K', speed: '1–3 days' },
  atomic_swap: { label: 'Atomic Swap', bps: 15, minSize: '$100', speed: '< 1 min' },
};

const statusColors: Record<ConversionStatus, string> = {
  pending: 'bg-amber-500/20 text-amber-400',
  quoting: 'bg-blue-500/20 text-blue-400',
  executing: 'bg-indigo-500/20 text-indigo-400',
  settling: 'bg-purple-500/20 text-purple-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  failed: 'bg-red-500/20 text-red-400',
};

function formatUsd(v: string | undefined): string {
  if (!v) return '—';
  return '$' + parseFloat(v).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export function ConversionRailsPanel() {
  const acceptedWallets = mockSettlementWallets.filter((w) => w.tradeDeskAccepted);
  const totalSettled = mockConversionRequests
    .filter((r) => r.status === 'completed' && r.toAmount)
    .reduce((s, r) => s + parseFloat(r.toAmount!), 0);
  const activeCount = mockConversionRequests.filter(
    (r) => r.status !== 'completed' && r.status !== 'failed',
  ).length;

  return (
    <section className="space-y-6">
      {/* ─── Header KPIs ──────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Settled', value: formatUsd(String(totalSettled)) },
          { label: 'Active Conversions', value: String(activeCount) },
          { label: 'Accepted Wallets', value: String(acceptedWallets.length) },
          { label: 'Conversion Methods', value: '4' },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-neutral-400">{k.label}</p>
            <p className="mt-1 text-2xl font-semibold text-amber-400">{k.value}</p>
          </div>
        ))}
      </div>

      {/* ─── Conversion Rail Cards ─────────────── */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Available Conversion Rails
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(methodFees) as ConversionMethod[]).map((m) => {
            const f = methodFees[m];
            return (
              <div
                key={m}
                className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:border-amber-500/40"
              >
                <p className="text-sm font-semibold text-white">{f.label}</p>
                <div className="mt-3 space-y-1 text-xs text-neutral-400">
                  <p>
                    Fee: <span className="text-amber-400">{f.bps} bps</span>
                  </p>
                  <p>
                    Min Size: <span className="text-white">{f.minSize}</span>
                  </p>
                  <p>
                    Settlement: <span className="text-white">{f.speed}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Active + Recent Conversions ────────── */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Conversion Log
        </h3>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-xs uppercase text-neutral-400">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Pair</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Receive</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Wallet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockConversionRequests.map((r) => (
                <tr key={r.id} className="text-neutral-300 transition hover:bg-white/5">
                  <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-4 py-3">
                    {r.fromToken} → {r.toToken}
                  </td>
                  <td className="px-4 py-3 font-mono">{parseFloat(r.fromAmount).toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-emerald-400">
                    {r.toAmount ? formatUsd(r.toAmount) : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs">{methodLabels[r.method]}</td>
                  <td className="px-4 py-3 text-xs">{r.feeBps} bps</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{r.settlementWallet ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Settlement Wallets ─────────────────── */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Settlement Wallets
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {mockSettlementWallets.map((w) => (
            <div
              key={w.id}
              className={`rounded-lg border p-4 ${
                w.tradeDeskAccepted
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-red-500/30 bg-red-500/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{w.label}</p>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${
                    w.tradeDeskAccepted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {w.tradeDeskAccepted ? 'Accepted' : 'Rejected'}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-neutral-400">{w.address}</p>
              <div className="mt-2 flex gap-4 text-xs text-neutral-400">
                <span>Type: {w.walletType}</span>
                <span>Network: {w.network}</span>
                {w.balanceUsd && <span>Balance: {formatUsd(w.balanceUsd)}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Why Stablecoins Footnote ─────────── */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Trade Desk Operator Intelligence
        </p>
        <p className="mt-2 text-sm italic text-neutral-300">
          &ldquo;STABLE Coins yield the best because they are pegged 1:1 to the USD. If they can do
          a minimum of 10 Million in USDT ERC20 or TRC20 or just BTC, in an Exodus wallet,
          they&rsquo;d be on a trade in 24 hours.&rdquo;
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          — Trade desk operator, re: stablecoin conversion requirements for illiquid asset-backed tokens
        </p>
      </div>
    </section>
  );
}
