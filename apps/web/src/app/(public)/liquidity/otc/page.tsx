import Link from 'next/link';

export const metadata = {
  title: 'OTC / RFQ | Liquidity',
  description: 'Over-the-counter and request-for-quote trading flow for institutional block trades.',
};

export default function OtcPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <nav className="flex items-center gap-2 text-xs text-obsidian-400 mb-8">
        <Link href="/liquidity" className="hover:text-obsidian-200 transition-colors">Liquidity</Link>
        <span>/</span>
        <span className="text-obsidian-200">OTC / RFQ</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">OTC & Request-for-Quote</h1>
        <p className="text-obsidian-300 max-w-2xl text-sm leading-relaxed">
          Institutional block trades executed through the Meridian OTC desk with pre-trade compliance
          checks, reference price computation, and post-trade reporting.
        </p>
      </div>

      {/* How it works */}
      <div className="glass-card p-6 mb-10">
        <h2 className="text-lg font-semibold mb-6">RFQ Flow</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { step: '1', title: 'Request', desc: 'Investor submits RFQ with token, size, and direction (buy/sell)' },
            { step: '2', title: 'Pre-Trade Check', desc: 'Whitelist, jurisdiction, accreditation, and position limits validated' },
            { step: '3', title: 'Quote', desc: 'Reference price computed from venue VWAP + spread policy. Quote delivered with expiry' },
            { step: '4', title: 'Execution', desc: 'Investor accepts quote. Transfer initiated with compliance gate enforcement' },
            { step: '5', title: 'Settlement', desc: 'T+1 settlement via transfer agent. Audit trail published. Custody confirmed' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto h-10 w-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-sm font-bold text-gold-400 mb-3">
                {s.step}
              </div>
              <h3 className="text-sm font-semibold text-obsidian-100 mb-1">{s.title}</h3>
              <p className="text-[11px] text-obsidian-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Eligibility</h2>
          <ul className="space-y-2.5 text-sm text-obsidian-300">
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Accredited investor status verified
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              KYC/KYB onboarding complete
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Whitelisted for target token class
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Minimum trade size: $50,000
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Subscription agreement signed
            </li>
          </ul>
        </div>
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Pricing Policy</h2>
          <ul className="space-y-2.5 text-sm text-obsidian-300">
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Reference price: Volume-weighted average across active venues
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Spread: Tier-based (maker 25bps / standard 50bps / retail 75bps)
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Quote validity: 15 seconds (subject to market conditions)
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              Size impact: &gt;2% of daily volume triggers manual review
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
              All OTC trades logged in immutable audit trail
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Ready to execute a block trade?</h2>
        <p className="text-sm text-obsidian-300 mb-4">
          Contact the OTC desk or begin investor onboarding to access RFQ functionality.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/investors/onboarding"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-gold-500 text-obsidian-950 hover:bg-gold-400 transition-colors"
          >
            Begin Onboarding
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg border border-obsidian-600 text-obsidian-200 hover:border-gold-500/40 transition-colors"
          >
            Contact OTC Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
