PHASE HANDOFF CONTEXT

Assume the previous phase is complete.
Before making changes:
1. read the docs created in the previous phase
2. inspect the files created/updated in the previous phase
3. list the exact artifacts you are carrying forward
4. state any blockers or inconsistencies
Then continue implementation without redoing completed work.

---

You are executing Phase 5.

## CONTEXT

Phases 0–4 are complete.
Schema, shared packages, contracts, and settlement adapters already exist.
Use their types and service interfaces.
Do not create API contracts that drift from the domain model.

## MISSION

Build the API layer for the shared issuer OS.

## BUILD THESE ROUTE GROUPS

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

## REQUIREMENTS

- type-safe request/response contracts
- auth middleware
- role checks
- validation
- audit events on write paths
- background job hooks for reconciliation, snapshots, anomaly scans, quote refresh
- realistic seed/demo data
- explicit live vs demo response handling
- no fake live market data

## CREATE

- route handlers/controllers
- service bindings
- validation schemas
- test coverage for critical endpoints
- seed scripts if needed
- API reference docs

### CREATE DOC
- `docs/api/API_SURFACE_REFERENCE.md`

## OUTPUT RULES

- show exact files created/updated
- run type checks/tests
- ensure route contracts match the domain model
- do not move into frontend in this phase

## FINAL OUTPUT

Provide:
1. route groups completed
2. middleware added
3. tests run
4. seed/demo behavior added
5. blockers or missing upstream pieces
