export const metadata = { title: 'Settings | Investor Portal' };

export default function InvestorSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
        <p className="text-sm text-obsidian-400">Manage your profile, wallet, verification, and notification preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Investor Profile</h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {[
              { label: 'Entity Name', value: 'Apex Capital Partners' },
              { label: 'Investor Type', value: 'Fund' },
              { label: 'Jurisdiction', value: 'United States' },
              { label: 'Registration ID', value: 'inv-001' },
            ].map((field) => (
              <div key={field.label}>
                <p className="text-obsidian-400 mb-1">{field.label}</p>
                <p className="font-semibold">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Wallet & On-Chain Identity</h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-obsidian-400 mb-1">Primary Wallet</p>
              <p className="font-mono text-sm">0x7a2B...4f1c</p>
              <p className="text-[10px] text-emerald-400 mt-1">Whitelisted</p>
            </div>
            <div>
              <p className="text-obsidian-400 mb-1">Chain</p>
              <p className="font-semibold">Ethereum Mainnet (ERC-3643)</p>
            </div>
          </div>
          <button className="mt-4 px-3 py-1.5 text-xs border border-gold-500/40 text-gold-400 rounded-lg hover:bg-gold-500/10 transition">
            Update Wallet Address
          </button>
        </div>

        {/* Verification status */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Verification Status</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'KYC/AML', status: 'Approved', date: 'Verified Jan 20, 2026', color: 'text-emerald-400' },
              { label: 'Accreditation', status: 'Verified', date: 'Expires Jan 20, 2027', color: 'text-emerald-400' },
              { label: 'Tax Documentation', status: 'W-8BEN on file', date: 'Filed Feb 28, 2026', color: 'text-blue-400' },
            ].map((v) => (
              <div key={v.label} className="p-3 border border-obsidian-700/50 rounded-lg">
                <p className="text-xs text-obsidian-400 mb-1">{v.label}</p>
                <p className={`text-sm font-semibold ${v.color}`}>{v.status}</p>
                <p className="text-[10px] text-obsidian-500 mt-1">{v.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-3 text-xs">
            {[
              { label: 'NAV Updates', desc: 'Daily NAV changes for your holdings', enabled: true },
              { label: 'Attestation Alerts', desc: 'When new reserve attestations are published', enabled: true },
              { label: 'Redemption Status', desc: 'Status updates on pending redemptions', enabled: true },
              { label: 'Market Anomalies', desc: 'Alerts when market anomalies are detected', enabled: false },
              { label: 'Compliance Updates', desc: 'Changes to jurisdiction policies or transfer rules', enabled: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between p-3 border border-obsidian-700/50 rounded-lg">
                <div>
                  <p className="font-semibold">{pref.label}</p>
                  <p className="text-obsidian-400 text-[10px]">{pref.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition ${pref.enabled ? 'bg-gold-500' : 'bg-obsidian-700'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${pref.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
