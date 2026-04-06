import Link from 'next/link';

export const metadata = {
  title: 'Market Structure | Sovereign Assets Platform',
  description: 'How token pricing, venue selection, market making, and anomaly detection work.',
};

export default function MarketStructurePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="section-heading mb-2">Market Structure</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          How <span className="gold-text">Price Discovery</span> Works
        </h1>
        <p className="text-obsidian-300 max-w-2xl leading-relaxed">
          Transparent market operations: venue selection criteria, spread policy, reference price
          computation, market maker oversight, and anomaly response protocols.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {/* Reference pricing */}
        <Section title="Reference Price Computation">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-obsidian-300">
              <p>The platform computes a reference price for each token by aggregating quotes from all active venues:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-obsidian-300">
                <li>Collect best bid/ask from each active venue adapter</li>
                <li>Filter stale quotes (older than venue-specific threshold)</li>
                <li>Compute volume-weighted mid-price (VWAP-based)</li>
                <li>Apply quality weighting (regulated venues weighted higher)</li>
                <li>Compare against NAV — flag if deviation exceeds band</li>
              </ol>
              <p className="text-xs text-obsidian-400">
                Reference price is recalculated every 5 seconds during market hours. All inputs and
                computation steps are logged for audit.
              </p>
            </div>
            <div className="bg-obsidian-900 border border-obsidian-700 rounded-lg p-4 font-mono text-xs text-obsidian-300">
              <p className="text-obsidian-400">// Reference price structure</p>
              <p>{'{'}</p>
              <p>  &quot;referencePrice&quot;: &quot;49.18&quot;,</p>
              <p>  &quot;sources&quot;: [</p>
              <p>    {'{'} &quot;venue&quot;: &quot;Prime Exchange&quot;, &quot;mid&quot;: &quot;49.20&quot;,</p>
              <p>      &quot;weight&quot;: 0.55, &quot;age_ms&quot;: 1200 {'}'},</p>
              <p>    {'{'} &quot;venue&quot;: &quot;Atlantic Trading&quot;, &quot;mid&quot;: &quot;49.22&quot;,</p>
              <p>      &quot;weight&quot;: 0.30, &quot;age_ms&quot;: 3400 {'}'},</p>
              <p>    {'{'} &quot;venue&quot;: &quot;Meridian OTC&quot;, &quot;mid&quot;: &quot;49.25&quot;,</p>
              <p>      &quot;weight&quot;: 0.15, &quot;age_ms&quot;: 8900 {'}'}</p>
              <p>  ],</p>
              <p>  &quot;navDeviation&quot;: &quot;+0.88%&quot;,</p>
              <p>  &quot;band&quot;: &quot;normal&quot;</p>
              <p>{'}'}</p>
            </div>
          </div>
        </Section>

        {/* Venue policy */}
        <Section title="Venue Selection & Quality">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Due Diligence', items: ['Regulatory license verification', 'Proof of reserves (if applicable)', 'Insurance coverage', 'API reliability SLA', 'AML/KYC program review'] },
              { title: 'Ongoing Monitoring', items: ['Automated health checks (5-min)', 'Quote staleness detection', 'Spread consistency analysis', 'Volume anomaly detection', 'Compliance flag validation'] },
              { title: 'Suspension Criteria', items: ['API unresponsive >30 min', 'Quote deviation >15% from reference', 'Failed compliance audit', 'Regulatory action reported', 'Self-reported data inconsistency'] },
            ].map((col) => (
              <div key={col.title} className="glass-card p-5">
                <h3 className="text-sm font-semibold text-gold-400 mb-3">{col.title}</h3>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-obsidian-300">
                      <span className="h-1 w-1 rounded-full bg-obsidian-500 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Spread policy */}
        <Section title="Spread Policy">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-obsidian-800">
                  {['Market Maker Tier', 'Bid Spread (bps)', 'Ask Spread (bps)', 'Min Depth', 'Max Inventory', 'Obligations'].map((h) => (
                    <th key={h} className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-caps text-obsidian-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'Primary', bid: '15-25', ask: '15-25', depth: '$500,000', inventory: '5% supply', obligations: 'Continuous 2-sided quotes, 95% uptime' },
                  { tier: 'Secondary', bid: '25-50', ask: '25-50', depth: '$100,000', inventory: '2% supply', obligations: 'Quotes during market hours, 85% uptime' },
                  { tier: 'Retail Aggregator', bid: '50-100', ask: '50-100', depth: '$25,000', inventory: '0.5% supply', obligations: 'Best-effort quoting, reporting only' },
                ].map((row) => (
                  <tr key={row.tier} className="border-b border-obsidian-800/50">
                    <td className="py-3 px-4 font-medium text-obsidian-200">{row.tier}</td>
                    <td className="py-3 px-4 font-mono text-obsidian-300">{row.bid}</td>
                    <td className="py-3 px-4 font-mono text-obsidian-300">{row.ask}</td>
                    <td className="py-3 px-4 font-mono text-obsidian-300">{row.depth}</td>
                    <td className="py-3 px-4 font-mono text-obsidian-300">{row.inventory}</td>
                    <td className="py-3 px-4 text-xs text-obsidian-400">{row.obligations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Anomaly detection */}
        <Section title="Anomaly Detection & Circuit Breakers">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-obsidian-100">Detection Heuristics</h3>
              {[
                { name: 'Price Deviation', desc: '>5% from reference price for >5 min', severity: 'warning' },
                { name: 'Wash Trading', desc: 'Same beneficial owner on both sides within 60s', severity: 'high' },
                { name: 'Stale Quotes', desc: 'Last update >venue threshold (15-60 min)', severity: 'warning' },
                { name: 'Volume Spike', desc: '>500% of 30-day average in 1h window', severity: 'high' },
                { name: 'Spoofing Pattern', desc: 'Repeated order placement and cancellation', severity: 'critical' },
                { name: 'Cross-Venue Arb', desc: '>200bps persistent price gap across venues', severity: 'warning' },
              ].map((h) => (
                <div key={h.name} className="flex items-center justify-between py-2 border-b border-obsidian-800/50">
                  <div>
                    <p className="text-sm text-obsidian-200">{h.name}</p>
                    <p className="text-[10px] text-obsidian-400">{h.desc}</p>
                  </div>
                  <span className={`text-[10px] uppercase font-semibold ${
                    h.severity === 'critical' ? 'text-red-400' : h.severity === 'high' ? 'text-orange-400' : 'text-amber-400'
                  }`}>{h.severity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-obsidian-100">Response Protocol</h3>
              <div className="space-y-2.5 text-sm text-obsidian-300">
                {[
                  { trigger: 'Warning', response: 'Log event, notify market ops, continue trading' },
                  { trigger: 'High Alert', response: 'Widen spreads on affected venue, require manual review within 30 min' },
                  { trigger: 'Critical / Halt', response: 'Suspend affected venue, freeze pending orders, page on-call team' },
                  { trigger: 'Resolution', response: 'Root cause documented, remediation applied, venue reinstated with monitoring' },
                ].map((r) => (
                  <div key={r.trigger} className="p-3 border border-obsidian-700/50 rounded-lg">
                    <p className="text-xs font-semibold text-gold-400 mb-1">{r.trigger}</p>
                    <p className="text-xs text-obsidian-300">{r.response}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/liquidity"
          className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-gold-500 text-obsidian-950 hover:bg-gold-400 transition-colors"
        >
          View Live Liquidity Dashboard
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}
