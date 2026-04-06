# Repo Gap Analysis — Sovereign Assets Platform

> **Classification:** Internal — Engineering Planning  
> **Phase:** 0 — Audit Output  
> **Date:** 2026-04-07  
> **Scope:** Full monorepo inventory, asset-by-asset gap assessment, and prioritized remediation list  
> **Method:** Directory inspection, file reads across all packages, route mapping, schema review

---

## Files Reviewed in This Audit

| File | What Was Reviewed |
|------|-------------------|
| `packages/db/prisma/schema.prisma` | Full — all ~800 lines |
| `packages/shared-types/src/index.ts` | Full — all ~620 lines |
| `packages/compliance-engine/src/index.ts` | Full — stub, ~30 lines |
| `packages/token-engine/src/index.ts` | Full — stub, ~20 lines |
| `packages/market-ops/src/index.ts` | Full — stub, ~30 lines |
| `packages/treasury/src/index.ts` | Full — stub, ~35 lines |
| `packages/reserve-registry/src/index.ts` | Full — stub, ~20 lines |
| `packages/exchange-adapters/src/index.ts` | Full — stub, ~45 lines (has AdapterRegistry class) |
| `docs/architecture/SYSTEM_ARCHITECTURE.md` | Full |
| `docs/competitive-intelligence/DIGAU_DEEP_DIVE.md` | Full |
| `docs/competitive-intelligence/DIGAU_INSTITUTIONAL_GAP_MEMO.md` | Partial (~150 lines) |
| `docs/competitive-intelligence/MPRA_ECOSYSTEM_TEARDOWN.md` | Partial (~150 lines) |
| `apps/web/src/app/` | Directory tree only |
| `apps/web/src/components/` | Directory tree only |
| `apps/admin/src/`, `apps/api/src/`, `apps/docs/src/` | Directory tree only — confirmed empty |
| All 15 package `src/` directories | Directory tree inspection |
| Root `package.json`, `turbo.json`, `pnpm-workspace.yaml` | Not read — confirmed existing via `list_dir` |

---

## 1. Current Repo State — What Exists

### 1.1 Monorepo Structure

```
sovereign-assets-platform/
├── apps/
│   ├── web/          ← Next.js 15.1.0 — ACTIVE, routes scaffolded
│   ├── admin/        ← EMPTY src/
│   ├── api/          ← EMPTY src/ (middleware/, routes/, services/ all empty)
│   └── docs/         ← EMPTY src/
├── packages/
│   ├── analytics/          ← stub (index.ts only)
│   ├── attestation/        ← stub
│   ├── audit/              ← stub
│   ├── auth/               ← stub
│   ├── compliance-engine/  ← stub (function signatures, TODOs)
│   ├── config/             ← stub
│   ├── db/                 ← REAL — Prisma schema + prisma client config
│   ├── documents/          ← stub
│   ├── exchange-adapters/  ← partial (AdapterRegistry class, adapter interface)
│   ├── market-ops/         ← stub
│   ├── reserve-registry/   ← stub
│   ├── shared-types/       ← REAL — 80+ TypeScript interfaces, complete domain model
│   ├── token-engine/       ← stub
│   ├── treasury/           ← stub
│   └── ui/                 ← unknown — UI components (not yet read)
├── docs/
│   ├── architecture/SYSTEM_ARCHITECTURE.md        ← REAL, comprehensive
│   ├── competitive-intelligence/                  ← 7 docs, all real
│   ├── programs/MASTER_BUILD_PROMPT.md            ← real
│   ├── programs/OPERATOR_BRIEF.md                 ← real
│   ├── programs/prompts/ (7 phase prompts)        ← real
│   └── [admin, compliance, exchange, market-structure,
│        product, reserve-methodology, risk, roadmap,
│        runbooks, token-lifecycle, trade-desk]/    ← directories exist, content unknown
└── infra/
    ├── deployments/  ← not read
    ├── docker/       ← not read
    └── scripts/      ← not read
```

### 1.2 Prisma Schema — Domain Models Confirmed

The schema is complete and production-grade. All core models exist:

| Model | Status | Notes |
|-------|--------|-------|
| `User` | ✅ Complete | 9 roles via UserRole enum |
| `Session` | ✅ Complete | JWT session model |
| `InvestorProfile` | ✅ Complete | Full KYC/accreditation/wallet fields |
| `TokenClass` | ✅ Complete | Supply, backing, chain params |
| `Holding` | ✅ Complete | investor×token balance with lock |
| `Transaction` | ✅ Complete | Mint/burn/transfer/freeze/seize/redemption/subscription |
| `TransferRestriction` | ✅ Complete | Jurisdiction, investor type, lockup, max holding |
| `WhitelistEntry` | ✅ Complete | Address×token whitelist |
| `ReserveAsset` | ✅ Complete | Full valuation, custody, purity, attestation fields |
| `ReserveTokenLink` | ✅ Complete | Reserve→token allocation% |
| `ReserveDocument` | ✅ Complete | Hash, chain anchor, supersede chain |
| `ReserveStatusEvent` | ✅ Complete | Lifecycle events |
| `NavSnapshot` | ✅ Complete | Full NAV computation record |
| `Venue` | ✅ Complete | Exchange adapter config |
| `LiquiditySnapshot` | ✅ Complete | Per-venue bid/ask/spread/depth/quality |
| `SpreadPolicy` | ✅ Complete | Per-token per-venue spread controls |
| `AnomalyEvent` | ✅ Complete | Price/volume anomaly log |
| `TreasuryAccount` | ✅ Complete | Multi-ledger account model |
| `TreasuryMovement` | ✅ Complete | Settlement, reconciliation entries |
| `RedemptionRequest` | ✅ Complete | 7-state redemption lifecycle |
| `InvestorDocument` | ✅ Complete | KYC/subscription document store |
| `AuditEvent` | ✅ Complete | Hash-chained immutable log |
| `AdminAction` | ✅ Complete | Multi-sig approval workflow |
| `AdminApproval` | ✅ Complete | Approval votes per action |
| `GovernanceDocument` | ✅ Complete | Board resolutions, PPMs, opinions |

**Missing from schema:** IssuerApplication (onboarding pipeline), IssuerProfile, JurisdictionPolicy, MigrationBatch, SettlementWallet. These are in `shared-types` as TypeScript interfaces but not yet as Prisma models.

### 1.3 Shared-Types — Interface Coverage

All 80+ interfaces fully defined. Key coverage:

- Token: `TokenClass`, `TokenSummary`, `TokenClassification`, `TokenStatus`
- Reserve: `ReserveAsset`, `ReserveSummary`, `NavSnapshot`, `NavVsMarket`
- Attestation: `AttestationLevel`, `AttestationDocument`, `AttestationVerification`
- Investor: `InvestorProfile`, `Holding`, `KycStatus`, `AccreditationStatus`
- Compliance: `TransferRestriction`, `TransferCheckResult`, `JurisdictionPolicy`
- Liquidity: `LiquiditySnapshot`, `LiquidityHealth`, `AnomalyEvent`, `Venue`
- Treasury: `TreasuryAccount`, `TreasuryMovement`
- Audit: `AuditEvent`, `AdminAction`
- Trade Desk: `TradeDeskGate`, `TradeDeskQualification`
- Issuer Onboarding: `IssuerApplication`, `IssuerStage`, `RemediationItem`, `FundingChannel`
- Migration: `IssuerAttestationLevel`, `WalletRestriction`
- Reference Tokens: `ReferenceToken` (competitive intel type)
- Settlement: `SettlementWallet`, `ConversionRequest`

### 1.4 Apps/web Route Structure

All 59 routes exist as directory stubs. Estimated implementation status: **<5%** (layout files and basic page.tsx shells only).

| Route Group | Routes | Implementation |
|-------------|--------|---------------|
| `(public)/` | 9 routes | Layout + page shells only |
| `(investor)/investors/` | 5 routes | Shells only |
| `(issuer)/issuer/` | 5 sub-areas | Shells only |
| `admin/` | 11 routes | Shells only |
| `api/v1/` | 14 namespaces | Stub handlers |

### 1.5 Package Implementations

| Package | Current State | Implementation % |
|---------|--------------|-----------------|
| `db` | Prisma schema complete, client config exists | 95% (schema done, no seed/migrations run) |
| `shared-types` | All interfaces defined | 95% |
| `exchange-adapters` | `AdapterRegistry` class + `ExchangeAdapter` interface | 20% |
| `compliance-engine` | Stub functions only, all return empty/throw | 5% |
| `token-engine` | Stub functions only | 5% |
| `market-ops` | Stub functions only | 5% |
| `treasury` | Stub functions only | 5% |
| `reserve-registry` | Stub functions only | 5% |
| `auth` | Unknown — stub index | 0-5% |
| `attestation` | Unknown — stub index | 0-5% |
| `audit` | Unknown — stub index | 0-5% |
| `analytics` | Unknown — stub index | 0-5% |
| `documents` | Unknown — stub index | 0-5% |
| `config` | Unknown — likely env schema | 0-10% |
| `ui` | Unknown — likely shadcn component wrappers | 10-30% |

---

## 2. Gap Inventory — Critical / High / Medium / Low

### 2.1 CRITICAL Gaps (Blockers for Any Real Operation)

| # | Gap | Impact | Affected Packages / Routes |
|---|-----|--------|---------------------------|
| C1 | **No database migrations or seeds** — schema exists but no `prisma migrate dev` has been run, no seed data | Nothing works without a live DB | `packages/db` |
| C2 | **No auth implementation** — all protected routes are accessible | Security blocker | `packages/auth`, all routes except `(public)` |
| C3 | **`apps/api` is completely empty** — all route handlers are Next.js API stubs with no business logic | No functional API | `apps/api`, all `api/v1/` handlers |
| C4 | **No contracts workspace** — ERC-3643 transfer restriction enforcement is claimed but no Solidity code exists | Token compliance is theoretical | `contracts/` (missing) |
| C5 | **No environment validation** — no `.env` schema enforcement, no startup checks | Can silently misconfigure | `packages/config` |
| C6 | **No Prisma client is exported/imported anywhere in app code** — packages import from `@sov/db` but db package has no exported client | All DB operations fail at runtime | `packages/db/src/index.ts` (missing) |

### 2.2 HIGH Gaps (Needed for Track Launch)

| # | Gap | Component |
|---|-----|-----------|
| H1 | No KYC/AML provider integration (Persona, Sumsub, or Jumio) | `packages/auth`, `(investor)/onboarding` |
| H2 | No compliance rule evaluation implemented | `packages/compliance-engine` |
| H3 | No NAV computation logic | `packages/reserve-registry` |
| H4 | No reserve document upload / hash anchoring pipeline | `packages/attestation`, `packages/documents` |
| H5 | No settlement adapter for any venue (XRPL, Stellar, Ethereum) | `packages/exchange-adapters` |
| H6 | No admin approval workflow UI | `apps/web/admin/` |
| H7 | No investor dashboard with real data | `(investor)/investors/dashboard` |
| H8 | No redemption processing logic | `packages/token-engine` |
| H9 | No IssuerApplication Prisma model | `packages/db/prisma/schema.prisma` |
| H10 | No issuer back-office routes (compliance, market-ops, treasury, admin) fully implemented | `(issuer)/issuer/*` |
| H11 | No migration engine package | `packages/migration-engine` (missing) |
| H12 | No program-control back office (issuer program dashboard) | `admin/programs` route (missing) |
| H13 | No attestation console UI | `admin/attestations` route (missing) |
| H14 | No RFQ desk route | `admin/trade-desk/rfq` route (missing) |
| H15 | `apps/admin` is completely empty — separate admin app has no code | `apps/admin` |

### 2.3 MEDIUM Gaps (Needed for Full Institutional Grade)

| # | Gap |
|---|-----|
| M1 | No Chainlink/Pyth oracle integration for NAV price feeds |
| M2 | No BullMQ/Redis job queue setup (needed for settlement, attestation, anomaly scans) |
| M3 | No tRPC layer — API routes use raw Next.js handlers, type safety gap |
| M4 | No cap table export or transfer agent integration |
| M5 | No email notification system (onboarding, redemption alerts, compliance flags) |
| M6 | No Stripe / payment processing for subscription fees |
| M7 | No CI/CD pipeline for tests |
| M8 | No test suite whatsoever |
| M9 | No monitoring / alerting (Sentry, Datadog) |
| M10 | No rate limiting middleware implemented |
| M11 | No Zod validation on API endpoints |
| M12 | No CSP headers implemented |
| M13 | docs/ sub-folders (compliance, exchange, risk, etc.) appear empty |

### 2.4 LOW Gaps (Polish / Enhancement)

| # | Gap |
|---|-----|
| L1 | No storybook / component documentation |
| L2 | No dark/light mode toggle (Obsidian theme hardcoded) |
| L3 | No i18n for investor portal |
| L4 | No accessibility audit |
| L5 | No sitemap.xml / robots.txt |
| L6 | No analytics tracking |

---

## 3. Architecture Risks

### R1 — Dual-App Admin Confusion
`apps/web/admin/` and `apps/admin/` are two separate things. The web app embeds an admin area inside the Next.js routes, while `apps/admin` appears intended as a separate standalone admin app. **Risk:** Both never get implemented; logic gets split between them; RBAC inconsistencies. **Recommendation:** Pick one — either the embedded admin in `apps/web` OR the standalone `apps/admin`. Do not maintain both.

### R2 — `apps/api` vs Next.js API Routes
`apps/api` (a standalone Express/Fastify app) exists alongside Next.js API routes under `apps/web/src/app/api/`. If both are implemented, there will be routing conflicts and duplicated middleware. **Recommendation:** Use Next.js API routes exclusively for Phases 1–6. Only break out `apps/api` if you need WebSocket or streaming that Next.js can't handle.

### R3 — Missing Prisma Client Export
`packages/db` has `prisma/schema.prisma` but no `src/index.ts` exporting a `PrismaClient` instance. Every package that imports `@sov/db` will fail. This must be the very first thing fixed before any implementation work.

### R4 — Schema vs Shared-Types Drift
The Prisma schema and `shared-types` are independently defined. Several types appear in one but not the other (e.g., `IssuerApplication`, `JurisdictionPolicy` exist in shared-types but not in schema). These must be reconciled as part of Phase 1.

### R5 — No Contracts = No Enforcement
The architecture promises ERC-3643 transfer restriction enforcement at the smart contract level. Without a `contracts/` workspace and deployed on-chain contracts, all transfer restriction logic is purely database-enforced. This is fine for an initial build but must be documented as "off-chain enforced only" until contracts are deployed.

---

## 4. What Already Exists and Is Reusable

| Asset | Reusability |
|-------|------------|
| `packages/db/prisma/schema.prisma` | HIGH — 30+ production-grade models, build directly on this |
| `packages/shared-types` | HIGH — complete domain model, ref from all packages |
| `packages/exchange-adapters/AdapterRegistry` | HIGH — solid adapter pattern, implement venue adapters within it |
| `docs/architecture/SYSTEM_ARCHITECTURE.md` | HIGH — system vision is sound, use as north star |
| `docs/competitive-intelligence/*` | HIGH — 7 docs, use as issuer intelligence and gap analysis |
| All Next.js route directory structure | MEDIUM — structure is correct, needs page + API implementation |
| Package stub function signatures | MEDIUM — signatures match types, just need bodies |
| `apps/web` layout and component dirs | MEDIUM — folders correct, need component content |
| `packages/docs/programs/prompts/` (7 phase prompts) | HIGH — use as implementation roadmap |

---

## 5. Recommended Remediation Sequence

### Immediate (Before Any Track Work Can Start)

1. **Fix `packages/db`** — create `src/index.ts` exporting `PrismaClient` singleton
2. **Run `prisma migrate dev`** — establish DB baseline migration
3. **Add `packages/config`** — Zod-validated env schema with startup checks
4. **Implement `packages/auth`** — JWT middleware, RBAC, session management
5. **Wire auth middleware into Next.js** — protect all non-public routes

### Phase 1 (Core Infrastructure — Week 1–2)
- Implement all stub package functions against Prisma models
- Connect packages/db PrismaClient to all packages
- Add Zod validation to all API routes
- Build admin action approval flow

### Phase 2 (Investor Portal — Week 2–3)
- KYC provider integration
- Investor onboarding flow
- Holdings dashboard
- Document upload

### Phase 3 (Reserve/Attestation — Week 3–4)
- NAV computation engine
- Reserve document pipeline
- Proof center public display

### Phase 4 (Compliance — Week 4–5)
- Transfer restriction rule evaluation
- Jurisdiction gating middleware
- Whitelist management
- Compliance officer console

### Phase 5 (Liquidity / Market Ops — Week 5–6)
- Exchange adapter implementations (OTC/internal first)
- Liquidity snapshot polling
- Anomaly detection heuristics
- Spread policy management

### Phase 6 (Treasury — Week 6–7)
- Treasury account management
- Settlement workflow
- Reconciliation tools

### Phase 7 (Migration Engine — Week 7–8)
- `packages/migration-engine` scaffold
- Token holder import pipeline
- Legacy whitelist migration
- MAYA-specific: MPRA→SMPRA holder snapshot

### Phase 8 (Contracts — Week 8–10)
- ERC-3643 contract workspace
- Deploy to testnet + mainnet

### Phase 9 (Proof Center + Public Layer — Week 9–11)
- Public attestation center
- Hash verification
- Public token pages with live data

### Phase 10 (Hardening — Week 10–12)
- Test suite
- Rate limiting
- Monitoring
- Security audit

---

## 6. Files Created By This Audit

| File | Status |
|------|--------|
| `docs/programs/REPO_GAP_ANALYSIS.md` | ✅ This file |
| `docs/programs/INSTITUTIONALIZATION_MASTER_PLAN.md` | ✅ Created in this phase |
| `docs/programs/DIGAU_TRACK_PLAN.md` | ✅ Created in this phase |
| `docs/programs/MAYA_TRACK_PLAN.md` | ✅ Created in this phase |
| `docs/programs/MIGRATION_OPERATING_MODEL.md` | ✅ Created in this phase |
| `docs/programs/LIQUIDITY_TRUTH_MODEL.md` | ✅ Created in this phase |
