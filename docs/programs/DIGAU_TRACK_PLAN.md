# DIGAU Track Plan — Dignity Gold Institutionalization

> **Classification:** Internal — Program Track Strategy  
> **Phase:** 0 — Planning Output  
> **Date:** 2026-04-07  
> **Track:** DIGAU — Dignity Gold Inc / Dignity Corp  
> **Token:** DIGau (ERC-20, Ethereum mainnet `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E`)  
> **Governing Doc:** INSTITUTIONALIZATION_MASTER_PLAN.md

---

## Executive Summary

DIGau is the more tractable of our two launch issuers. Despite having zero liquidity, DIGau has a structurally cleaner position than MAYA:

- **ERC-20 on Ethereum mainnet** — standard wallet compatibility (no lock-in)
- **Real FINRA-registered BD** — Tritaurian Capital (BD #45500, 430 Park Ave NYC)
- **Credible leadership** — David Weild IV (former NASDAQ Vice Chairman, architect of the JOBS Act)
- **Gold-backed narrative** — NAV is computable from LBMA fix × claimed gold ounces
- **No synthetic pricing to unwind** — starting from $0 volume is cleaner than MPRA's $924M fantasy price
- **EVM-compatible** — can add L2 liquidity pools (Base, Arbitrum) with no migration

**Primary risk:** The $6B gold reserve claim is entirely unverified. Our first and most critical deliverable is the reserve proof pipeline.

**Target timeline:** 8 weeks to trade desk qualification.

---

## 1. Token Profile

| Field | Value |
|-------|-------|
| Token Name | DIGau (Dignity Gold) |
| Token Standard | ERC-20 |
| Contract Address | `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E` |
| Chain | Ethereum Mainnet (Chain ID 1) |
| Decimals | 18 (standard ERC-20) |
| Total Supply | Unknown — to be confirmed from on-chain read |
| Holder Count | Unknown — to be confirmed from Etherscan |
| Claimed Reserve | $6B in gold reserves (tailings and alluvial placer deposits) |
| Actual Reserve Proof | None currently available |
| BD Relationship | Tritaurian Capital Inc (FINRA #45500) |
| Wallet Restriction | None — standard ERC-20 |
| Price / Liquidity | $0 volume, no live market |
| Target NAV Formula | `gold_ounces × LBMA_fix / total_supply` |

---

## 2. Current State

### 2.1 What Dignity Gold Has

| Asset | Status |
|-------|----|
| Deployed ERC-20 token contract | ✅ Live on mainnet |
| Registered BD (Tritaurian Capital) | ✅ FINRA #45500 verified |
| Leadership credibility (Weild IV, team) | ✅ Real people, verifiable backgrounds |
| Gold reserve narrative | ✅ Exists — $6B claimed |
| Legal framing (Reg D / Reg S) | ✅ Correct language on site |
| Corporate entity chain (Dignity Gold LLC → Dignity Corp) | ✅ Clean two-tier |
| Mining partnerships (GS Mining et al.) | ✅ Per press releases |
| LA offices (633 W. 5th St., Tier 1 address) | ✅ Real office location |

### 2.2 What They're Missing

| Gap | Severity | Our Platform Provides |
|-----|---------|----------------------|
| Reserve proof / custody disclosure | CRITICAL | Reserve registry + attestation engine |
| NAV computation | CRITICAL | NAV computation from LBMA fix + gold ounces |
| Price discovery | CRITICAL | First verifiable price via published NAV |
| Investor portal | CRITICAL | KYC/accreditation/holdings/redemptions |
| Liquidity / secondary market | CRITICAL | Market ops layer + OTC rails + exchange adapter |
| Compliance infrastructure | HIGH | Compliance engine + transfer restrictions |
| Tritaurian digital integration | HIGH | BD workflow integration hooks |
| Data room / disclosures | HIGH | Document management + proof center |
| Chainlink oracle for DeFi | MEDIUM | Oracle integration (Phase 3) |
| Cap table management | MEDIUM | Holdings model in DB |

### 2.3 Site Audit Key Finding

The DIGau homepage (`dignitygold.com`) opens with a **"Part 2 Lecture Series"** splash — David Weild IV's 3-part educational video on the JOBS Act and digital securities. An investor arriving at the site sees:

> "This site is operated by Dignity Gold ('DIGau'), **which is developing a platform** to support the issuance of the DIGau token."  
> "any securities referenced on this site **will be offered** through TTC"

Both phrases use future tense. The site is self-describing as **pre-launch**. Our platform converts this from "developing" to "deployed."

---

## 3. Target State (8 Weeks)

| Milestone | Target Date | Description |
|-----------|------------|-------------|
| Platform Onboarded | Week 1 | DIGau `TokenClass` created, reserve assets registered |
| Reserve Proof Live | Week 2 | NAV dashboard visible on proof center |
| Investor Portal Live | Week 2–3 | KYC → accreditation → holdings for first investors |
| Tritaurian Workflow Connected | Week 3 | BD integration hooks wired |
| First OTC Liquidity | Week 4 | OTC desk accepting buy orders at NAV |
| Price Feed Published | Week 4 | First verifiable DIGau price ever |
| Uniswap V3 Pool | Week 5–6 | DIGau/USDC pool on Ethereum or Base, $250K+ depth |
| Market Maker 1 Onboarded | Week 6 | Committed inventory + spread obligations |
| Trade Desk Qualification | Week 7–8 | 8-gate score target: 80+ |
| Trade Desk Approval | Week 8 | 24hr turnaround |

---

## 4. Gap Summary

**From REPO_GAP_ANALYSIS.md, DIGAU-relevant critical items:**

| Gap | Blocks | Resolution Phase |
|-----|--------|-----------------|
| C1 – No DB migrations | Everything | Phase 1 |
| C2 – No auth | Investor portal | Phase 1 |
| C6 – No Prisma client export | Everything | Phase 1 |
| H1 – No KYC provider | Investor onboarding | Phase 2 |
| H3 – No NAV computation | Proof center, price discovery | Phase 3 |
| H4 – No document upload/hash pipeline | Reserve proof | Phase 3 |
| H7 – No investor dashboard | Investor experience | Phase 2 |
| H2 – No compliance rule evaluation | Whitelist, transfer restrictions | Phase 4 |

**DIGAU-specific additional gaps not in general gap analysis:**
- No `IssuerApplication` record in DB for Dignity Corp
- No LBMA gold price feed integration
- No Tritaurian Capital API or webhook integration
- No Uniswap V3 pool deployment automation
- No Chainlink oracle deployment scripting

---

## 5. Phased Execution Plan (DIGAU-Specific)

### Week 1 — Platform Foundation
- Phase 1 blockers cleared (DB, auth, PrismaClient)
- Create `IssuerProfile` for Dignity Corp in DB
- Register `TokenClass` for DIGau: symbol=DIGau, classification=SECURITY_TOKEN, standard=ERC-20, contractAddress=`0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E`, chainId=1
- Read total supply from Ethereum mainnet (viem/ethers call)
- Create at least one `ReserveAsset` record: Gold, asset class GOLD, location TBD, custodian TBD (pending Dignity disclosure)

### Week 2 — Reserve Proof Pipeline
- Ingest first reserve documentation from Dignity Corp (assay reports, custody receipts if available)
- Hash documents: SHA-256 → store in `ReserveDocument`
- Anchor hashes to Ethereum/Polygon calldata
- Activate NAV computation: `gold_ounces × LBMA_PM_fix / total_supply`
- LBMA fix integration (goldprice.org API or Gold-Api.com)
- First NAV snapshot recorded in `NavSnapshot` table
- Proof center page goes live (even if showing "self-reported" attestation level initially)
- Publish: "DIGau NAV = $X.XX per token as of [date]" — **first verifiable price in the token's history**

### Week 2–3 — Investor Portal
- Investor registration: email, password, role=INVESTOR
- KYC flow: persona.com sandbox → Sumsub fallback
- Accreditation questionnaire
- Jurisdiction gating (US only via Reg D, blocked countries list)
- Holdings dashboard (shows DIGau balance after purchase)
- Document upload: subscription agreement, accreditation letter
- Redemption request form (submit only — processing in Phase 5)

### Week 3 — Tritaurian Integration Hooks
- Define webhook interface for BD notification events:
  - `investor.kyc_approved` → notify Tritaurian for subscription processing
  - `investor.subscription_complete` → mint tokens, update holdings
  - `investor.redemption_requested` → trigger Tritaurian settlement flow
- Create `TritaurianWebhookEvent` model in schema (or use generic `AdminAction`)
- Document the integration spec for Tritaurian's engineering team

### Week 4 — First OTC Liquidity
- Register OTC desk as internal `Venue` (type=OTC, status=ACTIVE)
- Create `SpreadPolicy` for DIGau: baseSpreadBps=150 (1.5% OTC spread over NAV)
- Admin can post manual RFQ quotes via trade desk UI
- First OTC purchase flow: investor submits buy order at NAV + spread → compliance check → Tritaurian executes → holdings updated
- Announce: "DIGau now available via our OTC desk at [URL]"

### Week 5–6 — DEX Liquidity
- Deploy Uniswap V3 pool: DIGau/USDC on Base (lower gas than Ethereum mainnet)
- Initial liquidity: $250K+ from reserve capital or market maker seed
- Register Uniswap venue in exchange adapter: `packages/exchange-adapters/uniswap-v3-adapter.ts`
- Begin tracking on-chain price vs NAV (premium/discount metric)
- Publish premium/discount chart on proof center

### Week 6 — Market Maker Onboarding
- Recruit 1–2 market makers (can start with internal treasury as MM)
- Define MM obligations: ≤200bps spread, ≥$100K two-sided depth
- MM onboarding in admin: `Venue` record with MM config, spread policy
- Register MM wallet addresses in whitelist

### Week 7–8 — Trade Desk Qualification
- Run 8-gate qualification checklist (from `TradeDeskQualification` model):
  1. Reserve attestation: published + hash-anchored ✅ (Phase 2)
  2. NAV methodology: documented + live ✅ (Phase 2)
  3. KYC/accreditation: investor portal live ✅ (Phase 3)
  4. Compliance rules: transfer restrictions active ✅ (Phase 4)
  5. Liquidity: $500K+ aggregate bid depth ✅ (Phase 5–6)
  6. Market maker: 2+ active ✅ (Phase 6)
  7. Settlement wallet: Exodus wallet registered + verified ✅ (admin action)
  8. Legal structure: entity diagram + BD relationship documented ✅ (docs)
- Target score: 80+
- Submit to trade desk for approval

---

## 6. Dependencies

| Dependency | Type | Owner |
|-----------|------|-------|
| Phase 1 (DB + auth) | Technical | Engineering |
| Phase 3 (Reserve/Proof) | Technical | Engineering |
| Phase 2 (Investor Portal) | Technical | Engineering |
| LBMA gold price API key | External | Platform Ops |
| Dignity Corp reserve documentation (assay reports, custody confirmation) | External | Dignity Corp / David Weild IV's team |
| Tritaurian Capital API or webhook specs | External | Tritaurian Capital |
| KYC provider (Persona or Sumsub) API key | External | Platform Ops |
| Market Maker commitment | External | Business Development |
| $250K+ liquidity seed capital (for DEX pool) | Capital | Treasury |
| Ethereum/Base RPC endpoint (Alchemy, Infura, or Quicknode) | Infrastructure | Platform Ops |

---

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Dignity Corp's gold reserve cannot be independently verified | HIGH | HIGH | Platform can onboard with `SELF_REPORTED` attestation level. Upgrade to `ATTESTED` when third-party audit arrives. |
| $6B reserve claim is inflated or fabricated | MEDIUM | CRITICAL | NAV computation from actual disclosed ounces, not claimed $6B. Never cite $6B as NAV basis. |
| Tritaurian Capital does not provide API integration | MEDIUM | MEDIUM | Use email webhook hooks and manual BD workflow initially. Full API integration is enhancement, not blocker. |
| DEX pool capital unavailable | MEDIUM | MEDIUM | OTC desk can launch without DEX pool. Defer Uniswap to Phase 8. |
| Weild IV's team does not prioritize platform integration | LOW | HIGH | Establish commercial agreement with clear milestones and deliverables before Phase 1 work begins. |
| KYC provider sandbox approval takes >1 week | LOW | MEDIUM | Pre-apply sandbox keys before Phase 1 starts. |
| DIGau contract has transfer or minting defects | LOW | HIGH | Run on-chain audit of contract before whitelist integration. |

---

## 8. Assumptions

1. Dignity Corp team will provide reserve documentation within 1 week of platform onboarding agreement.
2. Tritaurian Capital is contactable and willing to define their integration requirements.
3. The ERC-20 contract at `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E` is the canonical DIGau contract.
4. Total supply and holder count can be read from mainnet via public RPC — no special access needed.
5. Reg D / Reg S exemptions apply — US accredited investors and non-US persons.
6. At minimum, DIGau can launch with `SELF_REPORTED` attestation. Full third-party attestation is not a hard launch requirement.
7. OTC desk can operate pre-DEX purely via NAV-based quotes.

---

## 9. Revenue Model (Platform Perspective)

| Revenue Stream | Type | Estimate |
|---------------|------|---------|
| Platform onboarding fee | One-time | $15K–$25K |
| Monthly SaaS fee (issuer OS) | Recurring | $3K–$8K/mo |
| Compliance engine license | Recurring | $500–$2K/mo |
| Reserve attestation workflow | Per-event | $150–$500 per attestation |
| OTC desk spread (platform share) | Per-trade | 25–50bps on OTC volume |
| Market maker coordination fee | Monthly | $1K–$2K/mo |
| Trade desk qualification service | One-time | $5K–$10K |
| **Year 1 total (conservative)** | | **$75K–$175K** |

---

## 10. Rollout Order Summary

```
Week 1: Platform foundation (Phase 1) + DIGAU token registration
Week 2: Reserve proof pipeline live (Phase 3 DIGAU slice)
Week 2–3: Investor portal live (Phase 2 DIGAU slice)
Week 3: Tritaurian integration hooks defined
Week 4: OTC desk open at NAV
Week 5–6: DEX pool + market maker
Week 7–8: Trade desk qualification + approval
```
