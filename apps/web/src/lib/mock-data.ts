// Mock data for development. All figures are clearly marked as illustrative.
// Replace with real API calls in production.

import type {
  TokenSummary,
  ReserveSummary,
  NavSnapshot,
  LiquidityHealth,
  LiquiditySnapshot,
  AnomalyEvent,
  Venue,
  TreasuryAccount,
  AuditEvent,
  ReferenceToken,
  TradeDeskQualification,
  HolderConcentration,
  ConversionRequest,
  SettlementWallet,
  IssuerApplication,
} from '@sov/shared-types';

// ─── TOKENS ──────────────────────────────────────────────

export const mockTokens: TokenSummary[] = [
  {
    symbol: 'SVPG',
    name: 'Sovereign Preferred Gold',
    classification: 'preferred',
    status: 'active',
    navPerToken: '48.75',
    marketPrice: '49.20',
    premiumDiscountPct: 0.92,
    backingRatio: '1.04',
    totalSupply: '10000000',
  },
  {
    symbol: 'SVCS',
    name: 'Sovereign Common Share',
    classification: 'common',
    status: 'active',
    navPerToken: '12.30',
    marketPrice: '11.85',
    premiumDiscountPct: -3.66,
    backingRatio: '1.04',
    totalSupply: '25000000',
  },
  {
    symbol: 'SVSG',
    name: 'Sovereign Security Gold',
    classification: 'security_token',
    status: 'active',
    navPerToken: '50.00',
    marketPrice: '50.10',
    premiumDiscountPct: 0.2,
    backingRatio: '1.02',
    totalSupply: '5000000',
  },
];

// ─── RESERVES ────────────────────────────────────────────

export const mockReserveSummary: ReserveSummary = {
  totalValue: '625000000.00',
  totalLiabilities: '12500000.00',
  netValue: '612500000.00',
  attestedPct: 72,
  selfReportedPct: 18,
  unverifiedPct: 10,
  assetBreakdown: [
    { assetClass: 'gold', value: '450000000', pct: 72 },
    { assetClass: 'silver', value: '75000000', pct: 12 },
    { assetClass: 'cash', value: '50000000', pct: 8 },
    { assetClass: 'real_estate', value: '37500000', pct: 6 },
    { assetClass: 'treasury_bill', value: '12500000', pct: 2 },
  ],
};

// ─── NAV HISTORY ─────────────────────────────────────────

export const mockNavHistory: NavSnapshot[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const base = 48.5;
  const noise = (Math.sin(i * 0.5) * 0.3) + (Math.random() * 0.4 - 0.2);
  const nav = base + noise + (i * 0.01);
  return {
    id: `nav-${i}`,
    timestamp: date.toISOString(),
    totalReserveValue: (nav * 10000000).toFixed(2),
    totalLiabilities: '12500000.00',
    netReserveValue: ((nav * 10000000) - 12500000).toFixed(2),
    tokenSupply: '10000000',
    navPerToken: nav.toFixed(4),
    backingRatio: (1.02 + Math.random() * 0.04).toFixed(4),
    methodology: 'mark_to_market',
  };
});

// ─── LIQUIDITY ───────────────────────────────────────────

export const mockVenues: Venue[] = [
  { id: 'v1', name: 'Prime Exchange', type: 'cex', status: 'active', complianceFlags: ['regulated_us'], lastHealthCheck: new Date().toISOString(), lastHealthStatus: true },
  { id: 'v2', name: 'Atlantic Trading', type: 'cex', status: 'active', complianceFlags: ['regulated_eu'], lastHealthCheck: new Date().toISOString(), lastHealthStatus: true },
  { id: 'v3', name: 'Meridian OTC', type: 'otc', status: 'active', complianceFlags: ['regulated_us', 'accredited_only'], lastHealthCheck: new Date().toISOString(), lastHealthStatus: true },
  { id: 'v4', name: 'Global DEX Pool', type: 'dex', status: 'suspended', complianceFlags: ['no_us_persons'], lastHealthCheck: new Date().toISOString(), lastHealthStatus: false },
];

export const mockLiquidityHealth: LiquidityHealth = {
  tokenSymbol: 'SVPG',
  aggregateBid: '49.10',
  aggregateAsk: '49.30',
  aggregateSpreadBps: 41,
  totalVolume24h: '2450000',
  navPerToken: '48.75',
  premiumDiscountPct: 0.92,
  venueCount: 3,
  healthScore: 78,
  circuitBreakerActive: false,
  anomalyCount: 1,
};

export const mockLiquiditySnapshots: LiquiditySnapshot[] = [
  { tokenSymbol: 'SVPG', venueName: 'Prime Exchange', timestamp: new Date().toISOString(), bestBid: '49.12', bestAsk: '49.28', spreadBps: 33, bidDepth: '1200000', askDepth: '980000', volume24h: '1850000', vwap24h: '49.18', inventoryLevel: '350000', qualityScore: 85, source: 'adapter' },
  { tokenSymbol: 'SVPG', venueName: 'Atlantic Trading', timestamp: new Date().toISOString(), bestBid: '49.08', bestAsk: '49.35', spreadBps: 55, bidDepth: '450000', askDepth: '380000', volume24h: '420000', vwap24h: '49.22', inventoryLevel: '120000', qualityScore: 72, source: 'adapter' },
  { tokenSymbol: 'SVPG', venueName: 'Meridian OTC', timestamp: new Date().toISOString(), bestBid: '49.00', bestAsk: '49.50', spreadBps: 102, bidDepth: '800000', askDepth: '600000', volume24h: '180000', vwap24h: '49.15', inventoryLevel: '80000', qualityScore: 65, source: 'manual' },
];

export const mockAnomalies: AnomalyEvent[] = [
  {
    id: 'a1',
    venueName: 'Atlantic Trading',
    tokenSymbol: 'SVPG',
    anomalyType: 'price_deviation',
    severity: 'warning',
    description: 'Bid price deviated 8.2% from reference price for 12 minutes. Resolved — quote updated.',
    acknowledged: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

// ─── TREASURY ────────────────────────────────────────────

export const mockTreasuryAccounts: TreasuryAccount[] = [
  { id: 't1', name: 'Operating Account', ledgerType: 'fiat', currency: 'USD', balance: '8250000.00', custodian: 'First National Bank' },
  { id: 't2', name: 'USDC Reserve', ledgerType: 'stablecoin', currency: 'USDC', balance: '15000000.00', custodian: 'Circle' },
  { id: 't3', name: 'Token Treasury', ledgerType: 'token', currency: 'SVPG', balance: '2500000', custodian: 'Self-custody (multisig)' },
  { id: 't4', name: 'ETH Operations', ledgerType: 'crypto', currency: 'ETH', balance: '125.50', custodian: 'Fireblocks' },
];

// ─── AUDIT ───────────────────────────────────────────────

export const mockAuditEvents: AuditEvent[] = [
  { id: 'ae1', timestamp: new Date(Date.now() - 300000).toISOString(), eventType: 'token.minted', actorId: 'admin-001', actorRole: 'admin', targetType: 'token', targetId: 'SVPG', action: 'Minted 500,000 SVPG tokens', details: { amount: '500000', reason: 'Primary issuance — Series B allocation' } },
  { id: 'ae2', timestamp: new Date(Date.now() - 600000).toISOString(), eventType: 'compliance.whitelist_add', actorId: 'compliance-001', actorRole: 'compliance_officer', targetType: 'investor', targetId: 'inv-234', action: 'Added 0x7a2B...4f1c to SVPG whitelist', details: { address: '0x7a2B...4f1c', jurisdiction: 'US' } },
  { id: 'ae3', timestamp: new Date(Date.now() - 900000).toISOString(), eventType: 'reserve.attestation_published', actorId: 'admin-001', actorRole: 'admin', targetType: 'reserve', targetId: 'res-gold-001', action: 'Published Q1 2026 gold reserve attestation report' },
  { id: 'ae4', timestamp: new Date(Date.now() - 1200000).toISOString(), eventType: 'market.anomaly_detected', actorRole: 'system', targetType: 'venue', targetId: 'v2', action: 'Price deviation anomaly detected on Atlantic Trading', details: { deviation: '8.2%', duration: '12m' } },
  { id: 'ae5', timestamp: new Date(Date.now() - 1800000).toISOString(), eventType: 'treasury.settlement', actorId: 'treasury-001', actorRole: 'treasury_officer', targetType: 'treasury', targetId: 't2', action: 'Settled $2.5M USDC from primary issuance proceeds' },
];

// ─── REFERENCE TOKENS (competitive intelligence) ─────────

export const mockReferenceTokens: ReferenceToken[] = [
  {
    symbol: 'MPRA',
    name: 'Maya Preferred',
    issuer: 'UK Financial Ltd / Maya Preferred LLC',
    blockchain: 'Ethereum (CatEx-listed)',
    catexPriceUsdt: '777777443',
    realNavEstimate: 'Unknown — no reserve attestation',
    volume24h: '0.04',
    holderCount: 4,
    liquidityScore: 3,
    tradeDeskReady: false,
    issues: [
      'Synthetic pricing ($777M/token is self-referential)',
      'Only 4 holders — extreme concentration',
      'Near-zero real volume (0.04 MPRA/24h)',
      'Single venue (CatEx only)',
      'No stablecoin conversion path',
      'Proprietary wallet lock-in',
      'No NAV or reserve attestation',
    ],
  },
  {
    symbol: 'MPRD',
    name: 'Maya Preferred Dividend',
    issuer: 'UK Financial Ltd / Maya Preferred LLC',
    blockchain: 'Ethereum (CatEx-listed)',
    catexPriceUsdt: '54685.67',
    realNavEstimate: 'Unknown',
    volume24h: 'Negligible',
    holderCount: 4,
    liquidityScore: 2,
    tradeDeskReady: false,
    issues: [
      'Same issuer concentration as MPRA',
      'No independent price discovery',
      'No reserve backing disclosure',
    ],
  },
  {
    symbol: 'DIGau',
    name: 'Dignity Gold',
    issuer: 'Dignity Corp (via Tritaurian Capital BD)',
    blockchain: 'Ethereum',
    contractAddress: '0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E',
    catexPriceUsdt: undefined,
    realNavEstimate: 'Unknown — gold-backed claim unverified',
    volume24h: '0',
    holderCount: undefined,
    liquidityScore: 0,
    tradeDeskReady: false,
    issues: [
      'Zero liquidity — no DEX pool, no CEX orderbook',
      'No conversion path to stablecoin',
      'Dependent on third-party BD (Tritaurian)',
      'No investor portal or self-serve infrastructure',
      'No price discovery mechanism',
      'No reserve attestation dashboard',
    ],
  },
];

// ─── TRADE DESK QUALIFICATION ────────────────────────────

export const mockTradeDeskQualification: TradeDeskQualification = {
  tokenSymbol: 'SVPG',
  score: 82,
  status: 'conditional',
  assessedAt: new Date().toISOString(),
  nextReviewDate: new Date(Date.now() + 30 * 86400000).toISOString(),
  gates: [
    { id: 'g1', name: 'Minimum Value', description: '$10M+ stablecoin in settlement wallet', weight: 25, status: 'pass', value: '$15,200,000', threshold: '$10,000,000' },
    { id: 'g2', name: 'Asset Type', description: 'Settlement in USDT/USDC/BTC', weight: 10, status: 'pass', value: 'USDC (ERC-20)', threshold: 'Stablecoin or BTC' },
    { id: 'g3', name: 'Wallet Type', description: 'Self-custody or institutional wallet', weight: 5, status: 'pass', value: 'Fireblocks (multi-sig)', threshold: 'Non-custodial' },
    { id: 'g4', name: 'Holder Distribution', description: '≥25 unique holders', weight: 15, status: 'fail', value: '18 holders', threshold: '25 holders' },
    { id: 'g5', name: 'Liquidity Depth', description: '≥$500K aggregate bid within 5%', weight: 15, status: 'pass', value: '$1,650,000', threshold: '$500,000' },
    { id: 'g6', name: 'Price Integrity', description: 'NAV deviation ≤15%', weight: 15, status: 'pass', value: '0.92% premium', threshold: '≤15% deviation' },
    { id: 'g7', name: 'Compliance', description: 'KYC/AML on all holders above threshold', weight: 10, status: 'pending', value: '14/18 verified', threshold: '100% above $10K' },
    { id: 'g8', name: 'Multi-Venue', description: 'Listed on ≥2 venues', weight: 5, status: 'pass', value: '3 venues', threshold: '2 venues' },
  ],
};

// ─── HOLDER CONCENTRATION ────────────────────────────────

export const mockHolderConcentration: HolderConcentration = {
  tokenSymbol: 'SVPG',
  totalHolders: 18,
  top5Pct: 78.4,
  top10Pct: 92.1,
  herfindahlIndex: 0.142,
  giniCoefficient: 0.73,
  largestHolderPct: 25.0,
  medianHolding: '12500',
  distributionHealthy: false,
  holders: [
    { address: '0x7a2B...4f1c', label: 'Treasury (Self)', balance: '2500000', pctOfSupply: 25.0, isIssuer: true, isLocked: true },
    { address: '0x3eD1...8a9f', label: 'Genesis Investor A', balance: '2000000', pctOfSupply: 20.0, isIssuer: false, isLocked: false },
    { address: '0x91Ac...b2e6', label: 'Genesis Investor B', balance: '1500000', pctOfSupply: 15.0, isIssuer: false, isLocked: false },
    { address: '0xf4B8...c7d3', label: 'Market Maker Reserve', balance: '1000000', pctOfSupply: 10.0, isIssuer: false, isLocked: true },
    { address: '0x5c2D...9e1a', label: 'Series A Pool', balance: '840000', pctOfSupply: 8.4, isIssuer: false, isLocked: false },
    { address: '0xd8F0...3b5c', balance: '620000', pctOfSupply: 6.2, isIssuer: false, isLocked: false },
    { address: '0xa1E3...7f8d', balance: '450000', pctOfSupply: 4.5, isIssuer: false, isLocked: false },
    { address: '0x2bC4...6a0e', balance: '300000', pctOfSupply: 3.0, isIssuer: false, isLocked: false },
    { address: '0x8dA5...1c9b', balance: '200000', pctOfSupply: 2.0, isIssuer: false, isLocked: false },
    { address: '0x6eF1...4d2a', balance: '150000', pctOfSupply: 1.5, isIssuer: false, isLocked: false },
  ],
};

// ─── MPRA HOLDER CONCENTRATION (for comparison) ──────────

export const mockMpraHolderConcentration: HolderConcentration = {
  tokenSymbol: 'MPRA',
  totalHolders: 4,
  top5Pct: 100,
  top10Pct: 100,
  herfindahlIndex: 0.31,
  giniCoefficient: 0.92,
  largestHolderPct: 45.0,
  medianHolding: '2500000',
  distributionHealthy: false,
  holders: [
    { address: '0x????...????', label: 'Entity 1 (likely issuer)', balance: '4500000', pctOfSupply: 45.0, isIssuer: true, isLocked: false },
    { address: '0x????...????', label: 'Entity 2', balance: '2500000', pctOfSupply: 25.0, isIssuer: false, isLocked: false },
    { address: '0x????...????', label: 'Entity 3', balance: '2000000', pctOfSupply: 20.0, isIssuer: false, isLocked: false },
    { address: '0x????...????', label: 'Entity 4', balance: '1000000', pctOfSupply: 10.0, isIssuer: false, isLocked: false },
  ],
};

// ─── CONVERSION REQUESTS ─────────────────────────────────

export const mockConversionRequests: ConversionRequest[] = [
  { id: 'conv-1', fromToken: 'SVPG', toToken: 'USDC', fromAmount: '100000', toAmount: '4875000', method: 'otc_desk', status: 'completed', feeBps: 75, settlementWallet: 'Fireblocks Multi-sig', createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), completedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'conv-2', fromToken: 'SVPG', toToken: 'USDT', fromAmount: '50000', toAmount: '2437500', method: 'reserve_backed', status: 'settling', feeBps: 75, settlementWallet: 'Exodus (Primary)', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'conv-3', fromToken: 'SVCS', toToken: 'USDC', fromAmount: '200000', toAmount: '2460000', method: 'dex_aggregation', status: 'pending', feeBps: 50, createdAt: new Date(Date.now() - 3600000).toISOString() },
];

// ─── SETTLEMENT WALLETS ──────────────────────────────────

export const mockSettlementWallets: SettlementWallet[] = [
  { id: 'sw-1', label: 'Primary Settlement (Fireblocks)', address: '0x4a8B...9c3D', walletType: 'fireblocks', network: 'Ethereum', verified: true, balanceUsd: '15200000', tradeDeskAccepted: true },
  { id: 'sw-2', label: 'Exodus Wallet (Operations)', address: '0x7890E...C435A5b734', walletType: 'exodus', network: 'Ethereum', verified: true, balanceUsd: '2450000', tradeDeskAccepted: true },
  { id: 'sw-3', label: 'Coinbase Wallet (Crespo)', address: '0x7890E...C435A5b734', walletType: 'coinbase_wallet', network: 'Ethereum', verified: true, balanceUsd: '0', tradeDeskAccepted: true },
  { id: 'sw-4', label: 'Dignity Gold Wallet', address: '0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E', walletType: 'other', network: 'Ethereum', verified: false, balanceUsd: '0', tradeDeskAccepted: false },
];

// ─── ISSUER APPLICATIONS ─────────────────────────────────

export const mockIssuerApplications: IssuerApplication[] = [
  {
    id: 'issuer-mpra',
    stage: 'assessment',
    entityName: 'Maya Preferred Ltd',
    entityType: 'ltd',
    jurisdiction: 'United Kingdom',
    regulatoryStatus: 'pending',
    primaryContact: { name: 'Juan Soto', email: 'contact@mayapreferred.com', role: 'CEO' },
    token: {
      symbol: 'MPRA',
      name: 'Maya Preferred 223',
      standard: 'ERC-3643 (claimed)',
      blockchain: 'Ethereum',
      totalSupply: '21000000',
      holderCount: 4,
      walletRestriction: 'proprietary',
      existingVenues: ['CatEx'],
    },
    reserve: {
      assetType: 'mixed',
      claimedValue: '16317000000000',
      attestationStatus: 'self_reported',
    },
    qualificationScore: 12,
    qualificationStatus: 'not_qualified',
    remediationPlan: [
      { gateId: 'legal-entity', action: 'Complete UK Ltd registration filing + obtain LEI', status: 'not_started', cost: '$5,000' },
      { gateId: 'reserve-attestation', action: 'Engage independent mining assayer for reserve audit', status: 'not_started', cost: '$15,000-$30,000' },
      { gateId: 'custody-solution', action: 'Migrate from proprietary wallet to Fireblocks/BitGo custody', status: 'not_started', cost: '$10,000-$20,000' },
      { gateId: 'market-structure', action: 'Deploy Uniswap V3 pool + engage market maker (Wintermute/GSR)', status: 'not_started', cost: '$50,000-$100,000' },
      { gateId: 'compliance-kyc', action: 'Integrate KYC/AML provider (Chainalysis/Elliptic)', status: 'not_started', cost: '$5,000-$10,000' },
      { gateId: 'pricing-oracle', action: 'Deploy Chainlink oracle for NAV pricing', status: 'not_started', cost: '$10,000' },
      { gateId: 'investor-services', action: 'Launch investor portal with real-time proof-of-reserve', status: 'not_started' },
      { gateId: 'holder-distribution', action: 'Achieve minimum 25 verified holders via airdrop campaign', status: 'not_started' },
    ],
    fundingChannels: [
      { type: 'trade_desk', name: 'Trade Desk (Tim — 24h OTC)', status: 'blocked', requirements: ['$10M USDT collateral', 'Exodus wallet', 'KYC verified'], estimatedTimeline: '10 weeks', estimatedValue: '$100,000-$200,000' },
      { type: 'market_maker', name: 'Wintermute / GSR', status: 'blocked', requirements: ['Qualified custody', 'DEX pool deployed', '$50K+ initial liquidity'], estimatedTimeline: '8-12 weeks' },
      { type: 'lp_pool', name: 'Uniswap V3 MPRA/USDT Pool', status: 'blocked', requirements: ['Token migration from proprietary wallet', 'Realistic NAV pricing'], estimatedTimeline: '6-8 weeks' },
      { type: 'otc_desk', name: 'Genesis / Cumberland', status: 'blocked', requirements: ['Reserve attestation', 'Institutional custody', 'Legal opinion'], estimatedTimeline: '12-16 weeks' },
    ],
    estimatedCompletionWeeks: 10,
    estimatedYear1Revenue: '$250,000-$500,000',
    appliedAt: '2025-01-15T00:00:00Z',
    assessedAt: '2025-01-20T00:00:00Z',
  },
  {
    id: 'issuer-digau',
    stage: 'intake',
    entityName: 'Dignity Gold Inc',
    entityType: 'corp',
    jurisdiction: 'United States',
    regulatoryStatus: 'registered',
    primaryContact: { name: 'Operations Team', email: 'info@dignitygold.com', role: 'Operations' },
    bdRelationship: { name: 'Tritaurian Capital', finraId: 'CRD#XXXXXX', status: 'active' },
    token: {
      symbol: 'DIGau',
      name: 'Dignity Gold',
      standard: 'ERC-20',
      blockchain: 'Ethereum',
      contractAddress: '0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E',
      totalSupply: '100000000',
      holderCount: 0,
      walletRestriction: 'open',
      existingVenues: [],
    },
    reserve: {
      assetType: 'gold',
      claimedValue: '100000000',
      attestationStatus: 'none',
    },
    qualificationScore: 5,
    qualificationStatus: 'not_qualified',
    remediationPlan: [
      { gateId: 'reserve-attestation', action: 'Engage LBMA-standard gold assayer + provide custody proof', status: 'not_started', cost: '$10,000-$20,000' },
      { gateId: 'market-structure', action: 'Deploy DEX pool (Uniswap V3 DIGau/USDT) with initial liquidity', status: 'not_started', cost: '$30,000-$50,000' },
      { gateId: 'investor-services', action: 'Launch investor portal with gold reserve dashboard', status: 'not_started' },
      { gateId: 'pricing-oracle', action: 'Deploy Chainlink oracle pegged to LBMA gold fix', status: 'not_started', cost: '$10,000' },
      { gateId: 'compliance-kyc', action: 'Verify BD compliance pipeline with Tritaurian', status: 'not_started' },
      { gateId: 'holder-distribution', action: 'Seed minimum 25 holders via BD distribution', status: 'not_started' },
    ],
    fundingChannels: [
      { type: 'trade_desk', name: 'Trade Desk (Tim — 24h OTC)', status: 'blocked', requirements: ['$10M USDT collateral', 'Exodus wallet', 'KYC verified'], estimatedTimeline: '8 weeks', estimatedValue: '$80,000-$150,000' },
      { type: 'market_maker', name: 'Wintermute / GSR', status: 'blocked', requirements: ['DEX pool deployed', '$50K+ initial liquidity', 'Gold attestation'], estimatedTimeline: '6-10 weeks' },
      { type: 'lp_pool', name: 'Uniswap V3 DIGau/USDT Pool', status: 'blocked', requirements: ['Initial liquidity seed', 'Oracle pricing live'], estimatedTimeline: '4-6 weeks' },
      { type: 'institutional_placement', name: 'Institutional Placement via Tritaurian BD', status: 'blocked', requirements: ['Reserve attestation', 'Reg D/S filing complete', 'Investor portal live'], estimatedTimeline: '10-14 weeks', estimatedValue: '$200,000-$400,000' },
    ],
    estimatedCompletionWeeks: 8,
    estimatedYear1Revenue: '$200,000-$400,000',
    appliedAt: '2025-01-18T00:00:00Z',
  },
];
