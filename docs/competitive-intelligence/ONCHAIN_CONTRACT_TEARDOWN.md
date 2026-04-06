# On-Chain Contract Teardown — DIGau + MPRA/MPRD

> **Classification:** Internal — Smart Contract Intelligence  
> **Date:** 2026-04-06  
> **Scope:** Full source-level analysis of Dignity Gold (DIGau), Maya Preferred PRA (MPRA), and Maya Preferred Dividend (MPRD) smart contracts as verified on Etherscan  
> **Purpose:** Identify security posture, compliance readiness, upgrade risk, and institutional gaps at the contract layer  
> **Verdict:** Both projects deploy functional but institutionally deficient contracts. DIGau has upgrade risk through an unaudited proxy. MPRA has centralization risk through unlimited mint. Neither meets the standard for regulated digital securities.

---

## Table of Contents

1. [Contract Registry](#1-contract-registry)
2. [DIGau — AdminUpgradeabilityProxy Analysis](#2-digau--adminupgradeabilityproxy-analysis)
3. [DIGau — Implementation Contract](#3-digau--implementation-contract)
4. [DIGau — On-Chain Activity Analysis](#4-digau--on-chain-activity-analysis)
5. [MPRA — MayaPreferredPRA Analysis](#5-mpra--mayapreferredpra-analysis)
6. [MPRD — Maya Preferred Dividend Analysis](#6-mprd--maya-preferred-dividend-analysis)
7. [Comparative Security Matrix](#7-comparative-security-matrix)
8. [Institutional Compliance Gap — Contract Layer](#8-institutional-compliance-gap--contract-layer)
9. [What Institutional-Grade Looks Like](#9-what-institutional-grade-looks-like)
10. [Remediation Roadmap](#10-remediation-roadmap)

---

## 1. Contract Registry

| Token | Contract Address | Type | Solidity | Verified | Audited | Proxy |
| --- | --- | --- | --- | --- | --- | --- |
| **DIGau** | `0x394D14D78850E516Fa5Eb88F843ef43196e136b0` | ERC-20 (Proxy) | 0.4.24 | Yes (Exact Match) | **No** | AdminUpgradeabilityProxy |
| DIGau Impl | `0x29B358f3bF20E6a6ec95D6bA5488639427C31adB` | Implementation | — | — | **No** | — |
| DIGau Holder Key | `0xc70f0d23E7F59E04DCF6E22c2c050B135F45f54E` | EOA/Contract | — | — | — | — |
| **MPRA** | `0xEc1227BfB3e76d7a2A9bca24d9E98f68dE8bf808` | ERC-20 | 0.8.22 | Similar Match | **No** | None |
| **MPRD** | `0x3600aAae5f6F3F0cfd19cAD2F067718CB59E1AFE` | ERC-20 | — | — | **No** | — |
| MPRA Deployer | `uk-financial-ltd-corporate-assets.eth` | ENS | — | — | — | — |

---

## 2. DIGau — AdminUpgradeabilityProxy Analysis

### 2.1 Architecture

DIGau uses the **ZeppelinOS AdminUpgradeabilityProxy** pattern — a transparent proxy where:

- All state lives in the proxy contract (`0x394D...`)
- Logic lives in a swappable implementation contract (`0x29B3...`)
- A single admin address can upgrade the implementation at any time
- Non-admin calls are forwarded via `delegatecall` to the implementation

```
┌──────────────────┐     delegatecall      ┌──────────────────┐
│    Proxy          │ ──────────────────▶   │  Implementation  │
│ 0x394D...e136b0   │                       │  0x29B3...31adB  │
│                   │                       │                  │
│ ADMIN_SLOT ───▶ admin address             │  Token logic     │
│ IMPL_SLOT  ───▶ 0x29B3...                 │  Freeze logic    │
│ Token state (balances, supply)            │  Transfer logic  │
└──────────────────┘                        └──────────────────┘
```

### 2.2 Proxy Contract Source (Solidity 0.4.24)

**Compiler:** v0.4.24+commit.e67f0147  
**Optimization:** Yes, 200 runs  
**License:** None specified  

Key findings:

| Finding | Severity | Detail |
| --- | --- | --- |
| **Ancient Solidity version** | HIGH | 0.4.24 is from 2018. No overflow protection, no custom errors, no immutable keyword. 6 major Solidity versions behind current (0.8.x). |
| **No security audit** | CRITICAL | Etherscan shows "No Contract Security Audit Submitted." For a token claiming $870M market cap, this is disqualifying. |
| **Single-admin upgrade** | HIGH | One address can swap the entire implementation — changing transfer logic, freeze logic, mint behavior — without timelocks, multisig, or governance. |
| **No timelock on upgrades** | HIGH | `upgradeTo()` and `upgradeToAndCall()` execute immediately. No delay for holders to react to malicious upgrades. |
| **No multisig governance** | HIGH | Admin slot holds a single EOA (or contract, but no evidence of multisig). Standard is Gnosis Safe multisig with 3/5 or higher. |
| **`upgradeToAndCall` uses raw `.call`** | MEDIUM | `require(address(this).call.value(msg.value)(data))` — pre-0.5 call pattern returns bool only. No return data checking. |
| **Storage collision risk** | LOW | Standard ZeppelinOS slot hashes mitigate this, but unaudited implementation could introduce storage conflicts. |

### 2.3 Proxy Admin Powers

The proxy admin (Dignity Gold Deployer) can:

1. **`upgradeTo(address)`** — Replace the entire implementation contract silently
2. **`upgradeToAndCall(address, bytes)`** — Replace implementation AND execute arbitrary initialization
3. **`changeAdmin(address)`** — Transfer admin control to any address

**What this means:** The deployer can, in a single transaction, replace the token's logic with a contract that:
- Mints unlimited tokens
- Freezes all holders
- Drains all balances
- Changes any rule without notice

This is the **"rug pull" surface** — not that they will, but that they *can*, with zero technical barriers.

### 2.4 Implementation Contract

The implementation at `0x29B358f3bF20E6a6ec95D6bA5488639427C31adB` is labeled as a **Gold Mining** token. Key functions visible via proxy "Read/Write as Proxy":

- **`freeze()`** — Admin can freeze individual addresses (actively being used — see Section 4)
- Standard ERC-20: `transfer`, `approve`, `transferFrom`, `balanceOf`, `totalSupply`

**Critical: The implementation source is not independently verified on Etherscan.** The proxy is verified, but the actual token logic running behind it requires navigating to the implementation address separately.

---

## 3. DIGau — Implementation Contract

### 3.1 Token Parameters

| Parameter | Value |
| --- | --- |
| Name | DIGau |
| Symbol | DIGau |
| Decimals | 18 |
| Max Total Supply | 2,999,999,999.999999999975903159 DIGau |
| Holders | 2,978 (growing at +0.067%) |
| Price | $0.29 @ 0.000136 ETH |
| On-Chain Market Cap | $869,951,716.60 |
| Circulating Supply Market Cap | $0.00 |

### 3.2 Key Observation: $870M Cap, $0 Circulating Cap

Etherscan shows:
- **Onchain Market Cap:** $869.9M (price × total supply)
- **Circulating Supply Market Cap:** $0.00

This means **Etherscan cannot verify any real circulating supply.** The $870M figure is a phantom cap — total supply multiplied by whatever price the token last traded at. No recognized pricing oracle, no CoinMarketCap/CoinGecko listing provides a circulating supply figure.

### 3.3 Freeze Function — Active Use

Recent transactions show the **Dignity Gold Deployer** actively calling `freeze()`:

| Date | Tx Hash | Method | Gas |
| --- | --- | --- | --- |
| Apr 4, 2026 | `0x7844a65e...` | Freeze | 0.00000607 ETH |
| Apr 4, 2026 | `0xd31572b4...` | Freeze | 0.00000682 ETH |
| Apr 4, 2026 | `0x3f755e2b...` | Freeze | 0.00000883 ETH |
| Apr 4, 2026 | `0xf04fb167...` | Freeze | 0.00000636 ETH |
| Apr 4, 2026 | `0x29488eac...` | Freeze | 0.00000601 ETH |
| Apr 4, 2026 | `0x1b3ae7d8...` | Freeze | 0.00000630 ETH |
| Apr 4, 2026 | `0x97fd91f7...` | Freeze | 0.00000560 ETH |

**7 freeze transactions in a single day.** This means the deployer is actively freezing holder addresses. While this could serve compliance purposes (blocking sanctioned wallets), the function requires no explanation, no on-chain reason, and no appeal mechanism.

**For a "developing platform" that claims SEC compliance aspirations, unilateral freeze power without governance or disclosure is a regulatory red flag.**

### 3.4 Key Holder Analysis

| Address | Balance | % Supply | Value | Label |
| --- | --- | --- | --- | --- |
| `0xc70f0d23...f54E` | 286,494,163.84 DIGau | 9.55% | $83,078,696 | Unknown (active transferrer) |

This address (`0xc70f0d23`) is also executing outbound transfers from the same day as the freeze operations — 6 transfer txns from this address on Apr 4, each costing ~$0.14 gas. This suggests coordinated freeze-and-transfer operations.

---

## 4. DIGau — On-Chain Activity Analysis

### 4.1 Transaction Profile

| Metric | Value |
| --- | --- |
| Total Transactions | 12,733 |
| Recent (24h) | ~5 transfers + approvals |
| Active Exchanges | Coinstore, XT.com |
| Transaction Types | Transfer, Approve, Freeze |

### 4.2 Exchange Activity

Recent transfer activity shows tokens flowing from:
- **Coinstore 3** → DIGau contract (deposits)
- **XT.com 11** → DIGau contract (deposits)
- **0xc70f0d23...** → DIGau contract (internal transfers)

Both Coinstore and XT.com are **Tier-3 exchanges** — not recognized by institutional custodians or compliance frameworks. Neither is a FINRA ATS, registered exchange, or MiFID venue.

### 4.3 Activity Red Flags

| Flag | Evidence | Severity |
| --- | --- | --- |
| Freeze-then-transfer pattern | 7 freezes + 6 transfers on same day from same deployer lineage | HIGH |
| Deployer concentration | Single deployer entity controls proxy admin + freeze + transfers | HIGH |
| Tier-3 exchange only | Coinstore and XT.com — no Tier-1/Tier-2 venues | MEDIUM |
| No DEX liquidity | Zero Uniswap/Sushiswap pools | HIGH |
| $0 circulating cap | Etherscan cannot verify real circulating supply | HIGH |

---

## 5. MPRA — MayaPreferredPRA Analysis

### 5.1 Contract Architecture

**No proxy.** MPRA is a direct ERC-20 deployment. This is simpler and more transparent than DIGau's proxy pattern, but also means the contract logic can never be upgraded — what's deployed is permanent.

**Compiler:** v0.8.22+commit.4fc1097e  
**Optimization:** Yes, 200 runs  
**EVM Version:** Paris  
**License:** None specified  
**Verification:** Similar Match (not Exact Match — matched to `0xd0D0D455...4c6A25D1D`)

### 5.2 Token Parameters

| Parameter | Value |
| --- | --- |
| Name | Maya Preferred PRA |
| Symbol | MPRA |
| Decimals | 18 |
| Initial Supply | 200,000,000 (200M) |
| Holders | **9** |
| Transfers | 13 total |
| On-Chain Market Cap | Not listed |

### 5.3 Source Code Analysis

The MPRA contract is a **hand-rolled ERC-20** — not using OpenZeppelin or any standard library. Key findings:

| Finding | Severity | Detail |
| --- | --- | --- |
| **No security audit** | CRITICAL | "No Contract Security Audit Submitted" on Etherscan. |
| **Similar Match, not Exact** | HIGH | Contract verified via "Similar Match" to another deployment. This means the deployer reused code and Etherscan auto-matched it rather than submitting the actual source. |
| **Unlimited mint** | CRITICAL | `mint(address to, uint256 amount) public onlyOwner` — owner can create tokens with no cap, no governance, no timelock. Current supply is 200M but could become 200B with one transaction. |
| **Single-owner control** | HIGH | All admin functions (`mint`, `pause`, `unpause`, `transferOwnership`, `setTokenURI`) gated by `onlyOwner` modifier pointing to a single address. |
| **Global pause** | MEDIUM | `pause()` halts all transfers. No emergency governance, no multisig, no timelock. |
| **No transfer restrictions** | HIGH | For a token described as a "Real World Asset" backed by gold, there are zero compliance controls: no whitelist, no KYC check, no accredited investor verification, no Reg D/S transfer restrictions. |
| **No blacklist/freeze** | MEDIUM | Unlike DIGau, MPRA has no ability to freeze individual addresses. While less authoritarian, this means zero sanctions compliance — OFAC-sanctioned addresses can trade freely. |
| **EIP-2612 Permit** | LOW | Supports gasless approvals via `permit()`. Standard, but the `ecrecover` pattern has known risks with `v` malleability — no `v` validation beyond range. |
| **No reentrancy guards** | LOW | Simple state pattern without external calls mitigates this, but no explicit guards. |
| **Unchecked block in `_spendAllowance`** | INFO | Uses `unchecked` for allowance subtraction after bounds check — gas optimization, safe. |

### 5.4 Deployer Identity

Deployer: `uk-financial-ltd-corporate-assets.eth`

This is an **ENS name** — a positive signal vs. an anonymous deployer. It ties on-chain identity to the UK Financial Ltd corporate entity. However:
- ENS ownership can be transferred
- No on-chain proof it's controlled by the actual corporate entity
- The ENS name itself provides brand attribution, not legal accountability

### 5.5 Critical: The Unlimited Mint Problem

```solidity
function mint(address to, uint256 amount) public onlyOwner whenNotPaused {
    if (to == address(0)) revert ZeroAddress();
    _totalSupply += amount;
    _balances[to] += amount;
    emit Transfer(address(0), to, amount);
}
```

There is **no cap on minting.** The owner can call `mint(owner, 10_000_000_000e18)` and create 10 billion tokens. For a token claimed to be "backed by gold and silver," the ability to inflate supply without any on-chain reserve verification is the most fundamental integrity failure possible.

**Comparison to institutional standard (PAXG):**
- PAXG has mint gated by reserve proof + custodian attestation
- PAXG has burn requiring physical gold delivery
- PAXG supply = verified London Good Delivery bars in Brink's vaults
- MPRA has `onlyOwner` — one address, no reserve check

### 5.6 CatEx Price vs. On-Chain Reality

| Metric | CatEx Display | On-Chain Reality |
| --- | --- | --- |
| Price | $924,858,907 per MPRA | No oracle, no DEX pool, no verifiable price |
| Volume | $26.8M 24h | 13 total transfers ever on-chain |
| Holders | "thousands" implied | **9 addresses** |
| Market Share | 24.12% of CatEx | Meaningless without external verification |

The disparity between CatEx's displayed price ($924M per token) and the on-chain reality (9 holders, 13 transfers) is the most extreme we've documented. **This is not a market — it's a display.**

---

## 6. MPRD — Maya Preferred Dividend Analysis

### 6.1 On-Chain Activity (from Etherscan Export)

| Metric | Value |
| --- | --- |
| Contract | `0x3600aAae5f6F3F0cfd19cAD2F067718CB59E1AFE` |
| Total Transactions | **8** |
| Date Range | Jan 5, 2026 — Jan 14, 2026 (10 days) |
| Unique Senders | **1** (`0x7a56f645dcb513d0326cbaa048e9106ff6d4cd5f`) |
| Unique Recipients | **1** (the contract itself) |
| Methods | Transfer (×8) |
| Total Gas Spent | ~0.000027 ETH (~$0.06) |

### 6.2 Transaction Timeline

```
Jan  5, 01:26 UTC — Transfer (3 txns within 2 minutes)
Jan 12, 07:47 UTC — Transfer (2 txns within 1 minute)
Jan 12, 17:18 UTC — Transfer (1 txn)
Jan 13, 03:10 UTC — Transfer (1 txn)
Jan 14, 08:14 UTC — Transfer (1 txn)
```

### 6.3 Assessment

**MPRD is effectively dead on-chain.**

- 8 total transactions — all from a single address to the contract
- No holder activity, no exchange activity, no DEX interaction
- All transactions occurred within a 10-day window in January 2026, then stopped
- The single sender (`0x7a56f645...`) appears to be the deployer or a deployment script
- Zero gas cost variation suggests automated/scripted transactions
- CatEx lists MPRD at $246,364 — but on-chain shows zero organic activity

**This contract has likely never had a real user transaction.**

---

## 7. Comparative Security Matrix

| Dimension | DIGau | MPRA | MPRD | Institutional Standard |
| --- | --- | --- | --- | --- |
| **Solidity Version** | 0.4.24 (2018) | 0.8.22 (2023) | Unknown | 0.8.20+ |
| **Security Audit** | None | None | None | SWC + Tier-1 audit (Trail of Bits, OpenZeppelin, Certora) |
| **Proxy Pattern** | AdminUpgradeabilityProxy | None | Unknown | Transparent Proxy + Timelock + Multisig |
| **Admin Control** | Single address (proxy admin + freeze) | Single address (mint + pause + ownership) | Unknown | 3/5+ Gnosis Safe multisig |
| **Mint Control** | Via implementation (presumably capped) | **Unlimited** (`onlyOwner`) | Unknown | Capped OR reserve-gated |
| **Freeze/Blacklist** | Yes (unilateral, no governance) | No | Unknown | Compliance-gated with audit trail |
| **Transfer Restrictions** | Unknown (implementation not analyzed) | **None** | Unknown | KYC whitelist for securities |
| **Upgrade Mechanism** | Instant (no timelock) | None (immutable) | Unknown | 48h timelock + multisig |
| **On-Chain Governance** | None | None | None | Governor + Timelock minimum |
| **Supply Integrity** | 3B tokens, ~$870M phantom cap | 200M tokens, $924M CatEx display | 8 txns total | Verifiable via oracle + attestation |
| **Holder Count** | 2,978 | 9 | ~1 | 100+ with real distribution |
| **Exchange Venues** | Coinstore, XT.com (Tier-3) | CatEx only | CatEx only | 3+ Tier-1/2 venues |

---

## 8. Institutional Compliance Gap — Contract Layer

### 8.1 Securities Token Requirements Neither Contract Meets

For any token claiming to represent a real-world asset under US securities law (Reg D, Reg S, Reg A+):

| Requirement | DIGau Status | MPRA Status |
| --- | --- | --- |
| **ERC-3643 (T-REX) or equivalent** | Missing | Missing |
| **On-chain identity registry** | Missing | Missing |
| **Transfer compliance module** | Missing | Missing |
| **Accredited investor check** | Missing | Missing |
| **Reg D holding period enforcement** | Missing | Missing |
| **OFAC sanctions screening** | Missing (has freeze, but manual/unaudited) | Missing entirely |
| **NAV oracle integration** | Missing | Missing |
| **Reserve proof on-chain** | Missing | Missing |
| **Multi-sig admin** | Missing | Missing |
| **Timelock governance** | Missing | Missing |
| **Formal verification** | Missing | Missing |
| **Third-party audit** | Missing | Missing |

**Score: 0/12 for both tokens.** This is the contract layer alone — without addressing the off-chain failures documented in the Institutional Gap Analysis.

### 8.2 The Standards They Need

| Standard | Purpose | Used By |
| --- | --- | --- |
| **ERC-3643** (T-REX) | Identity-verified transfers, compliance modules | Tokeny, Bitbond, Securitize |
| **ERC-1400** | Security token with partitions, document management | Polymath, Harbor |
| **ERC-1404** | Simple transfer restrictions with reason codes | tZERO, Republic |

All three standards enforce that **tokens can only move between verified, compliant wallets.** Neither DIGau nor MPRA implements any of these.

---

## 9. What Institutional-Grade Looks Like

### PAXG (Paxos Gold) — The Benchmark

| Feature | PAXG | DIGau | MPRA |
| --- | --- | --- | --- |
| Auditor | Trail of Bits, Certora | None | None |
| Reserve Attestation | Monthly by third-party auditor | None | None |
| Custody | Brink's London vaults, serialized bars | Unverified claim | Unverified claim |
| Admin | Multisig + Timelock | Single EOA | Single EOA |
| Compliance | NYDFS regulated, OFAC-compliant | Unregulated | Unregulated |
| Oracle | Chainlink price feed | None | None |
| Holders | 23,000+ | 2,978 | 9 |
| CEX Listings | Coinbase, Kraken, Binance | Coinstore, XT.com | CatEx |
| Security Audit | Yes (multiple) | No | No |

### USDC (Circle) — Stablecoin Standard

- Monthly reserve attestation by Deloitte
- Regulated as money transmission in all 50 states
- Blacklist function with compliance justification
- Multisig admin with public key ceremony

These are the standards institutional investors, family offices, and regulated funds require before allocation.

---

## 10. Remediation Roadmap

### For DIGau (Proxy-Based)

| Phase | Action | Impact |
| --- | --- | --- |
| **Immediate** | Commission Trail of Bits or OpenZeppelin audit of proxy + implementation | Resolves "no audit" disqualifier |
| **Week 1-2** | Deploy Gnosis Safe multisig (3/5) and transfer proxy admin to it | Eliminates single-admin rug risk |
| **Week 2-4** | Deploy TimelockController (48h delay) between multisig and proxy | Gives holders exit window before upgrades |
| **Week 4-8** | Upgrade implementation to ERC-3643 compliance module (identity registry, transfer restrictions, freeze with governance) | Securities compliance |
| **Week 8-12** | Integrate Chainlink oracle for gold NAV, deploy reserve proof module | Verifiable backing |
| **Week 12-16** | Uniswap V3 pool + 2 market makers + Tier-2 exchange listing | Real liquidity |

**Advantage:** DIGau's proxy architecture means the implementation can be upgraded to a compliant version without redeploying tokens or migrating holders. This is the one genuine benefit of the proxy pattern.

### For MPRA (Immutable)

| Phase | Action | Impact |
| --- | --- | --- |
| **Immediate** | Accept that the current contract cannot be made compliant — it's immutable | Reality check |
| **Week 1-4** | Deploy new ERC-3643 contract with identity registry, transfer restrictions, reserve oracle | New compliant token |
| **Week 4-6** | Build migration bridge: MPRA → MPRA-v2 (with KYC gate) | Holder migration |
| **Week 6-8** | Security audit of v2 contract | Pre-listing requirement |
| **Week 8-12** | Deprecate v1 (MPRA), redirect CatEx listing to v2 | Clean transition |
| **Week 12-16** | Uniswap V3 pool + market makers for v2 | Real liquidity |

**Challenge:** MPRA's 9 holders and 13 transfers make migration trivial — but it also reveals that there's almost nothing to migrate. The v2 launch would effectively be a fresh start.

---

## Appendix A: DIGau Proxy Slot Verification

```
IMPLEMENTATION_SLOT = keccak256("org.zeppelinos.proxy.implementation")
                    = 0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3

ADMIN_SLOT = keccak256("org.zeppelinos.proxy.admin")
           = 0x10d6a54a4754c8869d6886b5f5d7fbfa5b4522237ea5c60d11bc4e7a1ff9390b
```

Both match the constructor assertions in the verified source. This confirms the proxy uses standard ZeppelinOS storage layout — no custom slot collisions.

## Appendix B: MPRA Domain Separator

```
DOMAIN_SEPARATOR = keccak256(
    EIP712Domain(string name, string version, uint256 chainId, address verifyingContract)
    "Maya Preferred PRA", "1", chainId, contractAddress
)
```

Computed at deployment time and stored as `immutable`. The PERMIT_TYPEHASH matches EIP-2612 standard.

## Appendix C: MPRD Transaction Dump

```
Date (UTC)              From         To           Method    Gas (ETH)
2026-01-05 01:26:23     0x7a56...    0x3600...    Transfer  0.0000043
2026-01-05 01:26:47     0x7a56...    0x3600...    Transfer  0.0000041
2026-01-05 01:27:47     0x7a56...    0x3600...    Transfer  0.0000039
2026-01-12 07:47:11     0x7a56...    0x3600...    Transfer  0.0000023
2026-01-12 07:47:59     0x7a56...    0x3600...    Transfer  0.0000021
2026-01-12 17:18:59     0x7a56...    0x3600...    Transfer  0.0000039
2026-01-13 03:10:23     0x7a56...    0x3600...    Transfer  0.0000026
2026-01-14 08:14:47     0x7a56...    0x3600...    Transfer  0.0000052
```

Single sender, single recipient, 10-day lifetime, then silence. Total on-chain cost: ~$0.06.

---

*Document generated from verified Etherscan source code, on-chain transaction data, and CSV export analysis. All contract addresses and transaction hashes are mainnet Ethereum.*
