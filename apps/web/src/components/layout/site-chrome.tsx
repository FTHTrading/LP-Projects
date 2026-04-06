'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const publicNav = [
  { label: 'Overview', href: '/' },
  { label: 'Tokens', href: '/tokens' },
  { label: 'Proof Center', href: '/proof-center' },
  { label: 'Liquidity', href: '/liquidity' },
  { label: 'Market Structure', href: '/market-structure' },
  { label: 'Newsroom', href: '/newsroom' },
];

const secondaryNav = [
  { label: 'About', href: '/about' },
  { label: 'Legal', href: '/legal' },
  { label: 'Risk', href: '/risk' },
  { label: 'Contact', href: '/contact' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-obsidian-700/50 bg-obsidian-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-500 to-gold-700">
            <span className="text-sm font-bold text-obsidian-950">SA</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Sovereign <span className="gold-text">Assets</span>
          </span>
        </Link>

        {/* Primary Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                pathname === item.href
                  ? 'text-gold-400 bg-gold-500/10'
                  : 'text-obsidian-200 hover:text-obsidian-50 hover:bg-obsidian-800'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/investors/onboarding"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-gold-500 text-obsidian-950 hover:bg-gold-400 transition-colors"
          >
            Investor Access
          </Link>
          <Link
            href="/issuer/admin"
            className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium text-obsidian-300 border border-obsidian-600 rounded-lg hover:text-obsidian-50 hover:border-obsidian-400 transition-colors"
          >
            Issuer Portal
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-obsidian-700/50 bg-obsidian-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-gold-500 to-gold-700">
                <span className="text-xs font-bold text-obsidian-950">SA</span>
              </div>
              <span className="text-sm font-semibold">Sovereign Assets</span>
            </div>
            <p className="text-xs text-obsidian-400 leading-relaxed">
              Institutional-grade asset-backed token issuance, compliance, and liquidity operating system.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-caps text-obsidian-300 mb-3">Platform</h4>
            <ul className="space-y-2">
              {publicNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-obsidian-400 hover:text-obsidian-200 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-caps text-obsidian-300 mb-3">Legal</h4>
            <ul className="space-y-2">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-obsidian-400 hover:text-obsidian-200 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-caps text-obsidian-300 mb-3">Portals</h4>
            <ul className="space-y-2">
              <li><Link href="/investors/onboarding" className="text-xs text-obsidian-400 hover:text-obsidian-200 transition-colors">Investor Access</Link></li>
              <li><Link href="/issuer/admin" className="text-xs text-obsidian-400 hover:text-obsidian-200 transition-colors">Issuer Portal</Link></li>
              <li><Link href="/issuer/compliance" className="text-xs text-obsidian-400 hover:text-obsidian-200 transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-obsidian-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-obsidian-500">
              &copy; {new Date().getFullYear()} Sovereign Assets Platform. All rights reserved.
            </p>
            <p className="text-xs text-obsidian-500 max-w-lg text-center sm:text-right">
              This platform and its content are provided for informational purposes. Token offerings may constitute securities and are subject to applicable regulations. All reserve figures are subject to independent verification.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
