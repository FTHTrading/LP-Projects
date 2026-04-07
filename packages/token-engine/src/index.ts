// Token Engine — issuance, lifecycle, mint/burn, transfer restriction enforcement
import { prisma } from '@sov/db';
import type { TokenClass, TransferCheckResult } from '@sov/shared-types';
import { checkTransfer } from '@sov/compliance-engine';

export async function listTokenClasses(): Promise<TokenClass[]> {
  const rows = await prisma.tokenClass.findMany({
    orderBy: { symbol: 'asc' },
  });
  return rows.map((t) => ({
    id: t.id,
    symbol: t.symbol,
    name: t.name,
    classification: t.classification.toLowerCase() as TokenClass['classification'],
    status: t.status.toLowerCase() as TokenClass['status'],
    description: t.description,
    contractAddress: t.contractAddress ?? undefined,
    chainId: t.chainId ?? undefined,
    decimals: t.decimals,
    standard: t.standard ?? undefined,
    totalSupply: t.totalSupply.toString(),
    circulatingSupply: t.circulatingSupply.toString(),
    treasuryHeld: t.treasuryHeld.toString(),
    backingAssetClass: t.backingAssetClass ?? undefined,
    backingDescription: t.backingDescription ?? undefined,
  }));
}

export async function getTokenClass(symbol: string): Promise<TokenClass | null> {
  const t = await prisma.tokenClass.findUnique({ where: { symbol } });
  if (!t) return null;
  return {
    id: t.id,
    symbol: t.symbol,
    name: t.name,
    classification: t.classification.toLowerCase() as TokenClass['classification'],
    status: t.status.toLowerCase() as TokenClass['status'],
    description: t.description,
    contractAddress: t.contractAddress ?? undefined,
    chainId: t.chainId ?? undefined,
    decimals: t.decimals,
    standard: t.standard ?? undefined,
    totalSupply: t.totalSupply.toString(),
    circulatingSupply: t.circulatingSupply.toString(),
    treasuryHeld: t.treasuryHeld.toString(),
    backingAssetClass: t.backingAssetClass ?? undefined,
    backingDescription: t.backingDescription ?? undefined,
  };
}

// DB-side mint: updates supply figures and records the transaction.
// On-chain mint (contract call) is handled in Phase 9 (contracts layer).
export async function mintTokens(
  tokenId: string,
  amount: string,
  toAddress: string,
  actorId: string,
): Promise<void> {
  const amountDecimal = parseFloat(amount);
  if (isNaN(amountDecimal) || amountDecimal <= 0) {
    throw new Error(`Invalid mint amount: ${amount}`);
  }

  await prisma.$transaction(async (tx) => {
    // Update token supply
    await tx.tokenClass.update({
      where: { id: tokenId },
      data: {
        totalSupply: { increment: amountDecimal },
        circulatingSupply: { increment: amountDecimal },
      },
    });

    // Update or create holding for the recipient
    const investor = await tx.investorProfile.findFirst({
      where: { walletAddress: toAddress },
    });
    if (investor) {
      await tx.holding.upsert({
        where: { investorId_tokenId: { investorId: investor.id, tokenId } },
        create: { investorId: investor.id, tokenId, balance: amountDecimal },
        update: { balance: { increment: amountDecimal } },
      });
    }

    // Record transaction
    await tx.transaction.create({
      data: {
        tokenId,
        type: 'MINT',
        toAddress,
        investorId: investor?.id,
        amount: amountDecimal,
        status: 'confirmed',
        metadata: { actorId, source: 'token_engine' },
      },
    });
  });
}

// DB-side burn: reduces supply and records the transaction.
export async function burnTokens(
  tokenId: string,
  amount: string,
  fromAddress: string,
  actorId: string,
): Promise<void> {
  const amountDecimal = parseFloat(amount);
  if (isNaN(amountDecimal) || amountDecimal <= 0) {
    throw new Error(`Invalid burn amount: ${amount}`);
  }

  await prisma.$transaction(async (tx) => {
    await tx.tokenClass.update({
      where: { id: tokenId },
      data: {
        totalSupply: { decrement: amountDecimal },
        circulatingSupply: { decrement: amountDecimal },
      },
    });

    const investor = await tx.investorProfile.findFirst({
      where: { walletAddress: fromAddress },
    });
    if (investor) {
      const holding = await tx.holding.findUnique({
        where: { investorId_tokenId: { investorId: investor.id, tokenId } },
      });
      if (!holding || parseFloat(holding.balance.toString()) < amountDecimal) {
        throw new Error('Insufficient balance for burn');
      }
      await tx.holding.update({
        where: { investorId_tokenId: { investorId: investor.id, tokenId } },
        data: { balance: { decrement: amountDecimal } },
      });
    }

    await tx.transaction.create({
      data: {
        tokenId,
        type: 'BURN',
        fromAddress,
        investorId: investor?.id,
        amount: amountDecimal,
        status: 'confirmed',
        metadata: { actorId, source: 'token_engine' },
      },
    });
  });
}

export async function checkTransferEligibility(
  from: string,
  to: string,
  tokenId: string,
  amount: string,
): Promise<TransferCheckResult> {
  return checkTransfer(from, to, tokenId, amount);
}
