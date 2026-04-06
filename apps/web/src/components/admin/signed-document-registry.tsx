'use client';

import { formatDate } from '@/lib/utils';

interface Document {
  id: string;
  type: string;
  title: string;
  issuer: string;
  date: string;
  hash: string;
  chainAnchor?: string;
  verified: boolean;
}

const mockDocuments: Document[] = [
  { id: 'doc1', type: 'audit_report', title: 'Q1 2026 Independent Reserve Audit', issuer: 'Deloitte & Touche', date: '2026-04-01', hash: 'sha256:a1b2c3d4e5f6...', chainAnchor: '0xabc...123', verified: true },
  { id: 'doc2', type: 'custody_receipt', title: 'March 2026 Gold Custody Receipt — Brinks', issuer: 'Brinks Inc.', date: '2026-03-15', hash: 'sha256:b2c3d4e5f6a7...', chainAnchor: '0xdef...456', verified: true },
  { id: 'doc3', type: 'ppm', title: 'Private Placement Memorandum — Series A', issuer: 'Sovereign Assets LLC', date: '2025-12-01', hash: 'sha256:c3d4e5f6a7b8...', verified: true },
  { id: 'doc4', type: 'legal_opinion', title: 'Securities Classification Opinion', issuer: 'Morrison & Foerster LLP', date: '2025-11-15', hash: 'sha256:d4e5f6a7b8c9...', verified: true },
  { id: 'doc5', type: 'insurance_cert', title: 'Reserve Asset Insurance Certificate', issuer: 'Lloyd\'s of London', date: '2026-01-01', hash: 'sha256:e5f6a7b8c9d0...', verified: false },
];

const typeStyles: Record<string, string> = {
  audit_report: 'bg-emerald-500/10 text-emerald-400',
  custody_receipt: 'bg-gold-500/10 text-gold-400',
  ppm: 'bg-violet-500/10 text-violet-400',
  legal_opinion: 'bg-sky-500/10 text-sky-400',
  insurance_cert: 'bg-amber-500/10 text-amber-400',
  valuation_report: 'bg-teal-500/10 text-teal-400',
  risk_disclosure: 'bg-red-500/10 text-red-400',
  subscription_agreement: 'bg-indigo-500/10 text-indigo-400',
};

interface SignedDocumentRegistryProps {
  documents?: Document[];
}

export function SignedDocumentRegistry({ documents = mockDocuments }: SignedDocumentRegistryProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-obsidian-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-obsidian-200">Signed Document Registry</h3>
        <span className="text-[10px] text-obsidian-500">{documents.length} documents</span>
      </div>

      <div className="divide-y divide-obsidian-800/50">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 hover:bg-obsidian-900/30 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${typeStyles[doc.type] || 'bg-obsidian-600/20 text-obsidian-400'}`}>
                    {doc.type.replace(/_/g, ' ')}
                  </span>
                  {doc.verified && (
                    <span className="text-[10px] text-emerald-400">✓ Verified</span>
                  )}
                </div>
                <p className="text-xs font-medium text-obsidian-200 mt-1">{doc.title}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-obsidian-500">
                  <span>Issuer: {doc.issuer}</span>
                  <span>Date: {formatDate(doc.date)}</span>
                </div>
                <div className="mt-1.5 font-mono text-[10px] text-obsidian-600">
                  <span>Hash: {doc.hash}</span>
                  {doc.chainAnchor && <span className="ml-3">Anchor: {doc.chainAnchor}</span>}
                </div>
              </div>
              <button className="flex-shrink-0 px-2.5 py-1 text-[10px] rounded bg-obsidian-800 text-obsidian-400 hover:text-obsidian-200 transition-colors">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
