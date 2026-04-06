PHASE HANDOFF CONTEXT

Assume the previous phase is complete.
Before making changes:
1. read the docs created in the previous phase
2. inspect the files created/updated in the previous phase
3. list the exact artifacts you are carrying forward
4. state any blockers or inconsistencies
Then continue implementation without redoing completed work.

---

You are executing Phases 7 and 8.

## CONTEXT

Phases 0–6 are complete.
This phase implements the two most business-critical systems:
1. liquidity / market ops truth
2. legacy-to-canonical migration

These must align with the existing Liquidity Operating Model and the overall institutionalization strategy. Do not build fake exchange theater. Build controlled, auditable market structure.

## PHASE 7 — LIQUIDITY ENGINE

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
- alert severity and response

### Circuit Breakers
- price halt
- volume halt
- inventory halt
- compliance halt
- system halt
- cooldown + manual resume

### Redemption / Subscription Logic
- defined windows
- approval flow
- NAV-based pricing
- gating rules
- settlement instructions
- arb visibility

### OTC / RFQ
- intake
- indicative pricing
- trader review
- acceptance / counter
- trade confirmation
- settlement state machine

## PHASE 8 — MIGRATION ENGINE

Implement:
- snapshot import service from CSV / JSON / chain scan
- legacy holder reconciliation
- identity verification linkage
- eligibility rules
- conversion ratio engine
- legal acceptance step
- claim workflow
- issuance of replacement asset
- legacy state update
- progress dashboards
- exception handling and unresolved claims workflow
- downloadable migration audit package

## CREATE DOCS

- `docs/migration/LEGACY_TO_CANONICAL_RUNBOOK.md`
- `docs/migration/HOLDER_MIGRATION_FAQ.md`
- `docs/migration/MIGRATION_RISK_REGISTER.md`
- `docs/liquidity/LIQUIDITY_OPERATIONS_RUNBOOK.md`
- `docs/liquidity/OTC_RFQ_OPERATING_MODEL.md`

## TRACK-SPECIFIC REQUIREMENTS

### DIGAU TRACK
- controlled secondary liquidity
- accredited-investor-first posture
- strong disclosure-sensitive logic
- no false promise of always-on public exchange liquidity

### MAYA TRACK
- migration-heavy UX and ops flow
- legacy disclaimers
- flagship canonical asset
- collapse token sprawl in presentation and process

## OUTPUT RULES

- implement services and admin flows
- wire alerts and audit events
- use seed/demo data where needed
- no fabricated live market claims
- test core logic paths

## FINAL OUTPUT

Provide:
1. liquidity services built
2. migration services built
3. admin screens updated
4. docs created
5. tests run
6. unresolved risk areas
