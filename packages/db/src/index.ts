// DB — Prisma client re-export and singleton
// Canonical PrismaClient for the entire monorepo.
// All packages MUST import `prisma` from `@sov/db`, never instantiate their own client.

import { PrismaClient } from '@prisma/client';

// Re-export types so other packages can use Prisma types without
// a direct @prisma/client dependency.
export * from '@prisma/client';

// Singleton pattern: prevents multiple PrismaClient instances during Next.js
// hot-module reloading in development. In production a single instance is used.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
