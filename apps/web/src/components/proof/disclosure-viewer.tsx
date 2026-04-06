'use client';

import { useState } from 'react';

interface DisclosureSection {
  id: string;
  title: string;
  severity: 'info' | 'warning' | 'critical';
  content: string;
  lastUpdated: string;
}

const severityStyles: Record<string, { bg: string; text: string; icon: string }> = {
  info: { bg: 'bg-sky-500/10 border-sky-500/30', text: 'text-sky-400', icon: 'ℹ' },
  warning: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', icon: '⚠' },
  critical: { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', icon: '⛔' },
};

const defaultSections: DisclosureSection[] = [
  { id: 'd1', title: 'Market Risk Disclosure', severity: 'warning', content: 'Token prices may fluctuate significantly. Past NAV performance does not guarantee future results. Market price may trade at a premium or discount to NAV depending on supply, demand, and liquidity conditions. Investors should be prepared for potential loss of principal.', lastUpdated: '2026-03-01' },
  { id: 'd2', title: 'Custody & Counterparty Risk', severity: 'warning', content: 'Reserve assets are held by third-party custodians. While custodians are vetted and insured, the issuer does not guarantee against custodian failure, fraud, or insolvency. Multi-custodian strategy and insurance mitigate but do not eliminate this risk.', lastUpdated: '2026-03-01' },
  { id: 'd3', title: 'Regulatory & Compliance Notice', severity: 'critical', content: 'Tokens are offered under applicable securities exemptions (Reg D / Reg S). These tokens have NOT been registered with the SEC or any other regulatory body. Transfer restrictions apply. Tokens may only be held and transferred by verified, whitelisted participants in permitted jurisdictions.', lastUpdated: '2026-03-15' },
  { id: 'd4', title: 'Liquidity Limitations', severity: 'info', content: 'Secondary market liquidity is not guaranteed. The issuer maintains market-making arrangements on approved venues but does not guarantee execution at NAV. Redemptions are processed in queue order with configurable settlement windows (typically T+3 business days).', lastUpdated: '2026-02-15' },
  { id: 'd5', title: 'Attestation Methodology', severity: 'info', content: 'Reserve attestations follow a 3-tier model: Tier 1 (daily automated), Tier 2 (monthly custodian-signed), Tier 3 (quarterly independent audit). Attestation hashes are anchored on-chain for tamper evidence. Self-reported and unverified assets are clearly labeled.', lastUpdated: '2026-03-01' },
];

export function DisclosureViewer({ sections = defaultSections }: { sections?: DisclosureSection[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const style = severityStyles[section.severity];
        const isOpen = expandedId === section.id;

        return (
          <div key={section.id} className={`border rounded-lg ${style.bg}`}>
            <button
              onClick={() => setExpandedId(isOpen ? null : section.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`text-lg ${style.text}`}>{style.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-obsidian-200">{section.title}</p>
                  <p className="text-[10px] text-obsidian-400 mt-0.5">
                    Updated {section.lastUpdated}
                  </p>
                </div>
              </div>
              <svg
                className={`h-4 w-4 text-obsidian-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pl-11">
                <p className="text-xs text-obsidian-300 leading-relaxed">{section.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
