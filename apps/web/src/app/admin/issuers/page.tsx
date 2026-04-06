import { IssuerOnboardingIntake } from '@/components/admin/issuer-onboarding-intake';
import { FundingReadinessDashboard } from '@/components/admin/funding-readiness-dashboard';

export const metadata = { title: 'Issuers | Admin | SAP' };

export default function IssuersPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">Issuer Onboarding & Funding</h1>
        <p className="text-sm text-obsidian-400">
          Pipeline management for external issuers (MPRA, DIGau, and future applicants).
          Track remediation progress, qualification gating, and funding channel readiness
          from intake through trade desk activation.
        </p>
      </div>

      {/* ─── Section: Funding Readiness ───────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-obsidian-100">Funding Readiness Overview</h2>
        <FundingReadinessDashboard />
      </section>

      {/* ─── Section: Onboarding Pipeline ───────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-obsidian-100">Issuer Pipeline</h2>
        <IssuerOnboardingIntake />
      </section>
    </div>
  );
}
