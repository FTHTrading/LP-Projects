# Dignity Gold (DIGau) — Execution Plan

> **Classification:** Client-Ready — Pitch Document  
> **Date:** 2026-04-07  
> **Prepared by:** Sovereign Assets Platform  
> **Subject:** How we transform Dignity Gold from a pre-market security token into an institutionally-ready, tradeable digital asset  
> **Audience:** Dignity Gold leadership, Tritaurian Capital, prospective investors  
> **Companion document:** [Institutional Gap Memo](../competitive-intelligence/DIGAU_INSTITUTIONAL_GAP_MEMO.md)

---

## Executive Summary

Dignity Gold has the right regulatory skeleton — a registered FINRA broker-dealer (Tritaurian Capital), security token framing (Reg D/Reg S), legitimate leadership (David Weild IV, former NASDAQ Vice Chairman), and a gold-reserve backing narrative.

What Dignity Gold does not have is the **operational infrastructure** to make any of that matter. No proof center, no investor portal, no NAV computation, no on-chain compliance, no market, no price, no redemption mechanism.

This execution plan delivers all of it in **8 weeks**. The result: a fully operational, institutionally-credible security token platform with live NAV, reserve attestation, investor self-serve access, compliance-enforced transfers, initial liquidity, and a clear path to trade desk qualification.

**Engagement model:** Paid infrastructure build → reserve verification → BD-integrated capital formation → controlled issuance/OTC → broader institutional expansion.

---

## Phase 0 — Credibility Surface Repair (Week 0 — Pre-Engagement)

> **Goal:** Fix the public-facing issues that will undermine every subsequent phase.  
> **Cost:** Included in onboarding fee or billed as advisory at $5,000  
> **Deliverable:** Clean issuer surface that passes institutional first-look

### Actions

| # | Action | Current State | Target State |
| --- | --- | --- | --- |
| 0.1 | **Move lecture series off homepage** | dignitygold.com → "Part 2 Lecture Series" splash | Homepage = issuer surface: NAV, reserve summary, investor CTA. Lectures move to `/education/` |
| 0.2 | **Populate Dignity Corporation page** | Contains only the BD disclaimer, nothing else | Corporate page: officer list, governance summary, entity structure, offering status |
| 0.3 | **Remove or fix placeholder content** | Lorem ipsum / incomplete copy in About section | Clean, professional copy aligned with security token positioning |
| 0.4 | **Reconcile tense in disclaimer** | "developing a platform" / "will be offered" (future tense) | Update language to reflect current offering status or explicitly state "in preparation" |
| 0.5 | **Add Form D / offering status** | No visible SEC filing reference | Link to EDGAR filing or state filing timeline clearly |
| 0.6 | **Add professional social presence** | X + Telegram only | Add LinkedIn company page, link to Tritaurian BrokerCheck prominently |

**Rationale:** Every subsequent phase builds on credibility. If an institutional investor Googles "Dignity Gold" and lands on a lecture series splash with lorem ipsum, the infrastructure we build behind it loses impact.

---

## Phase 1 — Platform Onboarding & Assessment (Week 1)

> **Goal:** Fully onboard Dignity Gold onto the Sovereign Assets Platform, complete gap assessment, lock remediation plan.  
> **Deliverables:** Issuer profile, 8-gate qualification baseline, remediation roadmap

### 1.1 Intake

| Action | Detail |
| --- | --- |
| Entity onboarding | Dignity Gold LLC, Dignity Corp, Tritaurian Capital — entity map, contacts, legal docs |
| Token registration | DIGau, ERC-20, contract `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E`, Ethereum mainnet |
| Reserve claim intake | $6B gold reserves — tailings + alluvial placer, request geology reports, custodian info |
| BD integration scoping | Map Tritaurian Capital workflow: subscription agreements, investor qualification, settlement |
| Holder audit | On-chain scan of all current DIGau holders: count, concentration, compliance status |

### 1.2 Eight-Gate Qualification Baseline

| Gate | Requirement | Expected DIGau Score | Notes |
| --- | --- | --- | --- |
| G1 — Minimum Value | $10M+ convertible to stablecoin | 0/25 | Zero current liquidity |
| G2 — Asset Type | Stablecoin or BTC in settlement wallet | 0/15 | No conversion path yet |
| G3 — Wallet | Self-custody (Exodus/MetaMask) | 5/10 | ERC-20 compatible, needs setup |
| G4 — Distribution | 5+ unique holders | ?/10 | Needs holder audit |
| G5 — Liquidity | Real bid depth within 5% of mark | 0/10 | No market exists |
| G6 — Price Integrity | Non-synthetic, verifiable reference price | 0/10 | No price exists |
| G7 — Compliance | KYC/AML on all holders | 0/10 | No KYC implementation |
| G8 — Multi-Venue | Listed on 2+ venues | 0/10 | Not listed anywhere |
| **Total** | | **~5/100** | **Not qualified** |

### 1.3 Remediation Plan Output

Locked remediation plan with:
- Per-gate action items mapped to platform modules
- Timeline (8 weeks from Phase 1 start)
- Cost estimate locked at Tier engagement level
- Success criteria for each gate
- Weekly checkpoint cadence

---

## Phase 2 — Reserve Verification & NAV Engine (Week 2–3)

> **Goal:** Transform the $6B narrative claim into a verifiable, machine-readable reserve attestation with live NAV computation.  
> **Deliverables:** Reserve registry, attestation pipeline, published NAV, proof center

### 2.1 Reserve Verification

| Action | Detail | Responsible Party |
| --- | --- | --- |
| Request geology reports | NI 43-101, JORC, or equivalent for all claimed deposits | Dignity Gold |
| Verify custodian/vault | Named custodian, vault location, insurance documentation | Dignity Gold |
| Ingest reserve data | Structured registry: deposit name, type, measured/indicated/inferred, tonnage, grade, metal content | Sovereign Platform |
| Third-party attestation | Engage independent mineral auditor OR accept existing audited reports | Dignity Gold + Platform |
| Hash-anchor attestation | SHA-256 hash of attestation document recorded on Ethereum | Sovereign Platform |

### 2.2 NAV Computation

```
NAV per token = (Total verified gold ounces × LBMA AM/PM fix) / Total DIGau supply

Example (illustrative):
  Gold reserves: 100,000 oz (verified subset of $6B claim)
  LBMA fix: $2,350/oz
  Total supply: 1,000,000 DIGau

  NAV = (100,000 × $2,350) / 1,000,000 = $235.00 per DIGau
```

- NAV computed daily at LBMA PM fix
- Published on proof center dashboard
- Methodology document (PDF) published to data room
- Chainlink oracle deployment for on-chain price feed

### 2.3 Proof Center Launch

Public-facing dashboard at `app.dignitygold.com/proof` (or equivalent):

| Element | Content |
| --- | --- |
| Current NAV | $XXX.XX per DIGau (updated daily) |
| Reserve summary | Total oz, deposit locations, custodian |
| Attestation history | Date, auditor, hash, link to full report |
| Methodology | PDF download — "How DIGau NAV is computed" |
| Last updated | Timestamp + next update schedule |

**This is the single most impactful deliverable.** The moment Dignity Gold has a published NAV backed by a verifiable reserve attestation, the token goes from "unpriced" to "priced" — which unlocks every subsequent phase.

---

## Phase 3 — Investor Infrastructure & Compliance (Week 3–4)

> **Goal:** Build the investor-facing infrastructure that lets qualified investors discover, evaluate, subscribe to, and hold DIGau.  
> **Deliverables:** Investor portal, KYC/accreditation workflow, compliance-enforced transfers

### 3.1 Investor Portal

| Module | Capability |
| --- | --- |
| **Dashboard** | Holdings, NAV history, reserve status, distributions |
| **KYC/Accreditation** | Integrated identity verification + accredited investor verification (Reg D 506(c) compliant) |
| **Subscription** | Digital subscription agreement workflow integrated with Tritaurian Capital |
| **Document Center** | PPM, legal opinions, attestation reports, tax documents (K-1s if applicable) |
| **Redemption** | Request redemption: DIGau → USD/gold equivalent (subject to offering terms) |
| **Statements** | Quarterly position statements, transaction history |

### 3.2 Tritaurian Capital BD Integration

| Integration Point | Implementation |
| --- | --- |
| Investor qualification | Platform captures KYC + accreditation → exports to Tritaurian for BD review |
| Subscription processing | Digital sub agreement → Tritaurian countersigns → tokens released |
| AML screening | Integrated sanctions + PEP screening on every investor |
| Regulatory reporting | Platform generates BD-ready reports (transaction logs, holder registry) |
| Suitability | Platform captures investor profile → Tritaurian conducts suitability review |

### 3.3 On-Chain Compliance Upgrade

| Action | Detail |
| --- | --- |
| Deploy ERC-3643 wrapper | Compliance-enforced transfer restrictions on DIGau contract |
| Whitelist management | Only KYC/accredited addresses can hold tokens |
| Jurisdiction gating | Block transfers to OFAC-sanctioned jurisdictions |
| Freeze capability | Admin freeze for regulatory enforcement / court orders |
| Forced transfer | Estate recovery, regulatory seizure — required for securities |
| Transfer agent integration | On-chain cap table reconciled with off-chain records |

**Note:** If the existing ERC-20 contract has `freeze` and `burn` capabilities (claimed on site but unverified), we integrate with those. If not, the ERC-3643 wrapper provides all required functionality.

---

## Phase 4 — Liquidity & Price Discovery (Week 4–6)

> **Goal:** Create the first real market for DIGau — initial liquidity, price discovery, and market-making framework.  
> **Deliverables:** DEX pool, reference pricing, market maker onboarding

### 4.1 Initial Liquidity Deployment

| Action | Detail |
| --- | --- |
| Deploy Uniswap V3 pool | DIGau/USDC pair on Ethereum or Base (lower gas) |
| Seed liquidity | $250K–$500K initial depth (from reserve-backed conversion or investor capital) |
| Set initial price | NAV-anchored: pool price = computed NAV per DIGau |
| Configure range | Concentrated liquidity around NAV ±5% — tight spread for institutional credibility |

### 4.2 Market Maker Onboarding

| Action | Detail |
| --- | --- |
| Engage 2 MMs | Wintermute, GSR, Keyrock, or Flowdesk — provide compliance package + NAV + attestation |
| MM agreement | Committed inventory, maximum spread (1–2%), minimum depth ($100K per side), circuit breakers |
| MM monitoring | Platform tracks spread, depth, and uptime — alerts on obligation violations |

### 4.3 Reference Pricing Infrastructure

| Component | Implementation |
| --- | --- |
| NAV oracle | Chainlink oracle publishing daily NAV on-chain |
| TWAP computation | Time-weighted average price from DEX pool |
| Cross-reference | NAV vs. pool price vs. OTC quotes — anomaly detection if divergence > 3% |
| Price feed API | Public API endpoint for external consumers (aggregators, data providers) |

### 4.4 Second Venue Listing

| Action | Detail |
| --- | --- |
| Identify venue | Security token exchange (tZERO, INX, Archax) or compliant CEX |
| Application package | Attestation report, NAV methodology, compliance docs, BD letter from Tritaurian |
| Cross-venue arbitrage | Platform monitors price divergence between venues |

---

## Phase 5 — Stablecoin Conversion & Trade Desk Qualification (Week 6–8)

> **Goal:** Convert gold-backed reserve value into stablecoin settlement, qualify for trade desk access.  
> **Deliverables:** $10M+ USDT in settlement wallet, trade desk qualification, 24hr activation

### 5.1 Conversion Rails

| Step | Action |
| --- | --- |
| 1 | Compute convertible value: verified gold oz × spot − encumbrance = available conversion |
| 2 | Execute primary issuance: Tritaurian-approved investors subscribe at NAV → USDC/USDT flows in |
| 3 | Or execute secondary conversion: redemption facility — DIGau holders redeem at NAV → USDC out |
| 4 | Or reserve monetization: Dignity Gold sells partial reserve interest → fiat → stablecoin |
| 5 | Target: **$10M+ USDT (ERC-20)** in verified settlement wallet |

### 5.2 Settlement Wallet Setup

| Requirement | Implementation |
| --- | --- |
| Wallet type | Self-custody — Exodus or MetaMask institutional |
| Minimum balance | $10,000,000 USD equivalent in USDT |
| Verification | Platform verifies wallet address on-chain, confirms balance, generates attestation |
| Security | Multi-sig or MPC-protected, documented key management policy |

### 5.3 Trade Desk Submission

| Gate | Expected Score (Post-Infrastructure) | Evidence |
| --- | --- | --- |
| G1 — Value | 25/25 | $10M+ USDT in settlement wallet |
| G2 — Asset Type | 15/15 | USDT (stablecoin, 1:1 USD peg) |
| G3 — Wallet | 10/10 | Self-custody Exodus/MetaMask |
| G4 — Distribution | 8/10 | 50+ holders from investor portal |
| G5 — Liquidity | 8/10 | DEX pool + 2 MMs with committed depth |
| G6 — Price Integrity | 10/10 | NAV-anchored, oracle-published, multi-source |
| G7 — Compliance | 8/10 | Full KYC/AML, Tritaurian-approved |
| G8 — Multi-Venue | 6/10 | DEX + 1 security token exchange |
| **Total** | **90/100** | **QUALIFIED** |

### 5.4 Trade Desk Activation

- Submit qualification package (automated export from platform)
- Trade desk approval: **24 hours from deposit confirmation**
- Active trading access with institutional settlement rails

---

## Timeline Summary

```
Week 0          Week 1          Week 2-3        Week 3-4        Week 4-6        Week 6-8
┌──────┐       ┌──────┐       ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│Phase0│──────▶│Phase1│──────▶│ Phase 2  │───▶│ Phase 3  │───▶│ Phase 4  │───▶│ Phase 5  │
│Credit│       │Onbrd │       │ Reserve  │    │ Investor │    │Liquidity │    │Conversion│
│ Fix  │       │Assess│       │NAV+Proof │    │Portal+BD │    │ MMs+DEX  │    │Trade Desk│
└──────┘       └──────┘       └──────────┘    └──────────┘    └──────────┘    └──────────┘
   │               │               │               │               │               │
   ▼               ▼               ▼               ▼               ▼               ▼
 Clean site   5/100 score     NAV published    Portal live    First market    90/100 score
 Prof image   Remediation     Proof center     KYC active     Price exists    $10M USDT
 Fix tense    plan locked     Oracle live      BD integrated  2 MMs live      TRADE DESK ✓
```

---

## Pricing

### Rescue Tier (DIGau Profile)

| Item | Fee | When |
| --- | --- | --- |
| Phase 0 — Credibility advisory | $5,000 | Pre-engagement |
| Phase 1 — Onboarding + assessment | $10,000 | Week 1 |
| Phase 2 — Reserve verification + NAV + proof center | $25,000 | Week 2–3 |
| Phase 3 — Investor portal + BD integration + compliance | $35,000 | Week 3–4 |
| Phase 4 — Liquidity deployment + MM onboarding | $20,000 | Week 4–6 |
| Phase 5 — Conversion + trade desk qualification | $10,000 | Week 6–8 |
| **Total infrastructure build** | **$105,000** | **8 weeks** |

### Recurring Revenue

| Item | Monthly Fee | Starts |
| --- | --- | --- |
| Platform SaaS license | $10,000 | Month 2 |
| NAV computation + attestation | $2,500 | Month 2 |
| MM monitoring + trade surveillance | $2,500 | Month 3 |
| **Total monthly** | **$15,000/month** | |

### Transaction-Based Revenue

| Item | Fee | Trigger |
| --- | --- | --- |
| Conversion facilitation (DIGau → USDT) | 75 bps | Per conversion |
| Trade desk facilitation | $25,000 one-time | On approval |
| OTC desk introduction | 50 bps on block | Per block trade |
| LP management | 25 bps on pool volume | Ongoing |

### Year 1 Revenue Projection

| Stream | Amount |
| --- | --- |
| Infrastructure build | $105,000 |
| Trade desk facilitation | $25,000 |
| Monthly SaaS (11 months) | $165,000 |
| Conversion fees (estimated $20M volume) | $150,000 |
| OTC/LP fees | $25,000–$50,000 |
| **Total Year 1** | **$470,000–$495,000** |

---

## Deliverables Summary

| # | Deliverable | Phase | Type |
| --- | --- | --- | --- |
| 1 | Site credibility recommendations report | 0 | Advisory document |
| 2 | Issuer profile + 8-gate baseline score | 1 | Platform data |
| 3 | Locked remediation roadmap | 1 | Implementation plan |
| 4 | Reserve registry (structured, ingested) | 2 | Platform data |
| 5 | Hash-anchored attestation (on-chain) | 2 | Smart contract tx |
| 6 | NAV engine (live, daily computation) | 2 | Platform module |
| 7 | Proof center dashboard (public) | 2 | Web application |
| 8 | Chainlink oracle (on-chain NAV feed) | 2 | Smart contract |
| 9 | NAV methodology document | 2 | PDF |
| 10 | Investor portal (self-serve) | 3 | Web application |
| 11 | KYC/accreditation workflow | 3 | Platform module |
| 12 | Tritaurian BD digital integration | 3 | API + workflow |
| 13 | ERC-3643 compliance wrapper | 3 | Smart contract |
| 14 | Whitelist + jurisdiction gating | 3 | Smart contract + admin |
| 15 | Data room (offering docs, legal) | 3 | Platform module |
| 16 | Uniswap V3 DEX pool (live) | 4 | On-chain deployment |
| 17 | 2 market makers (onboarded, committed) | 4 | Agreements + monitoring |
| 18 | Reference pricing API | 4 | API endpoint |
| 19 | Second venue application | 4 | Application package |
| 20 | Settlement wallet (verified, $10M+) | 5 | On-chain verification |
| 21 | Trade desk qualification export | 5 | Platform report |
| 22 | Trade desk activation (24hr) | 5 | External approval |

---

## Why Dignity Gold Should Engage Now

### 1. The Regulatory Window Is Open

The CLARITY and GENIUS Acts (referenced in Weild IV's own lecture series) are creating the first clear federal framework for digital securities. Projects that build compliant infrastructure now will be first-movers when these rules take effect.

### 2. Gold Is at Historic Highs

$2,350+/oz gold prices mean the reserve backing has maximum dollar value right now. Computing NAV during a gold bull market produces the strongest possible token price.

### 3. The "Developing a Platform" Gap Is Publicly Visible

The website says "developing a platform." Every day that continues, institutional credibility erodes. The longer the gap exists between the announcement and the infrastructure, the harder the eventual launch becomes.

### 4. Competitors Are Moving

PAXG (Paxos Gold) has live reserves, attestation, and trading. Tether Gold (XAUt) has multi-exchange liquidity. Mining-backed alternatives will emerge. First-mover advantage in compliant mining-backed digital securities is perishable.

### 5. The BD Relationship Is Underutilized

Tritaurian Capital is a real FINRA BD sitting idle. Without investor infrastructure, the BD relationship generates zero value. Our platform activates the BD by providing the digital workflow they need to process investors.

---

## The Pitch (One-Pager)

> **To Dignity Gold leadership:**
>
> You have what most digital security projects can't get: a FINRA-registered broker-dealer, a former NASDAQ Vice Chairman as chairman, a gold-reserve backing claim, and correct Reg D / Reg S framing.
>
> What you don't have — and what your own website acknowledges — is the platform. No proof center. No investor portal. No NAV. No market. No way for a qualified investor to discover, evaluate, subscribe to, hold, or redeem your token.
>
> We build exactly that infrastructure. We've already analyzed your gap (10-layer institutional stack) and designed an 8-week remediation plan that takes you from pre-market to trade-desk-qualified.
>
> The engagement is $105K for the full build, then $15K/month ongoing. Year 1 total platform revenue: ~$470K–$495K. Your return: a live, institutionally-credible security token with NAV, reserve proof, investor access, compliance enforcement, initial liquidity, and a path to institutional capital.
>
> The gold is yours. The BD is yours. The chairman is yours. **Let us build the rails.**

---

*Cross-references:*
- [Institutional Gap Memo](../competitive-intelligence/DIGAU_INSTITUTIONAL_GAP_MEMO.md)
- [DIGau Deep Dive](../competitive-intelligence/DIGAU_DEEP_DIVE.md)
- [Institutional Gap Analysis](../competitive-intelligence/INSTITUTIONAL_GAP_ANALYSIS.md)
- [Issuer Onboarding & Funding Pathway](ISSUER_ONBOARDING_FUNDING_PATHWAY.md)
- [MPRA/DIGau Live Teardown](../competitive-intelligence/MPRA_DIGAU_LIVE_TEARDOWN.md)
