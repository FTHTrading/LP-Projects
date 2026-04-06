# Liquidity Truth Model — Controlled Liquidity for Institutional Security Tokens

> **Classification:** Internal — Market Structure Policy  
> **Phase:** 0 — Planning Output  
> **Date:** 2026-04-07  
> **Scope:** Defines the correct liquidity model for institutional security tokens — what it is, what it is not, and how the platform implements it  
> **Applies to:** All tokens registered on the Sovereign Assets Platform (DIGau, SMPRA, and future issuers)

---

## Executive Summary

The single biggest mistake in the current market landscape for asset-backed security tokens is **liquidity theater** — the appearance of market activity without the substance.

The evidence is everywhere:
- MPRA trading at $924M per token on CatEx with 9 total holders
- DIGau with $0 in 24-hour volume and no price at all
- Anomalous MPRA/USDT prints that would fail any institutional trade review in minutes

The Sovereign Assets Platform takes a different posture: **liquidity must be real, source-attributed, and NAV-anchored**. A token that shows a verifiable $5 NAV and trades at a 2% spread is worth infinitely more to an institutional investor than a token that claims a $924M price with no mechanism to buy or sell.

**The model:** Start with NAV. Build OTC. Then market makers. Then DEX/CEX. Never reverse-engineer from a fabricated exchange price.

---

## 1. The Problem with Exchange-Theater Liquidity

### 1.1 CatEx as a Case Study

MPRA trades on CatEx at approximately $924 million per token. The following analysis explains why this is a problem, not an achievement:

**Why the price is not real:**
- 9 total on-chain holders means total circulating supply is negligible
- A small handful of trades in a thin orderbook sets any price you want
- CatEx is not regulated, does not disclose order sourcing, and has no AML requirements
- No institutional investor will submit an order to CatEx — it would move the price 100% on entry

**Why it's actively harmful:**
- An institutional due diligence review will reject any token whose "market price" cannot be reconciled against NAV
- A "$924M/token" price with zero verifiable reserve backing is a reputational liability, not an asset
- When SMPRA launches at a correct NAV (likely a fraction of $924M), the delta will be visible to all existing MPRA holders — if not managed carefully, this creates a negative narrative

**The correction path:**
- Never use the CatEx price in any issuer materials
- Define NAV as the canonical reference price from Day 1 of platform onboarding
- All market-making obligations are anchored to NAV, not to CatEx
- At SMPRA re-listing, CatEx sees a new token (SMPRA) with a published NAV — old MPRA history is irrelevant to the new instrument

### 1.2 DIGau as a Cleaner Problem

DIGau has no market price whatsoever — $0 volume. This is actually the cleaner starting position:
- No fabricated price to unwind
- First published price will be NAV (gold ounces × LBMA fix / total supply)
- All trading history will be anchored to NAV from the start
- No reputational baggage from an anomalous price chart

---

## 2. What Controlled Liquidity Means

### 2.1 The Three-Layer Stack

Controlled liquidity for institutional security tokens is built in this sequence:

```
Layer 1: NAV Reference Price (must exist first)
         ↓ establishes the fair value anchor
Layer 2: OTC Desk / Internal RFQ (first liquidity)
         ↓ enables buy/sell at quoted spread over NAV
Layer 3: Market Maker Agreements (bilateral commitments)
         ↓ systematic two-sided depth with spread obligations
Layer 4: Exchange Listing (market access, not price discovery)
         ↓ final layer — uses NAV as reference, not exchange as oracle
```

**Layer 4 is the last layer, not the first.**  
Exchange listing is the result of having real liquidity, not the mechanism that creates it.

### 2.2 Layer 1 — NAV as Reference Price

NAV per token is the canonical price for every token on the platform.

| Token | NAV Formula |
|-------|------------|
| DIGau | `gold_ounces_verified × LBMA_PM_fix / total_supply` |
| SMPRA | `verified_reserve_value × discount_factor / total_supply` |
| Any future gold-backed | `(weight × purity × spot_price) / total_supply` |
| Any future mining-backed | `(reserve_tonnage × grade × recovery × spot × discount) / total_supply` |

**NAV properties:**
- Updated at minimum once daily (daily NAV snapshot job)
- Source-attributed: every NAV record shows which price feeds were used
- Published publicly on the proof center
- Hash-anchored on-chain for tamper detection
- Premium/discount to market price is tracked as a key metric

**Platform implementation:**
- `NavSnapshot` model in Prisma records every NAV computation
- `NavVsMarket` interface tracks premium/discount relative to market price
- BullMQ job: `compute-nav` runs daily, triggers `reserve-registry.computeNav()`
- Public endpoint: `GET /api/v1/tokens/:symbol/nav/latest` and `/history`

### 2.3 Layer 2 — OTC Desk / Internal RFQ

The OTC desk is the first real liquidity mechanism. It enables investors to:
- Submit a buy or sell interest at NAV (with spread)
- Receive a quote from the issuer treasury or a primary liquidity provider
- Execute a bilateral trade with compliance verification

**OTC desk mechanics:**
- Investor submits `RFQ` (Request for Quote): token, direction (buy/sell), amount
- Platform generates quote: NAV ± spread per `SpreadPolicy`
- Quote valid for configurable window (e.g., 4 hours)
- Investor accepts quote → compliance check → settlement
- Settlement: stablecoin in, token out (subscription) OR token in, stablecoin out (redemption)

**Key properties:**
- No public orderbook — quote is bilateral, not broadcast
- Spread is issuer-controlled and policy-driven (not auction-determined)
- All RFQs are audited and recorded in the platform
- Spread is explicitly a cost to the investor, not a hidden fee — disclosed upfront

**Platform implementation:**
- `admin/trade-desk/rfq` route (new — not in current structure)
- `api/v1/trade-desk/` route handlers
- `TradeDeskQualification` model tracks qualification gates
- `SpreadPolicy` model controls spread per-token per-venue

### 2.4 Layer 3 — Market Maker Agreements

Market makers provide systematic, contractual two-sided liquidity:

**Market maker obligations (standard terms):**
- Maximum spread: 200bps (2%) around published NAV
- Minimum two-sided depth: ≥ $100K bid, ≥ $100K ask at all times during trading hours
- Uptime: ≥ 95% of trading hours
- Response time to quote requests: ≤ 60 seconds
- Inventory commitment: minimum capital allocation disclosed in onboarding

**Platform controls on market makers:**
- MM onboarded as a `Venue` with type=OTC or type=CEX
- MM wallet addresses whitelisted in compliance engine (market makers are special-purpose investors)
- `SpreadPolicy` record: per-MM inventory skew parameters
- Anomaly detection monitors MM quotes for spread violation, stale quotes, wash patterns

**Market maker onboarding process:**
1. Due diligence: entity verification, regulatory status, capital confirmation
2. MM agreement signed: spread obligations, inventory commitment, reporting requirements
3. Admin action: MM wallet whitelisted, venue record created, spread policy configured
4. Test period: 2-week monitored period before counting toward trade desk qualification gates

### 2.5 Layer 4 — Exchange Listing

Exchange listing is the final layer and requires Layers 1–3 to be operational.

**Pre-listing requirements:**
- NAV is published and has been updated for ≥ 30 consecutive days
- OTC desk has at least 90 days of operating history
- At least 2 active market makers are operational
- Aggregate bid depth ≥ $500K across all venues before listing
- Compliance certification: all exchange users are either KYC'd by us or the exchange (for regulated venues)
- Circuit breakers configured and tested

**Exchange selection criteria:**
- Regulatory status: prefer regulated (licensed) exchanges
- Compliance capability: does the exchange have KYC? Can we restrict non-KYC'd users?
- Liquidity depth: is there existing orderflow on this exchange that benefits our token?
- Market surveillance: does the exchange flag suspicious activity?
- Avoid: exchanges with history of wash trading, manipulated volume, or zero regulatory oversight

**Red flags that disqualify an exchange (lessons from CatEx):**
- Unverified volume figures
- Price anomalies on other tokens
- No disclosed regulatory license
- No KYC for trading accounts
- No market surveillance tools

---

## 3. Anomaly Detection Framework

### 3.1 Anomaly Types

| Anomaly Type | Definition | Severity |
|-------------|------------|---------|
| `price_deviation` | Market price deviates >5% from NAV for >2 hours | WARNING |
| `price_deviation_critical` | Market price deviates >15% from NAV for >30 minutes | HIGH |
| `volume_spike` | Volume in 1hr exceeds 3× 30-day average hourly volume | WARNING |
| `stale_quote` | No quote from a market maker for >30 minutes | WARNING |
| `spread_violation` | MM quote spread exceeds 200bps | HIGH |
| `wash_trading` | Same address buying and selling within a 60-minute window | CRITICAL |
| `spoofing` | Large order placed and cancelled within 5 seconds >5 times | HIGH |
| `circuit_breaker_trend` | Price has moved >3% in the same direction for 3 consecutive candles | WARNING |

### 3.2 Anomaly Response Protocol

```
AnomalySeverity    Response
INFO:              Log, no action
WARNING:           Log, alert compliance officer within 15 minutes
HIGH:              Log, alert compliance officer immediately, 
                   trigger market ops review
CRITICAL:          Log, auto-halt trading (circuit breaker),
                   alert compliance officer + admin immediately,
                   require manual override to resume
```

### 3.3 Circuit Breaker Configuration

Each token has configurable circuit breakers. Default configuration:

```
priceDeviationThresholdPct: 10.0    // halt if price deviates >10% from NAV
volumeSpikeThresholdMultiple: 5.0   // halt if volume is 5× normal
spreadBreachThresholdBps: 300       // halt if bid-ask spread exceeds 300bps
consecutiveDirectionalMoves: 5      // halt if 5 consecutive same-direction moves
inactivityThresholdMinutes: 30      // alert if no quote for 30 minutes
```

Circuit breaker state:
- `INACTIVE` — normal operation
- `TRIGGERED` — trading halted automatically
- `MANUAL_OVERRIDE` — compliance officer restarted trading with reason logged
- `PERMANENT` — permanently halted (requires admin action to clear)

All circuit breaker events are recorded in `AuditEvent` with `eventType = 'circuit_breaker.triggered'`

### 3.4 Platform Implementation

- `packages/market-ops`:
  - `detectAnomalies(tokenSymbol)` — runs heuristic checks on latest snapshots
  - `evaluateCircuitBreakers(tokenSymbol)` — determines if any breaker should trigger
- BullMQ job: `anomaly-scan` runs every 5 minutes per active token
- Admin UI: `admin/market-ops/anomalies` (real-time anomaly feed)
- Alert system: email + admin notification on WARNING+

---

## 4. Reference Pricing Architecture

### 4.1 Price Feed Sources

Prices are never taken from a single source. The platform uses a hierarchy:

| Priority | Source | Used For | Notes |
|----------|--------|----------|-------|
| 1 | Internal NAV computation | Reference price | Always authoritative |
| 2 | Chainlink oracle | On-chain price feed | Deployed via Phase 9 |
| 3 | Aggregated venue VWAP | Market price | Volume-weighted across all venues |
| 4 | Best single venue mid | Market fallback | If <2 venues active |
| 5 | Last known good price | Stale fallback | Only used in outage |

**No price is ever taken directly from an exchange without source attribution.**

### 4.2 Premium/Discount Monitoring

The `NavVsMarket` data structure is the most important single metric on the platform:

```typescript
interface NavVsMarket {
  timestamp: string;
  navPerToken: string;       // authoritative
  marketPrice: string;       // aggregated from venues
  premiumDiscountPct: number; // (market - nav) / nav × 100
  premiumDiscountBand: 'normal' | 'warning' | 'critical';
}
```

Thresholds:
- `normal`: ±2%
- `warning`: ±2% to ±5%
- `critical`: ±5% or greater

Premium/discount chart published on public proof center so institutional investors can see price integrity in real time.

### 4.3 NAV Computation Pipeline

```
Data Sources:
  ├── Gold spot: goldprice.org API (LBMA PM fix, daily)
  ├── Silver spot: kitco.com API
  ├── Mineral reserves: issuer-provided, updated on attestation events
  └── Other assets: manual entry (for non-spot-priced reserves)

Computation:
  ├── Pull latest valuations for all ReserveAsset records linked to token
  ├── Apply attestation discount:
  │   ├── ATTESTED:       discount = 0% (full value)
  │   ├── SELF_REPORTED:  discount = 10% (standard haircut)
  │   └── UNVERIFIED:     discount = 30% (conservative)
  ├── Sum adjusted values across all linked reserves
  ├── Subtract any known liabilities
  ├── Divide by total circulating supply
  └── Record NavSnapshot

Output:
  └── NavSnapshot { totalReserveValue, totalLiabilities, navPerToken, backingRatio, methodology, sources }
```

---

## 5. OTC Desk Architecture

### 5.1 RFQ Flow

```
Investor → submit RFQ (token, direction, amount, settlement currency)
         → compliance pre-check (whitelisted? jurisdiction? holding limits?)
         → spread engine (NAV ± spread from active SpreadPolicy)
         → generate quote (price, quantity, expiry, settlement wire/on-chain)
         → investor accepts/rejects
         → if accepted: AdminAction created (requires treasury officer approval)
         → upon approval: mint/burn + settlement movement + audit log
```

### 5.2 Spread Policy Management

```
SpreadPolicy per token per venue:
  baseSpreadBps:           e.g., 150 (1.5%)
  minSpreadBps:            e.g., 50  (0.5% — floor, never tighter)
  maxSpreadBps:            e.g., 400 (4.0% — cap, prevents extreme widening)
  volatilityAdjustment:    true → widen spread when NAV changes >1% in 24h
  inventorySkew:           true → widen ask when inventory low, widen bid when inventory high
  navDeviationThreshold:   e.g., 0.03 → halt quoting if market deviates >3% from NAV
```

### 5.3 Settlement Mechanics

For each accepted RFQ:

**Subscription (buy):**
1. Investor transfers stablecoin (USDC/USDT) to designated settlement wallet
2. Treasury officer confirms receipt → marks AdminAction as ready to execute
3. Token mint approved → on-chain mint to investor wallet
4. `Holding` record updated in DB
5. `Transaction` ( type=SUBSCRIPTION ) recorded
6. `TreasuryMovement` (inflow, stablecoin) recorded

**Redemption (sell):**
1. Investor submits redemption request (signed with wallet)
2. Compliance check: no lockup, no freeze, whitelist valid
3. Treasury officer initiates stablecoin outflow to investor wallet
4. Upon confirmation: burn tokens from investor wallet (or lock into redemption escrow)
5. `Transaction` (type=REDEMPTION) recorded
6. NAV snapshot updated

---

## 6. Liquidity Health Scoring

Each token receives a `LiquidityHealth` score (0–100) computed at least hourly:

| Component | Weight | Excellent (full pts) | Minimum (0 pts) |
|-----------|--------|---------------------|-----------------|
| NAV publication | 20 | Updated within 4hr | Not published at all |
| Spread tightness | 20 | ≤ 100bps average | > 500bps or no spread |
| Bid depth | 20 | ≥ $500K aggregate | < $50K |
| Ask depth | 10 | ≥ $500K aggregate | < $50K |
| Venue count | 10 | ≥ 3 active venues | 0 venues |
| Volume 24h | 10 | ≥ $250K real | $0 |
| Circuit breaker | 10 | No triggers in 30d | Circuit breaker active |

**Score interpretation:**
- 80–100: Institutional-grade liquidity
- 60–79: Operating with gaps, acceptable for soft launch
- 40–59: Significant deficiency, restricted investor access
- 0–39: Not suitable for new investor onboarding

Published on public proof center for investor visibility.

---

## 7. Competing with Exchange-Theater Operators

When issuers (or investors) ask "why not just list on CatEx like MPRA?" the answer is:

| Dimension | Exchange Theater (CatEx / MPRA model) | True Liquidity (Our Model) |
|-----------|--------------------------------------|---------------------------|
| Price discovery | Fabricated — thin orderbook sets any price | NAV-derived — anchored to real reserve value |
| Market depth | Illusory — looks deep on screen, collapses on execution | Real — MM commitments with capital at risk |
| Counterparty | Unknown, anonymous, no KYC | Compliant investors only, whitelisted |
| Regulatory risk | HIGH — exchange & issuer both exposed | LOW — compliance-first architecture |
| Institutional credibility | ZERO — fails any due diligence | HIGH — verifiable, auditable, source-attributed |
| Withdrawal liquidity | ZERO — you cannot exit at the screen price | REAL — OTC desk + MM provide real bids |
| NAV integrity | None — no connection between price and reserves | Full — premium/discount monitored publicly |

**The business argument:** An institutional investor with $10M to deploy is not going to send it to CatEx. They will send it to a platform where they can see the reserve proof, verify the NAV, execute OTC at a transparent spread, and get a settlement confirmation with an audit trail. Our OTC desk at 150bps spread is a feature, not a bug.

---

## 8. Rollout Order

```
Phase 1  — Foundation (DB, auth) — NAV data model ready
Phase 3  — Reserve/Proof — NAV computation engine live
Phase 5  — API Layer — /api/v1/tokens/:symbol/nav/... endpoints live
Phase 6  — Frontend — public NAV chart on proof center
Phase 8  — Market Ops:
           Step 1: OTC desk / RFQ routes operational
           Step 2: SpreadPolicy management in admin
           Step 3: Exchange adapter framework
           Step 4: Anomaly detection BullMQ jobs
           Step 5: Circuit breaker configuration UI
           Step 6: Liquidity health scoring
           Step 7: Market maker onboarding flow
Phase 9  — Contracts — Chainlink oracle deployment (on-chain price feed)
```

---

## 9. Key Metrics Dashboard (Target)

The following metrics are displayed on the internal market ops dashboard:

| Metric | Source | Update Frequency |
|--------|--------|-----------------|
| NAV per token | `NavSnapshot` | Daily (or on reserve change) |
| Market price | Aggregated venue VWAP | Every 5 minutes |
| Premium / discount | Computed | Every 5 minutes |
| Aggregate bid depth | Sum across venues | Every 5 minutes |
| Aggregate ask depth | Sum across venues | Every 5 minutes |
| Active MM count | `Venue` table | Real-time |
| 24h volume (real) | Sum of transactions | Daily |
| OTC RFQ pipeline | `AdminAction` count | Real-time |
| Anomaly events (24h) | `AnomalyEvent` | Real-time |
| Circuit breaker status | Per-token | Real-time |
| Liquidity health score | Computed | Hourly |
