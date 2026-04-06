'use client';

import { formatCurrency, formatDateTime } from '@/lib/utils';

type IssuanceStatus = 'completed' | 'pending_approval' | 'processing' | 'rejected';
type Direction = 'issuance' | 'redemption';

interface IssuanceRedemptionRecord {
  id: string;
  direction: Direction;
  tokenSymbol: string;
  amount: string;
  navAtExecution: string;
  totalValue: string;
  status: IssuanceStatus;
  requestedAt: string;
  investorId?: string;
}

const statusStyles: Record<IssuanceStatus, string> = {
  completed: 'bg-emerald-400/10 text-emerald-400',
  pending_approval: 'bg-amber-400/10 text-amber-400',
  processing: 'bg-sky-400/10 text-sky-400',
  rejected: 'bg-red-400/10 text-red-400',
};

const directionStyles: Record<Direction, string> = {
  issuance: 'text-emerald-400',
  redemption: 'text-red-400',
};

const mockRecords: IssuanceRedemptionRecord[] = [
  { id: 'ir1', direction: 'issuance', tokenSymbol: 'SVPG', amount: '500000', navAtExecution: '48.75', totalValue: '24375000', status: 'completed', requestedAt: new Date(Date.now() - 300000).toISOString(), investorId: 'inv-001' },
  { id: 'ir2', direction: 'redemption', tokenSymbol: 'SVPG', amount: '25000', navAtExecution: '48.80', totalValue: '1220000', status: 'pending_approval', requestedAt: new Date(Date.now() - 600000).toISOString(), investorId: 'inv-234' },
  { id: 'ir3', direction: 'issuance', tokenSymbol: 'SVCS', amount: '1000000', navAtExecution: '12.30', totalValue: '12300000', status: 'processing', requestedAt: new Date(Date.now() - 1200000).toISOString() },
  { id: 'ir4', direction: 'redemption', tokenSymbol: 'SVSG', amount: '10000', navAtExecution: '50.00', totalValue: '500000', status: 'completed', requestedAt: new Date(Date.now() - 3600000).toISOString(), investorId: 'inv-102' },
  { id: 'ir5', direction: 'redemption', tokenSymbol: 'SVPG', amount: '50000', navAtExecution: '48.60', totalValue: '2430000', status: 'rejected', requestedAt: new Date(Date.now() - 7200000).toISOString(), investorId: 'inv-088' },
];

interface IssuanceRedemptionTrackerProps {
  records?: IssuanceRedemptionRecord[];
}

export function IssuanceRedemptionTracker({ records = mockRecords }: IssuanceRedemptionTrackerProps) {
  const totalIssuance = records.filter(r => r.direction === 'issuance' && r.status === 'completed').reduce((s, r) => s + parseFloat(r.totalValue), 0);
  const totalRedemption = records.filter(r => r.direction === 'redemption' && r.status === 'completed').reduce((s, r) => s + parseFloat(r.totalValue), 0);
  const pendingCount = records.filter(r => r.status === 'pending_approval' || r.status === 'processing').length;

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-obsidian-800">
        <h3 className="text-sm font-semibold text-obsidian-200">Issuance & Redemption Tracker</h3>
        <div className="flex gap-6 mt-2 text-xs">
          <span className="text-emerald-400">Issued: {formatCurrency(totalIssuance)}</span>
          <span className="text-red-400">Redeemed: {formatCurrency(totalRedemption)}</span>
          <span className="text-amber-400">{pendingCount} pending</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-obsidian-800 text-obsidian-400">
              <th className="text-left px-4 py-2.5 font-medium">Direction</th>
              <th className="text-left px-4 py-2.5 font-medium">Token</th>
              <th className="text-right px-4 py-2.5 font-medium">Amount</th>
              <th className="text-right px-4 py-2.5 font-medium">NAV</th>
              <th className="text-right px-4 py-2.5 font-medium">Value</th>
              <th className="text-left px-4 py-2.5 font-medium">Status</th>
              <th className="text-left px-4 py-2.5 font-medium">Requested</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-obsidian-800/50 hover:bg-obsidian-900/50">
                <td className="px-4 py-2.5">
                  <span className={`font-semibold uppercase ${directionStyles[record.direction]}`}>
                    {record.direction === 'issuance' ? '▲ Mint' : '▼ Burn'}
                  </span>
                </td>
                <td className="px-4 py-2.5 font-mono text-obsidian-200">{record.tokenSymbol}</td>
                <td className="px-4 py-2.5 text-right font-mono text-obsidian-200">
                  {parseFloat(record.amount).toLocaleString()}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-obsidian-300">
                  {formatCurrency(record.navAtExecution)}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-obsidian-200 font-semibold">
                  {formatCurrency(record.totalValue)}
                </td>
                <td className="px-4 py-2.5">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${statusStyles[record.status]}`}>
                    {record.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-obsidian-400 whitespace-nowrap">
                  {formatDateTime(record.requestedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
