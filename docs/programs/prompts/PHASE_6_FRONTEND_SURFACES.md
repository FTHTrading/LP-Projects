PHASE HANDOFF CONTEXT

Assume the previous phase is complete.
Before making changes:
1. read the docs created in the previous phase
2. inspect the files created/updated in the previous phase
3. list the exact artifacts you are carrying forward
4. state any blockers or inconsistencies
Then continue implementation without redoing completed work.

---

You are executing Phase 6.

## CONTEXT

Phases 0–5 are complete.
The API contracts and shared types are the source of truth.
Do not invent frontend-only fields that do not exist in the API/domain model.

## MISSION

Build the three UI surfaces:
1. Public institutional website
2. Investor portal
3. Issuer back office

## VISUAL DIRECTION

- institutional
- dark premium
- liquid glass where appropriate
- refined typography
- sharp dashboards
- no casino crypto vibe
- no meme styling
- no generic marketing-template feel

## SURFACE A — PUBLIC INSTITUTIONAL WEBSITE

Pages:
- Landing
- What We Do
- Programs
- Token / Security Class Detail
- Proof Center
- Reserves
- Attestations
- Market Structure
- Liquidity
- Compliance & Disclosures
- Newsroom
- Contact / Institutional Inquiry

## SURFACE B — INVESTOR PORTAL

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

## SURFACE C — ISSUER BACK OFFICE

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

## REQUIRED COMPONENTS

- `ProofTimeline`
- `ReserveCoverageWaterfall`
- `NAVVsMarketChart`
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

## REQUIREMENTS

- use shared UI system if already present
- use real API types
- distinguish live vs demo content
- include timestamps/source attribution on truth surfaces
- optimize for institutional due diligence and operator workflows
- no fake numbers presented as live

## OUTPUT RULES

- show exact files created/updated
- run build/type checks
- keep route integration clean
- do not implement business logic here that belongs in the backend

## FINAL OUTPUT

Provide:
1. pages built
2. components built
3. API integrations completed
4. design system updates made
5. remaining frontend risks
