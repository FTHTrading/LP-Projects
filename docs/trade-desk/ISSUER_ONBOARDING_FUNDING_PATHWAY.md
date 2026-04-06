# Issuer Onboarding & Funding Pathway — Architecture

> **Classification:** Internal — Platform Architecture  
> **Date:** 2026-04-06  
> **Scope:** The complete infrastructure for onboarding external issuers (MPRA, DIGau, and future clients) onto our platform and guiding them from broken infrastructure to funded, trading, trade-desk-qualified assets  
> **Key insight:** We're not just building a platform — we're building an issuer rescue operation that generates recurring revenue

---

## 1. Issuer Onboarding Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ISSUER ONBOARDING PIPELINE                    │
├─────────────┬──────────────┬──────────────┬─────────────────────┤
│  STAGE 1    │  STAGE 2     │  STAGE 3     │  STAGE 4            │
│  INTAKE     │  ASSESSMENT  │  REMEDIATION │  ACTIVATION         │
├─────────────┼──────────────┼──────────────┼─────────────────────┤
│ Entity info │ Score 8      │ Fix gaps     │ Go-live:            │
│ Token data  │ qualification│ Deploy       │ - Investor portal   │
│ Reserve     │ gates        │ infrastructure│ - Market making    │
│ claims     │ Map gaps to  │ Seed holders │ - Trade desk submit │
│ Legal docs  │ platform     │ Create       │ - Monitoring        │
│ Team info   │ modules      │ liquidity    │                     │
│ Wallet info │              │ Convert to   │                     │
│ BD info     │              │ stablecoin   │                     │
└─────────────┴──────────────┴──────────────┴─────────────────────┘
```

## 2. Data Model — Issuer Entity

```
IssuerApplication
├── id: string (uuid)
├── stage: intake | assessment | remediation | activation | live | suspended
├── entityName: string
├── entityType: LLC | Corp | Ltd | Trust | SPV | Foundation
├── jurisdiction: string
├── regulatoryStatus: unregistered | pending | registered | exempt
├── primaryContact: { name, email, role }
├── bdRelationship: { name, finraId?, status }
│
├── Token Info
│   ├── symbol, name, standard (ERC-20 | ERC-3643 | ERC-1400)
│   ├── blockchain, contractAddress?
│   ├── totalSupply, circulatingSupply
│   ├── holderCount, walletRestriction (open | proprietary)
│   └── existingVenues: string[]
│
├── Reserve Info
│   ├── assetType: gold | silver | minerals | real_estate | mixed | other
│   ├── custodian?, vaultLocation?
│   ├── claimedValue: string (USD)
│   ├── lastAuditDate?, auditor?
│   └── attestationStatus: none | self_reported | third_party | machine_verified
│
├── Qualification
│   ├── score: 0-100
│   ├── gates: TradeDeskGate[]
│   └── status: qualified | conditional | not_qualified
│
├── Remediation Plan
│   ├── items: { gate, action, status, dueDate }[]
│   ├── estimatedCompletionWeeks
│   └── totalCost: string
│
├── Funding Readiness
│   ├── conversionReady: boolean
│   ├── tradeDeskReady: boolean
│   ├── settlementWallet?: SettlementWallet
│   ├── estimatedConvertibleValue: string
│   └── fundingChannels: FundingChannel[]
│
├── Timeline
│   ├── appliedAt, assessedAt?, remediationStartedAt?
│   ├── activatedAt?, tradeDeskApprovedAt?
│   └── estimatedTradeDeskDate?
│
└── Revenue
    ├── onboardingFee: string
    ├── monthlyLicense: string
    ├── conversionFeeBps: number
    └── estimatedYear1Revenue: string
```

## 3. Funding Channels

| Channel | Description | Requirements | Timeline | Revenue to Platform |
| --- | --- | --- | --- | --- |
| **Trade Desk** | OTC trading via Tim's desk | $10M USDT, Exodus wallet, 8-gate pass | 24h from deposit | $25K intro + 75bps |
| **OTC Desk** | Block trade via Genesis/Cumberland | NAV attestation, $5M+ block | 1-2 weeks | 50bps facilitation |
| **Market Maker** | Liquidity provision via Wintermute/GSR | Compliance, multi-venue, $250K+ | 2-4 weeks | 25bps on committed |
| **LP Pool** | DEX liquidity via Uniswap/Curve | ERC-20, oracle, $500K+ TVL | 1-2 weeks | LP management fee |
| **Institutional Placement** | Family office / fund subscription | ERC-3643, investor portal, full compliance | 4-8 weeks | Placement fee 2-5% |
| **Stablecoin Yield** | Park converted USDT in yield protocols | Stablecoin in settlement wallet | Immediate | Pass-through + 50bps |

## 4. Pricing Tiers

### Tier 1 — Rescue (MPRA/DIGau profile)
For issuers with existing tokens, zero/broken infrastructure.

| Item | Fee |
| --- | --- |
| Onboarding assessment | $10,000 |
| Infrastructure deployment | $50,000 - $100,000 |
| Monthly platform license | $10,000 - $15,000 |
| Conversion facilitation | 75 bps |
| Trade desk introduction | $25,000 |
| Ongoing attestation | $2,500/month |

### Tier 2 — Launch
For new issuers deploying from scratch on our platform.

| Item | Fee |
| --- | --- |
| Token design + deployment | $25,000 |
| Full platform setup | $75,000 |
| Monthly platform license | $15,000 |
| Conversion facilitation | 50 bps |
| Trade desk introduction | $25,000 |
| Ongoing attestation | $2,500/month |

### Tier 3 — Enterprise
For institutions deploying multiple token classes.

| Item | Fee |
| --- | --- |
| Custom deployment | $150,000+ |
| Monthly platform license | $25,000+ |
| All transaction fees | Negotiated |
| White-label option | Available |
| Dedicated support | Included |

## 5. Infrastructure Components (Platform Modules Used)

| Module | Package | Used By |
| --- | --- | --- |
| Issuer application intake | `apps/web` admin routes | Onboarding |
| 8-gate qualification scorer | `@sov/market-ops` | Assessment |
| Holder concentration analyzer | `@sov/analytics` | Assessment |
| ERC-3643 deployment pipeline | `@sov/token-engine` | Remediation |
| DEX pool deployer | `@sov/exchange-adapters` | Remediation |
| NAV computation engine | `@sov/reserve-registry` | Remediation |
| Stablecoin conversion rails | `@sov/treasury` | Conversion |
| Settlement wallet verifier | `@sov/auth` | Wallet setup |
| Market maker onboarding | `@sov/market-ops` | Liquidity |
| Trade desk qualification export | `@sov/compliance` | Trade desk |
| Investor portal (per-issuer) | `apps/web` | Activation |
| Ongoing monitoring dashboard | `apps/web` admin | Live |

## 6. MPRA Onboarding — Specific Execution Plan

| Week | Actions | Platform Modules | Gate Impact |
| --- | --- | --- | --- |
| 1 | Intake, 8-gate assessment, remediation plan | Intake form, scorer | Baseline score |
| 2 | Deploy ERC-3643 wrapper for MPRA, migrate from proprietary wallet | Token engine | G3 (wallet) |
| 3-4 | Holder seeding: 50+ accredited holders via placement | Compliance, investor portal | G4 (distribution) |
| 5 | Deploy Uniswap V3 pool + 2 MMs | Exchange adapters, market ops | G5 (liquidity), G8 (multi-venue) |
| 6-7 | NAV computation from reserve claims, attestation pipeline | Reserve registry | G6 (price integrity) |
| 8 | KYC/AML on all holders, compliance package | Compliance engine | G7 (compliance) |
| 9 | Convert $10M+ to USDT via reserve redemption | Conversion rails, treasury | G1 (value), G2 (asset type) |
| 10 | Submit to trade desk, 24hr approval | Trade desk export | All gates |

**Expected score trajectory:** 0 → 82 (after week 8) → 92 (after week 9) → Qualified

## 7. DIGau Onboarding — Specific Execution Plan

| Week | Actions | Platform Modules | Gate Impact |
| --- | --- | --- | --- |
| 1 | Intake, 8-gate assessment (no wallet migration needed) | Intake form, scorer | Baseline score |
| 2 | NAV computation: gold oz × LBMA fix / supply | Reserve registry | G6 (price integrity) |
| 3 | Deploy investor portal with Tritaurian BD integration | Investor portal, compliance | G7 (compliance) |
| 4 | Deploy Uniswap V3 pool on Base/Arbitrum (low gas) | Exchange adapters | G5 (liquidity) |
| 5 | Onboard 2 MMs, list on second venue | Market ops | G5, G8 |
| 6 | Holder distribution campaign: 50+ holders | Compliance, analytics | G4 (distribution) |
| 7 | Convert $10M+ gold-backed value to USDT | Conversion rails | G1, G2 |
| 8 | Submit to trade desk, 24hr approval | Trade desk export | All gates |

**Expected score trajectory:** 0 → 78 (after week 6) → 90 (after week 7) → Qualified

## 8. Success Metrics

| Metric | MPRA Target | DIGau Target | Timeline |
| --- | --- | --- | --- |
| Qualification score | ≥ 85 | ≥ 85 | 10 weeks / 8 weeks |
| Unique holders | ≥ 50 | ≥ 50 | Week 4 / Week 6 |
| DEX TVL | ≥ $500K | ≥ $500K | Week 5 / Week 4 |
| Settlement wallet balance | ≥ $10M USDT | ≥ $10M USDT | Week 9 / Week 7 |
| Trade desk approval | Approved | Approved | Week 10 / Week 8 |
| Platform Year 1 revenue | $250K-$500K | $200K-$400K | 12 months |
