'use client';

import { mockNavHistory, mockLiquiditySnapshots } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

export function NavVsMarketChart() {
  const data = mockNavHistory.map((snap) => {
    return {
      date: snap.timestamp,
      nav: parseFloat(snap.navPerToken),
      backing: parseFloat(snap.backingRatio),
    };
  });

  const latestSnap = mockLiquiditySnapshots[0];
  const latestMarketBid = latestSnap ? parseFloat(latestSnap.bestBid || '0') : 0;
  const latestMarketAsk = latestSnap ? parseFloat(latestSnap.bestAsk || '0') : 0;
  const latestMarketMid = (latestMarketBid + latestMarketAsk) / 2;

  const navValues = data.map((d) => d.nav);
  const minVal = Math.min(...navValues, latestMarketMid) * 0.995;
  const maxVal = Math.max(...navValues, latestMarketMid) * 1.005;
  const range = maxVal - minVal || 1;

  const width = 600;
  const height = 200;
  const padX = 50;
  const padY = 20;

  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const points = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * chartW;
    const y = padY + chartH - ((d.nav - minVal) / range) * chartH;
    return { x, y, ...d };
  });

  const navLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Market price line (constant at latest mid)
  const marketY = padY + chartH - ((latestMarketMid - minVal) / range) * chartH;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-obsidian-200">NAV vs. Market Price</h3>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1"><span className="h-0.5 w-4 bg-gold-500 inline-block" /> NAV</span>
          <span className="flex items-center gap-1"><span className="h-0.5 w-4 bg-emerald-500 inline-block border-dashed" /> Market Mid</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = padY + chartH - pct * chartH;
          const val = minVal + pct * range;
          return (
            <g key={pct}>
              <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="currentColor" className="text-obsidian-800" strokeWidth="0.5" />
              <text x={padX - 6} y={y + 3} textAnchor="end" className="fill-obsidian-500 text-[8px]">
                ${val.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* NAV line */}
        <path d={navLine} fill="none" stroke="#c9850a" strokeWidth="2" strokeLinejoin="round" />

        {/* Market mid dashed line */}
        <line
          x1={padX} y1={marketY} x2={width - padX} y2={marketY}
          stroke="#34d399" strokeWidth="1.5" strokeDasharray="6 3"
        />

        {/* Latest point dot */}
        {points.length > 0 && (
          <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill="#c9850a" />
        )}

        {/* X-axis labels */}
        {points.filter((_, i) => i % 7 === 0 || i === points.length - 1).map((p) => (
          <text key={p.date} x={p.x} y={height - 2} textAnchor="middle" className="fill-obsidian-500 text-[7px]">
            {formatDate(p.date).replace(/,?\s*\d{4}$/, '')}
          </text>
        ))}
      </svg>

      <div className="grid grid-cols-3 gap-4 text-center text-xs">
        <div>
          <p className="text-obsidian-400">Latest NAV</p>
          <p className="text-obsidian-200 font-semibold">{formatCurrency(data[data.length - 1]?.nav ?? 0)}</p>
        </div>
        <div>
          <p className="text-obsidian-400">Market Mid</p>
          <p className="text-obsidian-200 font-semibold">{formatCurrency(latestMarketMid)}</p>
        </div>
        <div>
          <p className="text-obsidian-400">Premium / Discount</p>
          <p className={`font-semibold ${latestMarketMid >= (data[data.length - 1]?.nav ?? 0) ? 'text-emerald-400' : 'text-red-400'}`}>
            {(((latestMarketMid / (data[data.length - 1]?.nav || 1)) - 1) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
