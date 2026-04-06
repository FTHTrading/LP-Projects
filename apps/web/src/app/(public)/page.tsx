import Link from 'next/link';
import { HeroSection } from '@/components/ui/hero-section';
import { ReserveStatCards } from '@/components/proof/reserve-stat-cards';
import { TokenComparisonTable } from '@/components/tokens/token-comparison-table';
import { LiquidityHealthWidget } from '@/components/liquidity/liquidity-health-widget';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Trust Pillars */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <p className="section-heading mb-3">Built for Institutional Standards</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            The operating system behind <span className="gold-text">asset-backed tokens</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Attestation Over Assertion',
              description: 'Every reserve claim is backed by verifiable evidence — third-party reports, hash-anchored documents, and machine-readable proof. Unverified claims are clearly marked.',
              href: '/proof-center',
              cta: 'View Proof Center',
            },
            {
              title: 'Compliance by Architecture',
              description: 'Transfer restrictions, jurisdiction gating, whitelist enforcement, and investor accreditation are structural — not afterthoughts bolted onto a token contract.',
              href: '/tokens/security-upgrade',
              cta: 'Token Compliance',
            },
            {
              title: 'Liquidity Truth',
              description: 'Every price displayed carries source attribution and timestamp. Anomaly detection, circuit breakers, and venue quality scoring expose market reality — not manufactured confidence.',
              href: '/liquidity',
              cta: 'Liquidity Dashboard',
            },
          ].map((pillar) => (
            <div key={pillar.title} className="glass-card p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-3 text-obsidian-50">{pillar.title}</h3>
              <p className="text-sm text-obsidian-300 leading-relaxed flex-1">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="mt-4 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
              >
                {pillar.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reserve Summary */}
      <section className="border-y border-obsidian-700/50 bg-obsidian-900/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-heading mb-1">Reserve Backing</p>
              <h2 className="text-2xl font-bold">Current Reserve Position</h2>
            </div>
            <Link
              href="/proof-center/reserves"
              className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
            >
              Full Reserve Detail →
            </Link>
          </div>
          <ReserveStatCards />
        </div>
      </section>

      {/* Token Classes */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-heading mb-1">Token Classes</p>
            <h2 className="text-2xl font-bold">Available Instruments</h2>
          </div>
          <Link
            href="/tokens"
            className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
          >
            View All Tokens →
          </Link>
        </div>
        <TokenComparisonTable />
      </section>

      {/* Liquidity Health Preview */}
      <section className="border-t border-obsidian-700/50 bg-obsidian-900/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-heading mb-1">Market Integrity</p>
              <h2 className="text-2xl font-bold">Liquidity Health</h2>
            </div>
            <Link
              href="/liquidity"
              className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
            >
              Full Dashboard →
            </Link>
          </div>
          <LiquidityHealthWidget />
        </div>
      </section>

      {/* Issuer Trust Block */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="section-heading mb-3">Platform Principles</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          What separates a credible issuer from a marketing site
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {[
            { label: 'Machine-Verifiable Proofs', detail: 'SHA-256 hash-anchored reports with on-chain verification — not PDFs behind a login' },
            { label: 'Transparent NAV', detail: 'Daily computation with disclosed methodology, data sources, and staleness indicators' },
            { label: 'Source-Attributed Pricing', detail: 'Every market data point shows which venue, which timestamp, which adapter' },
            { label: 'Immutable Audit Trail', detail: 'Every admin action, token operation, and compliance decision is permanently logged' },
            { label: 'Investor-Grade Onboarding', detail: 'KYC/KYB, accreditation, jurisdiction gating, and subscription agreements — not just a wallet connect' },
            { label: 'Transfer Enforcement', detail: 'ERC-3643 permissioned transfers with whitelist, lockup, and jurisdiction rules' },
            { label: 'Anomaly Detection', detail: 'Wash trading heuristics, stale quote detection, spoofing alerts, and circuit breakers' },
            { label: 'Disclosure-First Architecture', detail: 'Risks, legal structure, offering terms, and limitations are first-class content — not buried footnotes' },
          ].map((item) => (
            <div key={item.label} className="glass-card p-4">
              <h4 className="text-sm font-semibold text-gold-400 mb-1">{item.label}</h4>
              <p className="text-xs text-obsidian-300 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-obsidian-700/50 bg-gradient-to-b from-obsidian-900/50 to-obsidian-950">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to explore <span className="gold-text">institutional-grade</span> digital assets?
          </h2>
          <p className="text-obsidian-300 mb-8 leading-relaxed">
            Whether you are an accredited investor, a family office, a broker-dealer, or an institutional allocator, the Sovereign Assets Platform provides the transparency, compliance, and operational rigor you require.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/investors/onboarding"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg bg-gold-500 text-obsidian-950 hover:bg-gold-400 transition-colors"
            >
              Begin Investor Onboarding
            </Link>
            <Link
              href="/proof-center"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg border border-obsidian-600 text-obsidian-200 hover:border-obsidian-400 hover:text-obsidian-50 transition-colors"
            >
              Review Proof Center
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
