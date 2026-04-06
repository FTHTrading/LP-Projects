# MAYA Track Plan — UK Financial Ltd / Maya Preferred Migration and Rebuild

> **Classification:** Internal — Program Track Strategy  
> **Phase:** 0 — Planning Output  
> **Date:** 2026-04-07  
> **Track:** MAYA — UK Financial Ltd / Maya Preferred  
> **Tokens:** MPRA, MPRD, SMPRA (primary); WMPRA, RPWMPRA, MCAT (secondary)  
> **Governing Doc:** INSTITUTIONALIZATION_MASTER_PLAN.md

---

## Executive Summary

The MAYA track is the more complex of the two launch issuers. UK Financial Ltd / Maya Preferred has built an extensive presentation layer — 6 tokens, 3 mining claims, 8 executives, 43+ press articles, and a CatEx listing — over what the on-chain reality shows as a near-empty token ecosystem.

Unlike DIGAU (which needs infrastructure built on top of an existing asset), MAYA needs:
1. **Pricing reality correction** — $924M/token on CatEx is not a market price. It is a fantasy print that will destroy institutional credibility.
2. **Token migration** — MPRA (ERC-20) → SMPRA (ERC-3643). This is already in progress publicly. We provide the infrastructure to execute it properly.
3. **Broker-dealer acquisition** — MAYA has no registered BD. This is a regulatory gap that must be resolved before any US investor activity.
4. **Mining claim linkage** — Three mining claims exist with geological data. None are verifiably linked to token supply.
5. **Wallet de-lock** — MPRA has a proprietary wallet. This restricts token mobility to a single interface and prevents institutional custody.

**Timeline:** 16+ weeks. This is not a fast-track case. The complexity of the migration, the BD gap, and the pricing unwinding make this a longer-cycle institutionalization.

**Strategic value:** If successfully institutionalized, MAYA/MPRA represents a larger revenue opportunity than DIGAU due to the scale of claimed reserves and the wider existing investor base.

---

## 1. Token Ecosystem Profile

| Token | Standard | Chain | Status | Notes |
|-------|---------|-------|--------|-------|
| MPRA | ERC-20 | Ethereum | Active (CatEx) | Primary public token. Proprietary wallet. 9 holders. |
| SMPRA | ERC-3643 | Ethereum | Claimed / in progress | Security token upgrade. Migration from MPRA in progress publicly. |
| MPRD | ERC-20 | Ethereum | Active | "Common/dividend" class. Limited market activity. |
| MCAT | SPL | Solana | Active | MayaCat meme coin. No institutional relevance. Separate risk. |
| WMPRA | ERC-20 | Ethereum | "Coming Soon" | Wrapped MPRA. Not yet deployed. |
| RPWMPRA | ERC-20 | Ethereum | "Coming Soon" | Reward-bearing WMPRA. Not yet deployed. |

**Primary focus for institutionalization:** MPRA → SMPRA migration. MPRD as secondary. MCAT excluded from institutional track.

---

## 2. Entity Profile

| Field | Value |
|-------|-------|
| Legal Entity | UK Financial Ltd |
| UK Address | 128 City Road, London EC1V 2NX (virtual office — registered agent) |
| US Address | 8 The Green, STE A, Dover, DE 19901 (CT Corporation registered agent) |
| Mexico Entity | UK Financial of Mexico Ltd (President: Nicolas Chidlovsky, no address) |
| CEO | Nicolas Chidlovsky (or equivalent — name appears in mining claim docs) |
| President, Mexico | Nicolas Chidlovsky |
| Team Size | 8 named executives + mining advisors |
| Broker-Dealer | ❌ None |
| Exchange | CatEx (MPRA/USDT) — listing currently suspended for SMPRA upgrade |
| Press Coverage | 43+ articles across BlockchainReporter, CryptoNews, etc. |
| CMC Listing | ✅ CoinMarketCap listing with "99.1 rating" |

---

## 3. Current State Assessment

### 3.1 What MAYA Has

| Asset | Status | Institutional Value |
|-------|--------|---------------------|
| 6 deployed contracts | ✅ On-chain | Low — ERC-20 without compliance |
| 3 mining claims (geolocation, assays, hectarage) | ✅ Documented | High — if linkable to token |
| CatEx listing + trading pair | ✅ Active (suspended for upgrade) | Negative — pricing anomaly is a liability |
| 43+ press articles | ✅ Existing | Low-medium — crypto press only, not institutional |
| CMC listing | ✅ Exists | Low — CMC is not an institutional signal |
| ERC-3643 SMPRA claim | ⚠️ Claimed, not verified | High — if properly deployed |
| Executive team (8 people) | ✅ Named | Medium — verifiable backgrounds needed |
| Mining advisor relationships | ✅ Named | Medium — needs evidence beyond press releases |
| Legal entities (3 jurisdictions) | ✅ UK, US, Mexico | Neutral — all virtual office registrations |

### 3.2 What MAYA Is Missing

| Gap | Severity | Notes |
|-----|---------|-------|
| No broker-dealer | CRITICAL | Cannot distribute securities in the US without one |
| No reserve proof (mining claims not linked to tokens) | CRITICAL | $924M market cap claim unsupported |
| No investor portal | CRITICAL | No self-serve purchase/redeem mechanism |
| Proprietary MPRA wallet (wallet lock-in) | HIGH | Blocks DEX/CEX/institutional custody |
| Anomalous CatEx pricing ($924M/token) | HIGH | Destroys institutional credibility |
| ERC-3643 migration not executed | HIGH | SMPRA is claimed but infrastructure missing |
| No transfer restriction enforcement | HIGH | Any "security token" claim is invalid without enforcement |
| Minting is unrestricted (no cap in contract) | HIGH | CEO can mint unlimited tokens |
| 9 holders on flagship token | HIGH | Market cap claim is entirely fictional |
| No compliance infrastructure | HIGH | Cannot onboard institutional investors |
| No NAV methodology | MEDIUM | Mineral reserves are harder to price than gold spot |

### 3.3 The Pricing Problem — Root Cause Analysis

MPRA trades on CatEx at approximately $924M per token. This is not a bug — it is likely either:

1. **Low-volume pricing artifact:** A few tokens traded at a high price in a thin orderbook. With 9 holders, total circulating supply is tiny, and a single OTC-style trade can establish any price.
2. **Favorable optics:** A high per-token price looks impressive to retail investors unfamiliar with market cap math. With 9 holders, the "market cap" is noise.
3. **Intentional construction:** Less likely, but if token supply was deliberately constrained to keep the per-token price high, this is a form of market manipulation.

**The correct institutional metric is NAV per token**, derived from verified reserve value / total supply. Until MAYA can compute a real NAV, no institutional investor will touch this.

**Unwinding strategy:** Accept that public price may crater from $924M when real trading begins. This is not a failure — it is a correction. The narrative must be reframed: "SMPRA launches with a verified NAV-based price, replacing the legacy MPRA trading price."

---

## 4. Target State (16 Weeks)

| Milestone | Target | Description |
|-----------|--------|-------------|
| Entity Assessment Complete | Week 2 | Full entity map, beneficial ownership, BD gap documented |
| BD Partner Identified | Week 4 | Registered BD for US distribution (may mirror Tritaurian model) |
| MPRA Holder Snapshot | Week 3 | On-chain snapshot of all MPRA holders + balances |
| SMPRA Contract Deployed | Week 6 | ERC-3643 contract on testnet, then mainnet |
| MPRA → SMPRA Migration Live | Week 8 | First holders migrated |
| Reserve Proof Pipeline | Week 6 | Mining claim documents ingested, NAV methodology published |
| Investor Portal | Week 8 | KYC, accreditation, holdings for SMPRA holders |
| Compliance Rules Active | Week 10 | Transfer restrictions, whitelist, jurisdiction gating |
| CatEx SMPRA Re-listing | Week 12 | New listing at NAV-anchored price |
| Market Maker Onboarded | Week 14 | Committed two-sided liquidity |
| Trade Desk Qualification | Week 16 | 8-gate score target: 70+ |

---

## 5. Gap Summary (MAYA-Specific)

**From REPO_GAP_ANALYSIS.md (shared infrastructure gaps apply equally).**

**MAYA-specific additional gaps:**

| Gap | Severity | Phase to Address |
|-----|---------|-----------------|
| No broker-dealer relationship | CRITICAL | Pre-Phase 1 (business development) |
| No SMPRA (ERC-3643) contract | CRITICAL | Phase 9 (Contracts) |
| No migration engine package | CRITICAL | Phase 7 (Migration Engine) |
| Anomalous CatEx pricing requires narrative management | HIGH | Phase 0 (communications plan) |
| Proprietary MPRA wallet requires migration tooling | HIGH | Phase 7 |
| Minting controls need to be set in new SMPRA contract | HIGH | Phase 9 |
| Mining claim value methodology (not gold spot) | MEDIUM | Phase 3 (Reserve registry) |
| MCAT (Solana meme coin) creates brand confusion | MEDIUM | Communications strategy |

---

## 6. Phased Execution Plan (MAYA-Specific)

### Pre-Phase: Business Development (Weeks 1–4, parallel with Phase 1)

These must happen before any technical build targeting MAYA-specific functionality:

1. **Contract with UK Financial Ltd** — platform service agreement, revenue share, data access
2. **BD partner research** — identify 2–3 FINRA-registered BDs willing to work with a mining-backed RWA token
3. **Mining claim verification** — engage third-party geological assessor to verify assay reports
4. **Legal opinion** — US securities counsel opinion on MPRA/SMPRA classification
5. **BD selection + engagement** — sign engagement letter with chosen BD
6. **MCAT isolation** — document that MCAT (Solana meme coin) is entirely separate from the securities track; no institutional commingle

### Week 1–2 — Platform Foundation (Shared with DIGAU)
- Phase 1 blockers cleared (DB, auth, PrismaClient) — shared with DIGAU
- Create `IssuerProfile` for UK Financial Ltd in DB
- Register `TokenClass` for MPRA (type=legacy, status=MIGRATING)
- Register `TokenClass` for SMPRA (type=SECURITY_TOKEN, status=PAUSED — pre-contract)
- Register `TokenClass` for MPRD (type=COMMON, status=ACTIVE)

### Week 3 — MPRA Holder Snapshot
- Read all MPRA holders from Ethereum mainnet (Etherscan API or direct eth_getLogs + Transfer events)
- Record each holder: address, balance, first acquisition date
- Import into `MigrationBatch` model (to be added to schema)
- Reconcile total holder balances with on-chain total supply
- Identify holder categories: team wallets, investor wallets, exchange wallets
- Flag: CatEx hot wallet, any locked/restricted wallets

### Week 4–6 — Reserve Proof (MAYA Slice)
- Ingest mining claim documentation: geological surveys, assay reports, GPS coordinates, hectarage
- Attestation level: `SELF_REPORTED` initially (documents provided by issuer, not third-party audited)
- Create metadata model for mineral reserve methodology:
  - Methodology differs from gold: not spot price × ounces
  - Instead: `reserve_tonnage × grade_ppm × recovery_rate × commodity_spot × discount_factor`
  - This requires a custom `ValuationMethodology` field in `ReserveAsset`
- Compute illustrative NAV range (not a firm NAV) pending third-party geological audit
- Publish "reserve disclosure" on proof center with explicit `SELF_REPORTED` label
- Do NOT publish "$924M" or "$6B" type figures. Publish only what can be independently supported.

### Week 6 — SMPRA Contract (ERC-3643)
**This requires Phase 9 (Contracts workspace) to be stood up.**
- Deploy ERC-3643 compliance contract on Ethereum testnet (Sepolia)
- Key ERC-3643 features to implement:
  - `isVerified(address)` → checks our whitelist DB via off-chain oracle
  - `transfer()` → reverts if either party is not whitelisted
  - `forcedTransfer()` → admin-only (for seized/frozen tokens)
  - `freeze(address)` / `unfreeze(address)` → compliance hold
  - `mint()` / `burn()` → admin-only, multi-sig required
  - **Supply cap**: hardcode max_supply in constructor (prevents unlimited minting)
- Mainnet deployment after testnet validation

### Week 7–8 — MPRA → SMPRA Migration
**Requires Phase 7 (Migration Engine) to be operational.**
- Build migration pipeline:
  1. Take final MPRA holder snapshot (freeze date announced to holders)
  2. Validate all holder balances against on-chain state
  3. Apply compliance filter: which addresses are KYC-eligible for SMPRA?
  4. For eligible addresses: mint SMPRA 1:1 to MPRA balance
  5. For ineligible addresses: flag for manual review, publish redemption window
  6. MPRA contract: pause or revoke (depending on contract capability)
- Migration command center UI: batch review, approve, execute
- Holder communication system: email + on-chain event

### Week 8–10 — Investor Portal (MAYA Slice)
- All SMPRA holders registered in investor portal after migration
- KYC backfill: existing holders prompted to complete KYC to maintain whitelisted status
- New investor onboarding: same flow as DIGAU
- MPRD holders: separate investor profile with MPRD holdings

### Week 10–12 — Compliance Activation
- Transfer restrictions implemented for SMPRA: jurisdiction-gated, whitelist-only
- Advisory: consider blocking US persons unless BD is active (Reg D compliance)
- Transfer restriction rule set: US until BD engaged (BLOCK), non-US persons (ALLOW if KYC)
- Compliance officer console for UK Financial Ltd team

### Week 12 — CatEx Re-listing
- Provide CatEx with:
  - SMPRA contract address (replaces MPRA)
  - NAV methodology document
  - Reserve proof link
  - Compliance certification (that CatEx users will be KYC'd or market is non-US)
- New listing at NAV-anchored price (not $924M)
- Initial price = published NAV (e.g., $0.XX per SMPRA based on verified reserve methodology)
- Market depth target: ≥ $500K two-sided before re-listing

### Week 14 — Market Maker
- Onboard 1–2 market makers for SMPRA/USDT pair
- Same MM framework as DIGAU (spread obligations, inventory commitments)
- Additional requirement: MM must be non-US or have BD relationship for US activity

### Week 16 — Trade Desk Qualification
- Run 8-gate qualification. Expected gate performance:
  1. Reserve attestation: MEDIUM — self-reported, needs third-party upgrade
  2. NAV methodology: MEDIUM — mineral-based, not gold spot
  3. KYC/accreditation: HIGH — post-migration, holders KYC'd
  4. Compliance rules: HIGH — SMPRA is ERC-3643
  5. Liquidity: MEDIUM — re-listed on CatEx + 1 market maker
  6. Market maker: MEDIUM — 1 active (target 2)
  7. Settlement wallet: HIGH — Exodus registered
  8. Legal structure: MEDIUM — BD gap is the weak point
- Target score: 70+ (lower than DIGAU due to BD gap and mineral reserve methodology complexity)

---

## 7. MCAT Isolation Policy

MCAT (the Solana SPL meme coin branded "MayaCat") must be kept **entirely separate** from the securities track:

- MCAT does **not** appear in the institutional platform under any issuer context
- No `TokenClass` registration for MCAT in the securities platform
- All public materials must explicitly distinguish MCAT (speculative/utility) from MPRA/SMPRA (security tokens)
- If UK Financial Ltd wants MCAT supported, it goes in a separate, clearly labeled non-institutional context

**Risk:** If MCAT is associated with SMPRA in any investor communication, it creates regulatory risk (treating the meme coin as implicitly backed by the same gold reserves).

---

## 8. Dependencies

| Dependency | Type | Owner |
|-----------|------|-------|
| Phase 1 (DB + auth) | Technical | Engineering |
| Phase 7 (Migration Engine) | Technical | Engineering (BLOCK on MAYA migration) |
| Phase 9 (Contracts — ERC-3643) | Technical | Engineering (BLOCK on SMPRA) |
| Phase 3 (Reserve/Proof) | Technical | Engineering |
| BD partner engagement | Business | Platform BD team |
| UK Financial Ltd contract signing | Business | Platform BD team |
| MPRA contract inspection (can minting be paused?) | Technical | Smart contract auditor |
| Third-party geological audit of mining claims | External | Geography/mining auditor |
| CatEx SMPRA listing approval | External | CatEx |
| US securities counsel opinion on MPRD classification | External | US securities attorney |

---

## 9. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| BD partner unwilling to work with mining-backed RWA | MEDIUM | CRITICAL | Have 3 BD options ready. May need to be international BD first. |
| MPRA contract has no pause/burn function — can't sunset it | HIGH | HIGH | Use migration contract pattern: deploy SMPRA with migration contract that accepts MPRA and mints SMPRA. |
| Mining claims cannot be independently verified at reasonable cost | MEDIUM | HIGH | Publish `SELF_REPORTED` attestation; delay trade desk qualification until third-party audit. |
| CatEx rejects SMPRA listing at corrected price | MEDIUM | MEDIUM | Engage alternative venue simultaneously. Don't depend solely on CatEx. |
| UK Financial Ltd team is not responsive during migration | MEDIUM | HIGH | Build migration tooling that works from on-chain data alone (no issuer cooperation needed for holder snapshot). |
| MPRA holders refuse migration (wallet lock-in creates confusion) | HIGH | MEDIUM | Clear communication, extended migration window (90 days), dedicated support channel. |
| $924M CatEx price creates legal/reputational risk | HIGH | HIGH | Publish NAV before any SMPRA launch. Make clear NAV ≠ CatEx price. Never use CatEx price in issuer materials. |
| MCAT meme coin creates regulatory spillover | MEDIUM | HIGH | Legal opinion on MCAT classification before any institutional activity. |

---

## 10. Assumptions

1. UK Financial Ltd will sign a platform service agreement as a condition of support.
2. MPRA token contract allows reading all holders via event logs (standard ERC-20 Transfer events).
3. A migration contract can be deployed to accept MPRA and mint SMPRA without requiring cooperation from the original MPRA contract (standard ERC-20 is trustless).
4. Mining claims have real geological documentation (assay reports, GPS surveys) that can be ingested.
5. The team at UK Financial Ltd is accessible and technically capable of cooperating on a migration.
6. A FINRA-registered BD can be engaged within 4 weeks of platform agreement signing.
7. MCAT will be operationally isolated from the securities track.
8. CatEx is willing to re-list at a corrected price if provided with NAV documentation and compliance certification.

---

## 11. Revenue Model (Platform Perspective)

| Revenue Stream | Type | Estimate |
|---------------|------|---------|
| Platform onboarding fee | One-time | $20K–$40K |
| Monthly SaaS fee | Recurring | $4K–$10K/mo |
| Migration execution fee | One-time | $15K–$30K |
| Reserve attestation pipeline | Per-event | $200–$600 per attestation |
| ERC-3643 contract deployment service | One-time | $10K–$25K |
| OTC/RFQ desk spread (platform share) | Per-trade | 25–50bps |
| Trade desk qualification service | One-time | $8K–$15K |
| **Year 1 total (conservative)** | | **$120K–$280K** |

---

## 12. Rollout Order Summary

```
Pre-Phase (Weeks 1–4, parallel):
  - UK Financial Ltd contract
  - BD partner identification and engagement
  - MPRA contract inspection
  - Mining claim pre-assessment

Week 1–2:   Platform foundation (shared)
             + MAYA issuer profile + TokenClass registration

Week 3:     MPRA holder snapshot (on-chain read)

Week 4–6:   Reserve proof pipeline (mineral methodology)

Week 6:     SMPRA (ERC-3643) contract — testnet

Week 7–8:   MPRA → SMPRA migration batch processing

Week 8–10:  Investor portal onboarding (SMPRA holders)

Week 10–12: Compliance engine activation (whitelist, transfer restrictions)

Week 12:    CatEx SMPRA re-listing at corrected price

Week 14:    Market maker onboarding

Week 16:    Trade desk qualification
```
