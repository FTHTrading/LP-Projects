# Token Lifecycle Model

## Overview

This document defines the complete lifecycle of an asset-backed token from creation through retirement.

## Lifecycle States

```
DRAFT → REGISTERED → ACTIVE → PAUSED → HALTED → MIGRATING → RETIRED
```

### DRAFT
- Token class definition created in admin console.
- Parameters: symbol, name, classification, decimals, backing asset class, transfer restrictions.
- No on-chain contract deployed yet.

### REGISTERED
- Smart contract deployed (ERC-3643 for security tokens).
- Identity registry and compliance module configured.
- Zero supply — no tokens minted yet.
- Admin can configure transfer restrictions, whitelist rules, jurisdiction policies.

### ACTIVE
- Primary issuance complete: tokens minted against verified reserve deposits.
- Secondary trading enabled on approved venues.
- NAV computed per pricing schedule (typically end-of-day).
- Ongoing: reserve attestations, compliance monitoring, liquidity provision.

### PAUSED
- Temporary halt on all transfers (admin action or circuit breaker trigger).
- Causes: regulatory inquiry, reserve verification in progress, technical issue.
- Existing positions held; no minting, burning, or transfers.
- Resumes to ACTIVE upon admin approval.

### HALTED
- Extended suspension with investigation.
- Causes: material compliance breach, reserve shortfall, legal proceeding.
- Requires board resolution + compliance review to resume or migrate.

### MIGRATING
- Token being migrated to new contract or chain.
- Old contract freeze-all; new contract deployed with snapshot balances.
- Investors receive 1:1 swap via admin batch transfer.

### RETIRED
- Token permanently decommissioned.
- All remaining tokens redeemed at final NAV.
- Contract permanently frozen; historical records preserved.

---

## Primary Issuance Flow

```
1. Reserve Deposit      → custody receipt + valuation uploaded
2. Reserve Verification → attestation published (3-tier)
3. NAV Computation      → net reserve value / supply = NAV per token
4. Mint Authorization   → admin submits mint request (multi-sig)
5. Compliance Check     → automated rule evaluation
6. Token Minting        → smart contract mint → investor wallet credit
7. Audit Event          → immutable log entry
8. Treasury Settlement  → issuance proceeds → reserve custody account
```

## Redemption Flow

```
1. Investor Request    → submit token amount + receiving account
2. Compliance Check    → verify no restrictions, lockup expired
3. NAV Lock            → next pricing window NAV locked for this redemption
4. Admin Approval      → if above threshold, require multi-sig
5. Token Burn          → smart contract burn
6. Reserve Release     → proportional reserve value released
7. Settlement          → proceeds transferred to investor (T+3)
8. Audit Event         → immutable log entry
```

## Supply Controls

| Control | Description |
|---------|------------|
| Max Supply Cap | Optional hard cap on total mintable tokens |
| Minimum Reserve Ratio | Must maintain ≥100% backing before new mints |
| Mint Cooldown | Configurable minimum time between mint operations |
| Burn Queue | Redemptions processed in FIFO order |
| Emergency Freeze | Instant halt on all supply changes |

## On-Chain Standards

- **ERC-3643 (T-REX)**: Permissioned tokens with identity registry and compliance modules
- **Identity Registry**: On-chain whitelist linked to off-chain KYC/AML status
- **Claim Verifiers**: Validate investor claims (accreditation, jurisdiction) before transfer
- **Compliance Module**: Programmable rules evaluated on every transfer call
