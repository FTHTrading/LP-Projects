# Product Requirements Document

## Product Vision

A production-grade issuer operating system for asset-backed digital securities. Unlike existing platforms (Maya Preferred, Dignity Gold, CatEx) that present marketing surfaces with opaque reserves, this platform provides **provable backing, institutional-grade compliance, automated treasury operations, and transparent liquidity management**.

## Target Users

| Persona | Description | Primary Needs |
|---------|-------------|--------------|
| **Issuer Admin** | Token issuer operations team | Mint/burn, treasury, compliance, attestations |
| **Compliance Officer** | Regulatory and legal oversight | Transfer rules, jurisdiction policies, audit trail |
| **Institutional Investor** | Accredited investors, funds | Portfolio view, redemption, proof verification |
| **Retail Investor** | Qualified retail participants | Holdings, documents, NAV transparency |
| **Independent Auditor** | Third-party verification | Attestation pipeline, reserve verification |

## Feature Requirements

### FR-001: Token Class Management
- **Priority**: P0
- Create, configure, and manage multiple token classes (gold-backed, silver, mixed)
- Configure decimals, transfer restrictions, max supply, compliance modules
- Support ERC-3643 permissioned token standard
- **Acceptance**: Admin can create token class, deploy contract, configure restrictions

### FR-002: Reserve Registry & NAV
- **Priority**: P0
- Register reserve assets with custody receipts and valuations
- Compute NAV per token using multi-source pricing (VWAP, oracles, custodian feeds)
- Historical NAV with full audit trail
- **Acceptance**: NAV updates daily, matches manual calculation within 0.01%

### FR-003: 3-Tier Attestation Model
- **Priority**: P0
- Tier 1: Automated (daily, hash of reserve data, system-signed)
- Tier 2: Custodian-signed (monthly, countersigned by reserve custodian)
- Tier 3: Independent audit (quarterly, full third-party verification)
- Hash-anchored to blockchain for tamper evidence
- **Acceptance**: All 3 tiers functional, hashes verifiable on-chain

### FR-004: Compliance Engine
- **Priority**: P0
- Transfer restriction rules (jurisdiction, accreditation, lockup, volume)
- Real-time pre-transfer compliance checks
- Jurisdiction policy management (allow/block/conditional per country)
- Whitelist/blacklist management
- **Acceptance**: Transfers blocked for non-compliant participants with clear reason

### FR-005: Primary Issuance & Redemption
- **Priority**: P0
- Multi-sig mint workflow with reserve verification prerequisite
- Redemption request → compliance check → NAV lock → burn → settlement
- Queue-based processing with configurable settlement windows
- **Acceptance**: End-to-end mint and redeem with full audit trail

### FR-006: Treasury Management
- **Priority**: P1
- Multiple custody account tracking
- Movement approval workflows
- Segregation of client vs operating funds
- Reconciliation reports
- **Acceptance**: Balances reconciled daily, movements require multi-sig above threshold

### FR-007: Liquidity Health Monitoring
- **Priority**: P1
- Aggregate bid/ask depth across venues
- Spread tracking and anomaly detection
- Circuit breaker automation (spread, volume, price deviation)
- Venue health dashboard
- **Acceptance**: Real-time health metrics, circuit breakers trigger within 5 seconds

### FR-008: Exchange Adapter Framework
- **Priority**: P1
- Pluggable adapter pattern for CEX, DEX, OTC venues
- Normalized order book, ticker, and order management
- Health monitoring with automatic degradation handling
- **Acceptance**: ≥2 adapters functional, health check every 30s

### FR-009: Investor Portal
- **Priority**: P1
- Portfolio dashboard with holdings, NAV, P&L
- Document access (PPM, subscription agreements, tax documents)
- Redemption workflow with progress tracking
- Profile and wallet management
- **Acceptance**: Investor can view holdings, request redemption, download documents

### FR-010: Admin Audit Trail
- **Priority**: P0
- Append-only audit log for all administrative actions
- Searchable, filterable, exportable
- Tamper-evident with hash chaining
- **Acceptance**: Every admin action logged, log cannot be modified

### FR-011: Market Data & Reference Pricing
- **Priority**: P1
- Reference price computation from multiple venue feeds
- Price deviation alerts
- Integration with NAV computation pipeline
- **Acceptance**: Reference price within 0.5% of manual cross-venue calculation

### FR-012: Onboarding & KYC Integration
- **Priority**: P2
- Investor registration workflow
- KYC/AML provider integration (API stub)
- Accreditation verification
- Risk scoring
- **Acceptance**: New investor can register, submit KYC, receive status updates

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page Load Time (public) | < 2 seconds |
| API Response Time (p95) | < 500ms |
| NAV Computation Time | < 30 seconds |
| Audit Log Write Latency | < 100ms |
| Uptime SLA | 99.9% |
| Data Encryption | AES-256 at rest, TLS 1.3 in transit |
| Concurrent Admin Sessions | ≥ 20 |
| Concurrent Investor Sessions | ≥ 1,000 |
