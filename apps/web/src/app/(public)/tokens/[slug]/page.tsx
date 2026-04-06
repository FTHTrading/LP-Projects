'use client';

import Link from 'next/link';
import { mockTokens, mockNavHistory, mockReserveSummary } from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { NavChart } from '@/components/charts/nav-chart';

export default function TokenDetailPage() {
  const params = useParams();
  const slug = (params.slug as string)?.toUpperCase();
  const token = mockTokens.find((t) => t.symbol === slug);

  if (!token) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Token Not Found</h1>
        <p className="text-obsidian-400 mb-6">No token class matching &ldquo;{slug}&rdquo;.</p>
        <Link href="/tokens" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
          ← Back to Tokens
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-obsidian-400 mb-8">
        <Link href="/tokens" className="hover:text-obsidian-200 transition-colors">Tokens</Link>
        <span>/</span>
        <span className="text-obsidian-200">{token.symbol}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 text-lg font-bold">
            {token.symbol.slice(0, 2)}
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{token.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-obsidian-300 font-mono">{token.symbol}</span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                token.status === 'active' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  token.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'
                }`} />
                {token.status}
              </span>
              <span className="text-xs text-obsidian-400 capitalize border border-obsidian-600 px-2 py-0.5 rounded">
                {token.classification.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/investors/onboarding"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-gold-500 text-obsidian-950 hover:bg-gold-400 transition-colors"
          >
            Invest in {token.symbol}
          </Link>
          <Link
            href="/proof-center"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg border border-obsidian-600 text-obsidian-200 hover:border-gold-500/40 transition-colors"
          >
            View Backing Proof
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {[
          { label: 'NAV / Token', value: `$${token.navPerToken}` },
          { label: 'Market Price', value: token.marketPrice ? `$${token.marketPrice}` : '—' },
          { label: 'Premium / Discount', value: `${(token.premiumDiscountPct ?? 0) >= 0 ? '+' : ''}${(token.premiumDiscountPct ?? 0).toFixed(2)}%`, color: (token.premiumDiscountPct ?? 0) >= 0 ? 'text-emerald-400' : 'text-red-400' },
          { label: 'Backing Ratio', value: `${(parseFloat(token.backingRatio) * 100).toFixed(0)}%` },
          { label: 'Total Supply', value: formatNumber(parseFloat(token.totalSupply)) },
        ].map((m) => (
          <div key={m.label} className="glass-card p-4">
            <p className={`stat-value ${m.color ?? 'text-obsidian-50'}`}>{m.value}</p>
            <p className="stat-label">{m.label}</p>
          </div>
        ))}
      </div>

      {/* NAV Chart */}
      <div className="glass-card p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">NAV History (30 Day)</h2>
        <NavChart data={mockNavHistory} />
      </div>

      {/* Reserve Backing */}
      <div className="glass-card p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Reserve Backing Summary</h2>
          <Link href="/proof-center/reserves" className="text-sm text-gold-400 hover:text-gold-300">
            Full Detail →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-obsidian-400 text-xs mb-1">Total Reserve Value</p>
            <p className="font-mono text-obsidian-100">{formatCurrency(parseFloat(mockReserveSummary.totalValue))}</p>
          </div>
          <div>
            <p className="text-obsidian-400 text-xs mb-1">Attested</p>
            <p className="font-mono text-emerald-400">{mockReserveSummary.attestedPct}%</p>
          </div>
          <div>
            <p className="text-obsidian-400 text-xs mb-1">Self-Reported</p>
            <p className="font-mono text-amber-400">{mockReserveSummary.selfReportedPct}%</p>
          </div>
          <div>
            <p className="text-obsidian-400 text-xs mb-1">Unverified</p>
            <p className="font-mono text-red-400">{mockReserveSummary.unverifiedPct}%</p>
          </div>
        </div>
      </div>

      {/* Token Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Token Structure</h2>
          <dl className="space-y-3 text-sm">
            <DetailRow label="Standard" value="ERC-3643 (T-REX)" />
            <DetailRow label="Chain" value="Ethereum Mainnet" />
            <DetailRow label="Decimals" value="18" />
            <DetailRow label="Transfer Restrictions" value="Whitelist + Jurisdiction gating" />
            <DetailRow label="Lockup Period" value="90 days from subscription" />
            <DetailRow label="Redemption" value="Monthly window, 5-day settlement" />
          </dl>
        </div>
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Legal & Compliance</h2>
          <dl className="space-y-3 text-sm">
            <DetailRow label="Offering Type" value="Regulation D 506(c)" />
            <DetailRow label="Investor Eligibility" value="Accredited investors only" />
            <DetailRow label="Jurisdictions" value="US, UK, EU (excl. sanctioned)" />
            <DetailRow label="Transfer Agent" value="Registered transfer agent" />
            <DetailRow label="Auditor" value="Independent third-party" />
            <DetailRow label="Legal Counsel" value="Securities counsel retained" />
          </dl>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-10 p-4 border border-obsidian-700/50 rounded-lg bg-obsidian-900/30">
        <p className="text-[11px] text-obsidian-400 leading-relaxed">
          <strong className="text-obsidian-300">Disclaimer:</strong> All figures are illustrative and
          do not constitute an offer to sell securities. Past performance is not indicative of future
          results. Investment in digital securities involves risk including possible loss of principal.
          Token purchases are restricted to eligible investors in permitted jurisdictions.
        </p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-obsidian-800/50 last:border-0">
      <dt className="text-obsidian-400">{label}</dt>
      <dd className="text-obsidian-200">{value}</dd>
    </div>
  );
}
