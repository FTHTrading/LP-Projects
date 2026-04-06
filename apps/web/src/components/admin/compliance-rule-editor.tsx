'use client';

import { useState } from 'react';

interface ComplianceRule {
  id: string;
  tokenId: string;
  ruleType: string;
  countryCode?: string;
  investorType?: string;
  maxHolding?: string;
  lockupDays?: number;
  description: string;
  active: boolean;
}

const ruleTypes = [
  'jurisdiction_block',
  'accreditation_required',
  'max_holding',
  'lockup_period',
  'volume_limit',
  'kyc_required',
];

const mockRules: ComplianceRule[] = [
  { id: 'r1', tokenId: 'SVPG', ruleType: 'jurisdiction_block', countryCode: 'KP', description: 'Block all transfers to/from DPRK', active: true },
  { id: 'r2', tokenId: 'SVPG', ruleType: 'accreditation_required', description: 'Require accredited investor status for US persons', active: true },
  { id: 'r3', tokenId: 'SVPG', ruleType: 'max_holding', maxHolding: '500000', description: 'Max 500,000 tokens per single investor', active: true },
  { id: 'r4', tokenId: 'SVPG', ruleType: 'lockup_period', lockupDays: 180, description: '180-day lockup from primary issuance', active: true },
  { id: 'r5', tokenId: 'SVCS', ruleType: 'kyc_required', description: 'KYC approval required before any transfer', active: true },
];

interface ComplianceRuleEditorProps {
  rules?: ComplianceRule[];
}

export function ComplianceRuleEditor({ rules = mockRules }: ComplianceRuleEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-obsidian-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-obsidian-200">Compliance Rules</h3>
        <button className="px-3 py-1 text-xs rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/40 hover:bg-gold-500/30 transition-colors">
          + Add Rule
        </button>
      </div>

      <div className="divide-y divide-obsidian-800/50">
        {rules.map((rule) => {
          const isEditing = editingId === rule.id;

          return (
            <div key={rule.id} className="p-4 hover:bg-obsidian-900/30 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-gold-400 bg-gold-500/10 px-1.5 py-0.5 rounded">
                      {rule.tokenId}
                    </span>
                    <span className="text-[10px] text-obsidian-400 uppercase tracking-wider font-medium">
                      {rule.ruleType.replace(/_/g, ' ')}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${rule.active ? 'bg-emerald-400/10 text-emerald-400' : 'bg-obsidian-600/20 text-obsidian-500'}`}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <p className="text-xs text-obsidian-300 mt-1.5">{rule.description}</p>

                  {/* Rule parameters */}
                  <div className="flex gap-3 mt-2 text-[10px] text-obsidian-500">
                    {rule.countryCode && <span>Country: {rule.countryCode}</span>}
                    {rule.investorType && <span>Investor Type: {rule.investorType}</span>}
                    {rule.maxHolding && <span>Max: {parseFloat(rule.maxHolding).toLocaleString()} tokens</span>}
                    {rule.lockupDays && <span>Lockup: {rule.lockupDays} days</span>}
                  </div>
                </div>

                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setEditingId(isEditing ? null : rule.id)}
                    className="px-2 py-1 text-[10px] rounded bg-obsidian-800 text-obsidian-400 hover:text-obsidian-200 transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button className="px-2 py-1 text-[10px] rounded bg-obsidian-800 text-obsidian-400 hover:text-red-400 transition-colors">
                    Delete
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="mt-3 p-3 rounded-lg bg-obsidian-900/50 border border-obsidian-700 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-obsidian-400">Rule Type</label>
                      <select
                        defaultValue={rule.ruleType}
                        className="mt-1 w-full px-2 py-1.5 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200"
                      >
                        {ruleTypes.map((t) => (
                          <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-obsidian-400">Status</label>
                      <select
                        defaultValue={rule.active ? 'active' : 'inactive'}
                        className="mt-1 w-full px-2 py-1.5 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-obsidian-400">Description</label>
                    <input
                      type="text"
                      defaultValue={rule.description}
                      className="mt-1 w-full px-2 py-1.5 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200"
                    />
                  </div>
                  <button className="px-3 py-1.5 text-xs rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/40 hover:bg-gold-500/30 transition-colors">
                    Save Changes (requires multi-sig)
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
