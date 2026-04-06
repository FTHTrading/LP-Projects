# Institutionalization Master Plan — Sovereign Assets Platform

> **Classification:** Internal — Program Strategy  
> **Phase:** 0 — Planning Output  
> **Date:** 2026-04-07  
> **Scope:** Complete 10-phase execution plan to build the shared issuer operating system and deliver both the DIGAU and MAYA tracks  
> **Authority:** This document governs sequencing decisions across all build phases. Track-specific plans (DIGAU_TRACK_PLAN.md, MAYA_TRACK_PLAN.md) operate under this document.

---

## Executive Summary

The Sovereign Assets Platform (SAP) is being built as a single shared infrastructure that supports multiple security token issuers operating under a unified compliance, reserve, and market operations framework.

**Two issuers are in the launch cohort:**
1. **DIGau (Dignity Gold)** — Gold-backed security token on Ethereum mainnet. Zero liquidity, real BD relationship (Tritaurian Capital), $6B gold reserve claim requiring proof infrastructure. *Fastest to institutionalize: 8 weeks.*
2. **MAYA/MPRA (UK Financial Ltd / Maya Preferred)** — 6-token ecosystem on Ethereum + Solana. CatEx-listed with anomalous pricing. No BD. Requires migration from MPRA (ERC-20) to SMPRA (ERC-3643). *Most complex: 16+ weeks.*

**The architecture is shared.** Both issuers use the same:
- Database (Prisma/PostgreSQL, isolated by `tokenId` and `issuer` foreign keys)
- Compliance engine (transfer restriction rules, jurisdiction gating)
- Reserve registry (attestation, valuation, NAV computation)
- Treasury ledger (multi-asset, multi-issuer accounts)
- Market ops layer (exchange adapters, anomaly detection, circuit breakers)
- Admin back office (RBAC-controlled, per-issuer context)

**The programs are separate.** Each issuer has its own:
- `IssuerApplication` and `IssuerProfile` records
- `TokenClass` registrations
- `ReserveAsset` portfolios
- `InvestorProfile` pools
- Compliance rules and transfer restrictions
- Market-making parameters and venue configurations

---

## 1. Current State

As of the Phase 0 audit (2026-04-07):

| Layer | Status |
|-------|--------|
| Monorepo structure | ✅ Complete — 4 apps, 15 packages, 59 routes |
| Domain model (Prisma schema) | ✅ Complete — 30+ models, all production-grade |
| Type system (shared-types) | ✅ Complete — 80+ interfaces |
| Documentation (architecture, CI/competitive intel) | ✅ Strong — 9+ substantial docs |
| Package implementations | ❌ All stubs — 0–5% implemented |
| API handlers | ❌ All stubs |
| Auth system | ❌ Not implemented |
| Database (migrations, client export) | ❌ Not runnable |
| On-chain contracts | ❌ No contracts workspace |
| Migration engine | ❌ Package missing |
| Test suite | ❌ Not started |

**Bottom line:** The platform has excellent bones — domain model, type system, and architecture vision are production-grade. Everything above the schema layer needs to be built.

---

## 2. Target State

At full build-out, the platform delivers:

| Capability | Description |
|-----------|-------------|
| Issuer OS | Multi-tenant back office for token issuers with full RBAC |
| Investor Portal | Self-serve KYC/accreditation, holdings, redemptions |
| Reserve & Proof Center | Machine-verifiable attestations, live NAV dashboard |
| Compliance Engine | Real-time transfer restriction evaluation, whitelist mgmt |
| Market Operations | Exchange adapter framework, anomaly detection, circuit breakers |
| Treasury Ledger | Multi-asset settlement, reconciliation, approval workflows |
| Migration Engine | Batch holder import, legacy token snapshot, SMPRA upgrade path |
| Public Web Layer | Institutional-grade public pages with live proof data |
| Contracts Layer | ERC-3643 security token contracts, jurisdiction enforcement |
| Audit Trail | Immutable hash-chained event log across all operations |

---

## 3. Program Architecture

### 3.1 Shared Infrastructure vs Track-Specific

```
┌─────────────────────────────────────────────────────────────┐
│                  SHARED ISSUER OS                           │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   packages/  │  │    apps/     │  │     infra/       │  │
│  │  compliance  │  │    web       │  │    postgres       │  │
│  │  token-eng   │  │   (shared)   │  │    redis          │  │
│  │  reserve-reg │  │              │  │    queue          │  │
│  │  treasury    │  │              │  │    vault          │  │
│  │  market-ops  │  │              │  │                  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
          ┌──────────────────┴─────────────────┐
          │                                     │
┌─────────▼──────────┐             ┌────────────▼──────────┐
│   DIGAU TRACK      │             │   MAYA TRACK          │
│                    │             │                       │
│  TokenClass: DIGau │             │  TokenClass: MPRA     │
│  ReserveAssets:    │             │  TokenClass: SMPRA    │
│    gold ounces     │             │  ReserveAssets:       │
│  BD: Tritaurian    │             │    mining claims      │
│  8-week timeline   │             │  Migration: MPRA→SMPRA│
│                    │             │  16-week timeline     │
└────────────────────┘             └───────────────────────┘
```

### 3.2 Issuer Isolation Model

Multi-tenancy is achieved through data scope, not app isolation:

- All `TokenClass`, `ReserveAsset`, `InvestorProfile` records belong to an issuer context
- Admin users are scoped to `issuerIds[]` in their `User` record
- API middleware validates `issuerContext` on every request
- No cross-issuer data leakage is possible at the Prisma query level

This allows both tracks to share infrastructure while maintaining complete data separation.

---

## 4. Gap Summary (From REPO_GAP_ANALYSIS.md)

**Critical blockers (must fix before any track launch):**
- C1: No DB migrations/seeds
- C2: No auth implementation
- C3: `apps/api` empty — no business logic anywhere
- C4: No contracts workspace
- C5: No env validation
- C6: `packages/db` has no `src/index.ts` — PrismaClient not exported

**High-priority gaps (needed for Track 1 launch):**
- KYC provider integration
- Compliance rule evaluation
- NAV computation
- Reserve document pipeline
- Admin approval workflow
- Issuer onboarding models in schema

---

## 5. Phased Execution Plan

### Phase 0 — Audit and Planning (CURRENT)
**Duration:** 1–2 days  
**Output:** 6 planning documents (this file + 5 siblings)  
**No code changes. Read-only.**

### Phase 1 — Foundation and Schema (Week 1–2)
**Goal:** Make the platform runnable for the first time.

| Task | Package / File | Priority |
|------|---------------|---------|
| Create `packages/db/src/index.ts` with PrismaClient export | `packages/db` | BLOCKER |
| Run `prisma migrate dev --name init` | `packages/db` | BLOCKER |
| Add missing Prisma models: IssuerProfile, IssuerApplication, JurisdictionPolicy, MigrationBatch, SettlementWallet | `schema.prisma` | HIGH |
| Create `packages/config/src/index.ts` with Zod env validation | `packages/config` | HIGH |
| Implement `packages/auth` — JWT, RBAC, session | `packages/auth` | HIGH |
| Wire auth middleware into Next.js app | `apps/web` | HIGH |
| Implement all stub packages against Prisma | All `packages/*` | HIGH |
| Create seed script with demo issuer, token, reserve data | `packages/db/prisma/seed.ts` | MEDIUM |

**Dependencies:** None — this is the root.  
**Risk:** Schema migrations are destructive. Run in dev only until validated.

### Phase 2 — Investor Portal (Week 2–4)
**Goal:** First end-to-end investor experience.

| Task | Route / Package |
|------|----------------|
| KYC/AML provider integration (Persona or Sumsub) | `packages/auth`, `(investor)/onboarding` |
| Investor registration and accreditation flow | `(investor)/investors/onboarding` |
| Holdings dashboard with real token balances | `(investor)/investors/dashboard` |
| Document upload and status tracking | `(investor)/investors/documents` |
| Redemption request submission | `(investor)/investors/redemptions` |
| Investor API routes: GET /investors/:id, PUT /investors/:id/kyc | `api/v1/investors/` |

**Dependencies:** Phase 1 complete (auth, DB).  
**Risk:** KYC provider API costs money immediately — set up sandbox keys first.

### Phase 3 — Reserve and Proof Center (Week 3–5)
**Goal:** Machine-readable reserve proof pipeline live.

| Task | Package / Route |
|------|----------------|
| `reserve-registry`: implement `getReserveSummary`, `computeNav`, `registerAsset` | `packages/reserve-registry` |
| Document upload pipeline with SHA-256 hashing + S3 storage | `packages/documents`, `packages/attestation` |
| Chain anchoring service (Ethereum/Polygon calldata write) | `packages/attestation` |
| NAV snapshot scheduler (daily cron via BullMQ) | `packages/reserve-registry` |
| Admin attestation console UI | `admin/reserves` |
| Public proof center pages | `(public)/proof-center` |
| Reserve API routes | `api/v1/reserves/`, `api/v1/attestations/` |

**Dependencies:** Phase 1 complete.  
**Risk:** Chain anchoring requires gas budget. Use Ethereum calldata (cheapest) or Polygon.

### Phase 4 — Compliance Engine (Week 4–6)
**Goal:** Real transfer restriction enforcement.

| Task | Package / Route |
|------|----------------|
| `compliance-engine`: implement rule evaluation pipeline | `packages/compliance-engine` |
| Jurisdiction policy CRUD and lookup | `packages/compliance-engine` |
| Whitelist management (add/remove by address+tokenId) | `packages/compliance-engine` |
| KYC status check before whitelist add | integration with `packages/auth` |
| Compliance officer console UI | `admin/compliance`, `(issuer)/issuer/compliance` |
| Transfer restriction API routes | `api/v1/compliance/` |
| Jurisdiction gating Next.js middleware | `apps/web/src/middleware.ts` |

**Dependencies:** Phases 1–2 (investor KYC needed for whitelist eligibility).  
**Risk:** Jurisdiction rules have legal implications. Document all rule decisions with compliance counsel sign-off.

### Phase 5 — API Layer Completion (Week 5–7)
**Goal:** All API route stubs replaced with real handlers.

| Task | Priority |
|------|---------|
| All `api/v1/tokens/` routes | HIGH |
| All `api/v1/reserves/` routes | HIGH |
| All `api/v1/investors/` routes | HIGH |
| All `api/v1/compliance/` routes | HIGH |
| All `api/v1/treasury/` routes | MEDIUM |
| All `api/v1/market-data/` routes | MEDIUM |
| All `api/v1/trade-desk/` routes | MEDIUM |
| All `api/v1/analytics/` routes | LOW |
| Zod validation on all endpoints | ALL |
| Rate limiting middleware | ALL |

**Dependencies:** Phases 1–4.  
**Risk:** Large surface area. Prioritize endpoints needed for DIGAU track first.

### Phase 6 — Frontend Surfaces (Week 6–9)
**Goal:** All UI surfaces wired to real data.

Priority order:
1. Public token pages (for issuers to share with investors)
2. Investor portal (dashboard, holdings, redemptions)
3. Proof center (public attestations, NAV chart)
4. Admin back office (for ops team)
5. Issuer back office (for DIGAU/MAYA team use)

**Dependencies:** Phases 1–5.

### Phase 7 — Migration Engine (Week 7–9)
**Goal:** MAYA/MPRA migration capability functional.

| Task | Package |
|------|---------|
| Scaffold `packages/migration-engine` | NEW |
| Token holder snapshot importer (from on-chain/CSV) | `packages/migration-engine` |
| Balance verification and reconciliation | `packages/migration-engine` |
| Whitelist batch migration | integration with `packages/compliance-engine` |
| Admin migration command center UI | `admin/migration` (new route) |
| MPRA → SMPRA upgrade batch processing | MAYA track specific |

**Dependencies:** Phases 1–4.  
**Risk:** On-chain holder data can be large. Batch processing required. Test with Ethereum testnet snapshot first.

### Phase 8 — Liquidity and Market Ops (Week 8–11)
**Goal:** Market operations layer functional with real venue data.

| Task | Package |
|------|---------|
| Exchange adapter implementations: OTC/internal first, CatEx second | `packages/exchange-adapters` |
| `market-ops`: implement `getLiquidityHealth`, `detectAnomalies` | `packages/market-ops` |
| Spread policy management UI | `admin/market-ops` |
| Anomaly detection dashboard | `admin/market-ops/anomalies` |
| Circuit breaker configuration | `(issuer)/issuer/market-ops` |
| BullMQ snapshot polling jobs | `packages/market-ops` |
| RFQ desk UI for OTC trades | `admin/trade-desk/rfq` (new route) |

**Dependencies:** Phases 1–5.

### Phase 9 — On-Chain Contracts (Week 9–12)
**Goal:** ERC-3643 enforcement on-chain.

| Task | Workspace |
|------|----------|
| Scaffold `contracts/` workspace (Hardhat or Foundry) | NEW |
| ERC-3643 compliance contract with jurisdiction and whitelist rules | `contracts/` |
| Deployment scripts (testnet + mainnet) | `contracts/scripts/` |
| Contract address configuration flow in admin | `packages/config` |
| On-chain transfer restriction verification | `packages/token-engine` |

**Dependencies:** Phases 1–6 (need investor and compliance data to configure contract).  
**Risk:** Contract deployment is irreversible. Full audit required before mainnet.

### Phase 10 — Proof and Hardening (Week 11–14)
**Goal:** Production-ready, audited, monitored.

| Task |
|------|
| Full test suite (unit, integration, E2E with Playwright) |
| Security audit (OWASP Top 10 review) |
| Contract audit (third-party auditor) |
| Sentry error monitoring |
| Rate limiting + DDoS hardening |
| Performance optimization |
| Runbook completion |
| Disaster recovery playbook |

---

## 6. Dependencies Map

```
Phase 0 (Audit)
    │
    ▼
Phase 1 (Foundation) ─────────────────────────────────────────┐
    │                                                          │
    ├─► Phase 2 (Investor Portal) ──────────────────────────── │
    │       │                                                  │
    ├─► Phase 3 (Reserve/Proof)                               │
    │       │                                                  │
    ├─► Phase 4 (Compliance Engine)                           │
    │       │                                                  │
    └─► Phase 5 (API Layer) ◄── depends on 2, 3, 4            │
            │                                                  │
            ├─► Phase 6 (Frontend) ◄── depends on 5            │
            │                                                  │
            ├─► Phase 7 (Migration) ◄── depends on 4           │
            │                                                  │
            ├─► Phase 8 (Market Ops) ◄── depends on 5          │
            │                                                  │
            └─► Phase 9 (Contracts) ◄── depends on 6           │
                    │                                          │
                    └─► Phase 10 (Hardening) ◄─────────────────┘
```

---

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| KYC vendor delay | LOW | HIGH | Pre-integrate sandbox; have fallback manual review flow |
| Schema migration destroys data | MEDIUM | HIGH | Never auto-migrate in prod; always script migrations explicitly |
| Contract security vulnerability | LOW | CRITICAL | Phase 9 runs last; two independent audits required |
| DIGAU BD relationship changes | LOW | HIGH | Architecture must not be Tritaurian-coupled |
| MAYA migration complexity underestimated | HIGH | MEDIUM | Allocation: 2× the estimated time for Phase 7 |
| Regulatory change affects token classification | LOW | HIGH | All compliance rules are table-driven, not hard-coded |
| apps/admin vs apps/web admin confusion | HIGH | MEDIUM | Decision: use apps/web/admin/, deprecate apps/admin/ |
| apps/api vs Next.js API route confusion | HIGH | MEDIUM | Decision: use Next.js API routes only in Phases 1–9 |

---

## 8. Assumptions

1. PostgreSQL database is available (local or cloud) before Phase 1 begins.
2. Ethereum mainnet is the primary chain for ERC-20/ERC-3643 tokens (both tracks).
3. The DIGAU track has a real commercial relationship with Dignity Corp underway or pending.
4. The MAYA track has consent from UK Financial Ltd to execute the MPRA→SMPRA migration.
5. Tritaurian Capital's BD integration is API-accessible or at minimum workflowable via email hooks.
6. `apps/admin` will be **deprecated** — all admin work goes into `apps/web/admin/`.
7. `apps/api` will **not be implemented** — all API work goes into Next.js API routes.
8. Redis is available for BullMQ job queues (Phase 3+).

---

## 9. Rollout Order for Phases 1–10

**Recommended execution order based on dependency graph and business value:**

```
1. Phase 1  — Foundation (blockers cleared, DB running, auth wired)
2. Phase 3  — Reserve/Proof (fastest visible value: live NAV dashboard)
3. Phase 2  — Investor Portal (DIGAU needs investor onboarding early)
4. Phase 4  — Compliance Engine (required for investor whitelist)
5. Phase 5  — API Layer (connects all packages to UI)
6. Phase 6  — Frontend (investor portal + public pages go live)
7. Phase 7  — Migration Engine (MAYA track unblocked)
8. Phase 8  — Market Ops (liquidity layer operational)
9. Phase 9  — Contracts (on-chain enforcement added last)
10. Phase 10 — Hardening (production readiness)
```

**DIGAU Track can soft-launch after Phase 6.**  
**MAYA Track requires Phases 7–8 before soft-launch.**  
**Both tracks require Phase 10 before institutional investor exposure.**

---

## 10. Success Criteria

| Milestone | Criteria |
|-----------|---------|
| Phase 1 Complete | App starts, auth works, DB has real data |
| DIGAU Soft Launch | Investor can register, KYC, see holdings, view reserve proof |
| DIGAU Trade Desk Ready | 8-gate qualification scores 80+, $10M+ reserve value verifiable |
| MAYA Soft Launch | MPRA holders migrated to SMPRA, compliance rules active |
| Full Platform Launch | Both tracks live, all 10 phases complete, external audit passed |
