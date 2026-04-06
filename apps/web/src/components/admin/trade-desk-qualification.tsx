'use client';

import { mockTradeDeskQualification, mockReferenceTokens } from '@/lib/mock-data';
import type { TradeDeskGateStatus } from '@sov/shared-types';

const gateStatusStyles: Record<TradeDeskGateStatus, { bg: string; text: string; label: string }> = {
  pass: { bg: 'bg-emerald-400/10', text: 'text-emerald-400', label: 'PASS' },
  fail: { bg: 'bg-rose-400/10', text: 'text-rose-400', label: 'FAIL' },
  pending: { bg: 'bg-amber-400/10', text: 'text-amber-400', label: 'PENDING' },
  waived: { bg: 'bg-obsidian-600/30', text: 'text-obsidian-400', label: 'WAIVED' },
};

export function TradeDeskQualificationDashboard() {
  const qual = mockTradeDeskQualification;
  const statusColor =
    qual.status === 'qualified' ? 'text-emerald-400' :
    qual.status === 'conditional' ? 'text-amber-400' : 'text-rose-400';
  const statusBg =
    qual.status === 'qualified' ? 'bg-emerald-400/10' :
    qual.status === 'conditional' ? 'bg-amber-400/10' : 'bg-rose-400/10';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1">Trade Desk Qualification</h2>
        <p className="text-sm text-obsidian-400">
          Real-time readiness scoring for institutional trade desk onboarding.
          Minimum score: 85 (qualified), 60–84 (conditional), below 60 (not qualified).
        </p>
      </div>

      {/* Score Overview */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1a1e" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={qual.score >= 85 ? '#34d399' : qual.score >= 60 ? '#fbbf24' : '#f87171'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(qual.score / 100) * 264} 264`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold font-mono">
                {qual.score}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold">{qual.tokenSymbol} Qualification Score</h3>
              <span className={`text-[10px] uppercase tracking-caps px-2 py-0.5 rounded-full font-mono ${statusBg} ${statusColor}`}>
                {qual.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="text-right text-xs text-obsidian-400">
            <p>Assessed: {new Date(qual.assessedAt).toLocaleDateString()}</p>
            {qual.nextReviewDate && <p>Next review: {new Date(qual.nextReviewDate).toLocaleDateString()}</p>}
          </div>
        </div>

        {/* Gates */}
        <div className="space-y-2">
          {qual.gates.map((gate) => {
            const style = gateStatusStyles[gate.status];
            return (
              <div key={gate.id} className="flex items-center gap-3 p-3 border border-obsidian-700/40 rounded-lg">
                <span className={`text-[9px] uppercase tracking-caps px-2 py-0.5 rounded font-mono min-w-[52px] text-center ${style.bg} ${style.text}`}>
                  {style.label}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-obsidian-200">{gate.name}</p>
                  <p className="text-[10px] text-obsidian-500">{gate.description}</p>
                </div>
                <div className="text-right text-[10px] whitespace-nowrap">
                  <p className="text-obsidian-200 font-mono">{gate.value || '—'}</p>
                  <p className="text-obsidian-500">req: {gate.threshold || '—'}</p>
                </div>
                <div className="w-8 text-right text-[10px] text-obsidian-500 font-mono">{gate.weight}pt</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitive Reference */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-obsidian-200 mb-3">Competitive Reference — Why These Tokens Fail</h3>
        <div className="space-y-3">
          {mockReferenceTokens.map((token) => (
            <div key={token.symbol} className="p-4 border border-obsidian-700/40 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-semibold text-obsidian-100">{token.symbol}</span>
                  <span className="text-xs text-obsidian-400 ml-2">{token.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-obsidian-400">Liquidity: {token.liquidityScore}/100</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-400/10 text-rose-400 font-mono uppercase">
                    Not Qualified
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-2 text-[10px] text-obsidian-400 mb-2">
                <p>Issuer: {token.issuer}</p>
                <p>24h Vol: {token.volume24h || '0'} {token.symbol}</p>
                <p>Holders: {token.holderCount ?? 'Unknown'}</p>
              </div>
              <ul className="space-y-1">
                {token.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[10px] text-rose-300">
                    <span className="text-rose-500 mt-0.5">&#x2717;</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Operator Feedback */}
      <div className="glass-card p-5 border-l-2 border-gold-500">
        <h3 className="text-sm font-semibold text-gold-400 mb-2">Trade Desk Operator Intelligence</h3>
        <blockquote className="text-xs text-obsidian-300 italic space-y-2">
          <p>
            &ldquo;Both these tokens as is are not going to cut it on either of my trade desks.
            The Maya has some decent volume, but price as well as it is only held by 4 entities will not cut it.&rdquo;
          </p>
          <p>
            &ldquo;If they want to get on trade, their best bet is to convert some to USDT ERC20 or TRC 20 or BTC,
            but STABLE Coins yield the best because they are pegged 1:1 to the USD.&rdquo;
          </p>
          <p>
            &ldquo;The Dignity coin has no liquidity at all — if they can swap or convert per above,
            open that Exodus wallet, do just the MIN. of $10M, they will be up on trade in 24 hours.&rdquo;
          </p>
        </blockquote>
        <p className="text-[10px] text-obsidian-500 mt-2">— Trade Desk Operator, 2026-04-06</p>
      </div>
    </div>
  );
}
