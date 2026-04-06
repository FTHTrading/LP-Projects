import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900 via-obsidian-950 to-obsidian-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,133,10,0.08)_0%,_transparent_60%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-caps text-gold-400 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
            Institutional Digital Asset Infrastructure
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Asset-backed tokens built on{' '}
            <span className="gold-text">proof, not promises</span>
          </h1>

          <p className="text-lg md:text-xl text-obsidian-300 leading-relaxed mb-10 max-w-2xl">
            The complete operating system for issuers of reserve-backed digital securities.
            Machine-verifiable attestations, permissioned transfer controls, transparent
            liquidity infrastructure, and institutional-grade compliance — from issuance to
            secondary market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/proof-center"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-lg bg-gold-500 text-obsidian-950 hover:bg-gold-400 shadow-glow transition-all hover:shadow-glow-strong"
            >
              Explore Proof Center
            </Link>
            <Link
              href="/tokens"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-lg border border-obsidian-600 text-obsidian-200 hover:border-gold-500/40 hover:text-obsidian-50 transition-colors"
            >
              View Token Classes
            </Link>
          </div>
        </div>

        {/* Key metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '$625M', label: 'Total Reserve Value', note: 'Illustrative · Subject to attestation' },
            { value: '72%', label: 'Independently Attested', note: 'Third-party verified' },
            { value: '3', label: 'Active Venues', note: 'Source-attributed pricing' },
            { value: '1.04x', label: 'Backing Ratio', note: 'NAV ÷ outstanding supply' },
          ].map((metric) => (
            <div key={metric.label} className="glass-card p-4">
              <p className="stat-value text-obsidian-50">{metric.value}</p>
              <p className="stat-label">{metric.label}</p>
              <p className="text-[10px] text-obsidian-400 mt-1">{metric.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
