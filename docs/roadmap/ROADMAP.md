# Roadmap & Sprint Plan

## Implementation Phases

### Phase 0 — Foundation (COMPLETE)
- [x] Monorepo scaffold (Turborepo + pnpm workspaces)
- [x] Prisma schema (30+ models, 17 enums)
- [x] Shared types (25+ TypeScript interfaces)
- [x] Design system (obsidian/gold theme, tokens, utility classes)
- [x] Architecture documentation (4 core docs)
- [x] Next.js app scaffold with App Router

### Phase 1 — Public Surface (COMPLETE)
- [x] Landing page with hero, trust pillars, reserve summary, token comparison, liquidity health
- [x] Token catalog (/tokens) with comparison table and detail pages
- [x] Proof Center (/proof-center) — overview, reserves, attestations, disclosures
- [x] Liquidity pages (/liquidity) — overview, venues, OTC desk
- [x] Market structure page

### Phase 2 — Admin Console (COMPLETE)
- [x] Admin layout with sidebar navigation
- [x] Dashboard with KPIs, alerts, quick actions
- [x] Token management (mint/burn/freeze controls)
- [x] Reserve management (composition, attestation triggers)
- [x] Treasury management (accounts, movements, reconciliation)
- [x] Compliance management (rules, jurisdiction policies)
- [x] Market operations (venue registry, circuit breakers, anomaly detection)
- [x] Investor registry (KYC/accreditation review)
- [x] Audit log (searchable, filterable)

### Phase 3 — Investor Portal (COMPLETE)
- [x] Investor layout with sidebar navigation
- [x] Portfolio dashboard (holdings, NAV, performance)
- [x] Holdings detail (cost basis, P&L, return %)
- [x] Document center (PPM, statements, tax, attestations)
- [x] Redemption workflow (5-step process, history)
- [x] Settings (profile, wallet, verification, notifications)

### Phase 4 — API Layer (COMPLETE — stubs)
- [x] 22 API route stubs across 11 route groups
- [x] Mock data integration for read endpoints
- [x] 501 stubs for write operations awaiting backend

### Phase 5 — Package Stubs (COMPLETE)
- [x] All 15 packages with package.json and typed function stubs
- [x] Domain logic signatures defined (token-engine, reserve-registry, compliance, etc.)

### Phase 6 — Documentation (COMPLETE)
- [x] System Architecture
- [x] Liquidity Operating Model
- [x] Reserve Attestation Model
- [x] Compliance Workflows
- [x] Token Lifecycle
- [x] Exchange Adapter Framework
- [x] Admin Backoffice
- [x] Risk Register
- [x] Product Requirements

---

## Next Sprints

### Sprint 1 — Core Component Library
**Goal**: Build reusable components used across multiple pages.

- [ ] ProofTimeline — vertical timeline showing attestation history
- [ ] DisclosureViewer — expandable document sections with risk warnings
- [ ] ReserveBackingWaterfall — stacked bar showing reserve composition vs token value
- [ ] NavVsMarketChart — dual-line Recharts comparing NAV to market price
- [ ] ExchangeVenueTable — sortable table with health status indicators
- [ ] PricingAnomalyDetectorPanel — alert cards with severity + recommended action
- [ ] AuditLogTable — reusable, filterable, exportable data table
- [ ] AdminActionConsole — action request form with multi-sig progress indicator

### Sprint 2 — Backend Integration
**Goal**: Replace mock data with real Prisma queries.

- [ ] Database migration (dev + seed data)
- [ ] Token engine: real mint/burn with Prisma transactions
- [ ] Reserve registry: CRUD + NAV computation
- [ ] Compliance engine: rule evaluation logic
- [ ] Audit service: append-only event log with hash chaining
- [ ] Auth: session management, role-based middleware

### Sprint 3 — Smart Contract Layer
**Goal**: Deploy ERC-3643 contracts and integrate.

- [ ] ERC-3643 contract deployment scripts
- [ ] Identity registry contract
- [ ] Compliance module contract
- [ ] Token factory for multi-class issuance
- [ ] viem integration for on-chain operations

### Sprint 4 — Exchange Connectivity
**Goal**: Live market data and order management.

- [ ] Coinbase Prime adapter (WebSocket + REST)
- [ ] Uniswap v3 adapter (on-chain reader)
- [ ] Aggregated order book computation
- [ ] Reference price algorithm (VWAP + deviation)
- [ ] Circuit breaker automation

### Sprint 5 — Production Hardening
**Goal**: Security, performance, and observability.

- [ ] Smart contract audit (external)
- [ ] Penetration testing
- [ ] Rate limiting and DDoS protection
- [ ] Monitoring and alerting (Datadog / Grafana)
- [ ] Disaster recovery testing
- [ ] SOC 2 preparation

---

## Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| M0: Foundation + Docs | — | COMPLETE |
| M1: All UI Surfaces | — | COMPLETE |
| M2: API Stubs + Packages | — | COMPLETE |
| M3: Core Component Library | Sprint 1 | NEXT |
| M4: Backend Live | Sprint 2 | PLANNED |
| M5: Smart Contracts Deployed | Sprint 3 | PLANNED |
| M6: Exchange Connected | Sprint 4 | PLANNED |
| M7: Production Ready | Sprint 5 | PLANNED |
