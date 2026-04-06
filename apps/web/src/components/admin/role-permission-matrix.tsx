'use client';

type Role = 'super_admin' | 'compliance_officer' | 'treasury_manager' | 'market_operator' | 'auditor' | 'support';

type Permission =
  | 'view_dashboard'
  | 'manage_tokens'
  | 'mint_burn'
  | 'manage_reserves'
  | 'manage_treasury'
  | 'manage_compliance'
  | 'manage_market_ops'
  | 'manage_investors'
  | 'view_audit_log'
  | 'export_audit_log'
  | 'manage_roles'
  | 'system_config';

const roles: { role: Role; label: string; color: string }[] = [
  { role: 'super_admin', label: 'Super Admin', color: 'text-gold-400' },
  { role: 'compliance_officer', label: 'Compliance', color: 'text-sky-400' },
  { role: 'treasury_manager', label: 'Treasury', color: 'text-emerald-400' },
  { role: 'market_operator', label: 'Market Ops', color: 'text-violet-400' },
  { role: 'auditor', label: 'Auditor', color: 'text-amber-400' },
  { role: 'support', label: 'Support', color: 'text-obsidian-300' },
];

const permissions: { perm: Permission; label: string }[] = [
  { perm: 'view_dashboard', label: 'View Dashboard' },
  { perm: 'manage_tokens', label: 'Manage Tokens' },
  { perm: 'mint_burn', label: 'Mint / Burn' },
  { perm: 'manage_reserves', label: 'Manage Reserves' },
  { perm: 'manage_treasury', label: 'Manage Treasury' },
  { perm: 'manage_compliance', label: 'Manage Compliance' },
  { perm: 'manage_market_ops', label: 'Manage Market Ops' },
  { perm: 'manage_investors', label: 'Manage Investors' },
  { perm: 'view_audit_log', label: 'View Audit Log' },
  { perm: 'export_audit_log', label: 'Export Audit Log' },
  { perm: 'manage_roles', label: 'Manage Roles' },
  { perm: 'system_config', label: 'System Config' },
];

const matrix: Record<Role, Set<Permission>> = {
  super_admin: new Set(permissions.map((p) => p.perm)),
  compliance_officer: new Set(['view_dashboard', 'manage_compliance', 'manage_investors', 'view_audit_log', 'export_audit_log']),
  treasury_manager: new Set(['view_dashboard', 'manage_reserves', 'manage_treasury', 'mint_burn', 'view_audit_log']),
  market_operator: new Set(['view_dashboard', 'manage_market_ops', 'view_audit_log']),
  auditor: new Set(['view_dashboard', 'view_audit_log', 'export_audit_log']),
  support: new Set(['view_dashboard', 'manage_investors', 'view_audit_log']),
};

export function RolePermissionMatrix() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-obsidian-800">
        <h3 className="text-sm font-semibold text-obsidian-200">Role Permission Matrix</h3>
        <p className="text-[10px] text-obsidian-500 mt-1">RBAC configuration — controls admin console access</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-obsidian-800">
              <th className="text-left px-4 py-2.5 font-medium text-obsidian-400 sticky left-0 bg-obsidian-950 z-10">Permission</th>
              {roles.map((r) => (
                <th key={r.role} className={`text-center px-3 py-2.5 font-medium ${r.color}`}>
                  {r.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((p) => (
              <tr key={p.perm} className="border-b border-obsidian-800/50 hover:bg-obsidian-900/30">
                <td className="px-4 py-2 text-obsidian-300 sticky left-0 bg-obsidian-950 z-10">{p.label}</td>
                {roles.map((r) => {
                  const has = matrix[r.role].has(p.perm);
                  return (
                    <td key={r.role} className="text-center px-3 py-2">
                      {has ? (
                        <span className="text-emerald-400 font-bold">✓</span>
                      ) : (
                        <span className="text-obsidian-700">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
