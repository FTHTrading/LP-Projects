# Migration Operating Model — Legacy Token to Sovereign Assets Platform

> **Classification:** Internal — Engineering + Operations  
> **Phase:** 0 — Planning Output  
> **Date:** 2026-04-07  
> **Scope:** Standard operating procedure for migrating any existing token issuer from legacy infrastructure to the canonical Sovereign Assets Platform  
> **Primary Applicant:** MAYA/MPRA → SMPRA migration (UK Financial Ltd)  
> **Secondary Applicants:** Any future issuer with existing on-chain token state

---

## Overview

A "migration" in this context means moving an issuer from:
- A legacy token contract (typically plain ERC-20, no compliance enforcement)
- With existing on-chain holders
- With existing market infrastructure (CEX listings, DEX pools, OTC trades)
- Potentially with proprietary wallet lock-in

...to the canonical platform:
- A compliance-enforced contract (ERC-3643 or equivalent)
- With KYC-verified whitelisted holders
- With verified reserve attestation
- With controlled liquidity infrastructure
- With all data recorded in the platform's database

This is **not a technical upgrade**. It is an issuer onboarding that happens to require importing historical state. The technical complexity is lower than it appears. The operational and communications complexity is higher.

---

## 1. Migration Phases

### Phase M0 — Pre-Migration Assessment

**Output:** Go/no-go decision + migration scope definition.

| Activity | Owner | Notes |
|----------|-------|-------|
| Read legacy contract ABI | Engineering | Determine if pause/burn functions exist |
| Total supply on-chain read | Engineering | Via eth_call or Etherscan API |
| All Transfer events log | Engineering | Build complete holder list + balance history |
| Identify wallet categories | Engineering | Team, exchange, investors, locked, zero-balance |
| Assess wallet lock-in | Engineering | Is there a proprietary wallet interface? Can holders migrate to Metamask/Fireblocks? |
| Contract security review | Engineering | Check for unlimited mint, rug vectors, ownership structure |
| Legal classification review | Legal | Is the legacy token legally the same instrument as the new token? |
| BD gap assessment | Business | Is there a registered BD for the new token? If not, can US holders participate? |

**Go criteria for migration:**
- ☐ Issuer has signed platform service agreement
- ☐ Contract holder list is readable from on-chain data (no off-chain only registry)
- ☐ Legal opinion: the new token is a valid successor instrument
- ☐ BD is engaged (or US issuance is explicitly deferred)
- ☐ No irrecoverable technical blocker (e.g., contract has no events, burned keys)

### Phase M1 — Holder Snapshot

**Output:** `MigrationBatch` record in platform DB with full holder registry.

#### M1.1 — On-Chain Snapshot Process

```typescript
// Pseudocode — implemented in packages/migration-engine

async function snapshotHolders(tokenAddress: string, chainId: number, snapshotBlock: number) {
  // 1. Get all Transfer events from genesis to snapshotBlock
  const transferLogs = await getLogs({
    address: tokenAddress,
    event: 'Transfer(address,address,uint256)',
    fromBlock: 0,
    toBlock: snapshotBlock,
  });
  
  // 2. Reconstruct balance map
  const balances: Record<string, bigint> = {};
  for (const log of transferLogs) {
    const { from, to, value } = parseTransferLog(log);
    if (from !== ZERO_ADDRESS) balances[from] = (balances[from] ?? 0n) - value;
    if (to !== ZERO_ADDRESS) balances[to] = (balances[to] ?? 0n) + value;
  }
  
  // 3. Filter zero balances
  const holders = Object.entries(balances)
    .filter(([, bal]) => bal > 0n)
    .map(([address, balance]) => ({ address, balance: balance.toString() }));
  
  // 4. Verify: sum of all holder balances === total supply
  const onChainSupply = await balanceOf(tokenAddress, ZERO_ADDRESS); // actually totalSupply()
  assert(holders.reduce((sum, h) => sum + BigInt(h.balance), 0n) === BigInt(onChainSupply));
  
  return { holders, snapshotBlock, timestamp: new Date().toISOString() };
}
```

#### M1.2 — Database Import

Each holder is imported as a `MigrationHolder` record (to be added to schema):
```
MigrationHolder {
  migrationBatchId: string
  address: string          // on-chain wallet address
  legacyBalance: Decimal   // balance of legacy token
  newBalance: Decimal      // target balance in new token (usually 1:1)
  category: 'investor' | 'team' | 'exchange' | 'locked' | 'contract' | 'unknown'
  kycStatus: 'not_started' | 'pending' | 'approved' | 'blocked'
  whitelistStatus: 'pending' | 'approved' | 'rejected'
  migrationStatus: 'pending' | 'eligible' | 'executing' | 'complete' | 'deferred' | 'rejected'
  investorProfileId: string?  // linked after KYC
  notes: string?
}
```

#### M1.3 — Wallet Categorization

Automatic categorization heuristics:
- **Zero balance:** exclude
- **ZERO_ADDRESS mints/burns:** exclude
- **Known exchange addresses:** tag as `exchange` (maintain list from chainabuse.com, etherscan labels)
- **Contract addresses:** `eth_getCode(address) != '0x'` → tag as `contract`
- **Team wallets:** provided by issuer, verified by comparing to disclosed addresses
- **Investor wallets:** everything else initially = `investor`

Manual review required for: large holders (>1% of supply), contract wallets, addresses flagged by chainalysis

### Phase M2 — Compliance Screening

**Output:** Each holder has a `whitelistStatus` and `kycStatus`.

#### M2.1 — KYC Backfill Strategy

For existing holders, there are two approaches depending on jurisdiction:

**Option A — Blanket KYC Requirement:**
- All MPRA holders who want SMPRA must complete KYC
- No grandfathering
- Maximum compliance, maximum friction
- Recommended for US-facing issuance

**Option B — Non-US Passthrough:**
- Non-US holders: presume eligible under Reg S (non-US persons)
- US holders: required to complete KYC under Reg D
- Requires IP/address verification (not foolproof, but documentable good faith effort)
- Lower friction, faster migration completion

**Recommendation for MAYA:** Option B (Non-US Passthrough) for initial migration. US holders are manually reviewed. Given MPRA has ~9 holders per on-chain data, this is manageable.

#### M2.2 — KYC Communication Sequence

```
Day 0:   Announce migration window (90 days)
         "MPRA holders will receive SMPRA 1:1 if they complete KYC at [portal URL]"

Day 0–60: KYC backfill window open
Week 2:  First reminder (from migration engine scheduler)
Week 4:  Second reminder
Week 6:  Final reminder + deferred holder list preview

Day 61:  KYC window closes
         Eligible holders: mint SMPRA batch
         Non-KYC'd holders: deferred status (see M3.3 Deferred Holders)

Day 61–90: Deferred holder appeal window
Day 90:  Migration complete. MPRA trading halted (if possible).
```

#### M2.3 — AML/Sanctions Screening

Each holder address run through:
1. OFAC sanctions list check (address is a contract, not a named entity — use chainalysis or elliptic if available)
2. Known exchange exchange wallet check (list maintained in platform)
3. Existing customer check (if holder already in platform investor DB)

If any flag: `whitelistStatus = 'rejected'` + manual review queue + compliance officer alert.

### Phase M3 — New Token Deployment

**Runs in parallel with M2. Requires Phase 9 (Contracts) to be complete.**

#### M3.1 — ERC-3643 Contract Configuration

Before deployment, configure:
```solidity
// Constructor parameters for SMPRA
name: "SMPRA — Maya Preferred Security Token"
symbol: "SMPRA"
maxSupply: <MPRA total supply at snapshot> × 1.05  // 5% buffer for future issuance
compliance: <compliance module address>  // our on-chain compliance oracle
identityRegistry: <our whitelist registry address>
```

Key design decisions for SMPRA:
- **Minting cap:** No unlimited mint. All mint operations require `AdminAction` approval in platform before on-chain execution.
- **Transfer restriction oracle:** On-chain transfer validation calls our deployed compliance registry (or we maintain an registry contract with the whitelist addresses).
- **Forced transfer:** Admin-only, requires multi-sig, audit logged.
- **Freeze:** Compliance officer can freeze individual addresses.
- **Burn:** Only via redemption request flow.

#### M3.2 — Testnet Validation

Before mainnet deployment:
1. Deploy contract to Sepolia testnet
2. Run mock migration with 10 test addresses
3. Verify transfer restriction enforcement (non-whitelisted → rejected)
4. Verify forced transfer (admin → any address)
5. Verify freeze/unfreeze
6. Verify mint cap enforcement
7. All tests must pass before mainnet deployment

#### M3.3 — Mainnet Deployment

```
1. Deploy compliance registry contract (owns the whitelist)
2. Deploy SMPRA ERC-3643 contract (points to compliance registry)
3. Record contract addresses in platform config
4. NO tokens minted yet — wait for migration batch to be approved
```

### Phase M4 — Migration Execution

**Output:** All eligible holders have SMPRA. MPRA is effectively sunset.

#### M4.1 — Batch Processing

```
MigrationBatch:
  status: 'pending' → 'approved' → 'executing' → 'complete'
  approvedBy: [compliance_officer_id, admin_id]   // multi-sig approval
  totalHolders: N
  eligibleHolders: N (KYC'd + AML-clear)
  deferredHolders: N (not KYC'd)
  rejectedHolders: N (AML flag or sanctioned)
  migratedAt: timestamp
```

Migration execution for each eligible holder:
1. Add address to compliance registry whitelist (on-chain tx)
2. Mint SMPRA to address: `amount = legacyBalance` (1:1 ratio)
3. Record in platform: `Holding` for investor, `Transaction` (type=MINT)
4. Emit audit event: `migration.holder_migrated`

Batch processing: execute in groups of 50 holders per block to manage gas costs.

#### M4.2 — Deferred Holders

Holders who did not complete KYC within the window:
- Status = `deferred`
- Their SMPRA is **pre-minted and held in an escrow contract** (migration escrow)
- 90-day appeal window: holder can complete KYC → escrow releases SMPRA to their address
- After 90 days with no KYC: escrow balance returned to issuer treasury (issuer's discretion — legal question)
- All deferred holder escrow transactions are publicly visible and auditable

#### M4.3 — MPRA Sunset

Options (dependent on MPRA contract capability):
- **If MPRA has `pause()`:** Call pause via admin signer. MPRA transfers blocked.
- **If MPRA has no pause:** Governance notice: "MPRA is a legacy instrument. SMPRA is the official successor. We cannot technically pause the old contract." Document in all public communications.
- **If MPRA is actively listed on CatEx:** Coordinate with CatEx to delist MPRA and list SMPRA simultaneously.

### Phase M5 — Post-Migration

**Output:** Active SMPRA ecosystem with full compliance enforcement.

| Activity | Timing |
|----------|--------|
| Migration report published | Day 1 post-migration |
| CatEx SMPRA re-listing | Week 1 post-migration |
| Market maker activation | Week 2 post-migration |
| First NAV-based price published | Day 1 (should predate migration) |
| Investor portal fully operational | Day 1 |
| Deferred holder notifications | Weekly during appeal window |
| Final migration audit report | 90 days post-migration |

---

## 2. Data Model Requirements

### New Prisma Models Required

The following models must be added to `schema.prisma` before Phase 7 can begin:

```prisma
// Migration batch — represents one full migration execution
model MigrationBatch {
  id              String   @id @default(cuid())
  issuerProfileId String
  legacyTokenId   String   // TokenClass id for legacy token (MPRA)
  newTokenId      String   // TokenClass id for new token (SMPRA)
  snapshotBlock   Int      // Ethereum block number of holder snapshot
  snapshotAt      DateTime
  status          String   // pending, approved, executing, complete, failed
  totalHolders    Int      @default(0)
  eligibleHolders Int      @default(0)
  migratedHolders Int      @default(0)
  deferredHolders Int      @default(0)
  rejectedHolders Int      @default(0)
  approvedBy      String[]
  approvedAt      DateTime?
  executedAt      DateTime?
  completedAt     DateTime?
  notes           String?
  
  holders         MigrationHolder[]
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([status])
}

// Individual holder migration record
model MigrationHolder {
  id                String         @id @default(cuid())
  migrationBatchId  String
  batch             MigrationBatch @relation(fields: [migrationBatchId], references: [id])
  address           String
  legacyBalance     Decimal        @db.Decimal(36, 18)
  newBalance        Decimal        @db.Decimal(36, 18)
  category          String         // investor, team, exchange, locked, contract, unknown
  kycStatus         String         // not_started, pending, approved, blocked
  whitelistStatus   String         // pending, approved, rejected
  migrationStatus   String         // pending, eligible, executing, complete, deferred, rejected
  investorProfileId String?
  notes             String?
  migratedAt        DateTime?
  
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
  
  @@unique([migrationBatchId, address])
  @@index([migrationStatus])
  @@index([kycStatus])
}

// Issuer profile — normalized issuer entity record
model IssuerProfile {
  id              String   @id @default(cuid())
  entityName      String
  entityType      String   // llc, corp, ltd, trust, spv
  jurisdiction    String
  regulatoryStatus String  // unregistered, pending, registered, exempt
  primaryContact  Json     // { name, email, role }
  bdRelationship  Json?    // { name, finraId, status }
  status          String   @default("active") // active, suspended, inactive
  onboardedAt     DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([jurisdiction])
  @@index([status])
}
```

---

## 3. Migration Engine Package

### Package: `packages/migration-engine`

This package does not exist yet. It must be created in Phase 7.

**Exports required:**
```typescript
// On-chain snapshot
export async function snapshotHolders(params: SnapshotParams): Promise<HolderSnapshot>

// Import snapshot to DB
export async function importToBatch(snapshot: HolderSnapshot, batchConfig: BatchConfig): Promise<MigrationBatch>

// Categorize holders
export async function categorizeHolders(batchId: string): Promise<void>

// KYC backfill webhook handler
export async function handleKycCompletion(holderId: string, kycResult: KycResult): Promise<void>

// Eligibility assessment
export async function assessEligibility(batchId: string): Promise<EligibilitySummary>

// Execute migration (requires AdminAction approval first)
export async function executeMigrationBatch(batchId: string, actorId: string): Promise<MigrationResult>

// Deferred holder status
export async function getDeferredHolders(batchId: string): Promise<MigrationHolder[]>
export async function processDeferredClaim(holderId: string, kycResult: KycResult): Promise<void>
```

**Admin UI counterpart:** `admin/migration/` route (new route, not in current structure).

---

## 4. Operator Checklist

For every migration executed, the following operator checklist applies:

### Pre-Migration
- [ ] Platform service agreement signed with issuer
- [ ] Legal opinion on token successor instrument
- [ ] BD engaged (or US issuance formally deferred with documented rationale)
- [ ] On-chain holder snapshot taken and imported
- [ ] Snapshot block recorded and hash-committed
- [ ] Wallet categorization reviewed by compliance officer
- [ ] AML screening complete
- [ ] Deferred holder count reviewed — >20% deferred = review with counsel
- [ ] New contract deployed to testnet + validated
- [ ] New contract deployed to mainnet + contract address recorded in config

### Migration Execution
- [ ] `MigrationBatch` status: `pending` → approve → `approved`
- [ ] Two-approver requirement met (compliance_officer + admin)
- [ ] Batch execution initiated by authorized actor only
- [ ] Progress monitoring: real-time batch status in admin UI
- [ ] Gas budget confirmed: batch of 50 holds × gas estimate × current gas price

### Post-Migration
- [ ] All `complete` holders have SMPRA balance on-chain + in DB
- [ ] On-chain balances match DB `Holding` records (reconciliation run)
- [ ] Deferred escrow contract funded + addresses recorded
- [ ] Legacy token trading halted (or narrative published if halt not possible)
- [ ] Migration report published to proof center
- [ ] Investor communications sent
- [ ] Audit event `migration.batch_complete` emitted

---

## 5. Rollout Order

Migration work is sequenced within the broader platform phases as follows:

```
Phase 1  — Foundation (DB, auth)
Phase 3  — Reserve/Proof (prerequisite: reserve data must exist before migration)
Phase 4  — Compliance (whitelist system must be operational)
Phase 7  — Migration Engine (this document's technical implementation)
            Step 1: Add MigrationBatch + MigrationHolder + IssuerProfile to schema
            Step 2: Create packages/migration-engine
            Step 3: API routes: admin/migration/
            Step 4: Admin UI: migration command center
            Step 5: MAYA: execute MPRA holder snapshot
            Step 6: MAYA: KYC backfill 90-day window
            Step 7: MAYA: batch execution (mint SMPRA)
Phase 9  — Contracts (ERC-3643 SMPRA contract must be deployed before batch execution)
```

**Key constraint:** Phase 7 (Migration Engine) cannot begin executing migrations until Phase 9 (Contracts) provides the new token contract to mint against. These can be developed in parallel but cannot be tested end-to-end until both are ready.

---

## 6. Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Legacy contract has no event log (non-standard ERC-20) | Snapshot from Etherscan token holder API as fallback. Accept CSV from issuer as tertiary fallback (with hash attestation). |
| Holder KYC backfill rate is very low (<30%) | Extended window + direct outreach by issuer. Final fallback: escrow model for all remainders. |
| Gas costs make batch execution prohibitive | Deploy SMPRA on L2 (Base or Polygon) to reduce gas. For Ethereum mainnet, batch 50 per block and time execution when gas is low. |
| New contract has security vulnerability | Two independent audits before mainnet. Deploy to testnet first. No migration execution until audits complete. |
| Deferred escrow is lost (issuer wallet compromised) | Escrow held in a multi-sig contract, not a single owner EOA. |
| Re-migration needed (if first batch has errors) | Design migration to be idempotent: re-running for a holder with `complete` status is a no-op. Only `pending`/`eligible` holders are changed. |
