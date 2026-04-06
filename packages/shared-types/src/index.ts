// ─── Sovereign Assets Platform — Shared Domain Types ─────
// These types are the canonical domain vocabulary used across all packages.

// ─── TOKEN ───────────────────────────────────────────────

export type TokenClassification =
  | 'security_token'
  | 'utility_token'
  | 'rwa_token'
  | 'stable_token'
  | 'preferred'
  | 'common';

export type TokenStatus = 'active' | 'paused' | 'halted' | 'migrating' | 'retired';

export interface TokenClass {
  id: string;
  symbol: string;
  name: string;
  classification: TokenClassification;
  status: TokenStatus;
  description: string;
  contractAddress?: string;
  chainId?: number;
  decimals: number;
  standard?: string;
  totalSupply: string;
  circulatingSupply: string;
  treasuryHeld: string;
  backingAssetClass?: string;
  backingDescription?: string;
}

export interface TokenSummary {
  symbol: string;
  name: string;
  classification: TokenClassification;
  status: TokenStatus;
  navPerToken: string;
  marketPrice?: string;
  premiumDiscountPct?: number;
  backingRatio: string;
  totalSupply: string;
}

// ─── RESERVE ─────────────────────────────────────────────

export type AssetClass =
  | 'gold'
  | 'silver'
  | 'platinum'
  | 'real_estate'
  | 'commodity'
  | 'cash'
  | 'treasury_bill'
  | 'other';

export type AttestationLevel = 'attested' | 'self_reported' | 'unverified';

export interface ReserveAsset {
  id: string;
  name: string;
  assetClass: AssetClass;
  description: string;
  location?: string;
  custodian?: string;
  custodianVerified: boolean;
  lastValuationDate?: string;
  lastValuationAmount?: string;
  valuationCurrency: string;
  valuationMethodology?: string;
  attestationLevel: AttestationLevel;
  weight?: string; // troy oz
  purity?: string;
}

export interface ReserveSummary {
  totalValue: string;
  totalLiabilities: string;
  netValue: string;
  attestedPct: number;
  selfReportedPct: number;
  unverifiedPct: number;
  assetBreakdown: { assetClass: AssetClass; value: string; pct: number }[];
}

export interface NavSnapshot {
  timestamp: string;
  totalReserveValue: string;
  totalLiabilities: string;
  netReserveValue: string;
  tokenSupply: string;
  navPerToken: string;
  backingRatio: string;
}

// ─── ATTESTATION ─────────────────────────────────────────

export type DocumentType =
  | 'assay_report'
  | 'title_deed'
  | 'custody_receipt'
  | 'audit_report'
  | 'valuation_report'
  | 'insurance_cert'
  | 'legal_opinion'
  | 'ppm'
  | 'subscription_agreement'
  | 'board_resolution'
  | 'risk_disclosure'
  | 'other';

export type DocumentIssuerType =
  | 'third_party_auditor'
  | 'government'
  | 'custodian'
  | 'issuer_self'
  | 'legal_counsel'
  | 'regulator';

export interface AttestationDocument {
  id: string;
  type: DocumentType;
  title: string;
  issuer: string;
  issuerType: DocumentIssuerType;
  date: string;
  expirationDate?: string;
  fileHash: string;
  chainAnchorTx?: string;
  chainAnchorChain?: string;
  verified: boolean;
  published: boolean;
}

export interface AttestationVerification {
  documentHash: string;
  chainAnchor?: {
    chain: string;
    txHash: string;
    blockNumber: number;
    timestamp: string;
  };
  verified: boolean;
  hashMatch: boolean;
}

// ─── INVESTOR ────────────────────────────────────────────

export type InvestorType = 'individual' | 'entity' | 'trust' | 'fund';
export type KycStatus = 'not_started' | 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
export type AccreditationStatus = 'not_required' | 'pending' | 'verified' | 'expired' | 'rejected';

export interface InvestorProfile {
  id: string;
  investorType: InvestorType;
  entityName?: string;
  countryCode: string;
  kycStatus: KycStatus;
  accreditationStatus: AccreditationStatus;
  walletAddress?: string;
  whitelisted: boolean;
  onboardingComplete: boolean;
}

export interface Holding {
  tokenSymbol: string;
  tokenName: string;
  balance: string;
  lockedAmount: string;
  currentValue: string;
  navPerToken: string;
}

// ─── COMPLIANCE ──────────────────────────────────────────

export interface TransferRestriction {
  id: string;
  tokenId: string;
  ruleType: string;
  countryCode?: string;
  investorType?: string;
  maxHolding?: string;
  lockupDays?: number;
  description: string;
  active: boolean;
}

export interface TransferCheckResult {
  allowed: boolean;
  blockedBy?: string[];
  details: { rule: string; passed: boolean; reason?: string }[];
}

export interface JurisdictionPolicy {
  countryCode: string;
  countryName: string;
  status: 'allowed' | 'restricted' | 'blocked';
  investorTypes: InvestorType[];
  notes?: string;
}

// ─── LIQUIDITY ───────────────────────────────────────────

export type VenueType = 'cex' | 'dex' | 'otc' | 'internal';
export type VenueStatus = 'active' | 'suspended' | 'probation' | 'denied';

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  status: VenueStatus;
  complianceFlags: string[];
  lastHealthCheck?: string;
  lastHealthStatus?: boolean;
}

export interface LiquiditySnapshot {
  tokenSymbol: string;
  venueName: string;
  timestamp: string;
  bestBid?: string;
  bestAsk?: string;
  spreadBps?: number;
  bidDepth?: string;
  askDepth?: string;
  volume24h?: string;
  vwap24h?: string;
  inventoryLevel?: string;
  qualityScore?: number;
  source: string;
}

export interface LiquidityHealth {
  tokenSymbol: string;
  aggregateBid: string;
  aggregateAsk: string;
  aggregateSpreadBps: number;
  totalVolume24h: string;
  navPerToken: string;
  premiumDiscountPct: number;
  venueCount: number;
  healthScore: number; // 0-100
  circuitBreakerActive: boolean;
  anomalyCount: number;
}

export type AnomalySeverity = 'info' | 'warning' | 'high' | 'critical';

export interface AnomalyEvent {
  id: string;
  venueName: string;
  tokenSymbol: string;
  anomalyType: string;
  severity: AnomalySeverity;
  description: string;
  acknowledged: boolean;
  createdAt: string;
}

// ─── TREASURY ────────────────────────────────────────────

export type LedgerType = 'fiat' | 'stablecoin' | 'token' | 'crypto';

export interface TreasuryAccount {
  id: string;
  name: string;
  ledgerType: LedgerType;
  currency: string;
  balance: string;
  custodian?: string;
}

export interface TreasuryMovement {
  id: string;
  accountName: string;
  type: string;
  amount: string;
  direction: 'inflow' | 'outflow';
  counterparty?: string;
  status: string;
  createdAt: string;
}

// ─── AUDIT ───────────────────────────────────────────────

export interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: string;
  actorId?: string;
  actorRole?: string;
  targetType?: string;
  targetId?: string;
  action: string;
  details?: Record<string, unknown>;
}

// ─── ADMIN ───────────────────────────────────────────────

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export interface AdminAction {
  id: string;
  actionType: string;
  requestedBy: string;
  targetType: string;
  targetId: string;
  status: ApprovalStatus;
  requiredApprovals: number;
  currentApprovals: number;
  createdAt: string;
}

// ─── USER & AUTH ─────────────────────────────────────────

export type UserRole =
  | 'admin'
  | 'compliance_officer'
  | 'treasury_officer'
  | 'market_ops'
  | 'investor_relations'
  | 'investor'
  | 'market_maker'
  | 'auditor'
  | 'public';

export interface UserInfo {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

// ─── NAV vs MARKET ───────────────────────────────────────

export interface NavVsMarket {
  timestamp: string;
  navPerToken: string;
  marketPrice: string;
  premiumDiscountPct: number;
  premiumDiscountBand: 'normal' | 'warning' | 'critical';
}

// ─── DESIGN ──────────────────────────────────────────────

export interface StatusBadge {
  label: string;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export interface RiskBadge {
  level: 'low' | 'medium' | 'high' | 'critical';
  label: string;
}

// ─── TRADE DESK ──────────────────────────────────────────

export type TradeDeskGateStatus = 'pass' | 'fail' | 'pending' | 'waived';

export interface TradeDeskGate {
  id: string;
  name: string;
  description: string;
  weight: number;
  status: TradeDeskGateStatus;
  value?: string;
  threshold?: string;
}

export type TradeDeskQualificationStatus = 'qualified' | 'conditional' | 'not_qualified';

export interface TradeDeskQualification {
  tokenSymbol: string;
  score: number;
  status: TradeDeskQualificationStatus;
  gates: TradeDeskGate[];
  assessedAt: string;
  nextReviewDate?: string;
}

// ─── HOLDER CONCENTRATION ────────────────────────────────

export interface HolderConcentration {
  tokenSymbol: string;
  totalHolders: number;
  top5Pct: number;
  top10Pct: number;
  herfindahlIndex: number;
  giniCoefficient: number;
  largestHolderPct: number;
  medianHolding: string;
  distributionHealthy: boolean;
  holders: HolderInfo[];
}

export interface HolderInfo {
  address: string;
  label?: string;
  balance: string;
  pctOfSupply: number;
  isIssuer: boolean;
  isLocked: boolean;
}

// ─── STABLECOIN CONVERSION ───────────────────────────────

export type ConversionMethod = 'otc_desk' | 'dex_aggregation' | 'reserve_backed' | 'atomic_swap';
export type ConversionStatus = 'pending' | 'quoting' | 'executing' | 'settling' | 'completed' | 'failed';

export interface ConversionRequest {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount?: string;
  method: ConversionMethod;
  status: ConversionStatus;
  feeBps: number;
  settlementWallet?: string;
  createdAt: string;
  completedAt?: string;
}

export type WalletType = 'exodus' | 'metamask' | 'coinbase_wallet' | 'fireblocks' | 'ledger' | 'trezor' | 'proprietary' | 'other';

export interface SettlementWallet {
  id: string;
  label: string;
  address: string;
  walletType: WalletType;
  network: string;
  verified: boolean;
  balanceUsd?: string;
  tradeDeskAccepted: boolean;
}

// ─── REFERENCE TOKENS (competitive intelligence) ─────────

export interface ReferenceToken {
  symbol: string;
  name: string;
  issuer: string;
  blockchain: string;
  contractAddress?: string;
  catexPriceUsdt?: string;
  realNavEstimate?: string;
  volume24h?: string;
  holderCount?: number;
  liquidityScore: number;
  tradeDeskReady: boolean;
  issues: string[];
}

// ─── ISSUER ONBOARDING ───────────────────────────────────

export type IssuerStage = 'intake' | 'assessment' | 'remediation' | 'activation' | 'live' | 'suspended';
export type EntityType = 'llc' | 'corp' | 'ltd' | 'trust' | 'spv' | 'foundation';
export type RegulatoryStatus = 'unregistered' | 'pending' | 'registered' | 'exempt';
export type AssetBacking = 'gold' | 'silver' | 'minerals' | 'real_estate' | 'mixed' | 'other';
export type IssuerAttestationLevel = 'none' | 'self_reported' | 'third_party' | 'machine_verified';
export type WalletRestriction = 'open' | 'proprietary';
export type FundingChannelType = 'trade_desk' | 'otc_desk' | 'market_maker' | 'lp_pool' | 'institutional_placement' | 'stablecoin_yield';

export interface FundingChannel {
  type: FundingChannelType;
  name: string;
  status: 'available' | 'in_progress' | 'blocked' | 'completed';
  requirements: string[];
  estimatedTimeline: string;
  estimatedValue?: string;
}

export interface RemediationItem {
  gateId: string;
  action: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  dueDate?: string;
  cost?: string;
}

export interface IssuerApplication {
  id: string;
  stage: IssuerStage;
  entityName: string;
  entityType: EntityType;
  jurisdiction: string;
  regulatoryStatus: RegulatoryStatus;
  primaryContact: { name: string; email: string; role: string };
  bdRelationship?: { name: string; finraId?: string; status: string };
  token: {
    symbol: string;
    name: string;
    standard: string;
    blockchain: string;
    contractAddress?: string;
    totalSupply: string;
    holderCount: number;
    walletRestriction: WalletRestriction;
    existingVenues: string[];
  };
  reserve: {
    assetType: AssetBacking;
    custodian?: string;
    claimedValue: string;
    lastAuditDate?: string;
    attestationStatus: IssuerAttestationLevel;
  };
  qualificationScore: number;
  qualificationStatus: TradeDeskQualificationStatus;
  remediationPlan: RemediationItem[];
  fundingChannels: FundingChannel[];
  estimatedCompletionWeeks: number;
  estimatedYear1Revenue: string;
  appliedAt: string;
  assessedAt?: string;
  activatedAt?: string;
}
