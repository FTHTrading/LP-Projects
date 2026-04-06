export const metadata = { title: 'Documents | Investor Portal' };

const documents = [
  { id: 'd1', title: 'Private Placement Memorandum — SVPG Series A', type: 'PPM', date: '2026-01-15', status: 'signed' },
  { id: 'd2', title: 'Subscription Agreement — Apex Capital Partners', type: 'Subscription', date: '2026-01-20', status: 'signed' },
  { id: 'd3', title: 'Q4 2025 Account Statement', type: 'Statement', date: '2026-01-05', status: 'available' },
  { id: 'd4', title: 'Q1 2026 Account Statement', type: 'Statement', date: '2026-04-05', status: 'available' },
  { id: 'd5', title: 'Annual Tax Report — 2025', type: 'Tax', date: '2026-02-28', status: 'available' },
  { id: 'd6', title: 'Q1 2026 Reserve Attestation Report', type: 'Attestation', date: '2026-04-01', status: 'available' },
  { id: 'd7', title: 'Risk Disclosure Statement', type: 'Legal', date: '2026-01-15', status: 'signed' },
  { id: 'd8', title: 'Investor Rights Agreement', type: 'Legal', date: '2026-01-20', status: 'signed' },
];

const statusColors: Record<string, string> = {
  signed: 'bg-emerald-500/20 text-emerald-400',
  available: 'bg-blue-500/20 text-blue-400',
  pending: 'bg-amber-500/20 text-amber-400',
};

export default function DocumentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Documents</h1>
        <p className="text-sm text-obsidian-400">
          Your legal documents, account statements, tax reports, and attestation records.
        </p>
      </div>

      {/* Document categories */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {['Legal', 'Statement', 'Tax', 'Attestation'].map((cat) => {
          const count = documents.filter(d => d.type === cat || (cat === 'Legal' && (d.type === 'Legal' || d.type === 'PPM' || d.type === 'Subscription'))).length;
          return (
            <div key={cat} className="glass-card p-5">
              <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">{cat}</p>
              <p className="text-2xl font-bold font-mono text-obsidian-50">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Document list */}
      <div className="glass-card p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-3">Document</th>
                <th className="text-left py-2 pr-3">Type</th>
                <th className="text-left py-2 pr-3">Date</th>
                <th className="text-left py-2 pr-3">Status</th>
                <th className="text-right py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-obsidian-800/50">
                  <td className="py-3 pr-3 font-semibold">{doc.title}</td>
                  <td className="py-3 pr-3 text-obsidian-300">{doc.type}</td>
                  <td className="py-3 pr-3 font-mono text-obsidian-300">{doc.date}</td>
                  <td className="py-3 pr-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[doc.status] ?? 'bg-obsidian-700 text-obsidian-400'}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-gold-400 hover:text-gold-300 text-[10px]">
                      {doc.status === 'signed' ? 'Download' : doc.status === 'available' ? 'View & Download' : 'Sign'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
