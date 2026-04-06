# Dignity Gold (DIGau) — Institutional Gap Memo

> **Classification:** Confidential — Client-Ready Intelligence  
> **Date:** 2026-04-07  
> **Prepared by:** Sovereign Assets Platform — Institutional Analysis Desk  
> **Subject:** Dignity Gold Inc / Dignity Corp / DIGau security token  
> **Purpose:** Document every institutional gap between Dignity Gold's current public-facing posture and the minimum requirements for regulated capital formation, secondary market access, and institutional investor confidence  
> **Methodology:** Live site audit (dignitygold.com, 2026-04-07), on-chain contract review, FINRA BrokerCheck, BD disclosure analysis, FAQ/terms language extraction

---

## Executive Summary

Dignity Gold presents as a mining-backed digital-securities issuer with genuine institutional ambition — not a crypto token project. The entity structure (Dignity Gold LLC → Dignity Corp issuer → Tritaurian Capital BD), regulatory framing (Reg D / Reg S, restricted transfers, KYC/AML), and leadership (David Weild IV, former NASDAQ Vice Chairman, architect of the JOBS Act) signal a serious attempt at compliant security token issuance.

However, the public-facing infrastructure contradicts this ambition at almost every layer. The homepage resolves to a video lecture series splash page. The corporate About section contains placeholder language. There is no proof center, no reserve methodology, no custody chain disclosure, no investor portal, no redemption mechanism, no market-maker framework, and no secondary market access.

**The core finding:** Dignity Gold has the right regulatory skeleton but zero operational muscle. Every gap maps directly to an infrastructure module our platform provides.

---

## 1. Credibility Surface Audit

### 1.1 Homepage (dignitygold.com)

| Element | Finding | Severity |
| --- | --- | --- |
| Landing page | Resolves to **"Part 2 Lecture Series"** splash — David Weild IV 3-part lecture on JOBS Act, CLARITY/GENIUS Act, and mining-backed digital securities | **HIGH** — First impression is an educational video, not an issuer portal |
| Navigation to main site | Requires clicking "Go to Dignity Gold Home" link or appending `?nosplash=1` to URL | **HIGH** — Most visitors will bounce before reaching any issuer content |
| Recent news | 5 press releases visible (GS Mining partnership, Junior Mining Program, imaging tech, new hires, Top 15 list) | **LOW** — Active PR, but buried behind lecture splash |
| Contact | U.S. Bank Tower, 633 W. 5th Street, 26th Floor, Los Angeles, CA 90071 | **OK** — Legitimate Tier 1 office address |
| Social links | X (Twitter), Telegram | **MEDIUM** — No LinkedIn corporate page, no institutional distribution channel |

**Verdict:** The homepage functions as a thought-leadership microsite, not an issuer platform. An institutional investor arriving at dignitygold.com sees a video lecture, not a security token offering.

### 1.2 Welcome/Main Page (dignitygold.com/welcome/?nosplash=1)

| Element | Finding | Severity |
| --- | --- | --- |
| Hero text | "RWA Tokens Backed by Precious Metals" | **OK** — Correct framing |
| About section | Professional narrative about mining + blockchain + DIGau | **OK** |
| Claimed backing | "a pledge of at least **$6 billion** in gold reserves in tailings and alluvial placer deposits" | **CRITICAL** — $6B claim with zero supporting evidence on-site |
| Team page | 10+ team members listed: Weild IV (Chairman), Sweet, Barahona, Heyn, Behren, Nassief, de Alba, Newton, Levi, Haynes | **OK** — Real people with verifiable backgrounds |
| Contact form | Standard form submit | **OK** |
| Investor portal | **None** | **CRITICAL** |
| Proof center | **None** | **CRITICAL** |
| Token purchase flow | **None** — No "Buy" or "Invest" CTA anywhere | **HIGH** |

### 1.3 Dignity Corporation Page (dignitygold.com/dignity-corporation/)

| Element | Finding | Severity |
| --- | --- | --- |
| Content | Repeats the BD disclaimer verbatim — nothing else | **HIGH** — Dedicated corporate page is just a disclaimer |
| Entity disclosure | States Dignity Corp is the issuing entity, is NOT a registered BD | **OK** — Correct legal posture |
| BD relationship | Tritaurian Capital Inc (TTC), FINRA/SIPC, 430 Park Ave 19th Floor NYC, BrokerCheck #45500 | **OK** — Verifiable |
| Additional content | None — no officers, no charter, no governance, no offering docs | **HIGH** |

### 1.4 Footer Disclaimer (appears on all pages)

Full text analysis:

> "This site is operated by Dignity Gold ("DIGau"), which is developing a platform to support the issuance of the DIGau token."

Key phrase: **"developing a platform"** — implies the issuance platform is not yet built.

> "Dignity Corp., the issuing entity, is not a registered broker-dealer, and is not acting in a regulated capacity..."

Key phrase: **"not acting in a regulated capacity"** — correct, but reads as "we can't do anything regulated ourselves."

> "any securities referenced on this site will be offered through TTC"

Key phrase: **"will be offered"** — future tense. Implies tokens have not yet been offered.

> "Nothing on this website should be construed as an offer to sell, a distribution, or a solicitation of an offer to buy any securities."

Standard Reg D safe harbor language. Correct.

**Verdict:** The disclaimer language suggests the DIGau token issuance has not yet occurred or is still in progress. Institutional investors will read "developing a platform" and "will be offered" as: **this project is pre-launch.**

---

## 2. Regulatory & Legal Posture

### 2.1 Entity Map

```
┌─────────────────────────────────────┐
│        Dignity Gold, LLC            │  ← Parent / platform operator
│  (blockchain development company)   │
└───────────────┬─────────────────────┘
                │ owns
┌───────────────▼─────────────────────┐
│        Dignity Corp.                │  ← Token issuer (NOT a BD)
│  (issuing entity)                   │
└───────────────┬─────────────────────┘
                │ partners with
┌───────────────▼─────────────────────┐
│   Tritaurian Capital, Inc (TTC)     │  ← Registered BD (FINRA #45500 / SIPC)
│   430 Park Ave, 19th Fl, NYC        │
└─────────────────────────────────────┘
```

### 2.2 Regulatory Framework

| Element | Status | Evidence |
| --- | --- | --- |
| Reg D exemption | **Claimed** — restricted token, accredited investor, suitability | FAQ language (user-reported), disclaimer language |
| Reg S exemption | **Claimed** — offshore offering exemption | FAQ language (user-reported) |
| FINRA BD | **Active** — Tritaurian Capital, BrokerCheck #45500 | Footer link, verifiable |
| Token classification | **Security token** — explicitly called "security token" and "digital securities" | Multiple pages |
| Transfer restrictions | **Claimed** — "within the bounds of securities trading laws" | About section language |
| KYC/AML | **Claimed** — referenced in FAQ | No visible implementation |
| Offering docs (PPM/termsheet) | **Not visible** | Not linked or referenced anywhere on site |
| SEC filings | **Unknown** — no link to EDGAR, no Form D reference | Not present on site |

### 2.3 What's Right

1. **Correct BD structure** — Issuer (Dignity Corp) + separate registered BD (Tritaurian Capital). This is the proper legal architecture.
2. **Explicit non-BD disclaimer** — "Dignity Corp is not a registered broker-dealer" is honest and required.
3. **Security token framing** — Not pretending to be a utility token or cryptocurrency. Positions correctly as a regulated security.
4. **JOBS Act alignment** — Chairman David Weild IV literally wrote the JOBS Act. The regulatory DNA is real.
5. **KYC/AML/suitability awareness** — FAQ references correct compliance concepts.

### 2.4 What's Missing

1. **No visible Form D filing** — If Reg D 506(b) or 506(c), there should be a Form D on EDGAR. No link provided.
2. **No PPM or offering memorandum** — Institutional investors expect to download or request a PPM. None visible.
3. **No subscription agreement workflow** — No way to subscribe to the offering on the site.
4. **No accreditation verification** — KYC/AML is mentioned but there's no visible process for investor verification.
5. **No legal opinion posted** — Institutional standard is to have a securities law opinion on file and available.

---

## 3. The $6 Billion Reserve Claim

The main site states:

> "The DIGau token is a verified gold reserve-backed security token represented by a pledge of at least **$6 billion in gold reserves** in tailings and alluvial placer deposits."

### 3.1 Credibility Assessment

| Question | Answer | Finding |
| --- | --- | --- |
| What is the source of the $6B figure? | Not disclosed | **CRITICAL** — No geology report, no NI 43-101, no JORC, no auditor name |
| "Verified" by whom? | Not disclosed | **CRITICAL** — Site says "verified" but provides no verification |
| Where are the reserves? | "United States" — no specific locations | **HIGH** — Institutional standard requires mine name, jurisdiction, permit numbers |
| What form? | "Tailings and alluvial placer deposits" | **MEDIUM** — These are exploration-stage or recovery-stage assets, not proven reserves |
| What is the pledge structure? | "represented by a pledge" | **HIGH** — Is this a lien? A trust? A contractual claim? No legal structure disclosed |
| Custody chain | Not disclosed | **CRITICAL** — No custodian, no vault, no serial numbers, no chain of custody |
| Third-party audit | Not disclosed | **CRITICAL** — No Big 4, no specialist mining auditor, no attestation of any kind |
| NAV methodology | Not disclosed | **CRITICAL** — No formula for computing token value from reserve value |
| Mark-to-market | Not present | **HIGH** — No real-time or periodic valuation |

### 3.2 Institutional Standard Comparison

| What HSBC / PAXG / Tether Gold Provide | What Dignity Provides |
| --- | --- |
| Named custodian (Brink's, LBMA-accredited vault) | Nothing |
| Serial numbers of gold bars | Nothing |
| Daily / monthly attestation reports | Nothing |
| Third-party auditor on record | Nothing |
| Published NAV methodology | Nothing |
| Redemption mechanism (token → physical gold or cash) | Nothing |
| Proof-of-reserves dashboard | Nothing |

**The $6 billion claim is the single largest institutional credibility risk.** It appears on the main page with no supporting evidence. An institutional investor performing basic due diligence will flag this immediately.

---

## 4. Infrastructure Gap — The 10-Layer Institutional Stack

Using our standard institutional stack framework (see [Institutional Gap Analysis](INSTITUTIONAL_GAP_ANALYSIS.md)):

| Layer | Capability | Institutional Standard | Dignity Gold Status | Gap |
| --- | --- | --- | --- | --- |
| **1** | Legal & Regulatory | Licensed entity, offering docs, Form D, legal opinions, SPV/trust | Entity exists, BD exists, no visible filings/docs | **HIGH** |
| **2** | Issuance & Tokenization | Compliance-enforced smart contract (ERC-3643), transfer restrictions, whitelist, mint/burn | ERC-20 vanilla contract, transfer restriction language but no on-chain enforcement | **HIGH** |
| **3** | Custody & Settlement | Qualified custodian, DvP, key management, MPC/HSM | No custody solution disclosed, no settlement mechanism | **CRITICAL** |
| **4** | Reserve/Collateral Management | Asset registry, third-party audit, real-time NAV, proof-of-reserves | $6B narrative claim, zero verification | **CRITICAL** |
| **5** | Market Making & Liquidity | Professional MMs, committed capital, spread obligations, circuit breakers | Zero — no MM, no pool, no orderbook | **CRITICAL** |
| **6** | Trading & Price Discovery | Multi-venue listing, reference pricing, oracle, trade surveillance | No price, no market, no venue | **CRITICAL** |
| **7** | Compliance & Reporting | KYC/AML integrated, investor accreditation, regulatory reporting, tax docs | Referenced in FAQ, no visible implementation | **HIGH** |
| **8** | Investor Services | Self-serve portal, subscription/redemption, holdings dashboard, statements | None — no portal, no dashboard, no self-serve anything | **CRITICAL** |
| **9** | Treasury & Back Office | Multi-asset ledgers, reconciliation, fiat on/off ramp, stablecoin management | None visible | **HIGH** |
| **10** | Governance & Data Room | Board resolutions, offering memoranda, versioned disclosures, document registry | Team page exists; no data room, no documents | **HIGH** |

### Summary: 5 CRITICAL, 5 HIGH, 0 MEDIUM, 0 LOW

---

## 5. The Lecture Series Problem

The homepage resolving to the "Part 2 Lecture Series" splash is not a minor UX issue — it's a strategic positioning problem.

### What the Lecture Series Communicates

David Weild IV's 3-part lecture is genuinely substantive:
- **Part I:** JOBS Act and democratizing capital
- **Part II:** CLARITY/GENIUS Acts — digital asset regulatory clarity
- **Part III:** Mining-backed digital securities and DIGau

This is thought leadership from the former Vice Chairman of NASDAQ. The content is real.

### Why It Damages the Issuer Image

1. **Education ≠ Execution.** A lecture about how digital securities should work is not proof that this digital security works.
2. **Investors want assets, not seminars.** An institutional investor arriving at the site expects: offering terms, NAV, reserve proof, subscription mechanism. They get a video player.
3. **It implies conceptual stage.** "Here's why this should exist" reads as "this doesn't exist yet."
4. **The splash intercepts the main site.** Any investor following a link to dignitygold.com lands on the lecture, not the issuer. They must know to click through or append `?nosplash=1`.

### The Fix

The lecture series should live at `/education/` or `/lectures/` — it's valuable content. The homepage must be the issuer surface: NAV, reserve proof, investor access, offering terms.

---

## 6. Token Contract Assessment

| Attribute | Value | Institutional Implication |
| --- | --- | --- |
| Standard | ERC-20 | **Positive:** Compatible with every wallet, DEX, CEX, custodian |
| Contract | `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E` | Deployed on Ethereum mainnet |
| Transfer restrictions | None on-chain (claimed in marketing, not enforced by contract) | **Negative:** Reg D/Reg S tokens require on-chain transfer restrictions (ERC-3643 or equivalent) |
| Compliance enforcement | None | **Negative:** No whitelist, no jurisdiction gating, no accreditation check |
| Freeze/seize | Site claims "retrieval and reissuance of lost tokens, freezing addresses, and token burning" | **Unclear:** Needs contract audit to verify these capabilities are implemented |
| Liquidity | Zero — no DEX pool, no CEX orderbook | **CRITICAL:** Token has no market |

### Institutional Requirement vs. Reality

For a Reg D/Reg S security token, the **minimum** contract requirements are:
- On-chain whitelist (only approved addresses can hold)
- Transfer restriction enforcement (compliance check on every transfer)
- Jurisdiction gating (block transfers to restricted jurisdictions)
- Freeze capability (for regulatory enforcement)
- Forced transfer (for estate recovery, court orders)

A vanilla ERC-20 provides **none** of these. If the token has already been distributed to non-whitelisted addresses, an ERC-3643 upgrade or wrapper contract is required before any institutional engagement.

---

## 7. Competitive Positioning — Where Dignity Sits

```
                    INSTITUTIONAL READINESS SPECTRUM

 ◄─── Pre-Market ──────────── Market-Ready ──────────── Institutional ───►

  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │  MPRA    │    │ DIGau    │    │ PAXG     │    │ HSBC     │
  │          │    │ ██HERE██ │    │          │    │ Gold     │
  │ Broken   │    │ Pre-mkt  │    │ Live     │    │ Token    │
  │ infra    │    │ ambition │    │ liquid   │    │          │
  │ $777M    │    │ no rails │    │ oracle   │    │ Bank-    │
  │ synthetic│    │          │    │ compliant│    │ grade    │
  └──────────┘    └──────────┘    └──────────┘    └──────────┘
      ▲                ▲               ▲               ▲
   Score: 5          Score: 15       Score: 75       Score: 95
```

DIGau sits ahead of MPRA because:
- Standard ERC-20 (no proprietary wallet trap)
- Real BD relationship (Tritaurian)
- Gold has a globally recognized price (LBMA)
- No synthetic pricing to unwind
- Legitimate leadership (Weild IV)

DIGau sits behind PAXG because:
- No reserve proof
- No liquidity
- No compliance enforcement on-chain
- No investor infrastructure
- No price

---

## 8. What "Developing a Platform" Means for Us

The footer disclaimer says: *"Dignity Gold, which is developing a platform to support the issuance of the DIGau token."*

This is the opening. They are publicly acknowledging they need a platform. That platform is what we build.

### Our Infrastructure Mapped to Their Gaps

| Their Gap | Our Module | Package |
| --- | --- | --- |
| No proof center | Reserve Registry + Attestation Engine | `@sov/reserve-registry` |
| No NAV computation | NAV Engine (gold_oz × LBMA_fix / supply) | `@sov/reserve-registry` |
| No investor portal | Investor Dashboard + KYC Workflow | `apps/web` investor routes |
| No compliance enforcement | ERC-3643 deployment + whitelist management | `@sov/token-engine`, `@sov/compliance` |
| No market / no price | DEX Pool Deployer + MM Onboarding | `@sov/exchange-adapters`, `@sov/market-ops` |
| No redemption mechanism | Conversion Rails (DIGau → USDC/USDT) | `@sov/treasury` |
| No data room | Governance & Document Registry | `@sov/compliance` |
| No trade surveillance | Anomaly Detection + Circuit Breakers | `@sov/analytics` |
| No settlement | DvP Smart Contract Escrow | `@sov/token-engine` |
| No treasury management | Multi-asset Ledger + Stablecoin Mgmt | `@sov/treasury` |

**Every single gap is our product.**

---

## 9. Risk Assessment — What Could Go Wrong

| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
| $6B reserve claim is unsubstantiated | Medium | Critical — invalidates entire token narrative | Require independent geology report before platform engagement |
| Tritaurian deprioritizes DIGau | Low-Medium | High — BD relationship is the legal backbone | Build infrastructure that makes DIGau valuable to Tritaurian |
| Token already distributed to non-compliant holders | Medium | High — Reg D violation if non-accredited | Audit holder list, implement compliance wrapper |
| Team is in "thought leadership" mode, not execution mode | Medium | Medium — delays engagement | Pitch execution plan with clear deliverables and timeline |
| Regulatory scrutiny of $6B claim | Low | Critical — SEC/state AG action | Ensure reserve verification precedes any public launch |
| Site credibility damages investor confidence before we engage | High | Medium — harder to raise capital later | Recommend immediate site cleanup as Phase 0 |

---

## 10. Conclusion

Dignity Gold is a pre-market security token issuer with:
- **Legitimate structural foundations** (entity, BD, JOBS Act architect chairman)
- **Correct regulatory framing** (Reg D/Reg S, restricted, security token)
- **Zero operational infrastructure** (no proof, no portal, no market, no compliance on-chain)
- **Active credibility leaks** (lecture homepage, placeholder content, unsubstantiated $6B claim)

The gap between their ambition and their current state is precisely the gap our platform fills. The engagement value is high — both as a revenue-generating client ($200K–$400K Year 1) and as an institutional case study that validates our entire platform thesis.

**The pitch:** You have the gold, the BD, and the chairman. We build the rails. 8 weeks to institutional readiness.

---

*Cross-references:*
- [DIGau Deep Dive](DIGAU_DEEP_DIVE.md)
- [Institutional Gap Analysis](INSTITUTIONAL_GAP_ANALYSIS.md)
- [Issuer Onboarding & Funding Pathway](../trade-desk/ISSUER_ONBOARDING_FUNDING_PATHWAY.md)
- [MPRA/DIGau Live Teardown](MPRA_DIGAU_LIVE_TEARDOWN.md)
