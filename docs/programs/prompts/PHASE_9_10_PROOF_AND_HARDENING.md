PHASE HANDOFF CONTEXT

Assume the previous phase is complete.
Before making changes:
1. read the docs created in the previous phase
2. inspect the files created/updated in the previous phase
3. list the exact artifacts you are carrying forward
4. state any blockers or inconsistencies
Then continue implementation without redoing completed work.

---

You are executing Phases 9 and 10.

## CONTEXT

Phases 0–8 are complete.
The system now needs to become credible, inspectable, and production-hardened.

## MISSION

Build the Proof Center as a first-class institutional product and harden the platform for real controlled deployment.

## PHASE 9 — PROOF / ATTESTATION CENTER

Implement:
- reserve asset tables
- custody chain views
- attestation timeline
- evidence document index
- disclosure versions
- proof anchoring registry
- reserve coverage waterfall
- NAV methodology page
- issuer statement vs third-party attestation differentiation
- downloadable data-room package builder
- explicit "last updated" and source surfaces

### CREATE DOCS
- `docs/proof/RESERVE_METHODOLOGY.md`
- `docs/proof/ATTESTATION_OPERATING_MODEL.md`
- `docs/proof/CUSTODY_AND_EVIDENCE_CHAIN.md`
- `docs/proof/PROOF_CENTER_OPERATING_GUIDE.md`

## PHASE 10 — OBSERVABILITY / SECURITY / HARDENING

Implement:
- structured logging
- health checks
- alerting hooks
- audit hash chaining
- role matrix enforcement
- env/secrets validation
- rate limiting
- background job monitoring
- seed/demo mode separation
- staging readiness checklist
- production readiness validation
- incident response scaffolding

### CREATE DOCS
- `docs/runbooks/PRODUCTION_READINESS.md`
- `docs/runbooks/INCIDENT_RESPONSE.md`
- `docs/runbooks/ADMIN_OPERATIONS.md`
- `docs/runbooks/LIQUIDITY_OPERATIONS.md`
- `docs/runbooks/STAGING_CHECKLIST.md`

## FINAL VALIDATION

Run:
- type checks
- tests
- lint
- build
- contract tests if available
- schema/client generation
- smoke validation on major surfaces

## FINAL OUTPUT

Provide:
1. proof center files created/updated
2. hardening files created/updated
3. validation commands run
4. pass/fail summary
5. open risks
6. recommended next sprint
