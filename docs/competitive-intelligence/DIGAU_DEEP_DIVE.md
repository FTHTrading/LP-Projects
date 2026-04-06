# Dignity Gold (DIGau) — Standalone Deep Dive

> **Classification:** Internal — Issuer Intelligence  
> **Date:** 2026-04-06  
> **Scope:** Complete assessment of Dignity Gold as both a case study and a potential platform client  
> **Verdict:** Credible gold-backed ambition with zero infrastructure — the most salvageable case if capital is deployed correctly

---

## 1. Entity Structure

| Field | Detail |
| --- | --- |
| Token | DIGau (Dignity Gold) |
| Issuer | Dignity Corp |
| Broker-Dealer | Tritaurian Capital (third-party, not in-house) |
| Jurisdiction | US — securities token framing |
| Claimed Backing | Physical gold reserves |
| Token Standard | ERC-20 on Ethereum mainnet |
| Contract Address | `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E` |
| Exchange Listings | None with live orderbook |
| Wallet | Standard ERC-20 (no proprietary lock-in, unlike MPRA) |

## 2. What They've Done Right

Dignity Gold has a surprisingly strong foundation for a project with zero liquidity.

1. **Standard ERC-20 on public Ethereum** — Unlike MPRA, DIGau tokens live on mainnet with standard wallets. No proprietary lock-in. This means the token can already interact with every DEX, every CEX, every custodian.

2. **Registered broker-dealer relationship** — Tritaurian Capital is a real FINRA-registered BD. This is the single most important compliance checkbox many projects skip. They have a legal distribution channel.

3. **Gold-backed narrative with institutional framing** — Not crypto-native meme marketing. Professional tone, institutional aspirations, commodity collateral. This resonates with traditional finance.

4. **Clear regulatory awareness** — The explicit disclaimer "Dignity Corp is not a registered broker-dealer" shows legal counsel involvement. They're not pretending to be something they're not.

5. **EVM-compatible contract** — The contract at `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E` works across Ethereum, Base, Polygon, Avalanche, Arbitrum. Multi-chain ready with no migration needed.

6. **No wallet lock-in** — This advantage over MPRA cannot be overstated. DIGau holders can move tokens to Exodus, Fireblocks, MetaMask, or any exchange wallet immediately.

## 3. Where The System Breaks

### 3.1 The Zero-Liquidity Trap

| Metric | DIGau Value | Institutional Standard |
| --- | --- | --- |
| 24h Volume | **$0** | > $500K real daily |
| DEX Pools | **0** | 1+ with > $500K TVL |
| CEX Orderbooks | **0 active** | 2+ with real depth |
| Bid Depth (5%) | **$0** | > $500K aggregate |
| Market Makers | **0** | 2+ with committed capital |
| Price Feeds | **None** | Chainlink/Pyth oracle |

**Root cause:** Token was issued but no market was created. No pool, no orderbook, no maker, no taker. The token exists on-chain but has no economic life.

This is worse than MPRA's situation. MPRA at least has CatEx and a synthetic price. DIGau has nothing — which means there's no price, no market cap, no way to value the token or convert it.

### 3.2 The Broker-Dealer Bottleneck

Tritaurian Capital is a real BD, but the dependency creates a bottleneck:

- **No self-serve infrastructure** — Investors can't buy/sell without contacting Tritaurian
- **No visible integration** — No API, no portal, no automated workflow between Dignity Corp and Tritaurian
- **Single point of failure** — If Tritaurian deprioritizes DIGau, the entire distribution channel dies
- **No secondary market role** — Tritaurian is a primary issuance BD, not a market-maker

In institutional finance (HSBC, Goldman), the BD relationship includes:
- Electronic order routing
- Automated compliance checking
- Real-time settlement
- Investor portal integration
- Market-making obligations

Dignity has the BD label but none of the infrastructure.

### 3.3 The Proof Gap

- **No reserve attestation** — Gold backing claimed, but no dashboard, no third-party audit, no hash-anchored proof
- **No NAV computation** — Without a published methodology, there's no way to price the token
- **No custody proof** — Where is the gold? Which vault? Which custodian? No transparency chain

### 3.4 The Investor Experience Gap

- No investor portal
- No KYC/accreditation workflow (deferred to Tritaurian)
- No holdings dashboard
- No redemption mechanism
- No tax document generation
- No secondary market access

## 4. Comparison to Institutional Standard (HSBC Gold Token Benchmark)

HSBC, JP Morgan, and UBS have all explored tokenized gold products. Here's the benchmark:

| Capability | Institutional Standard | DIGau Status | Gap Severity |
| --- | --- | --- | --- |
| Gold Custody | LBMA vault, Brink's/Loomis, audited | Unknown — no disclosure | **CRITICAL** |
| Custody Proof | Daily/weekly attestation with serial numbers | None | **CRITICAL** |
| Price Feed | LBMA AM/PM fix + real-time OTC | No price at all | **CRITICAL** |
| Liquidity | OTC desk + exchange + DEX pool | Zero | **CRITICAL** |
| BD Integration | Electronic order routing, automated compliance | Manual, outsourced | **HIGH** |
| Investor Portal | Self-serve: buy/sell/redeem/report | None | **HIGH** |
| Settlement | T+1 DvP, atomic on-chain | No settlement infrastructure | **HIGH** |
| Compliance | KYC/AML integrated, jurisdiction-gated | Deferred to BD | **MEDIUM** |
| Legal Structure | SPV + trust + legal opinions + offering docs | "Not a registered BD" disclaimer | **MEDIUM** |
| Secondary Market | Market maker + exchange listing | None | **HIGH** |

## 5. Why DIGau Is Actually the Easier Fix

Despite having worse liquidity than MPRA, DIGau is the easier onboarding case:

1. **No wallet migration needed** — Already on standard ERC-20. Day one compatibility.
2. **No synthetic pricing to unwind** — Starting from zero is cleaner than starting from $777M fantasy.
3. **Real BD relationship** — Tritaurian provides the legal distribution framework. We provide the technology.
4. **Gold is priced** — Unlike MPRA's vague "mineral reserves," gold has a globally recognized price (LBMA fix). NAV computation is straightforward: `NAV = (gold_ounces × spot_price) / total_supply`.
5. **EVM-native** — Contract works on L2s. Can deploy liquidity on Base/Arbitrum for low gas.

## 6. Path to Funding — How Our Platform Fixes DIGau

### Phase 1: Platform Onboarding (Week 1)
1. **Deploy investor portal** — Self-serve KYC, accreditation, holdings dashboard
2. **Connect Tritaurian workflow** — Digital BD integration for primary issuance
3. **Set up reserve attestation** — Gold custody proof ingestion, NAV engine activation
4. **Register token** in our compliance engine — whitelist management, jurisdiction rules

### Phase 2: Price Discovery (Week 2-3)
5. **Compute NAV** — gold ounces × LBMA fix / total supply = reference price
6. **Publish NAV on proof center** — first verifiable price for DIGau ever
7. **Deploy Chainlink oracle** — on-chain price feed for DeFi integration
8. **Deploy Uniswap V3 pool** — DIGau/USDC on Ethereum or Base, $250K+ initial depth

### Phase 3: Liquidity Building (Week 4-6)
9. **Onboard 2 market makers** — committed inventory with spread obligations
10. **Apply for second venue listing** — provide NAV + attestation + compliance package
11. **Holder distribution campaign** — target 50+ unique accredited holders
12. **Activate conversion rails** — DIGau → USDC via reserve-backed redemption

### Phase 4: Trade Desk Qualification (Week 7-8)
13. **Convert $10M+ gold-backed value to USDT** via reserve redemption
14. **Deposit to Exodus wallet** — verified settlement address
15. **Run 8-gate qualification** — score should hit 85+ with infrastructure in place
16. **Trade desk approval** — 24hr turnaround

### Expected Timeline: 8 weeks from platform onboarding to trade desk listing

**DIGau is faster than MPRA** because there's no synthetic price to unwind and no wallet migration.

## 7. Revenue Opportunity For Our Platform

| Revenue Stream | One-Time/Recurring | Amount |
| --- | --- | --- |
| Onboarding fee | One-time | $50,000 - $75,000 |
| Investor portal deployment | One-time | $15,000 |
| Platform license (monthly) | Recurring | $5,000 - $10,000/mo |
| NAV computation service | Recurring | $2,500/mo |
| Conversion fee (DIGau → USDT) | Transaction | 75 bps on volume |
| Trade desk facilitation | One-time | $25,000 |
| Attestation service | Recurring | $2,500/attestation |
| DEX pool management | Recurring | 25 bps on LP volume |
| **Year 1 total estimate** | | **$200,000 - $400,000** |

## 8. Combined Opportunity: MPRA + DIGau as First Two Clients

If both onboard:
- **Combined Year 1 revenue:** $450,000 - $900,000
- **Proof of concept:** Two live issuers on the platform validates the entire model
- **Case study value:** "We took a $777M fantasy price and a zero-liquidity token and got both to trade desk in under 3 months"
- **Referral pipeline:** Every illiquid asset-backed token issuer sees these case studies and wants in

## 9. Assessment

**DIGau is a gold-backed token that forgot to build the gold-market infrastructure.**

The team has:
- Real commodity backing claim ✅
- Standard ERC-20 (no wallet lock-in) ✅
- FINRA-registered BD relationship ✅
- Professional institutional framing ✅
- Legal awareness and proper disclaimers ✅

The team lacks:
- Any form of liquidity ❌
- Price discovery mechanism ❌
- Reserve attestation proof ❌
- Investor portal ❌
- Secondary market infrastructure ❌
- Stablecoin conversion rails ❌

**Every gap is our product.**

The pitch to Dignity: "You have the gold. You have the BD. We'll build the market. 8 weeks to trade desk."
