import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Tokens', href: '/admin/tokens' },
    { label: 'Reserves', href: '/admin/reserves' },
    { label: 'Treasury', href: '/admin/treasury' },
    { label: 'Compliance', href: '/admin/compliance' },
    { label: 'Market Ops', href: '/admin/market-ops' },
    { label: 'Trade Desk', href: '/admin/trade-desk' },
    { label: 'Issuers', href: '/admin/issuers' },
    { label: 'Investors', href: '/admin/investors' },
    { label: 'Audit Log', href: '/admin/audit' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-obsidian-800 bg-obsidian-950">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-lg font-bold gold-text">SAP</span>
            <span className="text-xs text-obsidian-400 uppercase tracking-caps">Issuer Console</span>
          </Link>
        </div>
        <nav className="px-3 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-3 py-2 text-sm text-obsidian-300 hover:text-obsidian-100 hover:bg-obsidian-800/50 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-obsidian-800 mt-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold">
              AD
            </div>
            <div>
              <p className="text-xs font-medium text-obsidian-200">Admin User</p>
              <p className="text-[10px] text-obsidian-400">admin@sovereign.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-30 border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-3">
            <h1 className="text-sm font-medium text-obsidian-200">Issuer Administration</h1>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-obsidian-400 uppercase tracking-caps">Environment: Development</span>
              <Link
                href="/"
                className="text-xs text-obsidian-400 hover:text-obsidian-200 transition-colors"
              >
                ← Public Site
              </Link>
            </div>
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
