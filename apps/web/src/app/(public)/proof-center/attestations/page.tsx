import Link from 'next/link';

export const metadata = {
  title: 'Attestation Documents | Proof Center',
  description: 'Hash-anchored attestation documents with chain verification and issuer provenance.',
};

// Illustrative attestation documents
const documents = [
  { id: 'd1', title: 'Q4 2025 Gold Reserve Assay Report', type: 'assay_report', issuer: 'Swiss Assay AG', issuerType: 'third_party_auditor', date: '2026-01-15', hash: 'sha256:a1b2c3d4e5f6789012345678abcdef01234567890abcdef0123456789abcdef0', chainAnchor: '0x1234...abcd', verified: true },
  { id: 'd2', title: 'Custody Receipt — Vault A (Zurich)', type: 'custody_receipt', issuer: 'Swiss Precious Metals AG', issuerType: 'custodian', date: '2026-01-15', hash: 'sha256:b2c3d4e5f678901234567890bcdef012345678901bcdef01234567890bcdef01', chainAnchor: '0x2345...bcde', verified: true },
  { id: 'd3', title: 'Annual Audit Report — FY 2025', type: 'audit_report', issuer: 'Grant Thornton LLP', issuerType: 'third_party_auditor', date: '2025-12-20', hash: 'sha256:c3d4e5f6789012345678901cdef0123456789012cdef012345678901cdef0123', chainAnchor: '0x3456...cdef', verified: true },
  { id: 'd4', title: 'Insurance Certificate — Vault Coverage', type: 'insurance_cert', issuer: 'Lloyd\'s of London', issuerType: 'third_party_auditor', date: '2025-11-01', hash: 'sha256:d4e5f67890123456789012def01234567890123def0123456789012def012345', chainAnchor: null, verified: false },
  { id: 'd5', title: 'Real Estate Appraisal — Austin TX', type: 'valuation_report', issuer: 'CBRE Valuation', issuerType: 'third_party_auditor', date: '2025-09-01', hash: 'sha256:e5f6789012345678901234ef012345678901234ef01234567890123ef01234567', chainAnchor: '0x5678...ef01', verified: true },
  { id: 'd6', title: 'Legal Opinion — Token Structure', type: 'legal_opinion', issuer: 'Kirkland & Ellis LLP', issuerType: 'legal_counsel', date: '2025-06-15', hash: 'sha256:f67890123456789012345f0123456789012345f012345678901234f012345678', chainAnchor: null, verified: false },
];

const typeBadge: Record<string, string> = {
  assay_report: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  custody_receipt: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  audit_report: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  insurance_cert: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  valuation_report: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  legal_opinion: 'bg-obsidian-500/10 text-obsidian-300 border-obsidian-500/20',
};

export default function AttestationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-obsidian-400 mb-8">
        <Link href="/proof-center" className="hover:text-obsidian-200 transition-colors">Proof Center</Link>
        <span>/</span>
        <span className="text-obsidian-200">Attestations</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Attestation Documents</h1>
        <p className="text-obsidian-300 max-w-2xl text-sm leading-relaxed">
          Every published document is SHA-256 hashed and optionally anchored on-chain. You can independently
          verify any document by computing its hash and comparing against the chain anchor record.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="glass-card p-4">
          <p className="stat-value text-obsidian-50">{documents.length}</p>
          <p className="stat-label">Total Documents</p>
        </div>
        <div className="glass-card p-4">
          <p className="stat-value text-emerald-400">{documents.filter(d => d.verified).length}</p>
          <p className="stat-label">Chain-Verified</p>
        </div>
        <div className="glass-card p-4">
          <p className="stat-value text-amber-400">{documents.filter(d => !d.verified).length}</p>
          <p className="stat-label">Pending Anchor</p>
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="glass-card p-5 hover:border-obsidian-600 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-obsidian-100">{doc.title}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${typeBadge[doc.type] ?? typeBadge.legal_opinion}`}>
                    {doc.type.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-obsidian-400">
                  <span>Issuer: <span className="text-obsidian-300">{doc.issuer}</span></span>
                  <span>Type: <span className="text-obsidian-300 capitalize">{doc.issuerType.replace(/_/g, ' ')}</span></span>
                  <span>Date: <span className="text-obsidian-300">{doc.date}</span></span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {doc.verified ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Pending
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-obsidian-800/50">
              <div className="flex flex-col md:flex-row gap-x-6 gap-y-1 text-[11px] font-mono text-obsidian-400">
                <span>Hash: {doc.hash.slice(0, 20)}...{doc.hash.slice(-8)}</span>
                {doc.chainAnchor && <span>Chain Anchor: {doc.chainAnchor}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
