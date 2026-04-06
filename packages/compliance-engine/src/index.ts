// Compliance Engine — transfer restrictions, KYC/AML, jurisdiction, whitelist
// Stub: implement rule evaluation pipeline

import type { TransferCheckResult, TransferRestriction, JurisdictionPolicy } from '@sov/shared-types';

export async function checkTransfer(_from: string, _to: string, _tokenId: string, _amount: string): Promise<TransferCheckResult> {
  // TODO: load active rules → evaluate each → return composite result
  return { allowed: false, blockedBy: ['not_implemented'], details: [] };
}

export async function getActiveRules(_tokenId?: string): Promise<TransferRestriction[]> {
  // TODO: query TransferRestriction where active=true
  return [];
}

export async function createRule(_rule: Omit<TransferRestriction, 'id'>): Promise<TransferRestriction> {
  // TODO: insert rule → emit audit event
  throw new Error('Not implemented');
}

export async function getJurisdictionPolicies(): Promise<JurisdictionPolicy[]> {
  // TODO: query JurisdictionPolicy records
  return [];
}

export async function addToWhitelist(_address: string, _tokenId: string, _actorId: string) {
  // TODO: verify KYC status → add to on-chain whitelist → record in db
  throw new Error('Not implemented');
}
