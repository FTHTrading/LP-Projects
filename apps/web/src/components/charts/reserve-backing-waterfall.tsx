'use client';

import { mockReserveSummary, mockTokens } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const barColors: Record<string, string> = {
  gold: 'bg-gold-500',
  silver: 'bg-obsidian-400',
  cash: 'bg-emerald-500',
  real_estate: 'bg-sky-500',
  treasury_bill: 'bg-violet-500',
  platinum: 'bg-obsidian-300',
  commodity: 'bg-amber-600',
  other: 'bg-obsidian-600',
};

export function ReserveBackingWaterfall() {
  const reserve = mockReserveSummary;
  const totalReserve = parseFloat(reserve.totalValue);
  const totalLiabilities = parseFloat(reserve.totalLiabilities);
  const netReserve = parseFloat(reserve.netValue);
  const totalTokenValue = mockTokens.reduce((sum, t) => {
    return sum + parseFloat(t.navPerToken) * parseFloat(t.totalSupply);
  }, 0);
  const backingRatio = totalTokenValue > 0 ? (netReserve / totalTokenValue) : 0;

  return (
    <div className="glass-card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-obsidian-200">Reserve Backing Waterfall</h3>
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${backingRatio >= 1 ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
          {(backingRatio * 100).toFixed(1)}% backed
        </span>
      </div>

      {/* Stacked bar */}
      <div>
        <div className="flex h-6 rounded-full overflow-hidden bg-obsidian-800">
          {reserve.assetBreakdown.map((asset) => (
            <div
              key={asset.assetClass}
              className={`${barColors[asset.assetClass] || 'bg-obsidian-600'} transition-all`}
              style={{ width: `${asset.pct}%` }}
              title={`${asset.assetClass.replace(/_/g, ' ')}: ${asset.pct}%`}
            />
          ))}
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3">
          {reserve.assetBreakdown.map((asset) => (
            <div key={asset.assetClass} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${barColors[asset.assetClass] || 'bg-obsidian-600'}`} />
              <span className="text-[10px] text-obsidian-400 capitalize">{asset.assetClass.replace(/_/g, ' ')} ({asset.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Waterfall breakdown */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="stat-value text-obsidian-50">{formatCurrency(totalReserve)}</p>
          <p className="stat-label">Gross Reserve</p>
        </div>
        <div>
          <p className="stat-value text-red-400">– {formatCurrency(totalLiabilities)}</p>
          <p className="stat-label">Liabilities</p>
        </div>
        <div>
          <p className="stat-value text-gold-400">{formatCurrency(netReserve)}</p>
          <p className="stat-label">Net Reserve (Backing)</p>
        </div>
      </div>

      <div className="border-t border-obsidian-800 pt-3 text-center">
        <p className="stat-value text-obsidian-200">{formatCurrency(totalTokenValue)}</p>
        <p className="stat-label">Total Token Value at NAV</p>
      </div>
    </div>
  );
}
