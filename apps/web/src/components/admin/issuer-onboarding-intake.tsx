'use client';

import { mockIssuerApplications } from '@/lib/mock-data';
import type { IssuerStage } from '@sov/shared-types';

const stagePipeline: { key: IssuerStage; label: string }[] = [
  { key: 'intake', label: 'Intake' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'remediation', label: 'Remediation' },
  { key: 'activation', label: 'Activation' },
  { key: 'live', label: 'Live' },
];

const stageColor: Record<IssuerStage, string> = {
  intake: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
  assessment: 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  remediation: 'bg-orange-400/20 text-orange-400 border-orange-400/30',
  activation: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
  live: 'bg-green-400/20 text-green-400 border-green-400/30',
  suspended: 'bg-rose-400/20 text-rose-400 border-rose-400/30',
};

export function IssuerOnboardingIntake() {
  const issuers = mockIssuerApplications;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Issuer Onboarding Pipeline</h2>
        <p className="text-sm text-obsidian-400">
          Track issuer applications from intake through trade desk activation.
          Each issuer receives a tailored remediation plan mapped to qualification gates.
        </p>
      </div>

      {/* Pipeline Overview */}
      <div className="glass-card p-4">
        <h3 className="text-xs font-semibold text-obsidian-400 uppercase tracking-caps mb-3">Pipeline Stages</h3>
        <div className="flex items-center gap-1">
          {stagePipeline.map((stage, i) => {
            const count = issuers.filter(iss => iss.stage === stage.key).length;
            return (
              <div key={stage.key} className="flex items-center">
                <div className={`px-3 py-2 rounded text-xs font-mono border ${count > 0 ? stageColor[stage.key] : 'bg-obsidian-800/30 text-obsidian-500 border-obsidian-700/30'}`}>
                  <span className="font-semibold">{stage.label}</span>
                  <span className="ml-2 opacity-70">{count}</span>
                </div>
                {i < stagePipeline.length - 1 && (
                  <span className="mx-1 text-obsidian-600">→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Issuer Cards */}
      {issuers.map(issuer => {
        const completedItems = issuer.remediationPlan.filter(r => r.status === 'completed').length;
        const totalItems = issuer.remediationPlan.length;
        const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        const blockedChannels = issuer.fundingChannels.filter(f => f.status === 'blocked').length;

        return (
          <div key={issuer.id} className="glass-card p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold">{issuer.entityName}</h3>
                  <span className={`text-[10px] uppercase tracking-caps px-2 py-0.5 rounded-full border font-mono ${stageColor[issuer.stage]}`}>
                    {issuer.stage}
                  </span>
                </div>
                <p className="text-xs text-obsidian-400 mt-1">
                  {issuer.token.symbol} · {issuer.token.blockchain} · {issuer.jurisdiction} · {issuer.entityType.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono">
                  <span className={issuer.qualificationScore >= 85 ? 'text-emerald-400' : issuer.qualificationScore >= 60 ? 'text-amber-400' : 'text-rose-400'}>
                    {issuer.qualificationScore}
                  </span>
                  <span className="text-obsidian-500 text-sm">/100</span>
                </div>
                <p className="text-[10px] text-obsidian-400 uppercase">Qualification Score</p>
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-obsidian-900/50 rounded p-2">
                <p className="text-[10px] text-obsidian-400 uppercase">Holders</p>
                <p className="text-sm font-mono font-bold">{issuer.token.holderCount}</p>
              </div>
              <div className="bg-obsidian-900/50 rounded p-2">
                <p className="text-[10px] text-obsidian-400 uppercase">Supply</p>
                <p className="text-sm font-mono font-bold">{Number(issuer.token.totalSupply).toLocaleString()}</p>
              </div>
              <div className="bg-obsidian-900/50 rounded p-2">
                <p className="text-[10px] text-obsidian-400 uppercase">Wallet</p>
                <p className="text-sm font-mono font-bold">{issuer.token.walletRestriction === 'open' ? 'Open' : 'Proprietary'}</p>
              </div>
              <div className="bg-obsidian-900/50 rounded p-2">
                <p className="text-[10px] text-obsidian-400 uppercase">Reserve Proof</p>
                <p className="text-sm font-mono font-bold capitalize">{issuer.reserve.attestationStatus.replace('_', ' ')}</p>
              </div>
              <div className="bg-obsidian-900/50 rounded p-2">
                <p className="text-[10px] text-obsidian-400 uppercase">Est. Timeline</p>
                <p className="text-sm font-mono font-bold">{issuer.estimatedCompletionWeeks}w</p>
              </div>
            </div>

            {/* Remediation Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-obsidian-400 uppercase tracking-caps">Remediation Progress</h4>
                <span className="text-xs font-mono text-obsidian-400">{completedItems}/{totalItems} gates ({progressPct}%)</span>
              </div>
              <div className="w-full h-2 bg-obsidian-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="mt-3 space-y-1">
                {issuer.remediationPlan.map(item => (
                  <div key={item.gateId} className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-emerald-400' :
                      item.status === 'in_progress' ? 'bg-amber-400' :
                      item.status === 'blocked' ? 'bg-rose-400' : 'bg-obsidian-600'
                    }`} />
                    <span className="text-obsidian-300 flex-1">{item.action}</span>
                    {item.cost && <span className="text-obsidian-500 font-mono">{item.cost}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Channels */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-obsidian-400 uppercase tracking-caps">Funding Channels</h4>
                <span className="text-xs font-mono text-obsidian-400">{blockedChannels}/{issuer.fundingChannels.length} blocked</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {issuer.fundingChannels.map(ch => (
                  <div key={ch.type} className="bg-obsidian-900/50 rounded p-3 border border-obsidian-700/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold">{ch.name}</span>
                      <span className={`text-[10px] uppercase tracking-caps px-1.5 py-0.5 rounded font-mono ${
                        ch.status === 'completed' ? 'bg-emerald-400/10 text-emerald-400' :
                        ch.status === 'in_progress' ? 'bg-amber-400/10 text-amber-400' :
                        ch.status === 'available' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-rose-400/10 text-rose-400'
                      }`}>
                        {ch.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[10px] text-obsidian-500">{ch.estimatedTimeline}</p>
                    {ch.estimatedValue && <p className="text-[10px] text-amber-400/80 font-mono">{ch.estimatedValue}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Projection */}
            <div className="flex items-center justify-between pt-3 border-t border-obsidian-700/30">
              <div>
                <p className="text-[10px] text-obsidian-400 uppercase">BD Relationship</p>
                <p className="text-xs font-mono">{issuer.bdRelationship ? `${issuer.bdRelationship.name} (${issuer.bdRelationship.status})` : 'None'}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-obsidian-400 uppercase">Est. Year 1 Revenue</p>
                <p className="text-sm font-bold font-mono text-amber-400">{issuer.estimatedYear1Revenue}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Combined Opportunity */}
      <div className="glass-card p-4 border border-amber-400/20 bg-amber-400/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-amber-400">Combined Pipeline Revenue</h3>
            <p className="text-xs text-obsidian-400">2 issuers · 18 weeks combined remediation</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold font-mono text-amber-400">$450K–$900K</p>
            <p className="text-[10px] text-obsidian-400 uppercase">Year 1 Projection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
