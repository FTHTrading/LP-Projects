'use client';

import { formatCurrency, formatPercent } from '@/lib/utils';
import { mockReserveSummary } from '@/lib/mock-data';

export function ReserveStatCards() {
  const data = mockReserveSummary;
  const totalVal = parseFloat(data.totalValue);
  const netVal = parseFloat(data.netValue);
  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Reserve Value" value={formatCurrency(totalVal)} />
        <StatCard label="Net Reserve Value" value={formatCurrency(netVal)} />
        <StatCard label="Attested %" value={formatPercent(data.attestedPct / 100)} highlight />
        <StatCard
          label="Self Reported / Unverified"
          value={`${data.selfReportedPct}% / ${data.unverifiedPct}%`}
          subtext="Subject to further verification"
        />
      </div>

      {/* Breakdown by class */}
      <div className="glass-card p-5">
        <h4 className="text-sm font-semibold text-obsidian-200 mb-4">Reserve Composition</h4>
        <div className="space-y-3">
          {data.assetBreakdown.map((cls) => (
            <div key={cls.assetClass} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-obsidian-200 font-medium capitalize">
                  {cls.assetClass.replace(/_/g, ' ')}
                </span>
                <span className="text-obsidian-300">{formatCurrency(parseFloat(cls.value))}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-obsidian-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gold-500/80 transition-all"
                  style={{ width: `${cls.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtext,
  highlight,
}: {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}) {
  return (
    <div className="glass-card p-4">
      <p className={`stat-value ${highlight ? 'text-gold-400' : 'text-obsidian-50'}`}>
        {value}
      </p>
      <p className="stat-label">{label}</p>
      {subtext && <p className="text-[10px] text-obsidian-400 mt-0.5">{subtext}</p>}
    </div>
  );
}
