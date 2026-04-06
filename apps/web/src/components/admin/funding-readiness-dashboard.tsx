'use client';

import { mockIssuerApplications } from '@/lib/mock-data';

export function FundingReadinessDashboard() {
  const issuers = mockIssuerApplications;

  const totalChannels = issuers.reduce((sum, iss) => sum + iss.fundingChannels.length, 0);
  const blockedChannels = issuers.reduce((sum, iss) => sum + iss.fundingChannels.filter(f => f.status === 'blocked').length, 0);
  const totalRemediationItems = issuers.reduce((sum, iss) => sum + iss.remediationPlan.length, 0);
  const completedRemediationItems = issuers.reduce((sum, iss) => sum + iss.remediationPlan.filter(r => r.status === 'completed').length, 0);
  const avgScore = issuers.length > 0 ? Math.round(issuers.reduce((sum, iss) => sum + iss.qualificationScore, 0) / issuers.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Funding Readiness Dashboard</h2>
        <p className="text-sm text-obsidian-400">
          Aggregate funding pipeline health across all issuer applications. 
          Track qualification progress, channel readiness, and revenue projections.
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold font-mono">{issuers.length}</p>
          <p className="text-[10px] text-obsidian-400 uppercase">Issuers</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className={`text-2xl font-bold font-mono ${avgScore >= 85 ? 'text-emerald-400' : avgScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
            {avgScore}
          </p>
          <p className="text-[10px] text-obsidian-400 uppercase">Avg Score</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold font-mono text-rose-400">{blockedChannels}<span className="text-obsidian-500 text-sm">/{totalChannels}</span></p>
          <p className="text-[10px] text-obsidian-400 uppercase">Channels Blocked</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold font-mono">{completedRemediationItems}<span className="text-obsidian-500 text-sm">/{totalRemediationItems}</span></p>
          <p className="text-[10px] text-obsidian-400 uppercase">Gates Complete</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold font-mono text-amber-400">$550K+</p>
          <p className="text-[10px] text-obsidian-400 uppercase">Year 1 Target</p>
        </div>
      </div>

      {/* Institutional Stack Gap Heat Map */}
      <div className="glass-card p-4">
        <h3 className="text-xs font-semibold text-obsidian-400 uppercase tracking-caps mb-3">
          Institutional Stack Coverage (10-Layer Model)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-obsidian-700/30">
                <th className="text-left py-2 px-2 text-obsidian-400 font-normal">Layer</th>
                <th className="text-center py-2 px-2 text-obsidian-400 font-normal">HSBC Standard</th>
                {issuers.map(iss => (
                  <th key={iss.id} className="text-center py-2 px-2 text-obsidian-400 font-normal">{iss.token.symbol}</th>
                ))}
                <th className="text-center py-2 px-2 text-obsidian-400 font-normal">Our Platform</th>
              </tr>
            </thead>
            <tbody>
              {[
                { layer: 'Legal Entity', hsbc: true, mpra: false, digau: true, platform: true },
                { layer: 'Token Issuance', hsbc: true, mpra: true, digau: true, platform: true },
                { layer: 'Qualified Custody', hsbc: true, mpra: false, digau: false, platform: true },
                { layer: 'Reserve Attestation', hsbc: true, mpra: false, digau: false, platform: true },
                { layer: 'Market Making', hsbc: true, mpra: false, digau: false, platform: true },
                { layer: 'Trading Venues', hsbc: true, mpra: false, digau: false, platform: true },
                { layer: 'Compliance (KYC/AML)', hsbc: true, mpra: false, digau: false, platform: true },
                { layer: 'Investor Services', hsbc: true, mpra: false, digau: false, platform: true },
                { layer: 'Treasury Ops', hsbc: true, mpra: false, digau: false, platform: false },
                { layer: 'Governance', hsbc: true, mpra: false, digau: false, platform: true },
              ].map(row => (
                <tr key={row.layer} className="border-b border-obsidian-800/30">
                  <td className="py-2 px-2 font-mono">{row.layer}</td>
                  <td className="py-2 px-2 text-center">
                    <span className="inline-block w-3 h-3 rounded-sm bg-emerald-400" />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block w-3 h-3 rounded-sm ${row.mpra ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block w-3 h-3 rounded-sm ${row.digau ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span className={`inline-block w-3 h-3 rounded-sm ${row.platform ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 mt-3 text-[10px] text-obsidian-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-400" /> Active</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400" /> In Progress</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-rose-400" /> Missing</span>
        </div>
      </div>

      {/* Funding Channel Breakdown */}
      <div className="glass-card p-4">
        <h3 className="text-xs font-semibold text-obsidian-400 uppercase tracking-caps mb-3">
          Funding Channel Pipeline
        </h3>
        <div className="space-y-3">
          {(['trade_desk', 'otc_desk', 'market_maker', 'lp_pool', 'institutional_placement'] as const).map(channelType => {
            const channels = issuers.flatMap(iss =>
              iss.fundingChannels
                .filter(ch => ch.type === channelType)
                .map(ch => ({ ...ch, issuer: iss.token.symbol }))
            );
            if (channels.length === 0) return null;
            return (
              <div key={channelType} className="bg-obsidian-900/50 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold capitalize">{channelType.replace(/_/g, ' ')}</span>
                  <span className="text-[10px] text-obsidian-500 font-mono">{channels.length} issuer(s)</span>
                </div>
                {channels.map(ch => (
                  <div key={`${ch.issuer}-${ch.type}`} className="flex items-center justify-between py-1 text-xs border-t border-obsidian-800/30">
                    <span className="font-mono text-obsidian-300">{ch.issuer}</span>
                    <span className="text-obsidian-500">{ch.estimatedTimeline}</span>
                    <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-mono ${
                      ch.status === 'blocked' ? 'bg-rose-400/10 text-rose-400' :
                      ch.status === 'in_progress' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-emerald-400/10 text-emerald-400'
                    }`}>
                      {ch.status.replace('_', ' ')}
                    </span>
                    {ch.estimatedValue && <span className="font-mono text-amber-400/80">{ch.estimatedValue}</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Value Proposition */}
      <div className="glass-card p-4 border border-obsidian-600/30">
        <blockquote className="text-xs text-obsidian-300 italic border-l-2 border-amber-400/40 pl-3">
          &ldquo;HSBC doesn&rsquo;t have better gold than Dignity Gold. They have better infrastructure around the gold.
          Our platform <strong>is</strong> that infrastructure — the missing 8 layers between a tokenized asset
          and institutional capital.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
