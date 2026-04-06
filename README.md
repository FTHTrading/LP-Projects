<div align="center">

# 🏛️ Sovereign Assets Platform

### Institutional-Grade Asset-Backed Token Issuer Operating System

![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![Routes](https://img.shields.io/badge/routes-59-blue?style=flat-square)
![Packages](https://img.shields.io/badge/packages-15-blueviolet?style=flat-square)
![Components](https://img.shields.io/badge/components-28%2B-orange?style=flat-square)
![Docs](https://img.shields.io/badge/docs-20%2B-yellow?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.1-000?style=flat-square&logo=nextdotjs)
![Prisma](https://img.shields.io/badge/Prisma-30%2B%20models-2D3748?style=flat-square&logo=prisma)
![License](https://img.shields.io/badge/license-proprietary-red?style=flat-square)

**Issuance · Compliance · Reserves · Liquidity · Treasury · Attestation · Trade Desk · Issuer Onboarding**

*Built by [FTH Trading](https://github.com/FTHTrading) — Not a marketing site with a token contract. This is the issuer OS.*

</div>

---

## Table of Contents

> 🟢 = Live / Built &nbsp;&nbsp; 🟡 = Scaffold / Stub &nbsp;&nbsp; 🔵 = Documentation &nbsp;&nbsp; 🔴 = Planned

| # | Section | Status | Description |
|---|---------|--------|-------------|
| 1 | [What This Is](#what-this-is) | 🔵 | Platform overview and value proposition |
| 2 | [System Architecture](#system-architecture) | 🟢 | 5-tier architecture flow tree |
| 3 | [Monorepo Structure](#monorepo-structure) | 🟢 | 82 directories, 15 packages |
| 4 | [Tech Stack](#tech-stack) | 🟢 | Framework and tooling matrix |
| 5 | [Public Web Layer](#-public-web-layer) | 🟢 | 11 public-facing pages |
| 6 | [Investor Portal](#-investor-portal) | 🟢 | 6 authenticated investor pages |
| 7 | [Admin Back Office](#-admin-back-office) | 🟢 | 11 admin sections, 13 components |
| 8 | [Trade Desk Operations](#-trade-desk-operations) | 🟢 | 8-gate qualification, conversion rails, LP bootstrap |
| 9 | [Issuer Onboarding & Funding](#-issuer-onboarding--funding) | 🟢 | Pipeline management, funding readiness, institutional gap analysis |
| 10 | [API Surface](#-api-surface) | 🟢 | 28+ REST endpoints across 14 domains |
| 11 | [Service Packages](#-service-packages) | 🟡 | 15 internal packages |
| 12 | [Competitive Intelligence](#-competitive-intelligence) | 🔵 | MPRA & DIGau deep-dives, institutional benchmark |
| 13 | [Documentation Library](#-documentation-library) | 🔵 | 18+ technical and strategic documents |
| 14 | [Design System](#-design-system) | 🟢 | Obsidian/gold institutional theme, 15+ reusable components |
| 15 | [Data Model](#-data-model) | 🟢 | 30+ Prisma models, 17 enums, 80+ TypeScript interfaces |
| 16 | [Getting Started](#getting-started) | 🟢 | Setup and run instructions |
| 17 | [Design Principles](#design-principles) | 🔵 | 6 core architectural principles |
| 18 | [Revenue Model](#-revenue-model) | 🔵 | $550K–$860K Year 1 projection |

---

## What This Is

A complete operating stack for entities that issue asset-backed tokens (precious metals, real estate, commodities) and must prove to regulators, institutional investors, and the public that their reserves, compliance, and secondary-market operations are **real, transparent, and auditable**.

This platform fills the **infrastructure gap** between tokenized assets and institutional capital:

> *"HSBC doesn't have better gold than Dignity Gold. They have better infrastructure around the gold."*

We are that infrastructure — the missing 8 layers between a tokenized asset and a trade desk.

---

## System Architecture

```
                           ┌─────────────────────────────────────┐
                           │          EXTERNAL CLIENTS           │
                           │  Investors · Issuers · Regulators   │
                           └──────────────┬──────────────────────┘
                                          │
                 ┌────────────────────────┬┴┬────────────────────────┐
                 ▼                        ▼                          ▼
  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
  │   🌐 PUBLIC LAYER    │  │  🔐 INVESTOR PORTAL  │  │  ⚙️ ADMIN BACKOFFICE │
  │                      │  │                      │  │                      │
  │  Landing Page        │  │  Dashboard           │  │  Dashboard           │
  │  Token Explorer      │  │  Holdings            │  │  Token Ops           │
  │  Proof Center        │  │  Documents            │  │  Reserve Mgmt        │
  │  ├─ Reserves         │  │  Redemptions         │  │  Treasury            │
  │  ├─ Attestations     │  │  Settings            │  │  Compliance          │
  │  └─ Disclosures      │  │                      │  │  Market Ops          │
  │  Liquidity           │  │                      │  │  Trade Desk          │
  │  ├─ Venues           │  │                      │  │  Issuers ← NEW      │
  │  └─ OTC              │  │                      │  │  Investors           │
  │  Market Structure    │  │                      │  │  Audit Log           │
  │  About / Legal       │  │                      │  │                      │
  │  Risk / Contact      │  │                      │  │                      │
  │  Newsroom            │  │                      │  │                      │
  └──────────┬───────────┘  └──────────┬───────────┘  └──────────┬───────────┘
             │                         │                          │
             └─────────────────────────┼──────────────────────────┘
                                       ▼
                    ┌──────────────────────────────────────┐
                    │          📡 API LAYER (REST)          │
                    │  28+ endpoints across 14 domains      │
                    │                                       │
                    │  /tokens    /reserves    /treasury     │
                    │  /liquidity /compliance  /attestations │
                    │  /investors /documents   /audit        │
                    │  /analytics /market-data /admin        │
                    │  /trade-desk             /issuers      │
                    └──────────────────┬───────────────────┘
                                       ▼
                    ┌──────────────────────────────────────┐
                    │         📦 SERVICE PACKAGES           │
                    │                                       │
                    │  token-engine      compliance-engine   │
                    │  reserve-registry  attestation         │
                    │  market-ops        exchange-adapters   │
                    │  treasury          analytics           │
                    │  audit             documents           │
                    │  auth              shared-types        │
                    │  ui                config              │
                    │  db (Prisma)                           │
                    └──────────────────┬───────────────────┘
                                       ▼
                    ┌──────────────────────────────────────┐
                    │       🗄️ DATA & INFRASTRUCTURE        │
                    │                                       │
                    │  PostgreSQL 16  ·  Redis  ·  S3       │
                    │  Chain Indexer  ·  Docker  ·  Vercel   │
                    └──────────────────────────────────────┘
```

---

## Monorepo Structure

```
sovereign-assets-platform/
│
├── 📁 apps/
│   └── web/                          # Next.js 15 (App Router)
│       └── src/
│           ├── app/
│           │   ├── (public)/         # 🌐 Public pages (11 routes)
│           │   ├── investors/        # 🔐 Investor portal (6 routes)
│           │   ├── admin/            # ⚙️  Back office (11 sections)
│           │   └── api/v1/           # 📡 REST API (28+ endpoints)
│           ├── components/
│           │   ├── admin/            # 13 admin components
│           │   ├── ui/               # Design system primitives
│           │   ├── charts/           # Data visualization
│           │   ├── layout/           # Shell / navigation
│           │   ├── tokens/           # Token-specific UI
│           │   ├── proof/            # Proof center components
│           │   ├── liquidity/        # Liquidity views
│           │   ├── treasury/         # Treasury views
│           │   ├── compliance/       # Compliance views
│           │   └── investor/         # Investor-facing components
│           └── lib/
│               └── mock-data.ts      # Comprehensive mock dataset
│
├── 📁 packages/                      # 15 internal packages
│   ├── shared-types/                 # 80+ TypeScript interfaces & types
│   ├── ui/                           # Design system + tokens
│   ├── config/                       # Shared ESLint / Tailwind / TSConfig
│   ├── db/                           # Prisma schema (30+ models, 17 enums)
│   ├── auth/                         # Authentication layer
│   ├── compliance-engine/            # Transfer restrictions & jurisdiction
│   ├── token-engine/                 # Mint/burn/freeze lifecycle
│   ├── reserve-registry/             # Reserve assets & valuations
│   ├── attestation/                  # Third-party proof ingestion
│   ├── market-ops/                   # Quote engine & spread policies
│   ├── exchange-adapters/            # CEX/DEX/OTC connectivity
│   ├── treasury/                     # Fiat/stablecoin/token ledgers
│   ├── analytics/                    # Dashboards & metrics
│   ├── audit/                        # Immutable event log
│   └── documents/                    # Document storage & versioning
│
├── 📁 docs/                          # 18+ documents across 13 categories
│   ├── architecture/                 # System design
│   ├── competitive-intelligence/     # MPRA & DIGau analysis
│   ├── trade-desk/                   # Onboarding & funding pathways
│   ├── market-structure/             # Liquidity operating model
│   ├── compliance/                   # Compliance workflows
│   ├── reserve-methodology/          # Reserve attestation model
│   ├── token-lifecycle/              # Token lifecycle management
│   ├── risk/                         # Risk register
│   ├── product/                      # Product requirements
│   ├── roadmap/                      # Development roadmap
│   ├── admin/                        # Admin backoffice spec
│   └── exchange/                     # Exchange adapter framework
│
├── 📁 infra/
│   ├── docker/                       # Docker Compose & Dockerfiles
│   ├── scripts/                      # Build/deploy/seed scripts
│   └── deployments/                  # Terraform / Vercel config
│
├── package.json                      # Root workspace config
├── pnpm-workspace.yaml               # pnpm workspace definition
├── turbo.json                        # Turborepo pipeline
└── tsconfig.json                     # Root TypeScript config
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| 🖥️ Framework | Next.js (App Router) | 15.1.0 |
| 🔤 Language | TypeScript (strict) | 5.7+ |
| 🎨 Styling | Tailwind CSS + shadcn/ui | 3.4 |
| 🗄️ Database | PostgreSQL via Prisma | 16 / 6.x |
| 🔐 Auth | NextAuth.js / custom JWT | — |
| ⛓️ Blockchain | viem + wagmi | — |
| 📊 Charts | Recharts / Lightweight Charts | — |
| 📨 Queues | BullMQ + Redis | — |
| 📡 API | Next.js Route Handlers | REST |
| 💾 Storage | S3-compatible | — |
| 🏗️ Build | Turborepo + pnpm workspaces | — |
| 🚀 Deploy | Vercel / Docker / AWS | — |

---

## 🌐 Public Web Layer

> 11 routes — fully built with responsive obsidian/gold institutional theme

| Route | Page | Status |
|-------|------|--------|
| `/` | Landing page with hero, value props, CTA | 🟢 |
| `/tokens` | Token explorer with NAV, pricing, supply | 🟢 |
| `/tokens/[slug]` | Individual token detail | 🟢 |
| `/proof-center` | Reserve transparency dashboard | 🟢 |
| `/proof-center/reserves` | Reserve breakdown | 🟢 |
| `/proof-center/attestations` | Third-party attestations | 🟢 |
| `/proof-center/disclosures` | Regulatory disclosures | 🟢 |
| `/liquidity` | Liquidity health dashboard | 🟢 |
| `/liquidity/venues` | Venue-level analytics | 🟢 |
| `/liquidity/otc` | OTC trading desk | 🟢 |
| `/market-structure` | Market structure explainer | 🟢 |

*Additional pages: About, Legal, Risk, Contact, Newsroom*

---

## 🔐 Investor Portal

> 6 authenticated routes — KYC/KYB gated

| Route | Page | Status |
|-------|------|--------|
| `/investors` | Investor dashboard | 🟢 |
| `/investors/holdings` | Portfolio & holdings | 🟢 |
| `/investors/documents` | Signed documents | 🟢 |
| `/investors/redemptions` | Redemption requests | 🟢 |
| `/investors/settings` | Account settings | 🟢 |

---

## ⚙️ Admin Back Office

> 11 sections · 13 specialized components · full sidebar navigation

| Section | Route | Components | Status |
|---------|-------|------------|--------|
| **Dashboard** | `/admin` | KPIs, trade desk readiness widget | 🟢 |
| **Tokens** | `/admin/tokens` | Issuance & redemption tracker | 🟢 |
| **Reserves** | `/admin/reserves` | Reserve management | 🟢 |
| **Treasury** | `/admin/treasury` | Balances panel | 🟢 |
| **Compliance** | `/admin/compliance` | Rule editor | 🟢 |
| **Market Ops** | `/admin/market-ops` | Action console | 🟢 |
| **Trade Desk** | `/admin/trade-desk` | Qualification, conversion, LP bootstrap, holders | 🟢 |
| **Issuers** | `/admin/issuers` | Onboarding intake, funding readiness | 🟢 |
| **Investors** | `/admin/investors` | Investor management | 🟢 |
| **Audit Log** | `/admin/audit` | Audit log table | 🟢 |

### Admin Components

| Component | File | Purpose |
|-----------|------|---------|
| `TradeDeskQualificationDashboard` | `trade-desk-qualification.tsx` | SVG score ring, 8-gate cards, competitive reference |
| `ConversionRailsPanel` | `conversion-rails.tsx` | 4 conversion methods, settlement wallets |
| `LiquidityBootstrappingPanel` | `liquidity-bootstrapping.tsx` | 6-stage pipeline, MPRA comparison |
| `HolderConcentrationMonitor` | `holder-concentration-monitor.tsx` | Distribution bar, holder table, KPIs |
| `IssuerOnboardingIntake` | `issuer-onboarding-intake.tsx` | Pipeline stages, remediation progress, funding channels |
| `FundingReadinessDashboard` | `funding-readiness-dashboard.tsx` | 10-layer institutional heat map, KPIs, channel pipeline |
| `TreasuryBalancesPanel` | `treasury-balances-panel.tsx` | Treasury account overview |
| `IssuanceRedemptionTracker` | `issuance-redemption-tracker.tsx` | Mint/burn event log |
| `ComplianceRuleEditor` | `compliance-rule-editor.tsx` | Jurisdiction rules management |
| `AdminActionConsole` | `admin-action-console.tsx` | Operational command center |
| `AuditLogTable` | `audit-log-table.tsx` | Immutable event viewer |
| `SignedDocumentRegistry` | `signed-document-registry.tsx` | Document versioning & signatures |
| `RolePermissionMatrix` | `role-permission-matrix.tsx` | RBAC configuration |

---

## 📊 Trade Desk Operations

> Real-world trade desk intelligence integrated from operator feedback

### 8-Gate Qualification Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUALIFICATION GATES                           │
│                                                                 │
│  Gate 1: Legal Entity        Gate 2: Reserve Attestation        │
│  Gate 3: Custody Solution    Gate 4: Market Structure           │
│  Gate 5: Compliance (KYC)    Gate 6: Pricing Oracle             │
│  Gate 7: Investor Services   Gate 8: Holder Distribution        │
│                                                                 │
│  Score ≥ 85 → QUALIFIED    60–84 → CONDITIONAL    <60 → FAIL   │
└─────────────────────────────────────────────────────────────────┘
```

### Conversion Rails

| Method | Settlement | Fee |
|--------|-----------|-----|
| Direct OTC (Tim) | 24h Exodus wallet | Negotiated |
| DEX Swap | Instant on-chain | 0.3% pool fee |
| BD Conversion | T+2 via broker-dealer | Reg fee |
| Stablecoin Bridge | 1h cross-chain | 0.1% bridge fee |

---

## 🏗️ Issuer Onboarding & Funding

> Pipeline for onboarding external token issuers toward trade desk qualification

### Onboarding Pipeline

```
  INTAKE → ASSESSMENT → REMEDIATION → ACTIVATION → LIVE
    │          │             │             │          │
    │          │             │             │          └─ Revenue generating
    │          │             │             └─ Trade desk connected
    │          │             └─ Gate-by-gate remediation
    │          └─ Score + gap analysis
    └─ Application received
```

### Current Pipeline

| Issuer | Token | Stage | Score | Timeline | Est. Revenue |
|--------|-------|-------|-------|----------|-------------|
| **Maya Preferred Ltd** | MPRA | Assessment | 12/100 | 10 weeks | $250K–$500K |
| **Dignity Gold Inc** | DIGau | Intake | 5/100 | 8 weeks | $200K–$400K |

### 10-Layer Institutional Stack

> Every layer where HSBC is green and the issuer is red = a service we sell

| Layer | HSBC | MPRA | DIGau | Our Platform |
|-------|------|------|-------|--------------|
| Legal Entity | 🟢 | 🔴 | 🟢 | 🟢 |
| Token Issuance | 🟢 | 🟢 | 🟢 | 🟢 |
| Qualified Custody | 🟢 | 🔴 | 🔴 | 🟢 |
| Reserve Attestation | 🟢 | 🔴 | 🔴 | 🟢 |
| Market Making | 🟢 | 🔴 | 🔴 | 🟢 |
| Trading Venues | 🟢 | 🔴 | 🔴 | 🟢 |
| Compliance (KYC/AML) | 🟢 | 🔴 | 🔴 | 🟢 |
| Investor Services | 🟢 | 🔴 | 🔴 | 🟢 |
| Treasury Ops | 🟢 | 🔴 | 🔴 | 🟡 |
| Governance | 🟢 | 🔴 | 🔴 | 🟢 |

---

## 📡 API Surface

> 28+ REST endpoints organized by domain

| Domain | Endpoints | Description |
|--------|-----------|-------------|
| **Tokens** | `GET /tokens`, `GET /tokens/[id]`, `POST /tokens/[id]/mint`, `POST /tokens/[id]/burn` | Token CRUD + lifecycle ops |
| **Reserves** | `GET /reserves`, `GET /reserves/history` | Reserve assets + valuation history |
| **Treasury** | `GET /treasury/balances`, `GET /treasury/movements` | Treasury ledger |
| **Liquidity** | `GET /liquidity/health`, `GET /liquidity/venues`, `GET /liquidity/spreads`, `GET /liquidity/anomalies` | Liquidity health + anomaly detection |
| **Compliance** | `GET /compliance/rules`, `POST /compliance/check`, `GET /compliance/whitelist` | Transfer restriction engine |
| **Investors** | `POST /investors/register`, `GET /investors/me`, `GET /investors/me/holdings`, `POST /investors/me/redeem` | Investor lifecycle |
| **Trade Desk** | `GET /trade-desk/qualification`, `GET /trade-desk/conversion` | 8-gate scoring + conversion rails |
| **Issuers** | `GET /issuers`, `GET /issuers/[id]` | Issuer onboarding pipeline |
| **Analytics** | `GET /analytics/holders` | Holder distribution analytics |
| **Market Data** | `GET /market-data/prices`, `GET /market-data/reference` | Price feeds + reference data |
| **Attestations** | `GET /attestations` | Proof-of-reserve attestations |
| **Documents** | `GET /documents` | Signed document registry |
| **Audit** | `GET /audit` | Immutable event log |
| **Admin** | `GET /admin/summary` | Admin dashboard aggregates |

---

## 📦 Service Packages

> 15 internal packages in `packages/` — `@sov/*` namespace

| Package | Purpose | Status |
|---------|---------|--------|
| `shared-types` | 80+ domain interfaces: tokens, reserves, compliance, trade desk, issuers | 🟢 |
| `ui` | Design system primitives, obsidian/gold theme | 🟢 |
| `config` | Shared ESLint, Tailwind, TypeScript configs | 🟢 |
| `db` | Prisma schema — 30+ models, 17 enums | 🟢 |
| `auth` | Authentication layer (NextAuth/JWT) | 🟡 |
| `compliance-engine` | Transfer restrictions, jurisdiction rules | 🟡 |
| `token-engine` | Mint/burn/freeze/seize, ERC-3643 adapters | 🟡 |
| `reserve-registry` | Reserve asset records, valuations | 🟡 |
| `attestation` | Third-party proof ingestion, hash anchoring | 🟡 |
| `market-ops` | Quote engine, spread policies, circuit breakers | 🟡 |
| `exchange-adapters` | CEX/DEX/OTC connectivity | 🟡 |
| `treasury` | Fiat/stablecoin/token ledgers, custody | 🟡 |
| `analytics` | Dashboards, metrics, reporting | 🟡 |
| `audit` | Immutable event log, export packages | 🟡 |
| `documents` | Document storage, versioning, signatures | 🟡 |

---

## 🔍 Competitive Intelligence

> Standalone deep-dives benchmarked against HSBC/Goldman institutional standards

| Document | Focus | Key Insight |
|----------|-------|-------------|
| [MPRA Deep Dive](docs/competitive-intelligence/MPRA_DEEP_DIVE.md) | Maya Preferred 223 — entity, strengths, failures, 10-week fix | Not a failed project — an unfunded infrastructure project with funded people |
| [DIGau Deep Dive](docs/competitive-intelligence/DIGAU_DEEP_DIVE.md) | Dignity Gold — entity, BD, gold backing, 8-week fix | Actually the easier fix — no wallet migration, gold has LBMA price |
| [Institutional Gap Analysis](docs/competitive-intelligence/INSTITUTIONAL_GAP_ANALYSIS.md) | 10-layer comparison vs HSBC/Goldman | It's not about the asset — it's about the infrastructure |
| [DIGau Institutional Gap Memo](docs/competitive-intelligence/DIGAU_INSTITUTIONAL_GAP_MEMO.md) | Live site audit, 10-layer gap assessment, $6B claim analysis | 5 CRITICAL, 5 HIGH gaps — every gap is our product |
| [DIGau Execution Plan](docs/trade-desk/DIGAU_EXECUTION_PLAN.md) | 8-week remediation plan, pricing, 22 deliverables | $105K build → $15K/mo → $470K–$495K Year 1 |
| [On-Chain Contract Teardown](docs/competitive-intelligence/ONCHAIN_CONTRACT_TEARDOWN.md) | Source-level analysis of DIGau proxy + MPRA + MPRD contracts | 0/12 compliance controls, unlimited mint, unaudited proxy, 9 holders |
| [Live Teardown](docs/competitive-intelligence/MPRA_DIGAU_LIVE_TEARDOWN.md) | CatEx data, wallet analysis, operator intel | 4 holders, $777M synthetic price, zero bids |

---

## 📚 Documentation Library

### Architecture & System Design

| Document | Path |
|----------|------|
| System Architecture | [`docs/architecture/SYSTEM_ARCHITECTURE.md`](docs/architecture/SYSTEM_ARCHITECTURE.md) |
| Product Requirements | [`docs/product/PRODUCT_REQUIREMENTS.md`](docs/product/PRODUCT_REQUIREMENTS.md) |
| Admin Back Office Spec | [`docs/admin/ADMIN_BACKOFFICE.md`](docs/admin/ADMIN_BACKOFFICE.md) |
| Exchange Adapter Framework | [`docs/exchange/EXCHANGE_ADAPTER_FRAMEWORK.md`](docs/exchange/EXCHANGE_ADAPTER_FRAMEWORK.md) |

### Domain & Operations

| Document | Path |
|----------|------|
| Token Lifecycle | [`docs/token-lifecycle/TOKEN_LIFECYCLE.md`](docs/token-lifecycle/TOKEN_LIFECYCLE.md) |
| Compliance Workflows | [`docs/compliance/COMPLIANCE_WORKFLOWS.md`](docs/compliance/COMPLIANCE_WORKFLOWS.md) |
| Reserve Attestation Model | [`docs/reserve-methodology/RESERVE_ATTESTATION_MODEL.md`](docs/reserve-methodology/RESERVE_ATTESTATION_MODEL.md) |
| Liquidity Operating Model | [`docs/market-structure/LIQUIDITY_OPERATING_MODEL.md`](docs/market-structure/LIQUIDITY_OPERATING_MODEL.md) |
| Risk Register | [`docs/risk/RISK_REGISTER.md`](docs/risk/RISK_REGISTER.md) |
| Roadmap | [`docs/roadmap/ROADMAP.md`](docs/roadmap/ROADMAP.md) |

### Trade Desk & Issuer Onboarding

| Document | Path |
|----------|------|
| Trade Desk Onboarding (8-Gate) | [`docs/trade-desk/TRADE_DESK_ONBOARDING.md`](docs/trade-desk/TRADE_DESK_ONBOARDING.md) |
| Issuer Onboarding & Funding Pathway | [`docs/trade-desk/ISSUER_ONBOARDING_FUNDING_PATHWAY.md`](docs/trade-desk/ISSUER_ONBOARDING_FUNDING_PATHWAY.md) |
| DIGau Execution Plan | [`docs/trade-desk/DIGAU_EXECUTION_PLAN.md`](docs/trade-desk/DIGAU_EXECUTION_PLAN.md) |

### Competitive Intelligence

| Document | Path |
|----------|------|
| MPRA Deep Dive | [`docs/competitive-intelligence/MPRA_DEEP_DIVE.md`](docs/competitive-intelligence/MPRA_DEEP_DIVE.md) |
| DIGau Deep Dive | [`docs/competitive-intelligence/DIGAU_DEEP_DIVE.md`](docs/competitive-intelligence/DIGAU_DEEP_DIVE.md) |
| Institutional Gap Analysis | [`docs/competitive-intelligence/INSTITUTIONAL_GAP_ANALYSIS.md`](docs/competitive-intelligence/INSTITUTIONAL_GAP_ANALYSIS.md) |
| DIGau Institutional Gap Memo | [`docs/competitive-intelligence/DIGAU_INSTITUTIONAL_GAP_MEMO.md`](docs/competitive-intelligence/DIGAU_INSTITUTIONAL_GAP_MEMO.md) |
| On-Chain Contract Teardown | [`docs/competitive-intelligence/ONCHAIN_CONTRACT_TEARDOWN.md`](docs/competitive-intelligence/ONCHAIN_CONTRACT_TEARDOWN.md) |
| MPRA/DIGau Live Teardown | [`docs/competitive-intelligence/MPRA_DIGAU_LIVE_TEARDOWN.md`](docs/competitive-intelligence/MPRA_DIGAU_LIVE_TEARDOWN.md) |

---

## 🎨 Design System

> Obsidian/gold institutional theme — dark-mode first, SR-level component architecture

### Theme

| Token | Value | Usage |
|-------|-------|-------|
| `obsidian-950` | `#0a0a0e` | Primary background |
| `obsidian-900` | `#111116` | Card backgrounds |
| `obsidian-400` | `#71717a` | Secondary text |
| `gold-400` | `#fbbf24` | Accent / CTA |
| `emerald-400` | `#34d399` | Success / pass |
| `rose-400` | `#f87171` | Danger / fail |
| `amber-400` | `#fbbf24` | Warning / pending |

### Core UI Components

`HeroSection` · `TokenCard` · `ReserveBar` · `NavSnapshot` · `LiquidityGauge` · `AnomalyTable` · `VenueGrid` · `TreasuryLedger` · `ComplianceStatus` · `AuditTimeline` · `DocumentCard` · `AttestationBadge` · `RedemptionForm` · `HoldingsTable` · `LegalStructureDiagram` · `glass-card` pattern

---

## 🗃️ Data Model

### Prisma Schema (30+ models)

```
Token · TokenClass · ReserveAsset · ReserveValuation · AttestationReport
Investor · InvestorKyc · Holding · Redemption · CorporateAction
ComplianceRule · TransferRestriction · Jurisdiction · Whitelist
TreasuryAccount · TreasuryMovement · Settlement
Venue · OrderBook · Spread · AnomalyEvent
AuditEvent · Document · DocumentVersion
User · Role · Permission · Session
```

### TypeScript Domain Types (80+)

Organized in `@sov/shared-types`:

**Core:** `TokenSummary` · `ReserveSummary` · `NavSnapshot` · `LiquidityHealth` · `Venue` · `AuditEvent`

**Trade Desk:** `TradeDeskGate` · `TradeDeskQualification` · `ConversionRequest` · `SettlementWallet` · `HolderConcentration` · `ReferenceToken`

**Issuer Onboarding:** `IssuerApplication` · `IssuerStage` · `EntityType` · `RegulatoryStatus` · `AssetBacking` · `FundingChannel` · `FundingChannelType` · `RemediationItem` · `WalletRestriction` · `IssuerAttestationLevel`

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/FTHTrading/LP-Projects.git
cd LP-Projects

# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Run development server
pnpm dev

# Production build (59 routes)
pnpm --filter @sov/web build
```

---

## Design Principles

| # | Principle | Implementation |
|---|-----------|---------------|
| 1 | **Attestation over assertion** | Every reserve claim links to verifiable evidence |
| 2 | **Compliance by architecture** | Transfer restrictions and jurisdiction rules are structural |
| 3 | **Transparency as product** | Proof center and reserve dashboard are first-class features |
| 4 | **Institutional conversion** | UX built for family offices, BDs, and compliance officers |
| 5 | **Audit completeness** | Every admin action produces an immutable event |
| 6 | **Market integrity** | Anomaly detection, circuit breakers, source attribution |

---

## 💰 Revenue Model

> Combined pipeline from issuer onboarding + platform services

| Channel | Source | Year 1 Est. |
|---------|--------|-------------|
| Trade Desk Fees | OTC conversion facilitation | $180K–$350K |
| Market Maker Integration | Wintermute / GSR onboarding | $50K–$100K |
| DEX Pool Revenue | LP fee share | $20K–$60K |
| Institutional Placement | BD distribution fees | $200K–$400K |
| Platform SaaS | Issuer onboarding subscriptions | $100K–$150K |
| **Total** | **2 issuers (MPRA + DIGau)** | **$550K–$860K** |

### Pricing Tiers

| Tier | Setup | Monthly | Target |
|------|-------|---------|--------|
| 🔴 **Rescue** | $10K–$100K | $10K–$15K | Distressed tokens (MPRA) |
| 🟡 **Launch** | $25K–$75K | $15K | Pre-market tokens (DIGau) |
| 🟢 **Enterprise** | $150K+ | Custom | Institutional issuers |

---

<div align="center">

**Built with precision by FTH Trading**

*59 routes · 15 packages · 28+ endpoints · 80+ types · 18+ docs · 30+ models*

*"You built the asset. We'll build the rails."*

</div>
- [Risk Register](docs/architecture/RISK_REGISTER.md)
- [Roadmap](docs/product/ROADMAP.md)

## License

Proprietary — All rights reserved.
