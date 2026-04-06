'use client';

import type { AnomalyEvent } from '@sov/shared-types';
import { mockAnomalies } from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

const severityStyles: Record<string, { bg: string; text: string; border: string }> = {
  info: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' },
  warning: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  high: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
};

const recommendedActions: Record<string, string> = {
  price_deviation: 'Review venue quotes. If persistent (>30 min), consider suspending venue or adjusting spread policy.',
  volume_spike: 'Check for wash trading or coordinated activity. Verify no unusual wallet patterns.',
  spread_widening: 'Monitor liquidity depth. Consider increasing market-maker inventory allocation.',
  stale_quote: 'Check adapter health. If venue API is degraded, initiate failover.',
};

interface PricingAnomalyDetectorPanelProps {
  anomalies?: AnomalyEvent[];
}

export function PricingAnomalyDetectorPanel({
  anomalies = mockAnomalies,
}: PricingAnomalyDetectorPanelProps) {
  if (anomalies.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-sm text-emerald-400 font-medium">✓ No anomalies detected</p>
        <p className="text-xs text-obsidian-400 mt-1">All venues operating within normal parameters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {anomalies.map((anomaly) => {
        const style = severityStyles[anomaly.severity] || severityStyles.info;
        const action = recommendedActions[anomaly.anomalyType] || 'Investigate and monitor.';

        return (
          <div key={anomaly.id} className={`border rounded-lg ${style.bg} ${style.border} p-4`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${style.text} ${style.bg}`}>
                    {anomaly.severity}
                  </span>
                  <span className="text-[10px] text-obsidian-400 font-mono uppercase">
                    {anomaly.anomalyType.replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-sm text-obsidian-200 font-medium mt-1.5">{anomaly.description}</p>

                <div className="flex items-center gap-4 mt-2 text-[10px] text-obsidian-400">
                  <span>Venue: {anomaly.venueName}</span>
                  <span>Token: {anomaly.tokenSymbol}</span>
                  <span>{formatDateTime(anomaly.createdAt)}</span>
                </div>

                <div className="mt-3 p-2 rounded bg-obsidian-900/50">
                  <p className="text-[10px] text-obsidian-400 font-medium uppercase tracking-wider mb-1">Recommended Action</p>
                  <p className="text-xs text-obsidian-300">{action}</p>
                </div>
              </div>

              <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded ${anomaly.acknowledged ? 'bg-obsidian-700 text-obsidian-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {anomaly.acknowledged ? 'Ack' : 'New'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
