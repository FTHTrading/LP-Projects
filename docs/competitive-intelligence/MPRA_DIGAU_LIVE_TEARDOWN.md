# Competitive Intelligence — MPRA & DIGau Live Teardown

> **Classification:** Internal — Trade Desk Intelligence  
> **Date:** 2026-04-06  
> **Source:** CatEx live data, Dignity Gold wallet, trade-desk operator feedback  
> **Purpose:** Reverse-engineer the exact failure modes our platform must solve

---

## 1. Maya Preferred (MPRA) — CatEx Live Data

### Observed Market Data (2026-03-30 snapshot)

| Metric | Value | Assessment |
| --- | --- | --- |
| Pair | MPRA/USDT | CatEx-only listing |
| Price | 777,777,443 USDT | **Synthetic** — not rational market price |
| 24h Volume (MPRA) | 0.04 MPRA | **Near-zero real volume** |
| 24h Volume (USDT) | 31,237,804,476 USDT | **Manufactured** — impossible at 0.04 MPRA volume |
| Change | +0% | Flatline — no real price discovery |
| OHLC Range | O: 777,742,281 / H: 777,777,443 / L: 777,742,281 / C: 777,777,443 | Micro-range within 0.005% |
| Volume bar | 0.0000635 | Negligible |
| Holder count | ~4 entities | **Extreme concentration** |

### Related CatEx Pairs (observed)

| Token | Price/USDT |
| --- | --- |
| MPRA | 777,777,44x |
| RPWMPRA | 777,773,45x |
| WMPRA | 777,593,61x |
| MPRD | 54,685.67 |
| MFUND | 9,585.15 |

### Critical Failures

1. **No liquidity**: 0.04 MPRA traded in 24h. Any real sell order would move market to zero.
2. **Synthetic pricing**: $777M/token implies a single MPRA token is worth more than most S&P 500 market caps. Price is self-referential.
3. **Holder concentration**: 4 entities hold all supply. Fails any institutional due diligence.
4. **No stablecoin conversion path**: Cannot move value out of MPRA into USDT/BTC without counterparty.
5. **Single-venue risk**: CatEx-only. No alternative venue, no price cross-reference.
6. **No reference pricing**: No NAV, no reserve-backed reference price, no oracle.

### Trade Desk Verdict (from operator)

> "The Maya has some decent volume, but price as well as it is only held by 4 entities will not cut it. If they want to get on trade, their best bet is to convert some to USDT ERC20 or TRC 20 or BTC, but STABLE Coins yield the best because they are pegged 1:1 to the USD."

**Translation:** The synthetic volume is irrelevant. 4 holders = no distribution. No stablecoin liquidity = can't access institutional rails.

---

## 2. Dignity Gold (DIGau) — Wallet & Liquidity Assessment

### Known Wallet

- **Ethereum address:** `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E`
- **Standard:** ERC-20 on Ethereum mainnet
- **Compatible networks:** Ethereum, Base, Polygon, Avalanche, Arbitrum

### Critical Failures

1. **Zero liquidity**: No known DEX pool, no CEX listing with meaningful orderbook.
2. **No conversion path**: Token cannot be swapped to USDT/BTC on any standard DEX or CEX.
3. **BD dependency**: Relies on Tritaurian Capital — no visible integration or self-serve infrastructure.
4. **No price discovery**: No market — therefore no price, no NAV computation possible.
5. **No investor portal**: Individual wallet-to-wallet transfers only.

### Trade Desk Verdict (from operator)

> "The Dignity coin has no liquidity at all and again, if they can swap or convert per above, open that Exodus wallet, do just the MIN. of $10M, they will be up on trade in 24 hours."

**Translation:** Token is a dead asset without conversion to stable value. $10M USDT in a self-custody wallet (Exodus) = instant trade desk qualification.

---

## 3. Richard Crespo Wallet

- **Ethereum address:** `0x7890E...C435A5b734` (Coinbase Wallet, partial — from QR)
- **Networks:** Ethereum, Base, Polygon, Avalanche, Arbitrum (EVM-compatible)
- **Use case:** Receiving tokens and NFTs — standard ERC-20 receive address

---

## 4. Trade Desk Minimum Requirements (from operator feedback)

| Requirement | Detail |
| --- | --- |
| **Minimum balance** | $10,000,000 USD equivalent |
| **Accepted assets** | USDT (ERC-20 preferred, TRC-20 accepted), BTC, stablecoin equivalents |
| **WHY stablecoins** | Pegged 1:1 to USD — no price volatility risk during settlement |
| **Wallet type** | Self-custody (Exodus, MetaMask) — custodial wallets may not qualify |
| **Time to trade** | 24 hours from deposit confirmation |
| **NOT accepted** | Illiquid tokens, synthetic-priced assets, tokens with <5 holders |

### Disqualifying Conditions

- Token held by fewer than 5 unique entities
- No verifiable conversion path to stablecoin
- No orderbook depth (zero real bids within 5% of mark)
- Self-referential pricing (price set by issuer, not market)
- Single-venue listing with no cross-venue reference

---

## 5. What Our Platform Must Solve

### For Maya Preferred (current state → our solution)

| Problem | Our Platform Solution |
| --- | --- |
| 4 holders, no distribution | **Concentration monitor** + minimum holder threshold enforcement before listing |
| Synthetic pricing | **NAV-anchored reference price** computed from verified reserves, not orderbook |
| 0.04 MPRA volume | **Liquidity bootstrapping module** with market-maker integration and minimum liquidity requirements |
| CatEx-only | **Multi-venue adapter framework** with cross-venue arbitrage detection |
| No stablecoin conversion | **Conversion rails** — automated swap to USDT/BTC with settlement to trade desk wallets |
| No trade desk qualification | **Trade desk qualification dashboard** with real-time readiness scoring |

### For Dignity Gold (current state → our solution)

| Problem | Our Platform Solution |
| --- | --- |
| Zero liquidity | **Liquidity bootstrapping** + DEX pool creation automation |
| No conversion path | **Stablecoin conversion rails** with direct USDT/BTC output |
| BD dependency | **Self-serve issuance OS** — no third-party BD bottleneck |
| No investor portal | **Full investor portal** with KYC, accreditation, holdings, redemptions |
| No price discovery | **Reserve-backed NAV pricing** with 3-tier attestation |
| Dead wallet | **Wallet infrastructure** supporting Exodus, Coinbase, MetaMask + institutional custody |

---

## 6. Revenue Architecture (enabled by solving these problems)

1. **Conversion fee**: 50–100bps on stablecoin conversion (MPRA/DIGau → USDT)
2. **Trade desk onboarding fee**: Flat fee ($25K–$100K) for qualification + listing
3. **Liquidity provision fee**: Ongoing bps on facilitated volume
4. **Platform SaaS**: Monthly license for the issuer OS
5. **Attestation service**: Per-attestation fee for 3rd-party reserve verification
6. **Market data**: Premium data feed licensing to venues and traders
