# Sovereign Assets Platform — Master Build Prompt

> **Version:** 1.0  
> **Date:** 2026-04-06  
> **Usage:** Feed to Copilot / Cursor / agent as the canonical system-build instruction set  
> **Scope:** Full 10-phase institutional platform upgrade

---

You are a principal-level systems architect, blockchain engineer, capital-markets product builder, and institutional RWA platform lead. You are operating inside my existing monorepo and must upgrade it into a production-grade "Sovereign Assets Platform" that can bring two legacy issuers into a clean institutional future without merging their brands.

## SOURCE OF TRUTH

Use the existing platform architecture and liquidity model already present in this repo as the baseline system design.

Core source docs:
- Sovereign Assets Platform architecture: `docs/architecture/SYSTEM_ARCHITECTURE.md`
- Liquidity Operating Model: `docs/architecture/LIQUIDITY_OPERATING_MODEL.md`

Assume I also have internal competitive-intelligence notes and an `ONCHAIN_CONTRACT_TEARDOWN.md` showing that the legacy contracts have severe institutional weaknesses.

## MISSION

Build the full shared institutional operating system that can support:
1. A Dignity-style precious metals digital security issuer
2. A Maya-style legacy token migration into a compliant flagship security-token / RWA structure

They must exist in the same technical universe but be executed separately as distinct issuer programs.

## NON-NEGOTIABLE STRATEGY

Do NOT build another speculative token website.
Do NOT optimize for fake exchange liquidity or vanity metrics.
Do NOT assume that changing chains alone solves liquidity.

Build for real liquidity by implementing:
- legal/issuer workflow support
- investor onboarding
- reserve registry
- attestation + disclosures
- treasury controls
- compliance-aware transfer restrictions
- subscription/redemption mechanics
- OTC/RFQ workflows
- market-maker inventory controls
- spread policies
- anomaly detection
- circuit breakers
- migration from legacy tokens into canonical issuance rails

## TARGET STATE

Create a shared issuer OS with these 2 product tracks:

### TRACK A — DIGAU INSTITUTIONALIZATION

- Treat legacy DIGau-like assets as restricted/security-oriented products
- Preserve existing brand and offering posture
- Remediate institutional weaknesses
- Add proof, reserve transparency, treasury controls, investor workflows, and controlled liquidity
- Do not position public exchange listing as the primary liquidity model
- Primary liquidity should come from OTC / RFQ / approved market makers / controlled venue routing

### TRACK B — MAYA MIGRATION + REBUILD

- Treat MPRA/MPRD-style assets as legacy / migration-bound
- Build a clean canonical issuance stack
- Create migration rails from legacy holders into a compliant flagship product
- Collapse token sprawl into one clear institutional product lane
- Legacy tokens become read-only / migration-only after cutover

## CANONICAL RAIL ARCHITECTURE

Implement a dual-rail architecture:

### 1. Canonical Investable Asset Rail

- ERC-3643-compatible security token architecture on EVM
- identity registry / compliance checks / transfer restriction hooks
- controlled issuance, redemption, freeze, pause, forced transfer, and burn flows
- multisig / role-based admin / timelock-ready governance surfaces

### 2. Settlement / Treasury Sidecar Rail

- abstraction layer for XRPL and Stellar settlement support
- not the canonical legal security record
- used for settlement, treasury operations, issuer-controlled distribution, and future stable-value workflows
- implement adapters/interfaces even if live integrations remain behind env flags

## LEGACY TOKEN POLICY

Design legacy support as follows:
- old contracts are never the long-term truth
- create a legacy registry with:
  - contract address
  - current supply / holder snapshot import
  - migration eligibility flags
  - freeze status
  - migration ratio
  - migration claim status
- migration flow:
  1. holder identity verification
  2. eligibility review
  3. legal acceptance / subscription docs
  4. deposit or proof-of-hold validation
  5. mint canonical replacement asset
  6. mark legacy asset migrated / burned / frozen / blacklisted from future use where applicable

## PROJECT OBJECTIVE

Upgrade this repository into a real issuer operating system with:
- public institutional website
- proof center
- issuer back office
- investor portal
- compliance engine
- reserve registry
- treasury ledger
- market ops engine
- migration console
- OTC / RFQ desk
- document center
- admin audit trail
- chain adapters
- execution-grade docs and runbooks

## REQUIRED DELIVERABLES

You must produce working code, working docs, clean architecture, and staged implementation. Do not stop at mock UI. Build the scaffolding so the system can go live in controlled stages.

---

## PHASE 0 — REPO AUDIT AND UPGRADE PLAN

First:
- inspect the entire repo structure
- identify existing apps, packages, docs, contracts, APIs, schema, UI system, env patterns, and infrastructure
- create a gap analysis against the target architecture
- write an upgrade plan before deep implementation

Create:
- `docs/programs/INSTITUTIONALIZATION_MASTER_PLAN.md`
- `docs/programs/DIGAU_TRACK_PLAN.md`
- `docs/programs/MAYA_TRACK_PLAN.md`
- `docs/programs/MIGRATION_OPERATING_MODEL.md`
- `docs/programs/LIQUIDITY_TRUTH_MODEL.md`

## PHASE 1 — DOMAIN MODEL + DATA ARCHITECTURE

Implement or extend the Prisma schema and shared domain types for:

### Issuer / Program Layer
- IssuerProgram
- IssuerEntity
- BrandSurface
- SecurityClass
- OfferingRound
- SubscriptionRequest
- RedemptionRequest
- DistributionEvent

### Identity / Compliance
- InvestorProfile
- KycKybRecord
- AccreditationStatus
- JurisdictionRule
- SanctionsCheck
- WalletAllowlist
- IdentityRegistryLink
- TransferApprovalDecision
- ComplianceEvent

### Reserve / Attestation
- ReserveAsset
- ReserveLot
- ReserveValuation
- ReserveAttestation
- CustodyRecord
- EvidenceDocument
- ProofAnchor
- ReserveCoverageSnapshot

### Treasury / Ledger
- TreasuryAccount
- TreasuryMovement
- FiatSettlement
- StableSettlement
- TokenSettlement
- ReconciliationRun
- LedgerEntry

### Liquidity / Market Ops
- Venue
- VenueHealth
- MarketMaker
- InventoryAllocation
- SpreadPolicy
- QuoteSnapshot
- LiquiditySnapshot
- NavReference
- PricingAnomaly
- CircuitBreakerEvent
- OtcRfq
- OtcQuote
- OtcTrade

### Migration
- LegacyToken
- LegacyHolderSnapshot
- MigrationCampaign
- MigrationEligibility
- MigrationClaim
- MigrationDecision
- MigrationExecution

### Audit / Docs
- AuditEvent
- AuditHashChain
- SignedDocument
- DisclosureVersion
- PolicyFile
- SystemAlert

Implement:
- enums
- constraints
- indexes
- soft deletes where useful
- append-only audit patterns where required

## PHASE 2 — SHARED PACKAGES

Create or complete these packages:
- `packages/shared-types`
- `packages/db`
- `packages/auth`
- `packages/compliance-engine`
- `packages/token-engine`
- `packages/reserve-registry`
- `packages/attestation`
- `packages/treasury`
- `packages/market-ops`
- `packages/exchange-adapters`
- `packages/settlement-adapters`
- `packages/migration-engine`
- `packages/documents`
- `packages/audit`
- `packages/analytics`

For each package:
- define clean interfaces
- separate domain models from infrastructure
- include service signatures and implementation stubs
- add tests for critical logic paths
- add README per package

## PHASE 3 — TOKEN / CONTRACT LAYER

Create a contracts workspace and implement a canonical architecture.

### Required Contracts
- `CanonicalSecurityToken.sol`
- `IdentityRegistry.sol`
- `ComplianceRegistry.sol`
- `ForcedTransferController.sol`
- `RedemptionController.sol`
- `IssuanceController.sol`
- `RoleManager.sol`
- `TimelockAdmin.sol`
- `MigrationGateway.sol`
- `LegacySnapshotVerifier.sol`
- `ReserveProofAnchor.sol`

### Requirements
- ERC-3643-style transfer restriction pattern
- role-based access control
- multisig-compatible admin architecture
- pausable critical paths
- forced transfer / freeze / burn / seize support only through explicit policy surfaces
- no single hot-wallet god mode
- event-rich design for auditability
- upgradeability only if governance-controlled and documented; otherwise prefer safer explicit versioning
- write deployment scripts
- write test suites
- write a `CONTRACT_RISK_REGISTER.md`
- write a `CONTRACT_GOVERNANCE_MODEL.md`

## PHASE 4 — SETTLEMENT ADAPTERS

Build settlement-side abstractions:
- EVM canonical asset adapter
- XRPL settlement adapter
- Stellar settlement adapter

### Requirements
- create interface contracts/types for issue, burn, transfer, balance sync, memo/reference linking
- create provider services for env-based RPC/config
- do not fake live settlement if not configured
- use feature flags and clean fallbacks
- create a "settlement status" dashboard surface

## PHASE 5 — BACKEND / API LAYER

Build route handlers / API modules for:

### Public
- `/api/public/programs`
- `/api/public/tokens`
- `/api/public/proof`
- `/api/public/nav`
- `/api/public/liquidity`
- `/api/public/disclosures`
- `/api/public/news`

### Investor
- `/api/investor/profile`
- `/api/investor/holdings`
- `/api/investor/documents`
- `/api/investor/subscriptions`
- `/api/investor/redemptions`
- `/api/investor/migration`
- `/api/investor/wallets`

### Issuer Admin
- `/api/admin/dashboard`
- `/api/admin/programs`
- `/api/admin/investors`
- `/api/admin/compliance`
- `/api/admin/reserves`
- `/api/admin/attestations`
- `/api/admin/treasury`
- `/api/admin/liquidity`
- `/api/admin/venues`
- `/api/admin/market-makers`
- `/api/admin/rfq`
- `/api/admin/migrations`
- `/api/admin/audit`
- `/api/admin/policies`

### Operational Requirements
- type-safe request/response models
- auth middleware
- role checks
- audit logging for every write path
- background jobs for reconciliation, quote refresh, proof snapshots, anomaly scans
- robust error surfaces
- seed scripts with realistic mock institutional data

## PHASE 6 — FRONTEND SURFACES

Build or upgrade the UI into 3 major surfaces.

### A. PUBLIC INSTITUTIONAL WEBSITE

Pages:
- Landing
- What We Do
- Programs
- Token / Security Class detail
- Proof Center
- Reserves
- Attestations
- Market Structure
- Liquidity
- Compliance & Disclosures
- Newsroom
- Contact / Institutional Inquiry

Requirements:
- family-office / broker-dealer / treasury / issuer-grade UX
- no retail meme styling
- high-end liquid glass / modern back-office visual language
- dense but elegant information architecture
- clear source attribution and timestamps
- reserve proof widgets
- NAV vs market widgets
- venue quality summaries
- disclosure-first design

### B. INVESTOR PORTAL

Pages:
- Onboarding
- KYC/KYB
- Accreditation
- Holdings
- NAV / performance
- Documents
- Subscriptions
- Redemptions
- Wallets
- Migration Center
- Notifications
- Settings

### C. ISSUER BACK OFFICE

Pages:
- Executive Dashboard
- Program Control Center
- Investor Registry
- Compliance Console
- Reserve Registry
- Attestation Console
- Treasury Ledger
- Liquidity / Market Ops
- Venue Monitor
- Market Maker Console
- RFQ Desk
- Migration Command Center
- Audit Trail
- Policy Manager
- System Health

## PHASE 7 — LIQUIDITY ENGINE

Implement the liquidity model from the repo docs, including:

### Inventory
- treasury reserve
- market-making pool
- venue allocations
- OTC inventory
- rebalance thresholds and approvals

### Spread Logic
- base spread
- volatility adjustment
- inventory skew
- time-of-day logic
- NAV deviation adjustment

### Routing
- venue allowlist / denylist
- compliance filters
- spread quality
- fill rate
- latency
- fallback chain

### Anomaly Detection
- deviation from reference
- volume spike detection
- wash-trading heuristics
- stale quote detection
- spoofing/layering heuristics
- alert severity and auto-response

### Circuit Breakers
- price halt
- volume halt
- inventory halt
- compliance halt
- system halt
- cooldown + manual resume flow

### Redemption/Subscription Logic
- defined windows
- gating rules
- NAV pricing
- approval flow
- settlement instructions
- arb visibility

### OTC/RFQ
- intake
- indicative pricing
- trader review
- acceptance / counter
- trade confirmation
- settlement state machine

Build:
- services
- admin screens
- charts
- alerts
- seed data
- docs

## PHASE 8 — MIGRATION ENGINE

Implement a full legacy-to-canonical migration workflow.

### Requirements
- snapshot import service from CSV / JSON / chain scan
- legacy holder reconciliation
- identity verification linkage
- eligibility rules
- conversion ratio engine
- legal acceptance step
- claim workflow
- issuance of replacement asset
- legacy state update
- dashboard with progress, exceptions, unresolved claims
- downloadable migration audit package

Create:
- `docs/migration/LEGACY_TO_CANONICAL_RUNBOOK.md`
- `docs/migration/HOLDER_MIGRATION_FAQ.md`
- `docs/migration/MIGRATION_RISK_REGISTER.md`

## PHASE 9 — PROOF / ATTESTATION

Build the Proof Center as a first-class product.

### Requirements
- reserve asset tables
- custody chain views
- attestation timeline
- evidence document index
- disclosure versions
- proof anchoring registry
- reserve coverage waterfall
- NAV methodology page
- "last updated" truth surfaces
- issuer statement vs third-party attestation differentiation
- downloadable data-room package builder

Create:
- `docs/proof/RESERVE_METHODOLOGY.md`
- `docs/proof/ATTESTATION_OPERATING_MODEL.md`
- `docs/proof/CUSTODY_AND_EVIDENCE_CHAIN.md`

## PHASE 10 — OBSERVABILITY / SECURITY / HARDENING

Implement:
- structured logging
- health checks
- alerting hooks
- audit hash chaining
- role matrix enforcement
- secrets/env validation
- rate limiting
- background job monitoring
- test coverage for critical workflows
- seed/demo mode separation
- staging readiness checklist

Create:
- `docs/runbooks/PRODUCTION_READINESS.md`
- `docs/runbooks/INCIDENT_RESPONSE.md`
- `docs/runbooks/ADMIN_OPERATIONS.md`
- `docs/runbooks/LIQUIDITY_OPERATIONS.md`

---

## TRACK-SPECIFIC REQUIREMENTS

### DIGAU TRACK

Build dedicated program configuration for a gold-backed, securities-oriented issuer:
- reserves centered on mineral / gold reserve backing
- broker-dealer / placement-agent compatible onboarding surfaces
- accredited-investor-first UX
- strong disclosure surfaces
- controlled secondary liquidity configuration
- Dignity-style board / institutional partner presentation layer
- no false promise of instant public liquidity
- migration path from current legacy asset structure if needed

### MAYA TRACK

Build dedicated program configuration for a legacy-token-to-compliant-asset migration:
- one flagship institutional asset class
- kill token sprawl in UX and data model presentation
- migration-heavy investor portal
- explicit legacy disclaimers
- canonical replacement asset positioning
- XRPL/Stellar settlement sidecar readiness if this track later uses those rails for treasury/distribution

---

## DESIGN LANGUAGE

Visual direction:
- institutional
- dark premium
- liquid glass where appropriate
- sharp dashboards
- elegant gradients
- refined typography
- no casino crypto vibe
- no generic template feel

### Components to Build
- `ProofTimeline`
- `ReserveCoverageWaterfall`
- `NAVvsMarketChart`
- `VenueHealthTable`
- `MarketMakerScorecard`
- `PricingAnomalyPanel`
- `CircuitBreakerBanner`
- `RedemptionWindowCard`
- `MigrationProgressBoard`
- `MigrationClaimsQueue`
- `AttestationDocumentViewer`
- `AuditLogTable`
- `TreasuryFlowViewer`
- `SettlementRailStatus`
- `ProgramSwitcher`
- `DisclosureVersionViewer`

---

## IMPLEMENTATION RULES

- Prefer TypeScript everywhere possible
- Keep package boundaries clean
- No dead mock-only code if a real service stub can be built
- No hidden magic constants
- Use env-driven configuration
- Add comments only where they add genuine value
- Use realistic sample data
- Keep naming explicit and institutional
- All write paths must emit audit events
- Every critical admin action must have confirmation / review state
- Never fabricate market data as if it were live
- Distinguish demo data from live data clearly

---

## OUTPUT FORMAT

Work in this order:
1. repo audit
2. gap analysis
3. architecture plan
4. schema/domain updates
5. package implementation
6. contract layer
7. API layer
8. frontend surfaces
9. liquidity engine
10. migration engine
11. proof center
12. hardening
13. final validation

### At Each Step
- show exact files created/updated
- explain why each change exists
- keep a running checklist
- run tests/build/lint where possible
- fix broken imports and schema drift
- do not stop halfway

---

## FINAL REQUIRED ARTIFACTS

By the end, the repo must contain:
- a working shared Sovereign Assets Platform
- separate DIGAU and MAYA program configs
- migration engine
- institutional proof center
- investor portal
- issuer back office
- liquidity / market ops engine
- contract suite
- operational docs
- runbooks
- sample data
- validated build

---

**BEGIN: First inspect the repo and produce:**
1. current repo map
2. what already exists
3. what is missing
4. exact implementation sequence

**Then start executing the build.**
