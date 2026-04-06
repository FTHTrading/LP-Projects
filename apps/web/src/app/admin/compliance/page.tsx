export const metadata = { title: 'Compliance | Admin' };

const jurisdictionData = [
  { country: 'United States', code: 'US', status: 'allowed', types: 'Accredited only', notes: 'Reg D 506(c). No retail.' },
  { country: 'European Union', code: 'EU', status: 'allowed', types: 'All qualified', notes: 'MiCA compliant pathway.' },
  { country: 'United Kingdom', code: 'GB', status: 'restricted', types: 'Professional only', notes: 'FCA sandbox pending.' },
  { country: 'Singapore', code: 'SG', status: 'allowed', types: 'Accredited + Institutional', notes: 'MAS exempt framework.' },
  { country: 'China', code: 'CN', status: 'blocked', types: 'None', notes: 'Regulatory prohibition.' },
  { country: 'Canada', code: 'CA', status: 'restricted', types: 'AI / PI only', notes: 'Prospectus-exempt distributions.' },
];

const transferRules = [
  { rule: 'KYC Required', scope: 'All tokens', desc: 'Transfer blocked if recipient wallet not KYC-verified.', active: true },
  { rule: 'Accreditation Check', scope: 'SVPG, SVSG', desc: 'Security tokens require verified accredited investor status.', active: true },
  { rule: 'Jurisdiction Filter', scope: 'All tokens', desc: 'Transfers to/from blocked jurisdictions rejected on-chain.', active: true },
  { rule: 'Max Holding Limit', scope: 'SVPG', desc: 'No single wallet may hold >5% of outstanding supply.', active: true },
  { rule: 'Lockup Period', scope: 'SVSG', desc: '180-day lockup post-issuance. Transfer blocked during lockup.', active: true },
  { rule: 'Cooling-Off Period', scope: 'All tokens', desc: '48-hour cooling period for first-time transfers from new wallets.', active: false },
];

const statusColors: Record<string, string> = {
  allowed: 'text-emerald-400 bg-emerald-500/20',
  restricted: 'text-amber-400 bg-amber-500/20',
  blocked: 'text-rose-400 bg-rose-500/20',
};

export default function AdminCompliancePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Compliance Engine</h1>
        <p className="text-sm text-obsidian-400">
          Transfer restrictions, jurisdiction policies, KYC/AML monitoring, and regulatory reporting.
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Restrictions', value: transferRules.filter(r => r.active).length.toString(), color: 'text-obsidian-50' },
          { label: 'Allowed Jurisdictions', value: jurisdictionData.filter(j => j.status === 'allowed').length.toString(), color: 'text-emerald-400' },
          { label: 'Restricted', value: jurisdictionData.filter(j => j.status === 'restricted').length.toString(), color: 'text-amber-400' },
          { label: 'Blocked', value: jurisdictionData.filter(j => j.status === 'blocked').length.toString(), color: 'text-rose-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card p-5">
            <p className="text-[10px] uppercase tracking-caps text-obsidian-400 mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold font-mono ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Transfer restriction rules */}
      <div className="glass-card p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Transfer Restriction Rules</h2>
          <button className="px-3 py-1.5 text-xs border border-gold-500/40 text-gold-400 rounded-lg hover:bg-gold-500/10 transition">
            + Add Rule
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-4">Rule</th>
                <th className="text-left py-2 pr-4">Scope</th>
                <th className="text-left py-2 pr-4">Description</th>
                <th className="text-center py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transferRules.map((rule) => (
                <tr key={rule.rule} className="border-b border-obsidian-800/50">
                  <td className="py-3 pr-4 font-semibold">{rule.rule}</td>
                  <td className="py-3 pr-4 font-mono text-obsidian-300">{rule.scope}</td>
                  <td className="py-3 pr-4 text-obsidian-300">{rule.desc}</td>
                  <td className="py-3 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      rule.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-obsidian-700 text-obsidian-400'
                    }`}>
                      {rule.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jurisdiction policies */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Jurisdiction Policies</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-obsidian-400 border-b border-obsidian-700/50">
                <th className="text-left py-2 pr-4">Country</th>
                <th className="text-left py-2 pr-4">Code</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-left py-2 pr-4">Investor Types</th>
                <th className="text-left py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {jurisdictionData.map((j) => (
                <tr key={j.code} className="border-b border-obsidian-800/50">
                  <td className="py-3 pr-4 font-semibold">{j.country}</td>
                  <td className="py-3 pr-4 font-mono">{j.code}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${statusColors[j.status]}`}>
                      {j.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-obsidian-300">{j.types}</td>
                  <td className="py-3 text-obsidian-300">{j.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
