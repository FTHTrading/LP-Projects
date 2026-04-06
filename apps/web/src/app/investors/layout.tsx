'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const investorNav = [
  { href: '/investors', label: 'Dashboard', icon: '◻' },
  { href: '/investors/holdings', label: 'Holdings', icon: '◈' },
  { href: '/investors/documents', label: 'Documents', icon: '◇' },
  { href: '/investors/redemptions', label: 'Redemptions', icon: '◆' },
  { href: '/investors/settings', label: 'Settings', icon: '⚙' },
];

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-obsidian-950 text-obsidian-100 flex">
      {/* Side nav */}
      <aside className="w-64 border-r border-obsidian-800/50 bg-obsidian-950/80 backdrop-blur-sm flex flex-col">
        <div className="p-6 border-b border-obsidian-800/50">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold gold-text">Sovereign</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-gold-500/20 text-gold-400 rounded font-mono tracking-wider">INVESTOR</span>
          </Link>
        </div>

        <nav className="flex-1 py-4">
          {investorNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-2.5 text-sm transition ${
                  active
                    ? 'text-gold-400 bg-gold-500/10 border-r-2 border-gold-500'
                    : 'text-obsidian-400 hover:text-obsidian-200 hover:bg-obsidian-800/30'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-obsidian-800/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-xs text-gold-400 font-bold">AC</div>
            <div>
              <p className="text-xs font-semibold">Apex Capital</p>
              <p className="text-[10px] text-obsidian-400">Accredited Investor</p>
            </div>
          </div>
          <Link href="/" className="text-[10px] text-obsidian-400 hover:text-gold-400 transition">
            ← Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
