'use client';

export function LegalStructureDiagram() {
  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-sm font-semibold text-obsidian-200">Issuer Legal Structure</h3>
      <p className="text-[10px] text-obsidian-500">
        Simplified overview of the SPV structure, custody relationships, and token issuance flow.
      </p>

      <svg viewBox="0 0 800 440" className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect width="800" height="440" rx="8" fill="#0a0a0c" />

        {/* Top: Issuer SPV */}
        <rect x="280" y="20" width="240" height="60" rx="6" fill="#1a1a1e" stroke="#c9850a" strokeWidth="1.5" />
        <text x="400" y="48" textAnchor="middle" className="fill-gold-400 text-[13px] font-semibold">Sovereign Assets LLC</text>
        <text x="400" y="64" textAnchor="middle" className="fill-obsidian-500 text-[10px]">Issuer SPV (Delaware)</text>

        {/* Left: Reserve Custodians */}
        <rect x="40" y="140" width="200" height="50" rx="6" fill="#1a1a1e" stroke="#34d399" strokeWidth="1" />
        <text x="140" y="163" textAnchor="middle" className="fill-emerald-400 text-[11px] font-medium">Reserve Custodians</text>
        <text x="140" y="178" textAnchor="middle" className="fill-obsidian-500 text-[9px]">Brinks · Loomis · Fireblocks</text>

        {/* Center: Smart Contracts */}
        <rect x="280" y="140" width="240" height="50" rx="6" fill="#1a1a1e" stroke="#c9850a" strokeWidth="1" />
        <text x="400" y="163" textAnchor="middle" className="fill-gold-400 text-[11px] font-medium">Token Contracts (ERC-3643)</text>
        <text x="400" y="178" textAnchor="middle" className="fill-obsidian-500 text-[9px]">Identity Registry · Compliance Module</text>

        {/* Right: Compliance */}
        <rect x="560" y="140" width="200" height="50" rx="6" fill="#1a1a1e" stroke="#38bdf8" strokeWidth="1" />
        <text x="660" y="163" textAnchor="middle" className="fill-sky-400 text-[11px] font-medium">Compliance Engine</text>
        <text x="660" y="178" textAnchor="middle" className="fill-obsidian-500 text-[9px]">KYC · AML · Accreditation</text>

        {/* Row 3: Treasury / Attestation / Liquidity */}
        <rect x="40" y="250" width="200" height="50" rx="6" fill="#1a1a1e" stroke="#a78bfa" strokeWidth="1" />
        <text x="140" y="273" textAnchor="middle" className="fill-violet-400 text-[11px] font-medium">Treasury Operations</text>
        <text x="140" y="288" textAnchor="middle" className="fill-obsidian-500 text-[9px]">Segregated Accounts · Settlement</text>

        <rect x="280" y="250" width="240" height="50" rx="6" fill="#1a1a1e" stroke="#f59e0b" strokeWidth="1" />
        <text x="400" y="273" textAnchor="middle" className="fill-amber-400 text-[11px] font-medium">3-Tier Attestation</text>
        <text x="400" y="288" textAnchor="middle" className="fill-obsidian-500 text-[9px]">Automated · Custodian · Independent Audit</text>

        <rect x="560" y="250" width="200" height="50" rx="6" fill="#1a1a1e" stroke="#ec4899" strokeWidth="1" />
        <text x="660" y="273" textAnchor="middle" className="fill-pink-400 text-[11px] font-medium">Liquidity Venues</text>
        <text x="660" y="288" textAnchor="middle" className="fill-obsidian-500 text-[9px]">CEX · DEX · OTC Desks</text>

        {/* Bottom: Investors */}
        <rect x="200" y="370" width="400" height="50" rx="6" fill="#1a1a1e" stroke="#64748b" strokeWidth="1" />
        <text x="400" y="393" textAnchor="middle" className="fill-obsidian-300 text-[11px] font-medium">Accredited Investors & Qualified Purchasers</text>
        <text x="400" y="408" textAnchor="middle" className="fill-obsidian-500 text-[9px]">Whitelisted Wallets · KYC Verified · Reg D / Reg S</text>

        {/* Arrows — Issuer to components */}
        <line x1="300" y1="80" x2="140" y2="140" stroke="#444" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="400" y1="80" x2="400" y2="140" stroke="#444" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="500" y1="80" x2="660" y2="140" stroke="#444" strokeWidth="1" markerEnd="url(#arrowhead)" />

        {/* Row 2 to Row 3 */}
        <line x1="140" y1="190" x2="140" y2="250" stroke="#333" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="400" y1="190" x2="400" y2="250" stroke="#333" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="660" y1="190" x2="660" y2="250" stroke="#333" strokeWidth="1" markerEnd="url(#arrowhead)" />

        {/* Row 3 to Investors */}
        <line x1="140" y1="300" x2="300" y2="370" stroke="#333" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="400" y1="300" x2="400" y2="370" stroke="#333" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="660" y1="300" x2="500" y2="370" stroke="#333" strokeWidth="1" markerEnd="url(#arrowhead)" />

        {/* Cross connections */}
        <line x1="240" y1="165" x2="280" y2="165" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="520" y1="165" x2="560" y2="165" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />

        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#555" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
