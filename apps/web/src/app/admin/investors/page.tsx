export const metadata = { title: 'Investor Management | Admin' };

const mockInvestors = [
  { id: 'inv-001', name: 'Apex Capital Partners', type: 'fund', country: 'US', kyc: 'approved', accreditation: 'verified', whitelisted: true, holdings: '$4.2M' },
  { id: 'inv-002', name: 'Nordic Trust AG', type: 'entity', country: 'CH', kyc: 'approved', accreditation: 'verified', whitelisted: true, holdings: '$2.8M' },
  { id: 'inv-003', name: 'James R. Chen', type: 'individual', country: 'SG', kyc: 'approved', accreditation: 'verified', whitelisted: true, holdings: '$875K' },
  { id: 'inv-004', name: 'Meridian Family Office', type: 'trust', country: 'GB', kyc: 'in_review', accreditation: 'pending', whitelisted: false, holdings: '—' },
  { id: 'inv-005', name: 'Digital Assets Fund II', type: 'fund', country: 'US', kyc: 'approved', accreditation: 'verified', whitelisted: true, holdings: '$6.1M' },
  { id: 'inv-006', name: 'Sarah M. Patel', type: 'individual', country: 'CA', kyc: 'pending', accreditation: 'pending', whitelisted: false, holdings: '—' },
];

const kycColors: Record<string, string> = {
  approved: 'bg-emerald-500/20 text-emerald-400',
  in_review: 'bg-amber-500/20 text-amber-400',
  pending: 'bg-blue-500/20 text-blue-400',
  rejected: 'bg-rose-500/20 text-rose-400',
};

export default function AdminInvestorsPage() {
  const approved = mockInvestors.filter(i => i.kyc === 'approved').length;
  const pending = mockInvestors.filter(i => i.kyc === 'pending' || i.kyc === 'in_review').length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Investor Management</h1>
          <p className="text-sm text-obsidian-400">
            KYC/AML status, accreditation, whitelist management, and onboarding pipeline.
          </p>
        </div>
        <button className="px-4 py-2 text-sm bg-gold-500 text-obsidian-950 font-semibold rounded-lg hover:bg-gold-400 transition">
          + Invite Investor
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Total Investors</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{mockInvestors.length}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">KYC Approved</p>
          <p className="text-2xl font-bold font-mono text-emerald-400">{approved}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Pending Review</p>
          <p className="text-2xl font-bold font-mono text-amber-400">{pending}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">Whitelisted</p>
          <p className="text-2xl font-bold font-mono text-obsidian-50">{mockInvestors.filter(i => i.whitelisted).length}</p>
        </div>
      </div>

      {/* Investor table */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Investor Registry</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-3">Investor</th>
                <th className="text-left py-2 pr-3">Type</th>
                <th className="text-left py-2 pr-3">Country</th>
                <th className="text-left py-2 pr-3">KYC</th>
                <th className="text-left py-2 pr-3">Accreditation</th>
                <th className="text-center py-2 pr-3">Whitelisted</th>
                <th className="text-right py-2 pr-3">Holdings</th>
                <th className="text-right py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvestors.map((inv) => (
                <tr key={inv.id} className="border-b border-obsidian-800/50">
                  <td className="py-3 pr-3">
                    <span className="font-semibold">{inv.name}</span>
                    <span className="block text-obsidian-500 font-mono text-[10px]">{inv.id}</span>
                  </td>
                  <td className="py-3 pr-3 capitalize text-obsidian-300">{inv.type}</td>
                  <td className="py-3 pr-3 font-mono">{inv.country}</td>
                  <td className="py-3 pr-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${kycColors[inv.kyc] ?? 'bg-obsidian-700 text-obsidian-400'}`}>
                      {inv.kyc.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${kycColors[inv.accreditation] ?? 'bg-obsidian-700 text-obsidian-400'}`}>
                      {inv.accreditation}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-center">
                    {inv.whitelisted ? (
                      <span className="text-emerald-400">&#10003;</span>
                    ) : (
                      <span className="text-obsidian-500">&#10007;</span>
                    )}
                  </td>
                  <td className="py-3 pr-3 text-right font-mono">{inv.holdings}</td>
                  <td className="py-3 text-right">
                    <button className="text-gold-400 hover:text-gold-300 text-[10px] mr-2">View</button>
                    <button className="text-gold-400 hover:text-gold-300 text-[10px]">Edit</button>
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
