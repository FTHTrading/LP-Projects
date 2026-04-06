import { mockTreasuryAccounts } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export const metadata = { title: 'Treasury | Admin' };

export default function TreasuryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Treasury & Custody</h1>
        <p className="text-sm text-obsidian-400">
          Multi-ledger treasury management with fiat, stablecoin, token, and crypto accounts.
          All movements require multi-sig approval above threshold.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockTreasuryAccounts.map((acct) => (
          <div key={acct.id} className="glass-card p-5">
            <p className="text-xs text-obsidian-400 mb-2">{acct.name}</p>
            <p className="text-2xl font-bold font-mono text-obsidian-50">
              {acct.currency === 'ETH' ? `${acct.balance} ETH` : acct.currency === 'SVPG' ? `${parseInt(acct.balance).toLocaleString()} SVPG` : formatCurrency(parseFloat(acct.balance))}
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px]">
              <span className="text-obsidian-400">{acct.custodian}</span>
              <span className="uppercase tracking-caps text-obsidian-400">{acct.ledgerType}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Treasury Controls</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Movement Approval', desc: 'Transfers >$100,000 require 2-of-3 admin approval. All movements logged immutably.' },
            { title: 'Segregation', desc: 'Operating funds, reserve custody, and token treasury maintained in separate accounts.' },
            { title: 'Reconciliation', desc: 'Automated daily reconciliation between ledger records and custodian statements.' },
            { title: 'Settlement', desc: 'Primary issuance proceeds settled to reserve custody within T+1.' },
          ].map((item) => (
            <div key={item.title} className="p-4 border border-obsidian-700/50 rounded-lg">
              <h3 className="text-sm font-semibold text-gold-400 mb-1">{item.title}</h3>
              <p className="text-xs text-obsidian-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
