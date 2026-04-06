'use client';

import Link from 'next/link';
import { mockTokens } from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';

const classColor: Record<string, string> = {
  preferred: 'border-gold-500/30 text-gold-400',
  common: 'border-obsidian-500 text-obsidian-300',
  security_upgrade: 'border-violet-500/40 text-violet-400',
};

export function TokenComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-obsidian-800">
            {['Token', 'Classification', 'NAV / Unit', 'Supply', 'Backing', 'Status'].map(
              (h) => (
                <th
                  key={h}
                  className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-caps text-obsidian-400"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {mockTokens.map((token) => (
            <tr
              key={token.symbol}
              className="border-b border-obsidian-800/50 hover:bg-obsidian-800/30 transition-colors"
            >
              <td className="py-3.5 px-4">
                <Link
                  href={`/tokens/${token.symbol.toLowerCase()}`}
                  className="group flex items-center gap-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/10 text-gold-400 text-xs font-bold">
                    {token.symbol.slice(0, 2)}
                  </span>
                  <div>
                    <p className="font-semibold text-obsidian-100 group-hover:text-gold-400 transition-colors">
                      {token.symbol}
                    </p>
                    <p className="text-xs text-obsidian-400">{token.name}</p>
                  </div>
                </Link>
              </td>
              <td className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${classColor[token.classification] ?? classColor.common}`}
                >
                  {token.classification.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="py-3.5 px-4 font-mono text-obsidian-200">
                {formatCurrency(parseFloat(token.navPerToken))}
              </td>
              <td className="py-3.5 px-4 font-mono text-obsidian-300">
                {formatNumber(parseFloat(token.totalSupply))}
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-obsidian-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500/80"
                      style={{ width: `${Math.min(parseFloat(token.backingRatio) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-obsidian-300">
                    {(parseFloat(token.backingRatio) * 100).toFixed(0)}%
                  </span>
                </div>
              </td>
              <td className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                    token.status === 'active'
                      ? 'text-emerald-400'
                      : token.status === 'paused'
                        ? 'text-amber-400'
                        : 'text-obsidian-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      token.status === 'active'
                        ? 'bg-emerald-400'
                        : token.status === 'paused'
                          ? 'bg-amber-400'
                          : 'bg-obsidian-400'
                    }`}
                  />
                  {token.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
