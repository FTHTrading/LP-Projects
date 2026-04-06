# Liquidity Operating Model

## 1. Scope

"LP" in this platform means the full liquidity / market-structure layer:
- Liquidity provision and orchestration
- Market making inventory and controls
- Exchange connectivity (CEX, DEX, OTC, RFQ)
- Spread policies and quote generation
- Redemption-subscription mechanics
- Reference pricing from NAV and reserve data
- Anomaly detection and market integrity
- Circuit breakers and compliance halts

---

## 2. Issuer Inventory Seeding

### Process
1. Issuer mints initial token supply via Token Engine
2. Tokens are allocated: Treasury Reserve, Market Making Pool, Investor Allocation
3. Market Making Pool is subdivided by venue allocation
4. Each venue allocation has min/max inventory thresholds

### Inventory Accounts
```
Treasury Reserve      — long-term holding, not for active trading
Market Making Pool    — active inventory for quoting
  ├── CEX Venue A     — allocation for venue A
  ├── CEX Venue B     — allocation for venue B
  ├── DEX Pool        — AMM liquidity (if permitted)
  └── OTC Desk        — inventory for bilateral trades
Investor Allocation   — tokens pending distribution
```

### Rebalancing Rules
- If venue inventory drops below MIN_THRESHOLD, trigger rebalance from pool
- If venue inventory exceeds MAX_THRESHOLD, withdraw excess to pool
- Rebalancing requires treasury approval if amount exceeds REBALANCE_APPROVAL_THRESHOLD
- All movements recorded in audit log

---

## 3. Market Maker Approval

### Onboarding Flow
1. Market maker submits application with entity details, trading history, compliance certifications
2. Compliance officer reviews application
3. Legal review of market making agreement
4. Treasury allocates inventory
5. Technical onboarding: API keys, venue credentials, monitoring setup
6. Probation period with reduced inventory limits

### Market Maker Tiers
| Tier | Description | Max Inventory | Spread Requirement | Uptime SLA |
|------|-------------|---------------|-------------------|------------|
| Tier 1 | Primary market maker | 500K tokens | ≤ 2% | 95% |
| Tier 2 | Secondary market maker | 100K tokens | ≤ 5% | 90% |
| Tier 3 | OTC-only | 50K tokens | Negotiated | N/A |

---

## 4. Spread Configuration

### Spread Policy Structure
```typescript
interface SpreadPolicy {
  tokenId: string;
  venueId: string;
  baseSpreadBps: number;           // e.g., 200 = 2%
  volatilityAdjustmentEnabled: boolean;
  maxSpreadBps: number;            // hard ceiling
  minSpreadBps: number;            // floor (avoids loss-leading)
  inventorySkewEnabled: boolean;   // widen on low inventory side
  timeOfDayAdjustment: boolean;    // wider during low-liquidity hours
  navDeviationThreshold: number;   // widen if market deviates from NAV
}
```

### Spread Computation
```
effectiveSpread = baseSpread
  + volatilityAdjustment(if enabled)
  + inventorySkewAdjustment(if enabled)
  + timeOfDayAdjustment(if enabled)
  + navDeviationAdjustment(if threshold breached)

bid = referencePrice × (1 - effectiveSpread / 2)
ask = referencePrice × (1 + effectiveSpread / 2)
```

---

## 5. Quote Generation

### Reference Price Computation
```
internalFairValue = weightedAverage(
  navPerToken      × NAV_WEIGHT,
  vwapAcrossVenues × VWAP_WEIGHT,
  lastAuditValue   × AUDIT_WEIGHT
)
```

### Quote Lifecycle
1. Reference price computed from NAV + market data
2. Spread policy applied to generate bid/ask
3. Inventory check — reject quote if insufficient
4. Compliance check — verify venue is allowed, token not halted
5. Quote published to venue via adapter
6. Quote expires after TTL (configurable per venue)
7. Fill notification triggers settlement flow

---

## 6. Premium / Discount Management

### Thresholds
```typescript
interface PremiumDiscountPolicy {
  warningPremiumPct: number;   // e.g., 5% — alert
  criticalPremiumPct: number;  // e.g., 15% — consider primary issuance
  warningDiscountPct: number;  // e.g., 5% — alert
  criticalDiscountPct: number; // e.g., 15% — consider buyback
  actionCooldownMinutes: number;
}
```

### Actions on Deviation
| Condition | Trigger | Action |
|-----------|---------|--------|
| Premium > warning | Market price > NAV + 5% | Alert to market ops |
| Premium > critical | Market price > NAV + 15% | Consider primary issuance to increase supply |
| Discount > warning | Market price < NAV - 5% | Alert to market ops |
| Discount > critical | Market price < NAV - 15% | Consider buyback / redemption window |

---

## 7. Venue Selection & Routing

### Venue Allowlist / Denylist
```typescript
interface VenueConfig {
  venueId: string;
  name: string;
  type: 'cex' | 'dex' | 'otc';
  status: 'active' | 'suspended' | 'probation' | 'denied';
  complianceFlags: string[];     // e.g., ["no_us_persons", "regulated_eu"]
  maxDailyVolume: number;
  healthCheckInterval: number;
  adapter: string;               // exchange adapter module name
}
```

### Routing Logic
1. Filter venues by status = active
2. Filter by compliance flags matching token jurisdiction rules
3. Sort by: spread quality > fill rate > latency
4. Route to best venue; fallback chain if primary unavailable

---

## 8. Anomaly Detection

### Bad Exchange Print Detection
```typescript
interface AnomalyRules {
  priceDeviationFromRefPct: number;  // e.g., 20% — flag if print deviates >20% from ref
  volumeSpikeMultiplier: number;     // e.g., 10x average — flag volume spikes
  washTradingMinRatio: number;       // buy/sell ratio near 1.0 and same addresses
  staleQuoteMinutes: number;         // flag if best bid/ask unchanged for too long
  spoofingDepthThreshold: number;    // large orders placed and cancelled quickly
}
```

### Response Actions
```
ANOMALY DETECTED
    ├── Log event with full context
    ├── Alert market ops team
    ├── If severity >= HIGH:
    │     ├── Widen spreads automatically
    │     └── Notify compliance officer
    └── If severity >= CRITICAL:
          ├── Trigger circuit breaker
          ├── Halt quoting on affected venue
          └── Require manual resume
```

---

## 9. Circuit Breakers

### Trigger Conditions
| Breaker | Condition | Action |
|---------|-----------|--------|
| Price halt | Price moves > X% in Y minutes | Pause quoting, alert |
| Volume halt | Volume exceeds Z × daily average | Pause quoting, alert |
| Inventory halt | Inventory falls below emergency minimum | Stop quoting, rebalance |
| Compliance halt | Regulatory event or issuer directive | Full trading halt |
| System halt | Adapter failure or data feed outage | Pause affected venue |

### Reset Process
1. Automatic cooldown period (configurable)
2. Market ops review of trigger conditions
3. Compliance sign-off if compliance-triggered
4. Manual resume with optional parameter adjustments

---

## 10. Redemption-Subscription Mechanics

### Redemption Window
- Defined periods (e.g., monthly) during which investors may request token redemption for underlying value
- Redemption requests queue during the window
- Settlement occurs at NAV calculated at window close
- Large redemptions may be subject to gates (max % of supply per window)

### Subscription (Primary Issuance)
- When demand exceeds supply or premium is persistent
- New tokens minted against verified reserve additions
- Compliance checks: investor must be whitelisted, jurisdiction-cleared
- Settlement: investor funds → treasury → reserve addition confirmed → tokens minted → delivered

### Arb Logic
- If secondary market price >> NAV → primary issuance is attractive (buy at NAV, sell at market)
- If secondary market price << NAV → redemption is attractive (buy at market, redeem at NAV)
- The platform surfaces this information; actual arb execution is manual or MM-driven

---

## 11. OTC / RFQ Desk

### Flow
1. Counterparty submits RFQ via portal or API
2. System generates indicative quote based on reference price + OTC spread
3. Trader reviews and optionally adjusts
4. Counterparty accepts or counters
5. Settlement via treasury (fiat wire, stablecoin, or on-chain)

---

## 12. Wrapped / Legacy Token Migration

### Migration Path: MPRA-like → SMPRA-like
1. Announce migration window with clear timeline
2. Investors deposit legacy tokens to migration contract
3. Compliance check: verify investor is whitelisted for new token class
4. New tokens minted 1:1 (or per conversion ratio)
5. Legacy tokens burned
6. Migration dashboard shows real-time progress
7. Post-migration: legacy token contract frozen permanently

---

## 13. LP Policy Files

```json
{
  "version": "1.0",
  "tokenId": "sovereign-preferred",
  "policies": {
    "spread": {
      "base_bps": 200,
      "max_bps": 800,
      "volatility_adjustment": true,
      "inventory_skew": true
    },
    "inventory": {
      "total_allocation": 1000000,
      "venue_allocations": {
        "venue_a": { "target": 300000, "min": 100000, "max": 500000 },
        "venue_b": { "target": 200000, "min": 50000, "max": 400000 },
        "otc": { "target": 100000, "min": 25000, "max": 200000 }
      },
      "rebalance_approval_threshold": 100000
    },
    "circuit_breakers": {
      "price_halt_pct": 10,
      "price_halt_window_minutes": 5,
      "volume_halt_multiplier": 15,
      "cooldown_minutes": 30
    },
    "premium_discount": {
      "warning_pct": 5,
      "critical_pct": 15,
      "action_cooldown_minutes": 60
    }
  }
}
```

---

## 14. Suspicious Trading Alerts

### Heuristics
- **Wash trading**: Same entity on both sides, volume with no net position change
- **Spoofing**: Large orders placed and cancelled within seconds
- **Layering**: Multiple orders at different levels, all cancelled before fill
- **Stale quotes**: Best bid/ask unchanged for > configurable threshold
- **Price manipulation**: Single trades moving price > X% with minimal volume
- **Cross-venue arb abuse**: Rapid buy on venue A / sell on venue B at issuer's expense

### Alert Severity
- INFO: logged, no action
- WARNING: logged, market ops notified
- HIGH: logged, compliance notified, spreads widened
- CRITICAL: logged, compliance + treasury notified, circuit breaker considered

---

## 15. Dashboard — Liquidity Truth

The liquidity dashboard must show **reality, not confidence theater**:

### Required Widgets
- Current bid/ask by venue (with last-updated timestamp)
- NAV vs market price (with premium/discount band)
- Inventory levels by venue (with min/max thresholds)
- Volume quality score by venue (genuine volume estimate)
- Spread history chart
- Anomaly event timeline
- Circuit breaker status
- Redemption window countdown
- Market maker uptime and quote quality
- Source attribution for every displayed price
