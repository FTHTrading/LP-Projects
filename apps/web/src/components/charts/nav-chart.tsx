'use client';

import type { NavSnapshot } from '@sov/shared-types';

// Lightweight inline chart — Recharts imported dynamically if available,
// falls back to SVG sparkline for SSR/no-JS environments.
export function NavChart({ data }: { data: NavSnapshot[] }) {
  const values = data.map((d) => parseFloat(d.navPerToken));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const width = 800;
  const height = 200;
  const padding = { top: 10, right: 10, bottom: 30, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = values.map((v, i) => {
    const x = padding.left + (i / (values.length - 1)) * chartW;
    const y = padding.top + chartH - ((v - min) / range) * chartH;
    return `${x},${y}`;
  });

  // Y-axis ticks
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const val = min + (range * i) / 4;
    const y = padding.top + chartH - (i / 4) * chartH;
    return { val: `$${val.toFixed(2)}`, y };
  });

  // X-axis labels (first, middle, last)
  const xLabels = [0, Math.floor(data.length / 2), data.length - 1].map((i) => ({
    label: new Date(data[i].timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    x: padding.left + (i / (data.length - 1)) * chartW,
  }));

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[400px]">
        {/* Grid lines */}
        {yTicks.map((t) => (
          <line
            key={t.val}
            x1={padding.left}
            y1={t.y}
            x2={width - padding.right}
            y2={t.y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}

        {/* Y-axis labels */}
        {yTicks.map((t) => (
          <text
            key={`label-${t.val}`}
            x={padding.left - 8}
            y={t.y + 3}
            textAnchor="end"
            fill="rgba(255,255,255,0.3)"
            fontSize={10}
            fontFamily="JetBrains Mono, monospace"
          >
            {t.val}
          </text>
        ))}

        {/* X-axis labels */}
        {xLabels.map((l) => (
          <text
            key={l.label}
            x={l.x}
            y={height - 5}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize={10}
          >
            {l.label}
          </text>
        ))}

        {/* Area fill */}
        <polygon
          points={`${padding.left},${padding.top + chartH} ${points.join(' ')} ${width - padding.right},${padding.top + chartH}`}
          fill="url(#navGradient)"
        />

        {/* Line */}
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#c9850a"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(201,133,10,0.3)" />
            <stop offset="100%" stopColor="rgba(201,133,10,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
