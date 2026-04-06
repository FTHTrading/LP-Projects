# System Architecture — Sovereign Assets Platform

## 1. Executive Summary

The Sovereign Assets Platform (SAP) is a full-stack operating system for entities that issue asset-backed digital tokens and must prove to regulators, investors, and counterparties that their reserves, compliance, and secondary-market operations meet institutional standards.

It replaces the pattern visible in current market participants — marketing-heavy token sites with thin operational infrastructure — with a **machine-backed issuer OS** where every claim is attestable, every action is auditable, and every market-data point carries source attribution.

---

## 2. Competitive Teardown

### 2.1 Maya Preferred (MPRA / MPRD / SMPRA)

**What they show publicly:**
- Gold/silver-backed token narrative under UK Financial Ltd
- Dual-class structure: MPRA (preferred), MPRD (common/dividend), SMPRA (ERC-3643 upgrade)
- CEO updates, mine/project reserve narratives, proof document PDFs
- CatEx exchange listing (MPRA/USDT), with notice of suspension for SMPRA upgrade
- ERC-3643 security token claims for SMPRA

**What's missing:**
- No live reserve attestation dashboard
- No machine-verifiable proof-of-reserves
- No investor onboarding flow (KYC/KYB/accreditation)
- No transfer restriction enforcement UI
- No cap table synchronization
- No compliance officer tooling
- No transparent NAV computation
- No market-data quality controls (CatEx shows anomalous figures)
- No redemption/subscription mechanics
- No custody/settlement transparency
- No audit trail viewer
- No legal structure diagram
- No broker-dealer / transfer agent workflow

### 2.2 Dignity Gold (DIGau)

**What they show publicly:**
- Gold-reserve-backed security token (DIGau)
- Broker-dealer distribution language mentioning Tritaurian Capital
- Explicit disclaimer: "Dignity Corp is not a registered broker-dealer"
- Professional landing page with institutional aspirations

**What's missing:**
- No visible issuance operating system
- No reserve dashboard or attestation engine
- No investor portal with KYC/accreditation
- No compliance workflow UI
- No market-making controls
- No secondary liquidity infrastructure
- No treasury management interface
- No data room or disclosure versioning
- No clear explanation of token rights vs equity vs commodity exposure
- Dependency on third-party BD (Tritaurian) with no visible integration

### 2.3 CatEx Exchange (MPRA/USDT Market)

**What they show publicly:**
- MPRA/USDT trading pair with orderbook
- Anomalous price figures (numbers that don't match any rational valuation)
- Trade history with suspicious volume patterns
- Announcement re: MPRA suspension for SMPRA upgrade

**What's missing:**
- No source attribution on pricing
- No market surveillance or anomaly flagging
- No circuit breakers
- No reference pricing from NAV or reserves
- No venue quality scoring
- No issuer-controlled halt mechanisms
- Volume/price patterns that would fail institutional due diligence

---

## 3. Gap Analysis Matrix

| Capability | Maya | Dignity | CatEx | SAP Target |
|---|---|---|---|---|
| Reserve attestation dashboard | ❌ | ❌ | N/A | ✅ Machine-verifiable |
| NAV computation engine | ❌ | ❌ | ❌ | ✅ Multi-source, timestamped |
| Investor KYC/KYB/accreditation | ❌ | ❌ | Basic | ✅ Jurisdiction-gated |
| Transfer restriction engine | Claimed | ❌ | ❌ | ✅ ERC-3643 integrated |
| Compliance officer console | ❌ | ❌ | ❌ | ✅ Full workflow |
| Token lifecycle admin | ❌ | ❌ | ❌ | ✅ Mint/burn/freeze/seize |
| Cap table sync | ❌ | ❌ | ❌ | ✅ Real-time |
| Market data quality | ❌ | N/A | ❌ Anomalous | ✅ Source-attributed |
| Anomaly detection | ❌ | N/A | ❌ | ✅ Heuristic + alerts |
| Circuit breakers | ❌ | N/A | ❌ | ✅ Configurable |
| Redemption mechanics | ❌ | ❌ | N/A | ✅ Window-based |
| Treasury management | ❌ | ❌ | N/A | ✅ Multi-asset |
| Audit trail | ❌ | ❌ | ❌ | ✅ Immutable log |
| Data room / disclosures | PDF only | ❌ | N/A | ✅ Versioned, signed |
| Legal structure transparency | Weak | Weak | N/A | ✅ Entity diagram |
| Broker-dealer workflow | ❌ | Outsourced | N/A | ✅ Integrated |
| Market maker onboarding | ❌ | ❌ | ❌ | ✅ Structured |
| Liquidity health dashboard | ❌ | ❌ | ❌ | ✅ Real-time |

---

## 4. Trust-Risk Matrix

| Risk | Maya Exposure | Dignity Exposure | SAP Mitigation |
|---|---|---|---|
| Unverifiable reserve claims | HIGH — narrative without machine proof | MEDIUM — mentions gold but no dashboard | Attestation engine with hash-anchored reports |
| Token legal ambiguity | HIGH — MPRA/SMPRA status unclear | MEDIUM — security token but no visible offering docs | Classification taxonomy with disclosure markers |
| Market manipulation perception | HIGH — CatEx anomalous prints | LOW — no active trading surface | Anomaly detection, circuit breakers, source attribution |
| Counterparty reliance | MEDIUM — CatEx is sole venue | HIGH — Tritaurian dependency | Multi-venue, adapter framework |
| Investor protection gaps | HIGH — no KYC/accreditation visible | MEDIUM — BD handles, but no UI | Integrated onboarding with jurisdiction gating |
| Regulatory action risk | HIGH | MEDIUM | Compliance-first architecture with export packages |

---

## 5. Product Architecture

### 5.1 Layer Model

```
┌─────────────────────────────────────────────────────┐
│  A. PUBLIC WEB LAYER                                 │
│     Institutional landing, token pages, proof center,│
│     market structure, liquidity, newsroom, legal     │
├─────────────────────────────────────────────────────┤
│  B. INVESTOR PORTAL                                  │
│     KYC/KYB, accreditation, dashboard, holdings,     │
│     documents, redemptions, corporate actions         │
├─────────────────────────────────────────────────────┤
│  C. TOKENIZATION & COMPLIANCE ENGINE                 │
│     ERC-3643, whitelist/blacklist, jurisdiction rules,│
│     transfer restrictions, cap table, mint/burn/freeze│
├─────────────────────────────────────────────────────┤
│  D. RESERVE / PROOF / ATTESTATION LAYER              │
│     Asset registry, valuation engine, proof ingestion,│
│     attestation dashboard, hash anchoring             │
├─────────────────────────────────────────────────────┤
│  E. LIQUIDITY / LP / MARKET STRUCTURE LAYER          │
│     Quote engine, spread policies, venue routing,     │
│     anomaly detection, circuit breakers, OTC/RFQ      │
├─────────────────────────────────────────────────────┤
│  F. TREASURY / CUSTODY / SETTLEMENT LAYER            │
│     Multi-asset ledgers, signer policies, settlement, │
│     reconciliation, reserve movements                 │
├─────────────────────────────────────────────────────┤
│  G. GOVERNANCE / DATA ROOM                           │
│     Board resolutions, PPMs, opinion letters,         │
│     versioned disclosures, signed document registry   │
├─────────────────────────────────────────────────────┤
│  H. INSTITUTIONAL BACK OFFICE                        │
│     Admin, compliance officer, treasury, IR,          │
│     market ops, support, alerts, audit trail          │
└─────────────────────────────────────────────────────┘
```

### 5.2 Data Flow

```
Reserve Assets → Valuation Engine → NAV Computation
                                          ↓
Token Supply ← Mint/Burn Engine ← Compliance Check ← Investor Request
                                          ↓
Secondary Markets ← Quote Engine ← Reference Price ← NAV + Market Data
                        ↓
              Anomaly Detection → Circuit Breaker → Halt / Alert
                        ↓
              Venue Router → CEX / DEX / OTC Adapters
                        ↓
              Settlement Engine → Treasury Ledgers → Reconciliation
```

---

## 6. Tech Stack Justification

| Choice | Rationale |
|--------|-----------|
| **Next.js 15 App Router** | SSR for SEO on public pages, RSC for performance, API routes co-located, Vercel-deployable |
| **TypeScript** | Type safety across 14 packages prevents domain model drift |
| **Tailwind + shadcn/ui** | Rapid institutional UI development without CSS overhead |
| **Prisma + PostgreSQL** | Type-safe queries, migration tracking, relational integrity for financial data |
| **viem + wagmi** | Modern EVM library stack, TypeScript-native, tree-shakeable |
| **Recharts** | React-native charting with institutional-grade customization |
| **BullMQ + Redis** | Reliable job queues for settlement, indexing, report generation |
| **tRPC** | End-to-end type safety between client and server without code generation |

---

## 7. Security Architecture

- **Role-based access control (RBAC)** with issuer/compliance/treasury/investor/public roles
- **Jurisdiction gating** at the middleware level — blocked jurisdictions never see restricted content
- **Transfer restriction enforcement** at both smart contract and API layers
- **Audit log immutability** — append-only event store, no deletions
- **Document signing** — SHA-256 hash anchoring for all published reports
- **API authentication** — JWT with short expiry + refresh tokens
- **Rate limiting** — per-endpoint, per-role
- **Input validation** — Zod schemas at every API boundary
- **CSP headers** — strict content security policy on all pages

---

## 8. Deployment Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vercel     │     │  PostgreSQL  │     │    Redis     │
│  (Next.js)   │────▶│  (Supabase   │     │  (Upstash/   │
│              │     │   or RDS)    │     │   managed)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                        │
       ▼                                        ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  S3-compat   │     │  Chain RPC   │     │  BullMQ      │
│  (docs/files)│     │  (Infura/    │     │  Workers     │
│              │     │   Alchemy)   │     │              │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 9. Event / Indexing Plan

### Domain Events
- `token.minted`, `token.burned`, `token.transferred`, `token.frozen`, `token.seized`
- `investor.registered`, `investor.kyc_approved`, `investor.accredited`, `investor.whitelisted`
- `reserve.asset_added`, `reserve.valuation_updated`, `reserve.attestation_published`
- `compliance.rule_created`, `compliance.rule_updated`, `compliance.transfer_blocked`
- `treasury.deposit`, `treasury.withdrawal`, `treasury.settlement`
- `market.quote_generated`, `market.trade_executed`, `market.anomaly_detected`, `market.circuit_breaker_triggered`
- `document.uploaded`, `document.signed`, `document.published`
- `admin.action_taken`, `admin.approval_requested`, `admin.approval_granted`

### Chain Indexing
- ERC-3643 `Transfer`, `Frozen`, `Unfrozen` events
- Identity registry changes
- Compliance module updates
- Block-by-block indexing with cursor persistence

---

## 10. API Route Plan

```
/api/v1/tokens
  GET    /              — list token classes
  GET    /:id           — token detail
  POST   /:id/mint      — mint (admin)
  POST   /:id/burn      — burn (admin)
  POST   /:id/freeze    — freeze address (compliance)
  POST   /:id/transfer  — restricted transfer

/api/v1/reserves
  GET    /              — reserve summary
  GET    /assets        — individual assets
  GET    /nav           — current NAV
  GET    /history       — NAV history

/api/v1/attestations
  GET    /              — list attestations
  GET    /:id           — attestation detail
  POST   /              — publish attestation (admin)
  GET    /:id/verify    — verify hash anchoring

/api/v1/investors
  POST   /register      — begin onboarding
  GET    /me            — investor profile
  GET    /me/holdings   — token holdings
  GET    /me/history    — transaction history
  POST   /me/redeem     — redemption request

/api/v1/compliance
  GET    /rules         — active rules
  POST   /rules         — create rule
  POST   /check         — check transfer eligibility
  GET    /whitelist     — whitelisted addresses
  POST   /whitelist     — add to whitelist

/api/v1/treasury
  GET    /balances      — treasury balances
  GET    /movements     — reserve movements
  POST   /settle        — initiate settlement
  GET    /reconciliation — reconciliation status

/api/v1/liquidity
  GET    /health        — liquidity health metrics
  GET    /venues        — venue status
  GET    /spreads       — current spreads
  GET    /anomalies     — detected anomalies

/api/v1/market-data
  GET    /prices        — current prices by venue
  GET    /reference     — internal reference price
  GET    /nav-vs-market — NAV vs market comparison
  GET    /volume        — volume by venue

/api/v1/admin
  GET    /audit-log     — audit events
  POST   /action        — admin action (with approval workflow)
  GET    /approvals     — pending approvals

/api/v1/documents
  GET    /              — list documents
  GET    /:id           — document detail
  POST   /              — upload document (admin)
  GET    /:id/download  — download document
```
