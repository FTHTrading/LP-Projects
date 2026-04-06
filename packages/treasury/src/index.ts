// Treasury — multi-ledger account management, settlement, reconciliation
// Stub: implement against Prisma TreasuryAccount + TreasuryMovement models

import type { TreasuryAccount, TreasuryMovement } from '@sov/shared-types';

export async function getAccounts(): Promise<TreasuryAccount[]> {
  // TODO: query TreasuryAccount records
  return [];
}

export async function getMovements(_accountId?: string): Promise<TreasuryMovement[]> {
  // TODO: query TreasuryMovement records with optional filter
  return [];
}

export async function initiateSettlement(_params: {
  fromAccount: string;
  toAccount: string;
  amount: string;
  currency: string;
  actorId: string;
}) {
  // TODO: validate approval threshold → execute movement → emit audit event
  throw new Error('Not implemented');
}

export async function reconcile(_accountId: string) {
  // TODO: compare ledger balance vs custodian statement → flag discrepancies
  return { status: 'not_implemented', discrepancies: [] };
}
