import Link from 'next/link';
import { mockReserveSummary } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export const metadata = {
  title: 'Reserve Detail | Proof Center',
  description: 'Complete reserve asset breakdown with attestation levels and valuation methodology.',
};

// Illustrative reserve asset detail (would come from API in production)
const reserveAssets = [
  { id: 'ra1', name: 'Gold Bullion — Vault A (Zurich)', assetClass: 'gold', value: 280000000, attestation: 'attested', custodian: 'Swiss Precious Metals AG', lastValuation: '2026-01-15', methodology: 'LBMA PM Fix × verified troy ounces' },
  { id: 'ra2', name: 'Gold Bullion — Vault B (Singapore)', assetClass: 'gold', value: 170000000, attestation: 'attested', custodian: 'Asia Vault Pte Ltd', lastValuation: '2026-01-15', methodology: 'LBMA PM Fix × verified troy ounces' },
  { id: 'ra3', name: 'Silver Bars — Vault C (London)', assetClass: 'silver', value: 75000000, attestation: 'self_reported', custodian: 'London Precious Metals Ltd', lastValuation: '2026-01-10', methodology: 'LBMA Silver Fix × reported weight' },
  { id: 'ra4', name: 'USD Cash — Operating Account', assetClass: 'cash', value: 50000000, attestation: 'attested', custodian: 'First National Bank', lastValuation: '2026-01-20', methodology: 'Bank statement balance' },
  { id: 'ra5', name: 'Commercial Real Estate — Austin TX', assetClass: 'real_estate', value: 37500000, attestation: 'self_reported', custodian: 'Trust Deed Holdings LLC', lastValuation: '2025-09-01', methodology: 'Independent appraisal (annual)' },
  { id: 'ra6', name: 'US Treasury Bills (3-month)', assetClass: 'treasury_bill', value: 12500000, attestation: 'attested', custodian: 'Fidelity Institutional', lastValuation: '2026-01-19', methodology: 'Custodian statement — market value' },
];

const attestBadge: Record<string, { label: string; class: string }> = {
  attested: { label: 'Attested', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  self_reported: { label: 'Self-Reported', class: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  unverified: { label: 'Unverified', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function ReservesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-obsidian-400 mb-8">
        <Link href="/proof-center" className="hover:text-obsidian-200 transition-colors">Proof Center</Link>
        <span>/</span>
        <span className="text-obsidian-200">Reserves</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Reserve Asset Registry</h1>
        <p className="text-obsidian-300 max-w-2xl text-sm leading-relaxed">
          Complete inventory of reserve assets backing all token classes. Each asset carries an attestation
          level, valuation date, custodian identity, and methodology disclosure.
        </p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        <SummaryCard label="Total Reserve" value={formatCurrency(parseFloat(mockReserveSummary.totalValue))} />
        <SummaryCard label="Liabilities" value={formatCurrency(parseFloat(mockReserveSummary.totalLiabilities))} />
        <SummaryCard label="Net Value" value={formatCurrency(parseFloat(mockReserveSummary.netValue))} />
        <SummaryCard label="Attested" value={`${mockReserveSummary.attestedPct}%`} highlight />
        <SummaryCard label="Assets" value={`${reserveAssets.length}`} />
      </div>

      {/* Asset table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-obsidian-800">
                {['Asset', 'Class', 'Custodian', 'Valuation', 'Methodology', 'Attestation'].map((h) => (
                  <th key={h} className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-caps text-obsidian-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reserveAssets.map((asset) => {
                const badge = attestBadge[asset.attestation] ?? attestBadge.unverified;
                return (
                  <tr key={asset.id} className="border-b border-obsidian-800/50 hover:bg-obsidian-800/20">
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-obsidian-100">{asset.name}</p>
                    </td>
                    <td className="py-3.5 px-4 capitalize text-obsidian-300">{asset.assetClass.replace(/_/g, ' ')}</td>
                    <td className="py-3.5 px-4 text-obsidian-300">{asset.custodian}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-mono text-obsidian-200">{formatCurrency(asset.value)}</p>
                      <p className="text-[10px] text-obsidian-400">{asset.lastValuation}</p>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-obsidian-400 max-w-[200px]">{asset.methodology}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${badge.class}`}>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 border border-obsidian-700/50 rounded-lg bg-obsidian-900/30">
        <p className="text-[11px] text-obsidian-400 leading-relaxed">
          <strong className="text-obsidian-300">Reserve Disclosure:</strong> All valuations are point-in-time
          and subject to market fluctuation. Self-reported values have not been independently verified and may
          differ from actual market value. Attestation status reflects the most recent verification cycle.
          This is not a guarantee of future value or availability of reserves.
        </p>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="glass-card p-3">
      <p className={`text-lg font-bold font-mono ${highlight ? 'text-gold-400' : 'text-obsidian-50'}`}>{value}</p>
      <p className="text-[11px] text-obsidian-400">{label}</p>
    </div>
  );
}
