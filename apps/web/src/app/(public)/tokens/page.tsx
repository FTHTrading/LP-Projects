import Link from 'next/link';
import { TokenComparisonTable } from '@/components/tokens/token-comparison-table';
import { mockTokens } from '@/lib/mock-data';

export const metadata = {
  title: 'Token Classes | Sovereign Assets Platform',
  description: 'Explore available token classes with transparent NAV, backing ratios, and compliance structure.',
};

export default function TokensPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="section-heading mb-2">Token Classes</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Available <span className="gold-text">Digital Securities</span>
        </h1>
        <p className="text-obsidian-300 max-w-2xl leading-relaxed">
          Each token class is backed by identified reserve assets, governed by a defined compliance
          framework, and traded through source-attributed venues. All figures are illustrative.
        </p>
      </div>

      {/* Comparison table */}
      <div className="glass-card p-6 mb-12">
        <TokenComparisonTable />
      </div>

      {/* Detail cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {mockTokens.map((token) => (
          <Link
            key={token.symbol}
            href={`/tokens/${token.symbol.toLowerCase()}`}
            className="glass-card p-6 hover:border-gold-500/30 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400 text-sm font-bold">
                {token.symbol.slice(0, 2)}
              </span>
              <div>
                <h3 className="font-semibold text-obsidian-100 group-hover:text-gold-400 transition-colors">
                  {token.symbol}
                </h3>
                <p className="text-xs text-obsidian-400">{token.name}</p>
              </div>
            </div>

            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-obsidian-400">Classification</dt>
                <dd className="text-obsidian-200 capitalize">{token.classification.replace(/_/g, ' ')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-obsidian-400">NAV / Token</dt>
                <dd className="text-obsidian-200 font-mono">${token.navPerToken}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-obsidian-400">Market Price</dt>
                <dd className="text-obsidian-200 font-mono">${token.marketPrice ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-obsidian-400">Premium / Discount</dt>
                <dd className={`font-mono ${(token.premiumDiscountPct ?? 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {(token.premiumDiscountPct ?? 0) >= 0 ? '+' : ''}{token.premiumDiscountPct?.toFixed(2) ?? '0.00'}%
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-obsidian-400">Supply</dt>
                <dd className="text-obsidian-200 font-mono">{parseInt(token.totalSupply).toLocaleString()}</dd>
              </div>
            </dl>

            <p className="mt-4 text-xs font-medium text-gold-400 group-hover:text-gold-300 transition-colors">
              View Detail →
            </p>
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-4 border border-obsidian-700/50 rounded-lg bg-obsidian-900/30">
        <p className="text-[11px] text-obsidian-400 leading-relaxed">
          <strong className="text-obsidian-300">Disclaimer:</strong> All token class information, NAV figures,
          and market data presented are illustrative and for informational purposes only. They do not constitute
          an offer to sell or a solicitation of an offer to buy securities. Token purchases are restricted to
          eligible investors in permitted jurisdictions.
        </p>
      </div>
    </div>
  );
}
