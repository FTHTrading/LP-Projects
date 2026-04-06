'use client';

import { formatDate } from '@/lib/utils';

interface AttestationEntry {
  id: string;
  tier: 1 | 2 | 3;
  title: string;
  date: string;
  status: 'verified' | 'pending' | 'expired';
  hash?: string;
  chainAnchor?: string;
}

const tierLabels: Record<number, string> = {
  1: 'Automated',
  2: 'Custodian-Signed',
  3: 'Independent Audit',
};

const tierColors: Record<number, string> = {
  1: 'bg-sky-500',
  2: 'bg-gold-500',
  3: 'bg-emerald-500',
};

const statusStyles: Record<string, string> = {
  verified: 'text-emerald-400 bg-emerald-400/10',
  pending: 'text-amber-400 bg-amber-400/10',
  expired: 'text-red-400 bg-red-400/10',
};

const mockTimeline: AttestationEntry[] = [
  { id: 'att-1', tier: 3, title: 'Q1 2026 Independent Audit — Gold Reserves', date: '2026-04-01T00:00:00Z', status: 'verified', hash: 'a1b2c3d4...', chainAnchor: '0xabc...123' },
  { id: 'att-2', tier: 2, title: 'March 2026 Custodian Verification — Brinks', date: '2026-03-15T00:00:00Z', status: 'verified', hash: 'e5f6a7b8...', chainAnchor: '0xdef...456' },
  { id: 'att-3', tier: 1, title: 'Daily Reserve Snapshot — 2026-03-14', date: '2026-03-14T00:00:00Z', status: 'verified', hash: 'c9d0e1f2...' },
  { id: 'att-4', tier: 2, title: 'February 2026 Custodian Verification — Loomis', date: '2026-02-15T00:00:00Z', status: 'verified', hash: 'g3h4i5j6...', chainAnchor: '0xghi...789' },
  { id: 'att-5', tier: 1, title: 'Daily Reserve Snapshot — 2026-02-14', date: '2026-02-14T00:00:00Z', status: 'expired' },
  { id: 'att-6', tier: 3, title: 'Q4 2025 Independent Audit — Full Reserve', date: '2025-12-31T00:00:00Z', status: 'verified', hash: 'k7l8m9n0...', chainAnchor: '0xjkl...012' },
];

export function ProofTimeline({ entries = mockTimeline }: { entries?: AttestationEntry[] }) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-semibold text-obsidian-200 mb-6">Attestation Timeline</h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-obsidian-700" />

        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="relative flex items-start gap-4 pl-9">
              {/* Dot */}
              <div className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full ring-2 ring-obsidian-900 ${tierColors[entry.tier]}`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded ${tierColors[entry.tier]}/20 text-obsidian-100`}>
                    Tier {entry.tier} — {tierLabels[entry.tier]}
                  </span>
                  <span className={`inline-block px-1.5 py-0.5 text-[10px] font-medium rounded ${statusStyles[entry.status]}`}>
                    {entry.status}
                  </span>
                </div>

                <p className="text-sm font-medium text-obsidian-200 mt-1">{entry.title}</p>
                <p className="text-xs text-obsidian-400 mt-0.5">{formatDate(entry.date)}</p>

                {(entry.hash || entry.chainAnchor) && (
                  <div className="mt-1.5 flex items-center gap-3 text-[10px] text-obsidian-500 font-mono">
                    {entry.hash && <span>Hash: {entry.hash}</span>}
                    {entry.chainAnchor && <span>Anchor: {entry.chainAnchor}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
