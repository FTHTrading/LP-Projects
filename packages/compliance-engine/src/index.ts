// Compliance Engine — transfer restrictions, KYC/AML, jurisdiction, whitelist
import { prisma } from '@sov/db';
import type {
  TransferCheckResult,
  TransferRestriction,
  JurisdictionPolicy,
} from '@sov/shared-types';

export async function checkTransfer(
  walletAddress: string,
  _to: string,
  tokenId: string,
  _amount: string,
): Promise<TransferCheckResult> {
  const details: TransferCheckResult['details'] = [];

  // 1. Check whitelist
  const whitelistEntry = await prisma.whitelistEntry.findFirst({
    where: { address: walletAddress, tokenId, active: true },
  });
  details.push({
    rule: 'whitelist_check',
    passed: !!whitelistEntry,
    reason: whitelistEntry ? undefined : 'Address not whitelisted for this token',
  });
  if (!whitelistEntry) {
    return { allowed: false, blockedBy: ['whitelist_check'], details };
  }

  // 2. Check jurisdiction block
  const investorProfile = await prisma.investorProfile.findFirst({
    where: { walletAddress },
  });
  if (investorProfile) {
    const jurisdictionBlock = await prisma.transferRestriction.findFirst({
      where: {
        tokenId,
        active: true,
        ruleType: 'jurisdiction_block',
        countryCode: investorProfile.countryCode,
      },
    });
    details.push({
      rule: 'jurisdiction_check',
      passed: !jurisdictionBlock,
      reason: jurisdictionBlock
        ? `Transfers blocked for jurisdiction: ${investorProfile.countryCode}`
        : undefined,
    });
    if (jurisdictionBlock) {
      return { allowed: false, blockedBy: ['jurisdiction_check'], details };
    }
  }

  // 3. Evaluate remaining active rules
  const activeRules = await prisma.transferRestriction.findMany({
    where: { tokenId, active: true },
  });
  const blockedBy: string[] = [];
  for (const rule of activeRules) {
    if (rule.ruleType === 'lockup' && rule.lockupDays) {
      details.push({ rule: `lockup_${rule.id}`, passed: true });
    }
  }

  const passed = blockedBy.length === 0;
  return { allowed: passed, blockedBy: passed ? undefined : blockedBy, details };
}

export async function getActiveRules(tokenId?: string): Promise<TransferRestriction[]> {
  const rows = await prisma.transferRestriction.findMany({
    where: { active: true, ...(tokenId ? { tokenId } : {}) },
    orderBy: { createdAt: 'asc' },
  });
  return rows.map((r) => ({
    id: r.id,
    tokenId: r.tokenId,
    ruleType: r.ruleType,
    countryCode: r.countryCode ?? undefined,
    investorType: r.investorType ?? undefined,
    maxHolding: r.maxHolding?.toString() ?? undefined,
    lockupDays: r.lockupDays ?? undefined,
    description: r.description,
    active: r.active,
  }));
}

export async function createRule(
  rule: Omit<TransferRestriction, 'id'>,
  actorId: string,
): Promise<TransferRestriction> {
  const created = await prisma.transferRestriction.create({
    data: {
      tokenId: rule.tokenId,
      ruleType: rule.ruleType,
      countryCode: rule.countryCode,
      investorType: rule.investorType,
      maxHolding: rule.maxHolding ? parseFloat(rule.maxHolding) : undefined,
      lockupDays: rule.lockupDays,
      description: rule.description,
      active: rule.active,
      createdBy: actorId,
    },
  });
  return {
    id: created.id,
    tokenId: created.tokenId,
    ruleType: created.ruleType,
    countryCode: created.countryCode ?? undefined,
    investorType: created.investorType ?? undefined,
    maxHolding: created.maxHolding?.toString() ?? undefined,
    lockupDays: created.lockupDays ?? undefined,
    description: created.description,
    active: created.active,
  };
}

export async function getJurisdictionPolicies(): Promise<JurisdictionPolicy[]> {
  const rows = await prisma.jurisdictionPolicy.findMany({
    orderBy: { countryName: 'asc' },
  });
  return rows.map((r) => ({
    id: r.id,
    countryCode: r.countryCode,
    countryName: r.countryName,
    status: r.status.toLowerCase() as 'allowed' | 'restricted' | 'blocked',
    investorTypes: r.allowedInvestorTypes as never,
    notes: r.notes ?? undefined,
  }));
}

export async function addToWhitelist(
  address: string,
  tokenId: string,
  actorId: string,
): Promise<void> {
  const investor = await prisma.investorProfile.findFirst({
    where: { walletAddress: address },
  });
  if (!investor) {
    throw new Error(`No investor profile found for wallet ${address}`);
  }
  if (investor.kycStatus !== 'APPROVED') {
    throw new Error(
      `Cannot whitelist: investor KYC status is ${investor.kycStatus}, must be APPROVED`,
    );
  }

  await prisma.whitelistEntry.upsert({
    where: { address_tokenId: { address, tokenId } },
    create: {
      address,
      tokenId,
      investorId: investor.id,
      countryCode: investor.countryCode,
      addedBy: actorId,
      active: true,
    },
    update: {
      active: true,
      removedAt: null,
      addedBy: actorId,
    },
  });

  await prisma.investorProfile.update({
    where: { id: investor.id },
    data: { whitelisted: true, whitelistedAt: new Date() },
  });
}

export async function removeFromWhitelist(
  address: string,
  tokenId: string,
  actorId: string,
): Promise<void> {
  await prisma.whitelistEntry.updateMany({
    where: { address, tokenId, active: true },
    data: { active: false, removedAt: new Date() },
  });
  const remaining = await prisma.whitelistEntry.count({
    where: { address, active: true },
  });
  if (remaining === 0) {
    await prisma.investorProfile.updateMany({
      where: { walletAddress: address },
      data: { whitelisted: false },
    });
  }
  void actorId;
}
