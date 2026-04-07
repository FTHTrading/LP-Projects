// Treasury — multi-ledger account management, settlement, reconciliation
import { prisma } from '@sov/db';
import type { TreasuryAccount, TreasuryMovement } from '@sov/shared-types';

export async function getAccounts(): Promise<TreasuryAccount[]> {
  const rows = await prisma.treasuryAccount.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
  });
  return rows.map((a) => ({
    id: a.id,
    name: a.name,
    ledgerType: a.ledgerType.toLowerCase() as TreasuryAccount['ledgerType'],
    currency: a.currency,
    balance: a.balance.toString(),
    custodian: a.custodian ?? undefined,
  }));
}

export async function getMovements(accountId?: string): Promise<TreasuryMovement[]> {
  const rows = await prisma.treasuryMovement.findMany({
    where: accountId ? { accountId } : undefined,
    include: { account: true },
    orderBy: { createdAt: 'desc' },
    take: 500,
  });
  return rows.map((m) => ({
    id: m.id,
    accountName: m.account.name,
    type: m.type,
    amount: m.amount.toString(),
    direction: m.direction as 'inflow' | 'outflow',
    counterparty: m.counterparty ?? undefined,
    status: m.status,
    createdAt: m.createdAt.toISOString(),
  }));
}

export async function initiateSettlement(params: {
  fromAccountId: string;
  toAccountId: string;
  amount: string;
  currency: string;
  actorId: string;
  reference?: string;
}): Promise<{ fromMovementId: string; toMovementId: string }> {
  const amtNum = parseFloat(params.amount);
  if (isNaN(amtNum) || amtNum <= 0) throw new Error('Invalid settlement amount');

  const fromAccount = await prisma.treasuryAccount.findUniqueOrThrow({
    where: { id: params.fromAccountId },
  });
  if (parseFloat(fromAccount.balance.toString()) < amtNum) {
    throw new Error('Insufficient funds in source account');
  }

  const [outflow, inflow] = await prisma.$transaction(async (tx) => {
    const out = await tx.treasuryMovement.create({
      data: {
        accountId: params.fromAccountId,
        type: 'transfer',
        amount: amtNum,
        direction: 'outflow',
        counterparty: params.toAccountId,
        reference: params.reference,
        status: 'pending',
        approvedBy: params.actorId,
        metadata: { currency: params.currency },
      },
    });
    const inn = await tx.treasuryMovement.create({
      data: {
        accountId: params.toAccountId,
        type: 'transfer',
        amount: amtNum,
        direction: 'inflow',
        counterparty: params.fromAccountId,
        reference: params.reference,
        status: 'pending',
        approvedBy: params.actorId,
        metadata: { currency: params.currency },
      },
    });
    await tx.treasuryAccount.update({
      where: { id: params.fromAccountId },
      data: { balance: { decrement: amtNum } },
    });
    await tx.treasuryAccount.update({
      where: { id: params.toAccountId },
      data: { balance: { increment: amtNum } },
    });
    return [out, inn];
  });

  return { fromMovementId: outflow.id, toMovementId: inflow.id };
}

export async function reconcile(
  accountId: string,
): Promise<{ status: string; discrepancies: string[] }> {
  const account = await prisma.treasuryAccount.findUniqueOrThrow({
    where: { id: accountId },
  });
  const movements = await prisma.treasuryMovement.findMany({
    where: { accountId, status: 'settled' },
  });

  let computed = 0;
  for (const m of movements) {
    const amt = parseFloat(m.amount.toString());
    if (m.direction === 'inflow') computed += amt;
    else computed -= amt;
  }

  const recorded = parseFloat(account.balance.toString());
  const diff = Math.abs(computed - recorded);
  const discrepancies: string[] = [];
  if (diff > 0.01) {
    discrepancies.push(
      `Balance mismatch: computed ${computed.toFixed(6)}, recorded ${recorded.toFixed(6)}, diff ${diff.toFixed(6)}`,
    );
  }

  return {
    status: discrepancies.length === 0 ? 'reconciled' : 'discrepancy_found',
    discrepancies,
  };
}
