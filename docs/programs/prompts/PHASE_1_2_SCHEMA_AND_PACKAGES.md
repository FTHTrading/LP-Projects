PHASE HANDOFF CONTEXT

Assume the previous phase is complete.
Before making changes:
1. read the docs created in the previous phase
2. inspect the files created/updated in the previous phase
3. list the exact artifacts you are carrying forward
4. state any blockers or inconsistencies
Then continue implementation without redoing completed work.

---

You are now executing Phases 1 and 2 of the Sovereign Assets Platform build.

## CONTEXT

The repo audit and planning docs from Phase 0 are complete.
Use them as the active source of truth.
Do not re-architect the system from scratch unless Phase 0 explicitly found a structural defect.

## MISSION

Build the domain model and shared package layer for a shared issuer OS that supports:
- DIGAU institutionalization
- MAYA legacy migration into a canonical compliant product

DO NOT BUILD UI-FIRST MOCKS.
This phase is backend/domain-first.

## PHASE 1 — DATA MODEL + DOMAIN ARCHITECTURE

Implement or extend the Prisma schema and shared types for:

### Issuer / Program
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

### Audit / Documents
- AuditEvent
- AuditHashChain
- SignedDocument
- DisclosureVersion
- PolicyFile
- SystemAlert

### REQUIREMENTS
- explicit enums
- indexes
- relational integrity
- append-only patterns where appropriate
- auditability
- realistic naming
- no vague placeholder models
- seedable structure for demo/integration environments

## PHASE 2 — SHARED PACKAGES

Create or complete:
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

### FOR EACH PACKAGE

Implement:
- domain interfaces
- service interfaces
- typed DTOs
- primary service stubs
- core business logic where feasible
- package README
- tests for critical paths

## OUTPUT RULES

- show exact files updated/created
- run schema generation and type checks
- run tests where possible
- fix imports and schema drift
- do not continue into contracts or frontend in this phase

## FINAL OUTPUT

At the end provide:
1. schema files changed
2. package files created/updated
3. migrations or db steps run
4. tests run
5. unresolved blockers
