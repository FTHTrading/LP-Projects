// Auth — session management, role-based access control, multi-sig approval
// Stub: integrate with NextAuth.js or similar

export type Role = 'admin' | 'compliance_officer' | 'treasury_officer' | 'market_ops' | 'investor' | 'viewer';

export interface Session {
  userId: string;
  role: Role;
  permissions: string[];
}

export function requireRole(session: Session | null, ...roles: Role[]): boolean {
  if (!session) return false;
  return roles.includes(session.role);
}

export function requirePermission(session: Session | null, permission: string): boolean {
  if (!session) return false;
  return session.permissions.includes(permission);
}

export async function getSession(): Promise<Session | null> {
  // TODO: implement with NextAuth.js / auth provider
  return null;
}

export async function validateMultiSigApproval(_actionId: string, _requiredApprovals: number): Promise<boolean> {
  // TODO: check approval count against threshold
  return false;
}
