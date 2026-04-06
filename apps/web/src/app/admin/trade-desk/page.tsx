import { TradeDeskQualificationDashboard } from '@/components/admin/trade-desk-qualification';
import { ConversionRailsPanel } from '@/components/admin/conversion-rails';
import { LiquidityBootstrappingPanel } from '@/components/admin/liquidity-bootstrapping';
import { HolderConcentrationMonitor } from '@/components/admin/holder-concentration-monitor';

export const metadata = { title: 'Trade Desk | Admin | SAP' };

export default function TradeDeskPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">Trade Desk Operations</h1>
        <p className="text-sm text-obsidian-400">
          Qualification scoring, stablecoin conversion rails, liquidity bootstrapping, and holder
          distribution analytics — built from real trade desk operator requirements.
        </p>
      </div>

      {/* ─── Section: Qualification ─────────────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-obsidian-100">Qualification Scoring</h2>
        <TradeDeskQualificationDashboard />
      </section>

      {/* ─── Section: Conversion Rails ─────────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-obsidian-100">Stablecoin Conversion Rails</h2>
        <ConversionRailsPanel />
      </section>

      {/* ─── Section: Holder Distribution ──────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-obsidian-100">Holder Distribution</h2>
        <HolderConcentrationMonitor />
      </section>

      {/* ─── Section: Liquidity Bootstrapping ──── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-obsidian-100">Liquidity Bootstrapping</h2>
        <LiquidityBootstrappingPanel />
      </section>
    </div>
  );
}
