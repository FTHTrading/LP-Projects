'use client';

import { mockTreasuryAccounts } from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { TreasuryAccount } from '@sov/shared-types';

const ledgerIcons: Record<string, string> = {
  fiat: '💵',
  stablecoin: '🪙',
  token: '🔷',
  crypto: '⛓',
};

const ledgerColors: Record<string, string> = {
  fiat: 'border-emerald-500/30',
  stablecoin: 'border-sky-500/30',
  token: 'border-gold-500/30',
  crypto: 'border-violet-500/30',
};

interface TreasuryBalancesPanelProps {
  accounts?: TreasuryAccount[];
}

export function TreasuryBalancesPanel({ accounts = mockTreasuryAccounts }: TreasuryBalancesPanelProps) {
  const totalUsd = accounts.reduce((sum, a) => {
    if (a.currency === 'USD' || a.currency === 'USDC') return sum + parseFloat(a.balance);
    return sum;
  }, 0);

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-obsidian-200">Treasury Balances</h3>
        <div className="text-right">
          <p className="text-[10px] text-obsidian-400 uppercase tracking-wider">USD-Equiv Total</p>
          <p className="text-sm font-bold text-gold-400">{formatCurrency(totalUsd)}</p>
        </div>
      </div>

      <div className="grid gap-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={`border rounded-lg p-3 bg-obsidian-900/30 ${ledgerColors[account.ledgerType] || 'border-obsidian-700'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">{ledgerIcons[account.ledgerType] || '📊'}</span>
                <div>
                  <p className="text-xs font-medium text-obsidian-200">{account.name}</p>
                  {account.custodian && (
                    <p className="text-[10px] text-obsidian-500">{account.custodian}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-obsidian-100 font-mono">
                  {account.currency === 'USD' || account.currency === 'USDC'
                    ? formatCurrency(account.balance)
                    : `${formatNumber(account.balance)} ${account.currency}`}
                </p>
                <p className="text-[10px] text-obsidian-500 uppercase">{account.ledgerType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
