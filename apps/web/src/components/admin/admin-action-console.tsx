'use client';

import { useState } from 'react';

type ActionType = 'mint' | 'burn' | 'halt' | 'resume' | 'compliance_rule' | 'treasury_movement' | 'whitelist';

interface Approver {
  id: string;
  name: string;
  role: string;
  approved?: boolean;
  timestamp?: string;
}

const actionConfig: Record<ActionType, { label: string; requiredApprovals: number; color: string }> = {
  mint: { label: 'Mint Tokens', requiredApprovals: 2, color: 'bg-emerald-500' },
  burn: { label: 'Burn Tokens', requiredApprovals: 2, color: 'bg-red-500' },
  halt: { label: 'Halt Token', requiredApprovals: 2, color: 'bg-red-500' },
  resume: { label: 'Resume Token', requiredApprovals: 3, color: 'bg-emerald-500' },
  compliance_rule: { label: 'Modify Compliance Rule', requiredApprovals: 2, color: 'bg-amber-500' },
  treasury_movement: { label: 'Treasury Movement', requiredApprovals: 2, color: 'bg-violet-500' },
  whitelist: { label: 'Whitelist Address', requiredApprovals: 1, color: 'bg-sky-500' },
};

export function AdminActionConsole() {
  const [selectedAction, setSelectedAction] = useState<ActionType>('mint');
  const [description, setDescription] = useState('');

  const config = actionConfig[selectedAction];

  const mockApprovers: Approver[] = [
    { id: 'a1', name: 'K. Burns', role: 'Super Admin', approved: true, timestamp: '2 min ago' },
    { id: 'a2', name: 'J. Chen', role: 'Treasury Manager', approved: false },
    { id: 'a3', name: 'M. Williams', role: 'Compliance Officer', approved: false },
  ];

  const approvedCount = mockApprovers.filter((a) => a.approved).length;

  return (
    <div className="glass-card p-6 space-y-5">
      <h3 className="text-sm font-semibold text-obsidian-200">Action Console</h3>

      {/* Action type selector */}
      <div>
        <label className="text-[10px] text-obsidian-400 uppercase tracking-wider font-medium">Action Type</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {(Object.keys(actionConfig) as ActionType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedAction(type)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                selectedAction === type
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                  : 'bg-obsidian-800 text-obsidian-400 border border-obsidian-700 hover:border-obsidian-600'
              }`}
            >
              {actionConfig[type].label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-[10px] text-obsidian-400 uppercase tracking-wider font-medium">Description / Reason</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the action and its justification..."
          rows={3}
          className="mt-1.5 w-full px-3 py-2 text-xs bg-obsidian-900 border border-obsidian-700 rounded-lg text-obsidian-200 placeholder-obsidian-500 focus:outline-none focus:border-gold-500/50 resize-none"
        />
      </div>

      {/* Multi-sig progress */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] text-obsidian-400 uppercase tracking-wider font-medium">
            Approval Progress
          </label>
          <span className="text-xs text-obsidian-300">
            {approvedCount} / {config.requiredApprovals} required
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-obsidian-800 overflow-hidden mb-3">
          <div
            className={`h-full rounded-full ${config.color} transition-all`}
            style={{ width: `${(approvedCount / config.requiredApprovals) * 100}%` }}
          />
        </div>

        {/* Approver list */}
        <div className="space-y-2">
          {mockApprovers.slice(0, config.requiredApprovals + 1).map((approver) => (
            <div key={approver.id} className="flex items-center justify-between py-1.5 border-b border-obsidian-800/50 last:border-0">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${approver.approved ? 'bg-emerald-400' : 'bg-obsidian-600'}`} />
                <span className="text-xs text-obsidian-200">{approver.name}</span>
                <span className="text-[10px] text-obsidian-500">({approver.role})</span>
              </div>
              {approver.approved ? (
                <span className="text-[10px] text-emerald-400">✓ {approver.timestamp}</span>
              ) : (
                <span className="text-[10px] text-obsidian-500">Pending</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        disabled={approvedCount < config.requiredApprovals || !description.trim()}
        className="w-full py-2.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-gold-500/20 text-gold-400 border border-gold-500/40 hover:bg-gold-500/30"
      >
        Submit {config.label} Request
      </button>
    </div>
  );
}
