// Auth — session management, role-based access control, multi-sig approval
import { prisma } from '@sov/db';

export type Role =
  | 'admin'
  | 'compliance_officer'
  | 'treasury_officer'
  | 'market_ops'
  | 'investor'
  | 'viewer';

const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: [
    'token.mint',
    'token.burn',
    'token.freeze',
    'compliance.create_rule',
    'compliance.whitelist',
    'reserve.register',
    'treasury.settle',
    'audit.export',
    'attestation.publish',
  ],
  compliance_officer: [
    'compliance.create_rule',
    'compliance.whitelist',
    'audit.export',
    'attestation.publish',
  ],
  treasury_officer: ['treasury.settle', 'reserve.register', 'audit.export'],
  market_ops: ['market.view', 'market.anomaly_ack'],
  investor: ['investor.view_own'],
  viewer: [],
};

export interface Session {
  userId: string;
  sessionId: string;
  role: Role;
  permissions: string[];
  expiresAt: string;
}

export function requireRole(session: Session | null, ...roles: Role[]): boolean {
  if (!session) return false;
  return roles.includes(session.role);
}

export function requirePermission(session: Session | null, permission: string): boolean {
  if (!session) return false;
  return session.permissions.includes(permission);
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, expiresAt: { gt: new Date() } },
    include: { user: true },
  });
  if (!session) return null;

  const role = session.user.role.toLowerCase() as Role;
  return {
    userId: session.userId,
    sessionId: session.id,
    role,
    permissions: ROLE_PERMISSIONS[role] ?? [],
    expiresAt: session.expiresAt.toISOString(),
  };
}

export async function validateMultiSigApproval(
  actionId: string,
  requiredApprovals: number,
): Promise<boolean> {
  const approvalCount = await prisma.adminApproval.count({
    where: { actionId, decision: 'approved' },
  });
  return approvalCount >= requiredApprovals;
}
