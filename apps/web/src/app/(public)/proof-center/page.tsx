import Link from 'next/link';
import { ReserveStatCards } from '@/components/proof/reserve-stat-cards';
import { mockAuditEvents } from '@/lib/mock-data';

export const metadata = {
  title: 'Proof Center | Sovereign Assets Platform',
  description: 'Machine-verifiable reserve attestations, hash-anchored documents, and transparent backing evidence.',
};

export default function ProofCenterPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="section-heading mb-2">Proof Center</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          <span className="gold-text">Attestation</span> Over Assertion
        </h1>
        <p className="text-obsidian-300 max-w-2xl leading-relaxed">
          Every reserve claim is backed by verifiable evidence — third-party reports, hash-anchored documents,
          and machine-readable proof. Claims without independent attestation are clearly marked. This is
          radical transparency by design, not marketing.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-1 border-b border-obsidian-800 mb-10">
        {[
          { label: 'Overview', href: '/proof-center', active: true },
          { label: 'Reserves', href: '/proof-center/reserves' },
          { label: 'Attestations', href: '/proof-center/attestations' },
          { label: 'Disclosures', href: '/proof-center/disclosures' },
        ].map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab.active
                ? 'border-gold-500 text-gold-400'
                : 'border-transparent text-obsidian-400 hover:text-obsidian-200'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Trust methodology */}
      <div className="glass-card p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">Attestation Methodology</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-semibold text-emerald-400">Attested</h3>
            </div>
            <p className="text-xs text-obsidian-300 leading-relaxed">
              Verified by independent third party — auditor, government agency, or licensed custodian.
              Hash-anchored on-chain with verification endpoint available.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <h3 className="text-sm font-semibold text-amber-400">Self-Reported</h3>
            </div>
            <p className="text-xs text-obsidian-300 leading-relaxed">
              Reported by the issuer or custodian without independent verification. Scheduled for
              attestation cycle. Value included in reserve totals with reduced confidence weight.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <h3 className="text-sm font-semibold text-red-400">Unverified</h3>
            </div>
            <p className="text-xs text-obsidian-300 leading-relaxed">
              No supporting evidence provided. Not included in attested reserve totals. Clearly
              flagged in all reporting. Queued for verification or removal.
            </p>
          </div>
        </div>
      </div>

      {/* Reserve position */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Current Reserve Position</h2>
          <Link href="/proof-center/reserves" className="text-sm text-gold-400 hover:text-gold-300">
            Full Reserve Detail →
          </Link>
        </div>
        <ReserveStatCards />
      </div>

      {/* Recent attestation events */}
      <div className="glass-card p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Proof Events</h2>
          <Link href="/proof-center/attestations" className="text-sm text-gold-400 hover:text-gold-300">
            All Attestations →
          </Link>
        </div>
        <div className="space-y-3">
          {mockAuditEvents
            .filter((e) => e.eventType.includes('reserve') || e.eventType.includes('attestation'))
            .slice(0, 5)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between py-2.5 border-b border-obsidian-800/50 last:border-0 text-sm"
              >
                <div>
                  <p className="text-obsidian-200">{event.action}</p>
                  <p className="text-xs text-obsidian-400 mt-0.5">
                    {new Date(event.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-caps text-obsidian-400 border border-obsidian-700 px-2 py-0.5 rounded">
                  {event.eventType.replace(/\./g, ' · ')}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Verification API */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Document Verification API</h2>
        <p className="text-sm text-obsidian-300 mb-4">
          Any published attestation document can be independently verified. Provide the document hash
          to check chain anchoring, issuer identity, and hash integrity.
        </p>
        <div className="bg-obsidian-900 border border-obsidian-700 rounded-lg p-4 font-mono text-xs text-obsidian-300">
          <p className="text-obsidian-400 mb-1"># Verify a document hash</p>
          <p>GET /api/v1/attestations/verify?hash=sha256:a1b2c3...</p>
          <p className="mt-2 text-obsidian-400"># Response</p>
          <p>{'{'} &quot;verified&quot;: true, &quot;hashMatch&quot;: true, &quot;chainAnchor&quot;: {'{'} ... {'}'} {'}'}</p>
        </div>
      </div>
    </div>
  );
}
