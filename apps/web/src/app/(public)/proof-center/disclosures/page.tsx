import Link from 'next/link';

export const metadata = {
  title: 'Disclosures | Proof Center',
  description: 'Risk disclosures, legal structure, offering terms, and limitations — first-class content.',
};

const disclosures = [
  {
    category: 'Risk Disclosures',
    items: [
      { title: 'General Investment Risk Disclosure', summary: 'Token investments involve risk including possible loss of principal. Market value may fluctuate and tokens may trade at a premium or discount to NAV.', severity: 'high' },
      { title: 'Liquidity Risk', summary: 'Secondary market liquidity is not guaranteed. Tokens may be illiquid and subject to trading halts, venue suspensions, or circuit breakers.', severity: 'high' },
      { title: 'Counterparty Risk', summary: 'Reserve custody, valuation, and attestation depend on third-party service providers. Failure of any provider could affect asset recovery.', severity: 'medium' },
      { title: 'Regulatory Risk', summary: 'Digital securities are subject to evolving regulation. Changes in securities law, AML requirements, or tax treatment could affect token utility and value.', severity: 'medium' },
      { title: 'Technology Risk', summary: 'Smart contract vulnerabilities, blockchain forks, private key loss, and infrastructure outages present operational risk.', severity: 'medium' },
    ],
  },
  {
    category: 'Legal Structure',
    items: [
      { title: 'Issuer Entity', summary: 'Sovereign Assets Inc., a Delaware corporation registered as an issuer of digital securities.', severity: 'info' },
      { title: 'Offering Framework', summary: 'Tokens are offered under Regulation D Rule 506(c) exemption. Available to accredited investors in permitted jurisdictions.', severity: 'info' },
      { title: 'Transfer Agent', summary: 'Token transfers are recorded by a registered transfer agent and enforced through ERC-3643 permissioned transfer controls.', severity: 'info' },
      { title: 'Governing Law', summary: 'Token terms, subscription agreements, and dispute resolution are governed by the laws of the State of Delaware.', severity: 'info' },
    ],
  },
  {
    category: 'Operational Disclosures',
    items: [
      { title: 'NAV Methodology', summary: 'NAV is computed daily using last-available pricing from LBMA (metals), custodian statements (cash), and independent appraisals (real estate). Staleness thresholds defined per asset class.', severity: 'info' },
      { title: 'Fee Structure', summary: 'Management fee: 1.5% annually on NAV. Redemption fee: 0.25% on early redemption. No upfront sales charge for direct subscriptions.', severity: 'info' },
      { title: 'Conflict of Interest', summary: 'The issuer may hold treasury positions in its own tokens. Market-making activity is conducted through segregated accounts with Chinese wall controls.', severity: 'medium' },
    ],
  },
];

const severityColor: Record<string, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-500',
  info: 'border-l-obsidian-500',
};

export default function DisclosuresPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-obsidian-400 mb-8">
        <Link href="/proof-center" className="hover:text-obsidian-200 transition-colors">Proof Center</Link>
        <span>/</span>
        <span className="text-obsidian-200">Disclosures</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Disclosures & Risk Factors</h1>
        <p className="text-obsidian-300 max-w-2xl text-sm leading-relaxed">
          Risks, legal structure, offering terms, and operational limitations are first-class content — not
          buried footnotes. A credible issuer makes the risks as visible as the opportunity.
        </p>
      </div>

      {disclosures.map((section) => (
        <div key={section.category} className="mb-10">
          <h2 className="text-lg font-semibold mb-4">{section.category}</h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div
                key={item.title}
                className={`glass-card p-5 border-l-4 ${severityColor[item.severity] ?? severityColor.info}`}
              >
                <h3 className="text-sm font-semibold text-obsidian-100 mb-2">{item.title}</h3>
                <p className="text-xs text-obsidian-300 leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Downloadable documents */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Downloadable Documents</h2>
        <p className="text-sm text-obsidian-300 mb-4">
          Full disclosure documents are available to registered investors. Public summaries are provided above.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'Private Placement Memorandum (PPM)',
            'Subscription Agreement Template',
            'Risk Disclosure Statement',
            'Reserve Attestation Methodology',
            'Transfer Restriction Policy',
            'Fee Schedule',
          ].map((doc) => (
            <div
              key={doc}
              className="flex items-center justify-between py-2.5 px-3 border border-obsidian-700/50 rounded-lg text-sm"
            >
              <span className="text-obsidian-200">{doc}</span>
              <span className="text-[10px] text-obsidian-400 uppercase tracking-caps">Investor Access Required</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
