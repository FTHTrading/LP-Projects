PHASE HANDOFF CONTEXT

Assume the previous phase is complete.
Before making changes:
1. read the docs created in the previous phase
2. inspect the files created/updated in the previous phase
3. list the exact artifacts you are carrying forward
4. state any blockers or inconsistencies
Then continue implementation without redoing completed work.

---

You are executing Phases 3 and 4.

## CONTEXT

Phases 0–2 are complete.
Assume schema, shared types, and package boundaries already exist.
Use the existing domain model and do not create parallel inconsistent contract concepts.

## MISSION

Build the canonical contract layer and settlement-side abstractions.

## STRATEGY

The platform uses a dual-rail design:
1. Canonical investable asset rail on EVM with ERC-3643-style compliance-aware transfer architecture
2. Settlement / treasury sidecar abstraction for XRPL and Stellar

Do NOT pretend XRPL or Stellar are the canonical legal security record.
They are settlement/distribution sidecars unless explicitly configured otherwise in the future.

## PHASE 3 — CONTRACT SUITE

Create a contracts workspace if it does not exist.

### Implement:
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

### CONTRACT REQUIREMENTS
- compliance-aware transfer restriction architecture
- role-based permissions
- multisig-compatible administration
- no single hot-wallet god mode
- freeze / forced transfer / burn only through explicit governed pathways
- event-rich logging
- deployment scripts
- tests
- contract docs

### CREATE
- `docs/contracts/CONTRACT_RISK_REGISTER.md`
- `docs/contracts/CONTRACT_GOVERNANCE_MODEL.md`
- `docs/contracts/DEPLOYMENT_RUNBOOK.md`

## PHASE 4 — SETTLEMENT ADAPTERS

### Build:
- EVM canonical asset adapter
- XRPL settlement adapter
- Stellar settlement adapter

### REQUIREMENTS
- typed provider layer
- issue / burn / transfer / balance sync interfaces
- memo / reference support
- env-driven configuration
- feature-flagged live integration behavior
- clean fallback when not configured
- settlement status surfaces for later admin UI use

## OUTPUT RULES

- keep Solidity and TS responsibilities separate
- do not drift from Phase 2 types
- do not skip tests
- clearly distinguish production logic from stub integration logic

## FINAL OUTPUT

Provide:
1. contract files created
2. test files created
3. deployment scripts created
4. settlement adapter files created
5. docs created
6. known governance/security tradeoffs
