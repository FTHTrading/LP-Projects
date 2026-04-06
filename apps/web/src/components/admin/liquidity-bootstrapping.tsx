'use client';

import { mockReferenceTokens, mockHolderConcentration, mockMpraHolderConcentration } from '@/lib/mock-data';

const stages = [
  {
    name: 'Holder Seeding',
    description: 'Distribute tokens to ≥25 unique wallet addresses through private placement or airdrops',
    metric: 'Unique Holders',
    target: '≥ 25',
    mpraValue: '4',
    svpgValue: String(mockHolderConcentration.totalHolders),
    mpraPass: false,
  },
  {
    name: 'Market Maker Onboarding',
    description: 'Engage ≥2 professional market makers with committed capital and bid/ask spread obligations',
    metric: 'Active MMs',
    target: '≥ 2',
    mpraValue: '0',
    svpgValue: '2',
    mpraPass: false,
  },
  {
    name: 'Primary DEX Pool',
    description: 'Deploy Uniswap V3 or Curve concentrated liquidity pool with ≥$500K depth',
    metric: 'TVL',
    target: '≥ $500K',
    mpraValue: '$0',
    svpgValue: '$1.65M',
    mpraPass: false,
  },
  {
    name: 'CEX Listing',
    description: 'List on ≥2 exchanges with KYC/AML integration and real orderbook depth',
    metric: 'Venues',
    target: '≥ 2',
    mpraValue: '1 (CatEx)',
    svpgValue: '3',
    mpraPass: false,
  },
  {
    name: 'Price Oracle',
    description: 'Deploy Chainlink or Pyth oracle feed backed by multi-venue TWAP',
    metric: 'Oracle Feed',
    target: 'Live',
    mpraValue: 'None',
    svpgValue: 'Active',
    mpraPass: false,
  },
  {
    name: 'Stablecoin Pair',
    description: 'Establish USDC and USDT trading pairs with real bid/ask depth',
    metric: 'Pairs',
    target: 'USDC + USDT',
    mpraValue: 'USDT only (no depth)',
    svpgValue: 'USDC + USDT',
    mpraPass: false,
  },
];

function HealthBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function LiquidityBootstrappingPanel() {
  const mpra = mockReferenceTokens.find((t) => t.symbol === 'MPRA');
  const digau = mockReferenceTokens.find((t) => t.symbol === 'DIGau');

  const svpgScore = mockHolderConcentration.totalHolders >= 25 ? 100 : (mockHolderConcentration.totalHolders / 25) * 100;
  const mpraScore = (mockMpraHolderConcentration.totalHolders / 25) * 100;

  return (
    <section className="space-y-6">
      {/* ─── Overview ──────────────────────────── */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
          Liquidity Bootstrapping Protocol
        </h3>
        <p className="mt-2 text-sm text-neutral-400">
          Systematic pathway from token issuance to institutional-grade liquidity. Each stage
          addresses specific failure modes observed in MPRA (4 holders, synthetic pricing) and DIGau
          (zero liquidity, no conversion path).
        </p>
      </div>

      {/* ─── Stage Pipeline ────────────────────── */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          6-Stage Liquidity Pipeline
        </h3>
        <div className="space-y-3">
          {stages.map((s, i) => (
            <div key={s.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <span className="text-xs text-neutral-400">
                      Target: <span className="text-amber-400">{s.target}</span>
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">{s.description}</p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded border border-red-500/20 bg-red-500/5 px-3 py-2">
                      <p className="text-red-400">MPRA (Before)</p>
                      <p className="mt-0.5 font-mono text-white">{s.mpraValue}</p>
                    </div>
                    <div className="rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                      <p className="text-emerald-400">SVPG (Platform)</p>
                      <p className="mt-0.5 font-mono text-white">{s.svpgValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Competitive Readiness Comparison ─── */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Liquidity Health: Platform vs Reference Tokens
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              name: 'SVPG (Our Platform)',
              score: Math.round(svpgScore),
              holders: mockHolderConcentration.totalHolders,
              gini: mockHolderConcentration.giniCoefficient,
              color: 'bg-emerald-500',
            },
            {
              name: 'MPRA (Maya Preferred)',
              score: Math.round(mpraScore),
              holders: mpra?.holderCount ?? 4,
              gini: mockMpraHolderConcentration.giniCoefficient,
              color: 'bg-red-500',
            },
            {
              name: 'DIGau (Dignity Gold)',
              score: 0,
              holders: digau?.holderCount ?? 0,
              gini: 1.0,
              color: 'bg-red-500',
            },
          ].map((t) => (
            <div key={t.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <div className="mt-3 space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Holder Score</span>
                    <span>{t.score}%</span>
                  </div>
                  <HealthBar value={t.score} max={100} color={t.color} />
                </div>
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Holders</span>
                  <span className="text-white">{t.holders || 'Unknown'}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Gini</span>
                  <span className={t.gini > 0.8 ? 'text-red-400' : 'text-amber-400'}>
                    {t.gini.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Zero-Liquidity Warning ────────────── */}
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
          Competitive Intelligence: Zero-Liquidity Trap
        </p>
        <p className="mt-2 text-sm text-neutral-300">
          DIGau (Dignity Gold) has <strong className="text-red-400">zero DEX liquidity</strong>,{' '}
          <strong className="text-red-400">zero CEX orderbook</strong>, and{' '}
          <strong className="text-red-400">no conversion path</strong> to stablecoin. It cannot
          reach trade desk minimum requirements ($10M USDT settlement). This platform&rsquo;s
          bootstrapping protocol prevents this by requiring liquidity milestones at each issuance
          stage.
        </p>
      </div>
    </section>
  );
}
