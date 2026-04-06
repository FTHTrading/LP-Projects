# Sovereign Assets Platform — Operator Brief

> **For:** Dev team, partners, institutional counterparties  
> **Date:** 2026-04-06  
> **Status:** Architecture locked, execution beginning

---

## The Play

We **do not try to save broken token optics with another chain or another listing**.
We build **one real institutional operating system** underneath both projects, keep both brands **separate**, freeze the legacy chaos, and migrate them into a structure that institutions can actually underwrite.

---

## What That Means in Plain English

### 1. One Shared Engine

We build a single backend universe with:
- reserve registry
- compliance engine
- treasury ledger
- investor portal
- proof center
- liquidity / RFQ / OTC desk
- audit trail
- migration engine

That is the machinery both issuers run on.

### 2. Two Separate Issuer Tracks

**Dignity track:** institutionalize what already exists.  
**Maya track:** rebuild and migrate into one clean flagship asset.

Same engine. Different storefronts. Different cap-table logic. Different disclosures. Different rollout.

### 3. Stop Treating "Liquidity" Like Exchange Listings

Real liquidity is:
- subscribe at credible NAV
- redeem at credible NAV
- approved counterparties
- market-maker inventory
- OTC / RFQ flow
- venue controls
- spread policy
- anomaly detection
- circuit breakers

That is how you get serious money comfortable.

### 4. Legacy Gets Contained

We treat the current weak token rails as **legacy only**:
- snapshot holders
- verify claims
- run KYC/KYB
- get legal acceptance
- mint new canonical asset
- freeze or retire legacy paths

No more building on top of shaky foundations.

### 5. Chain Strategy Is Secondary

The core investable asset should be issued correctly on a **compliant canonical rail**.
Then XRPL or Stellar can be used as **settlement / treasury sidecars**, not as the magic fix for liquidity.

### 6. Funding Comes After Institutional Readiness

First we make them **fundable**:
- clean structure
- proof
- controls
- data room
- market-ops logic
- migration plan

Then you go after:
- broker-dealer channels
- family offices
- mining finance
- strategic partners
- controlled private capital

---

## The Sequence

| Phase | Focus | Outcome |
|-------|-------|---------|
| **1** | Audit what exists, identify weak points, lock target structure | Architecture plan + gap analysis |
| **2** | Build the issuer OS: proof, compliance, treasury, investor portal, admin back office | Domain model + shared packages |
| **3** | Deploy canonical token architecture and migration rails | ERC-3643 contract suite + settlement adapters |
| **4** | Build API layer connecting all systems | Type-safe routes, auth, audit logging |
| **5** | Launch frontend surfaces: public site, investor portal, back office | Institutional-grade UI |
| **6** | Launch controlled liquidity: OTC, RFQ, approved market makers, policy-driven routing + migration engine | Business-critical systems |
| **7** | Proof center + production hardening | Deployable, auditable platform |

---

## Bottom Line

The mission is simple:  
**Turn both projects from token stories into institutional products.**

Not hype first.  
Not exchange first.  
**Structure first, proof first, liquidity mechanics first, capital after.**

---

## Execution Files

The build is controlled by 7 phased prompt files, each scoped to prevent model collapse:

| File | Scope |
|------|-------|
| `docs/programs/prompts/PHASE_0_AUDIT_AND_PLAN.md` | Read-only repo audit + 6 planning docs |
| `docs/programs/prompts/PHASE_1_2_SCHEMA_AND_PACKAGES.md` | Prisma schema (~60 models) + 15 shared packages |
| `docs/programs/prompts/PHASE_3_4_CONTRACTS_AND_SETTLEMENT.md` | 11 Solidity contracts + 3 settlement adapters |
| `docs/programs/prompts/PHASE_5_API_LAYER.md` | 28 route groups (public + investor + admin) |
| `docs/programs/prompts/PHASE_6_FRONTEND_SURFACES.md` | 3 UI surfaces + 16 institutional components |
| `docs/programs/prompts/PHASE_7_8_LIQUIDITY_AND_MIGRATION.md` | Liquidity engine + migration engine |
| `docs/programs/prompts/PHASE_9_10_PROOF_AND_HARDENING.md` | Proof center + production hardening |

Run in order. No skipping. Each phase carries forward from the last.
