# Trade Desk Onboarding — Requirements & Infrastructure

> **Purpose:** Define the exact pathway from illiquid asset-backed token to institutional trade desk listing.  
> **Source truth:** Operator feedback (2026-04-06), reverse-engineered from MPRA/DIGau failures.

---

## 1. Trade Desk Qualification Framework

### 1.1 Minimum Requirements Matrix

| Gate | Requirement | Threshold | Measurement |
| --- | --- | --- | --- |
| **G1 — Value** | Minimum stablecoin balance in settlement wallet | $10,000,000 USDT | On-chain balance check |
| **G2 — Asset Type** | Settlement in accepted asset class | USDT ERC-20, USDT TRC-20, USDC, BTC | Token contract verification |
| **G3 — Wallet** | Self-custody wallet with single-key or multi-sig | Exodus, MetaMask, Fireblocks, Ledger | Address ownership verification |
| **G4 — Distribution** | Minimum unique holder count | ≥25 unique addresses | On-chain holder scan |
| **G5 — Liquidity** | Orderbook depth within 5% of reference price | ≥$500K aggregate bid depth | Venue adapter polling |
| **G6 — Price Integrity** | NAV-anchored reference price with ≤15% market deviation | Computed from reserve attestation | NAV engine output |
| **G7 — Compliance** | KYC/AML on all holders above threshold + issuer entity verification | Reg D / Reg S qualified | Compliance engine check |
| **G8 — Multi-Venue** | Listed on ≥2 venues with independent price discovery | Active orderbooks on 2+ venues | Venue adapter status |

### 1.2 Qualification Score (0–100)

```
Score = Σ (gate_weight × gate_pass)

G1: 25 pts (value)
G2: 10 pts (asset type)
G3:  5 pts (wallet type)
G4: 15 pts (distribution)
G5: 15 pts (liquidity depth)
G6: 15 pts (price integrity)
G7: 10 pts (compliance)
G8:  5 pts (multi-venue)
```

- **Score ≥ 85:** Green — qualified for trade desk onboarding
- **Score 60–84:** Yellow — conditional, review required
- **Score < 60:** Red — not qualified, remediation plan required

---

## 2. Stablecoin Conversion Path

### Why Stablecoins Win

> "STABLE Coins yield the best because they are pegged 1:1 to the USD."

Trade desks need:
1. **No price risk** during settlement window (T+0 to T+1)
2. **Immediate verifiability** — on-chain balance is the balance
3. **Fungibility** — 1 USDT = 1 USD across all counterparties
4. **Speed** — ERC-20 settles in minutes, not days

### Conversion Rails Architecture

```
┌─────────────────────────────────────────────────┐
│           SOVEREIGN CONVERSION RAILS             │
├──────────┬──────────┬──────────┬────────────────┤
│  INPUT   │  ENGINE  │  OUTPUT  │  DESTINATION   │
├──────────┼──────────┼──────────┼────────────────┤
│ MPRA     │ OTC Desk │ USDT    │ Trade Desk     │
│ DIGau    │ DEX Agg  │ USDC    │ Exodus Wallet  │
│ Gold RWA │ Atomic   │ BTC     │ Fireblocks     │
│ ANY ERC  │ Reserve  │ ETH     │ Settlement Acc │
└──────────┴──────────┴──────────┴────────────────┘
```

### Conversion Methods

1. **OTC Desk (preferred for > $1M)**
   - Platform acts as facilitator between issuer and OTC counterparty
   - Pre-negotiated rate based on NAV computation
   - Settlement: atomic swap or escrow via smart contract
   - Fee: 50–100bps

2. **DEX Aggregation (for < $1M, when pool exists)**
   - Route through 1inch/Paraswap aggregators
   - Slippage protection relative to reference price
   - Fee: 25–50bps + gas

3. **Reserve-Backed Direct Conversion**
   - Issuer burns token → releases reserve asset → treasury converts to USDT
   - Most capital-efficient but requires functional redemption mechanism
   - Fee: 75bps

4. **Atomic Cross-Chain Swap**
   - For TRC-20 USDT output when ERC-20 gas is prohibitive
   - Bridge via Wormhole/LayerZero with platform-managed relayer
   - Fee: 30–60bps + bridge fee

---

## 3. Wallet Infrastructure Requirements

### Trade Desk Accepted Wallets

| Wallet | Type | Networks | Trade Desk Status |
| --- | --- | --- | --- |
| Exodus | Self-custody | ETH, BTC, TRC-20, 250+ | **Preferred** — operator-recommended |
| MetaMask | Self-custody | EVM chains | Accepted |
| Coinbase Wallet | Self-custody (non-custodial) | ETH, Base, Polygon, Arbitrum, Avalanche | Accepted |
| Fireblocks | Institutional custody | Multi-chain | **Preferred** for institutional |
| Ledger/Trezor | Hardware | Via interface | Accepted with address verification |
| Maya Preferred Wallet | Proprietary | MPRA ecosystem only | **NOT accepted** — custodial restriction |

### Key Insight: Maya Wallet Lock-in

> "Maya has to stay in the Maya wallet."

This is the fundamental problem. If tokens cannot leave a proprietary wallet, they cannot:
- Be deposited on an exchange for real price discovery
- Be swapped on a DEX for stablecoin conversion
- Be held in an institutional custody solution
- Be verified by a trade desk as a free-and-clear asset

**Our platform solves this** by requiring all issued tokens to use standard ERC-20/ERC-3643 on public EVM chains with no wallet lock-in.

---

## 4. Onboarding Workflow (7 stages)

```
Stage 1: ASSESSMENT
  └─ Token data intake (contract, supply, holders, reserves)
  └─ Run qualification scoring (8 gates)
  └─ Output: Qualification Report

Stage 2: REMEDIATION (if score < 85)
  └─ Holder distribution plan (airdrop, private placement)
  └─ Liquidity seeding plan (market maker onboard)
  └─ Stablecoin conversion plan
  └─ Output: Remediation Roadmap

Stage 3: CONVERSION
  └─ Execute stablecoin conversion (see Section 2)
  └─ Verify $10M+ in settlement wallet
  └─ Output: Conversion Confirmation

Stage 4: WALLET SETUP
  └─ Designated settlement wallet (Exodus/Fireblocks)
  └─ Address verification + KYC on wallet controller
  └─ Multi-sig configuration if required
  └─ Output: Wallet Verification Report

Stage 5: VENUE LISTING
  └─ Submit listing application to target venues
  └─ Provide reserve attestation + NAV computation
  └─ Deploy market maker on primary venue
  └─ Output: Venue Confirmation

Stage 6: TRADE DESK REGISTRATION
  └─ Submit qualification package to trade desk
  └─ Wallet balance verification
  └─ 24-hour turnaround for approval
  └─ Output: Trade Desk Approval

Stage 7: LIVE MONITORING
  └─ Continuous qualification scoring
  └─ Alert on: holder concentration spike, liquidity drain, NAV deviation
  └─ Quarterly re-attestation requirement
  └─ Output: Ongoing Compliance Dashboard
```

---

## 5. Infrastructure Components Required

| Component | Package | Status |
| --- | --- | --- |
| Trade Desk Qualification Scorer | `@sov/market-ops` | NEW |
| Stablecoin Conversion Engine | `@sov/treasury` | NEW |
| Holder Concentration Monitor | `@sov/analytics` | NEW |
| Wallet Verification Service | `@sov/auth` | NEW |
| Conversion Rails Router | `@sov/exchange-adapters` | NEW |
| Trade Desk API | `apps/web` API routes | NEW |
| Qualification Dashboard (Admin) | `apps/web` component | NEW |
| Conversion Flow (Admin) | `apps/web` component | NEW |
| Holder Distribution Chart | `apps/web` component | NEW |
| Trade Desk Status Widget | `apps/web` component | NEW |
