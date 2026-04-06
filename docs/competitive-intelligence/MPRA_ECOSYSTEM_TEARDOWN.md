# Maya Preferred / UK Financial Ltd — Full Ecosystem Teardown

> **Classification:** Internal — Issuer Intelligence (Live Site + On-Chain + Entity)  
> **Date:** 2026-04-06  
> **Source:** mayapreferred.io live site crawl, Etherscan verified contracts, CatEx live data, Solana explorer, CSV exports  
> **Scope:** Complete teardown of the Maya Preferred ecosystem — 6 tokens, 3 mining claims, 8 executives, 2 registered addresses, 43 press articles, and $924M/token on CatEx  
> **Verdict:** An ambitious team with real mining connections, real legal entities, and zero functional infrastructure — wrapped in a presentation layer that would fail institutional due diligence within 60 seconds

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Entity Structure — The Corporate Shell](#2-entity-structure--the-corporate-shell)
3. [Token Ecosystem — 6 Tokens, Zero Markets](#3-token-ecosystem--6-tokens-zero-markets)
4. [The MayaCat Problem — Solana Meme Coin](#4-the-mayacat-problem--solana-meme-coin)
5. [Mining Claims — Real Geology, No Token Link](#5-mining-claims--real-geology-no-token-link)
6. [Website Credibility Audit](#6-website-credibility-audit)
7. [The Press Release Machine](#7-the-press-release-machine)
8. [Executive Team Analysis](#8-executive-team-analysis)
9. [The Pricing Fantasy](#9-the-pricing-fantasy)
10. [Red Flag Inventory](#10-red-flag-inventory)
11. [What They Actually Have vs. What They Claim](#11-what-they-actually-have-vs-what-they-claim)
12. [Our Opportunity](#12-our-opportunity)

---

## 1. Executive Summary

Maya Preferred / UK Financial Ltd has built a **marketing surface** that looks, at first glance, like a serious gold-backed RWA project. They have:
- A corporate website with mining claim documentation
- 6 different token contracts across Ethereum and Solana
- 43 press articles across crypto news outlets
- An 8-person executive team with named mining advisors
- Geological survey data with coordinates, assay results, and hectarage
- A CoinMarketCap listing with a "99.1 rating"

What they do NOT have:
- A single token with real market liquidity
- Any verifiable link between gold reserves and token supply
- More than 9 holders across their flagship token
- A security audit on any contract
- A registered broker-dealer
- Transfer restriction compliance on any "security token"
- Any mechanism to prevent the CEO from minting unlimited tokens

**The gap between their presentation and their on-chain reality is the widest we've documented.**

---

## 2. Entity Structure — The Corporate Shell

### Registered Addresses

| Entity | Address | Assessment |
| --- | --- | --- |
| UK Financial Ltd (UK) | 128 City Road, London, EC1V 2NX | **Virtual office.** This is one of London's most commonly used registered-agent addresses — shared by thousands of companies. It's a mail-forwarding service, not an office. |
| UK Financial Ltd (US) | 8 The Green, STE A, Dover, DE 19901 | **Registered agent.** This is the CT Corporation / Incorporating Services address. Delaware's most famous registered-agent location. Hundreds of thousands of entities use this address. |
| UK Financial of Mexico Ltd | Not disclosed on site | No address given for the Mexican operational entity. |

### What This Means

Neither address represents a physical office where employees work. Both are the absolute cheapest, most generic corporate registration addresses available in their respective jurisdictions. This is not illegal — it's standard for shell entities — but it's a **credibility problem** when you're claiming to manage gold mines and $924M worth of tokens.

**Institutional comparison:**
- PAXG (Paxos): 450 Lexington Ave, New York — Class A office space, NYDFS regulated
- HSBC Digital Assets: 8 Canada Square, Canary Wharf — Global HQ
- Maya Preferred: Virtual mailbox in Shoreditch + registered agent in Dover

### Entity Map

```
UK Financial Ltd (UK)
├── 128 City Road, London EC1V 2NX (virtual office)
├── Phone: +44 203 693 3808
│
├── UK Financial Ltd (US)
│   └── 8 The Green, STE A, Dover, DE 19901 (registered agent)
│
├── UK Financial of Mexico Ltd
│   ├── President: Nicolas Chidlovsky
│   └── (no address disclosed)
│
├── Maya Preferred (project brand)
│   ├── mayapreferred.io
│   └── info@mayapreferred.io
│
└── Token Ecosystem
    ├── MPRA (ERC-20, Ethereum)
    ├── SMPRA (ERC-3643, Ethereum — claimed)
    ├── MPRD (ERC-20, Ethereum)
    ├── MCAT (SPL, Solana)
    ├── RPWMPRA (ERC-20, Ethereum — "Coming Soon")
    └── WMPRA (ERC-20, Ethereum — "Coming Soon")
```

### Missing: Broker-Dealer

Unlike Dignity Gold (which has Tritaurian Capital, FINRA BD #45500), Maya Preferred has **no broker-dealer relationship disclosed anywhere on the site.** For a project claiming "SEC Security Token Filing," this is a critical omission. You cannot legally distribute securities tokens in the US without a registered BD or an applicable exemption with proper filing.

---

## 3. Token Ecosystem — 6 Tokens, Zero Markets

### Complete Token Registry

| Token | Chain | Contract | On-Chain Status | CatEx Price | Real Market |
| --- | --- | --- | --- | --- | --- |
| **MPRA** | Ethereum | `0xEc1227BfB3e76d7a2A9bca24d9E98f68dE8bf808` | 9 holders, 13 transfers | $924,747,178 | **None** |
| **SMPRA** | Ethereum | `0x8252804BD3424d1A82D9c5077298404c0C00c616` | Unknown | Not listed | **None** |
| **MPRD** | Ethereum | `0x3600aAae5f6F3F0cfd19cAD2F067718CB59E1AFE` | 8 txns, 1 sender, dead | $246,618 | **None** |
| **MCAT** | Solana | `2RbSgY3vd1SfnMst4jKeK7fyfedmiqoB7gah4inf73jt` | Unknown | $10.41 | **$0 volume** |
| **RPWMPRA** | Ethereum | `0x8a0e1804a55d64fB0157D7961f47EBCd535780f2` | Unknown | Coming Soon | **None** |
| **WMPRA** | Ethereum | `0x03747361BA5429dAF165732F9656a97561257ebd` | Unknown | Coming Soon | **None** |

**Combined real trading volume across all 6 tokens: effectively $0.**

### The Token Proliferation Problem

Institutional issuers have **one token.** Maybe two (equity + debt). Maya Preferred has SIX, across TWO chains, with TWO more "Coming Soon."

This is the opposite of institutional discipline. Each new token:
- Fragments already-nonexistent liquidity
- Creates new compliance surface area
- Confuses investors about which token represents what
- Makes audit and attestation exponentially harder

**PAXG:** 1 token. 1 chain. 1 custodian. 1 audit trail. Clear.  
**Maya Preferred:** 6 tokens. 2 chains. 0 custodians. 0 audits. Chaos.

### SMPRA — The "SEC-Compliant" Token Nobody Can Find

The site claims SMPRA (`0x8252804BD3424d1A82D9c5077298404c0C00c616`) is "a fully compliant ERC-3643 security token aiming for SEC compliance."

Problems:
1. ERC-3643 requires an on-chain identity registry (ONCHAINID). No evidence of deployment.
2. ERC-3643 requires compliance agents, claim issuers, and trusted issuers. None visible.
3. "Aiming for SEC compliance" is not SEC compliance. It's aspirational language with no legal weight.
4. No SEC filing reference (Form D, Reg A+, Reg S) is provided anywhere on the site.
5. The contract is not listed on CatEx — meaning even the project's own exchange doesn't trade it.

### RPWMPRA — "400,000x Leverage"

The site describes this as: *"Offers 400,000x leverage on MPRA/SMPRA price movements, amplifying potential gains."*

This is a synthetic derivative product. In the US, this would be regulated by the SEC (if a security) or CFTC (if a commodity derivative). Neither filing is referenced. No risk disclosure. No margin requirements. No liquidation mechanism.

**400,000x leverage applied to a $924M token price would produce notional exposure of $369 trillion per token.** This is 4x global GDP. The claim is either meaningless marketing or a profoundly reckless financial product.

### WMPRA — "1:1 Pegged to MPRA"

*"Each WMPRA token is backed and priced pegged 1:1 of MPRA for guaranteed value parity."*

A wrapped token pegged 1:1 to an illiquid token with zero market and 9 holders is pegged to nothing. You're wrapping zero liquidity in a wrapper and calling it "guaranteed value parity."

---

## 4. The MayaCat Problem — Solana Meme Coin

### Contract: `2RbSgY3vd1SfnMst4jKeK7fyfedmiqoB7gah4inf73jt`

The site describes MCAT as: *"A pioneering meme coin backed by gold and silver."*

| Metric | Value |
| --- | --- |
| Chain | Solana |
| CatEx Price | $10.41 |
| 24h Volume | **$0** |
| Market Share | **0.00%** |

### Why This Is a Problem

1. **A "gold-backed meme coin" is an oxymoron.** Meme coins derive value from community/virality. Gold-backed tokens derive value from reserve collateral. These are opposite value propositions. Combining them suggests neither is taken seriously.

2. **Solana SPL token on a different chain from the rest.** All other Maya tokens are ERC-20 on Ethereum. MCAT is SPL on Solana. This means:
   - No cross-chain reserve proof mechanism
   - Different custody requirements
   - Cannot be held in the same wallet as MPRA/MPRD
   - Separate audit trail required

3. **$0 volume.** Dead on arrival.

4. **CEO quote from the site:**

   > *"MCAT was a little poor little cat at one time but now he's rich and some people don't realize it yet"*  
   > — James Dahlke, CEO UK Financial Ltd

   This is the CEO of a company claiming SEC security token compliance, publicly making price-suggestive statements about a meme coin. In a regulated context, this would be a marketing compliance violation.

5. **"Now he's rich" claim with $0 volume.** Rich how? No one can buy or sell the token. There is no market. The CatEx display price of $10.41 is not a market price — it's a number on a screen with no bids behind it.

---

## 5. Mining Claims — Real Geology, No Token Link

### Claimed Assets

#### Santiago Apóstol Project
- **Location:** Guerrero State, Mexico
- **Type:** Gold and Silver Mine
- **Assessment:** Described as their "cornerstone" asset. No hectarage, no assay data, no coordinates provided on the site. Just a name, a state, and a claim of geological surveys.

#### Las María & Tayoltita Holdings
- **Location:** San Dimas, Durango, Mexico
- **Coordinates:** 24° 02' 53.22" N, 105° 48' 40.75" W
- **Titles:** 170127, 214322, 223791
- **Area:** 676 hectares
- **Assay:** 6.8 g Au/ton, 146 g Ag/ton across 35m
- **Recovery:** 92.4% Au, 91.6% Ag
- **Owner:** Leobardo Antonio López Castañeda (not UK Financial Ltd)

**This is the most detailed claim on the site — and it reveals a critical problem:** The mining title owner is not UK Financial Ltd. It's a named individual (López Castañeda) with "geological oversight by the Maya Preferred technical team." This is an advisory/oversight role, not ownership. The site never clarifies the legal relationship between the title holder and the token.

#### Tequila Project
- **Location:** Jalisco, Mexico
- **Owner:** José Abraham Chávez (executive team member, listed as "Owner, The Tequila Project")
- **Assessment:** "Historic production data," "polymetallic vein continuity," "planned infill drilling" — future-tense language throughout. This is an exploration-stage project, not a producing mine.

### The Missing Link: Gold → Token

The site provides geological data (coordinates, assay results, recovery rates) but **never explains the mechanism by which gold in the ground becomes value in the token.** Specifically:

| Question | Answer on Site |
| --- | --- |
| How many ounces of gold back each MPRA token? | Not disclosed |
| Who holds physical custody of extracted gold? | Not disclosed |
| Is gold stored in an audited vault? | Not disclosed |
| What is the NAV computation methodology? | Not disclosed |
| How often is the reserve audited? | "Third-party audit reports" listed — but they're undated PDFs with no auditor name |
| Can token holders redeem for physical gold? | Not disclosed |
| What entity owns the mining titles? | Individual Mexican nationals, not UK Financial Ltd |

**For a project whose tagline is "Backed By Gold, Not Promises" — the entire backing mechanism is, in fact, a promise.**

### Institutional Standard: PAXG

| Dimension | PAXG | Maya Preferred |
| --- | --- | --- |
| Gold custody | Brink's London vaults, serialized LBMA bars | Unknown — mining concessions ≠ stored gold |
| Audit | Monthly Withum attestation of bar serial numbers | "Audit Report 1-11" — undated, no auditor named |
| Redemption | Physical delivery at 430oz minimum | None described |
| NAV | 1 PAXG = 1 troy oz London Good Delivery | None — $924M per MPRA, backed by exploration-stage mines |
| Custody proof | Real-time bar list, 1:1 allocated | "Proof Documents" — content unverified |
| Title ownership | Paxos Trust Company, NYDFS regulated | Individual Mexican nationals with "oversight" |

---

## 6. Website Credibility Audit

### Positive Signals

| Element | Assessment |
| --- | --- |
| Professional design | Modern, well-designed — significantly better than most crypto projects |
| Token overview section | Clear layout with contract addresses visible |
| Mining documentation | Specific geological data (coordinates, assays) that could be verified |
| CEO video updates | Regular communication — shows active management |
| Multiple social channels | Telegram, YouTube, X, WhatsApp, CoinMarketCap community |
| Team page with real names | 8 named executives with titles — not anonymous |

### Critical Failures

| Element | Problem | Severity |
| --- | --- | --- |
| **"Backed By Gold, Not Promises"** tagline | The entire backing mechanism IS a promise — no on-chain reserve proof, no custodial attestation | CRITICAL |
| **$924M/token displayed** | CatEx price embedded on homepage — presents synthetic price as real value | CRITICAL |
| **"99.1 CoinMarketCap Rating"** | CoinMarketCap does not have a 99.1 "rating" system for individual tokens. CMC has a "Trust Score" for exchanges (1-10 scale). This appears fabricated. | HIGH |
| **"SEC Security Token Filing"** | No SEC EDGAR filing reference provided. No Form D, Reg A+, or Reg S filing number. Unverifiable. | CRITICAL |
| **"21M MPRA Tokens Backed"** | On-chain supply is 200,000,000 (200M). The site claims 21M. These numbers don't match. | HIGH |
| **"First company to officially back Bitcoin with gold and silver reserves in 2019"** | Unverifiable. No third-party confirmation. The concept of "backing Bitcoin" is semantically meaningless — Bitcoin's value doesn't derive from any company's reserves. | HIGH |
| **"No executive token sales or salaries in 8 years"** | If nobody has been paid for 8 years, how is the operation funded? This raises more questions than it answers. | MEDIUM |
| **MPRD described as "stablecoin"** | MPRD is listed at $246,618 on CatEx. A "stablecoin" at $246K is not a stablecoin. Stablecoins are pegged to a fiat currency (usually $1.00). | HIGH |
| **"400,000x leverage" product** | No risk disclosure, no margin mechanism, no regulatory filing for a leveraged derivative | CRITICAL |
| **"Guaranteed value parity" (WMPRA)** | Guaranteeing parity to a zero-liquidity token is guaranteeing nothing | MEDIUM |
| **Partnership logos** | "Partner 1/2/3/4" placeholder text visible in crawl — suggests fake or unfilled partnership section | MEDIUM |

### The "Proof Documents" / Audit Section

The site lists:
- Maya Preferred Whitepaper 2018 (PDF)
- "Audit Report 1" through "Audit Report 11" (PDFs)

**What's missing from every one:**
- Name of the auditing firm
- Date of the audit
- Scope of the audit
- Auditor's opinion letter
- Connection between audit findings and token supply/NAV

Institutional standard: Paxos publishes monthly Withum attestation letters naming every gold bar serial number, with the auditor's letterhead and signature. Maya Preferred publishes numbered PDFs with no metadata.

---

## 7. The Press Release Machine

### 43 Articles — One Story

The site proudly displays "43 articles" of news coverage. The outlets:

```
marketwatch.com ............ 1 article (legitimate outlet, likely paid placement)
cryptocrunches.com ......... 1 article
cryptopress.news ........... 1 article
cryptonews.direct .......... 1 article
noncoiner.com .............. 1 article
cryptoyish.com ............. 1 article
cryptoyers.com ............. 1 article
cryptoddy.com .............. 1 article
coinpress.media ............ 1 article
coinopening.com ............ 1 article
bitcoingress.com ........... 1 article
smallcoiners.com ........... 1 article
... (31 more similar outlets)
```

**Every single article (except possibly MarketWatch) is from the same crypto press release distribution network.** These are pay-to-publish services where anyone can submit a press release for $50-$500 and it gets distributed to dozens of auto-publish crypto "news" sites.

**Key tells:**
- All 43 articles have identical or near-identical headlines
- All were published within the same time window
- The sites are nearly identical in design (template-based)
- None contain original journalism, interviews, or independent analysis
- The primary story repeated: "UK Financial LTD Creates Wrapped Maya Preferred PRA (WMPRA)"

**Institutional comparison:**
- PAXG: Wall Street Journal, Bloomberg, Reuters coverage — independent journalism
- HSBC Digital: Financial Times, The Banker — editorial coverage
- Maya Preferred: 43 copies of the same press release on auto-publish sites

---

## 8. Executive Team Analysis

| Name | Title | Assessment |
| --- | --- | --- |
| **James Dahlke** | President & CEO | Primary public face. YouTube videos, CEO updates. Makes price-suggestive statements about MCAT. 8 years running the project per site claims. |
| **Richard Crespo** | Vice President | Coinbase wallet address known (`0x7890E...C435A5b734`). Appears to be operational lead. |
| **Nicolas Chidlovsky** | President & CEO, UK Financial of Mexico | Mexican operational entity head. Full name: Nicolas Raphaël Alexeï Chidlovsky. |
| **Salvador del Pozo del Camino** | Mining Advisor, Owner of Las María's | Named as mine owner — **not UK Financial employee.** Advisory role only. |
| **José Abraham Chávez** | Senior Advisor, Owner, Tequila Project | Named as mine owner — **not UK Financial employee.** Advisory role only. |
| **Craig Zwann** | Managing Director, Australian Operations | Australian operations with no Australian token listing or regulatory filing evident. |
| **Tina Lovvorn** | Director of Social Media | Social media director on an 8-person team suggests marketing-heavy, infrastructure-light operation. |
| **Alexes Crespo** | CFO | Shares surname with VP Richard Crespo. Family involvement is common in small companies — not inherently problematic but notable for institutional due diligence. |

### Team Composition Assessment

| Role Category | Count | Institutional Standard |
| --- | --- | --- |
| Executive/Management | 3 (CEO, VP, CFO) | Standard |
| Mining/Technical | 2 (advisors, not employees) | Need: full-time CTO, geological engineers |
| Marketing/Social | 1 | Overweight for team size |
| International Ops | 2 (Mexico, Australia) | Under-supported |
| Legal/Compliance | **0** | **CRITICAL GAP** |
| Technology/Engineering | **0** | **CRITICAL GAP** |

**No legal, no compliance, no engineering.** For a project claiming SEC security token compliance across 6 token contracts on 2 blockchains, the absence of legal counsel and technical engineering staff is the most telling gap on the team page.

---

## 9. The Pricing Fantasy

### CatEx Display vs. On-Chain Reality

| Token | CatEx Display | On-Chain Holders | On-Chain Transfers | Real Liquidity |
| --- | --- | --- | --- | --- |
| MPRA | $924,747,178 /token | 9 | 13 | $0 |
| MPRD | $246,618 /token | ~1 active | 8 | $0 |
| MCAT | $10.41 /token | Unknown | Unknown | $0 volume |
| RPWMPRA | "Coming Soon" | Unknown | Unknown | $0 |
| WMPRA | "Coming Soon" | Unknown | Unknown | $0 |

### The Math That Breaks Everything

**If MPRA = $924,747,178 per token and supply = 200,000,000:**

$$\text{Implied Market Cap} = 924{,}747{,}178 \times 200{,}000{,}000 = \$184.9 \text{ quadrillion}$$

**Global GDP is ~$110 trillion.** The implied MPRA market cap is **1,681x the entire world economy.**

This is what the Maya Preferred website displays as the price of their token.

### Previous Observation (March 2026)

Our earlier CatEx snapshot showed MPRA at $777,777,443. Today it's $924,747,178. This means the "price" moved up 18.9% — despite 9 holders and 13 lifetime transfers.

### How This Happens

CatEx allows market makers (or the issuer) to post asks at any price. Without natural buyers creating a real order book, the "last price" is whatever the issuer's own trades execute at. This is not market manipulation in the traditional sense — it's a display on an unregulated exchange. But presenting it as a real price on the project website is deeply misleading.

---

## 10. Red Flag Inventory

| # | Red Flag | Category | Severity |
| --- | --- | --- | --- |
| 1 | Virtual office in London (128 City Road) | Entity | HIGH |
| 2 | Registered agent in Delaware (8 The Green) | Entity | HIGH |
| 3 | No broker-dealer registered or disclosed | Compliance | CRITICAL |
| 4 | 6 tokens across 2 chains, none with liquidity | Infrastructure | CRITICAL |
| 5 | $924M/token displayed as real price | Pricing | CRITICAL |
| 6 | "SEC Security Token Filing" — no EDGAR reference | Compliance | CRITICAL |
| 7 | "99.1 CoinMarketCap Rating" — not a real metric | Marketing | HIGH |
| 8 | 9 holders on flagship token | Distribution | CRITICAL |
| 9 | 8 lifetime transactions on MPRD ("stablecoin" at $246K) | Infrastructure | CRITICAL |
| 10 | MCAT meme coin with $0 volume called "gold-backed" | Marketing | HIGH |
| 11 | "400,000x leverage" product with no regulatory filing | Compliance | CRITICAL |
| 12 | 43 press articles all from same pay-to-publish network | Marketing | HIGH |
| 13 | Mining titles owned by individuals, not company | Legal | HIGH |
| 14 | No legal/compliance staff on team page | Team | CRITICAL |
| 15 | No engineering/tech staff on team page | Team | CRITICAL |
| 16 | "No salaries in 8 years" — no disclosed funding source | Financial | MEDIUM |
| 17 | "21M tokens backed" vs. 200M on-chain supply | Data Integrity | HIGH |
| 18 | Unlimited mint function on MPRA contract (onlyOwner) | Smart Contract | CRITICAL |
| 19 | No security audit on any contract | Smart Contract | CRITICAL |
| 20 | Whitepaper from 2018, "Audit Reports" with no auditor name | Documentation | HIGH |
| 21 | CEO price-suggestive statement about MCAT | Compliance | MEDIUM |
| 22 | "Backed By Gold, Not Promises" with no verifiable backing mechanism | Marketing | CRITICAL |
| 23 | "Partner 1/2/3/4" placeholder text visible on site | Quality | LOW |

**Red Flag Score: 10 CRITICAL, 9 HIGH, 3 MEDIUM, 1 LOW**

---

## 11. What They Actually Have vs. What They Claim

### What They Actually Have

| Asset | Status | Evidence |
| --- | --- | --- |
| UK legal entity | Real | Companies House verifiable |
| US registered entity | Real | Delaware filing verifiable |
| Mexican operations entity | Claimed | No registration provided |
| Mining concessions (3) | Likely real | Specific coordinates, title numbers, named owners |
| Professional website | Real | Well-designed, regularly updated |
| CEO with public presence | Real | Video updates, named identity, 8-year track record |
| 6 deployed token contracts | Real | Verified on Etherscan/Solana |
| CatEx exchange listing | Real | Active trading pair |
| 43 press articles | Real | Paid distribution, but published |
| 2,978 DIGau-comparable reach | N/A | (This is for MPRA: 9 holders) |

### What They Claim But Cannot Demonstrate

| Claim | Problem |
| --- | --- |
| "Backed By Gold" | No custodial attestation, no reserve proof, no NAV link to token supply |
| "SEC Security Token Filing" | No EDGAR filing reference, no form number, no registration |
| "99.1 CoinMarketCap Rating" | Not a real CoinMarketCap metric |
| "$924M per token" | Synthetic CatEx display, not market price |
| "Fully compliant ERC-3643" (SMPRA) | No identity registry, no compliance agents, contract may not even implement ERC-3643 |
| "21M MPRA Tokens Backed" | On-chain supply is 200M |
| "Stablecoin" (MPRD) | Priced at $246K, 8 lifetime transactions |
| "Gold-backed meme coin" (MCAT) | Contradictory concept, $0 volume |
| "400,000x leverage" (RPWMPRA) | No derivative infrastructure, no risk framework |
| "1:1 guaranteed value parity" (WMPRA) | Pegged to a zero-liquidity asset |
| "Third-party audits" | Unnamed auditor, undated reports, no methodology |

---

## 12. Our Opportunity

### Why This Matters for Our Platform

Maya Preferred is the **most infrastructure-deficient project with the most interesting raw materials** we've analyzed. They have:

1. **Real mining connections** — named mine owners, specific concessions, geological data that could be independently verified
2. **Corporate entity infrastructure** — UK, US, Mexico entities, phone number, email, named executives
3. **8 years of operational history** — this is not a 2024 rug-pull. Whether effective or not, they've been building for 8 years
4. **Technical ambition** — ERC-3643 awareness, dual-class token design, wrapped token concepts
5. **A CEO who talks to their community** — video updates, Telegram, social channels active

But they need **literally everything our platform provides:**

| Gap | Our Solution | Revenue |
| --- | --- | --- |
| Zero liquidity | Liquidity bootstrapping + MM integration | $15K-25K setup |
| No compliance | ERC-3643 deployment with identity registry | $25K build |
| No audit | Contract audit coordination | $10K facilitation |
| Phantom pricing | NAV computation from verified reserves | $5K/mo |
| No BD | BD introduction / ATS integration | $25K facilitation |
| 6 fragmented tokens | Token consolidation strategy | $15K consulting |
| No reserve proof | Proof Center deployment with Chainlink oracle | $20K build |
| No trade desk path | 8-gate qualification + conversion rails | $10K facilitation |
| Mining → token link | Reserve attestation model with geological verification | $10K/attestation |

### Estimated Revenue (if onboarded)

| Stream | Amount |
| --- | --- |
| Initial onboarding + assessment | $50K-$100K |
| Infrastructure build (ERC-3643 + proof + portal) | $75K-$120K |
| Ongoing platform license | $10K-$15K/month |
| Trade desk facilitation | $25K |
| Attestation services | $2.5K/quarter |
| **Year 1 Total** | **$280K-$425K** |

### The Pitch

*"You've spent 8 years building the asset story, the team, and the mining connections. You've got real geology, real concessions, and a real CEO who shows up every day. What you don't have is the infrastructure between the gold in the ground and the institutional capital that wants to buy it. That's what we build. We take your mining claims, put them through a verifiable attestation model, deploy compliant token contracts that pass institutional due diligence, create real liquidity, and get you to a trade desk. We're the 8 missing layers between your mines and the money."*

---

*Document generated from live mayapreferred.io site crawl, Etherscan verified contract source, CatEx market data, Solana address analysis, CSV transaction exports, and cross-reference with on-chain contract teardown. All contract addresses, transaction hashes, and geological coordinates are from primary sources.*
