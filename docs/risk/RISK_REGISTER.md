# Risk Register

## Risk Classification

Risks are scored on a 5×5 matrix of **Likelihood** (1–5) × **Impact** (1–5). Risk score = L × I.

| Score Range | Severity | Response |
|-------------|----------|----------|
| 1–4 | Low | Monitor, accept |
| 5–9 | Medium | Mitigate, review quarterly |
| 10–15 | High | Active mitigation required |
| 16–25 | Critical | Immediate action, escalation |

---

## Risk Categories

### 1. Reserve & Backing Risks

| ID | Risk | L | I | Score | Mitigation |
|----|------|---|---|-------|-----------|
| R-001 | Reserve value drops below token NAV | 3 | 5 | 15 | Over-collateralization buffer (110%), daily NAV recomputation, automated alerts at 105% |
| R-002 | Custodian failure or fraud | 2 | 5 | 10 | Multi-custodian strategy, quarterly independent audit, insurance coverage |
| R-003 | Asset valuation model inaccuracy | 3 | 4 | 12 | Multiple pricing sources, reference price algorithm (VWAP + oracle), deviation alerts |
| R-004 | Attestation manipulation | 1 | 5 | 5 | Hash-anchored proofs, 3-tier attestation model, independent auditor verification |

### 2. Compliance & Regulatory Risks

| ID | Risk | L | I | Score | Mitigation |
|----|------|---|---|-------|-----------|
| C-001 | Unauthorized transfer to restricted jurisdiction | 2 | 5 | 10 | On-chain compliance module (ERC-3643), jurisdiction policy engine, real-time checks |
| C-002 | KYC/AML data breach | 2 | 5 | 10 | Encrypted PII storage, role-based access, audit logging, SOC 2 compliance |
| C-003 | Regulatory enforcement action | 2 | 5 | 10 | Proactive compliance program, legal counsel, transparent disclosures |
| C-004 | Securities law violation | 1 | 5 | 5 | Legal opinion on token classification, Reg D/S exemptions, accreditation verification |

### 3. Technology & Infrastructure Risks

| ID | Risk | L | I | Score | Mitigation |
|----|------|---|---|-------|-----------|
| T-001 | Smart contract vulnerability | 2 | 5 | 10 | External audit pre-launch, formal verification for critical paths, bug bounty program |
| T-002 | Platform downtime | 2 | 4 | 8 | Multi-AZ deployment, auto-scaling, 99.9% SLA target, DR plan |
| T-003 | Key management failure | 1 | 5 | 5 | HSM-backed signing, multi-sig wallets, key ceremony procedures |
| T-004 | Data loss or corruption | 1 | 5 | 5 | Point-in-time DB recovery, immutable audit log, off-site backups |

### 4. Market & Liquidity Risks

| ID | Risk | L | I | Score | Mitigation |
|----|------|---|---|-------|-----------|
| M-001 | Liquidity crisis (mass redemption) | 2 | 5 | 10 | Redemption gates, queue processing, liquidity reserves, settlement windows (T+3) |
| M-002 | Market manipulation | 3 | 4 | 12 | Anomaly detection, circuit breakers, spread monitoring, surveillance |
| M-003 | Exchange counterparty default | 2 | 4 | 8 | Multi-venue distribution, exposure limits per venue, daily settlement |
| M-004 | Spread volatility | 3 | 3 | 9 | Dynamic spread policies, circuit breaker thresholds, max deviation limits |

### 5. Operational Risks

| ID | Risk | L | I | Score | Mitigation |
|----|------|---|---|-------|-----------|
| O-001 | Admin credential compromise | 2 | 5 | 10 | MFA required, session limits, IP allowlisting, re-auth for sensitive ops |
| O-002 | Unauthorized mint/burn | 1 | 5 | 5 | Multi-sig approval workflows, audit trail, role separation |
| O-003 | Key person dependency | 3 | 3 | 9 | Documented procedures, cross-training, role redundancy |
| O-004 | Vendor lock-in | 2 | 3 | 6 | Adapter pattern for exchanges, standard APIs, multi-cloud capability |

---

## Risk Response Plan

### Escalation Matrix

| Severity | Response Time | Notification | Authority |
|----------|--------------|-------------|-----------|
| Critical | 15 minutes | CEO + CTO + Legal + Compliance | Halt operations if needed |
| High | 1 hour | CTO + relevant department lead | Implement mitigation |
| Medium | 24 hours | Department lead | Review and plan |
| Low | Next review cycle | Logged for quarterly review | Monitor |

### Incident Response

1. **Detect**: Automated monitoring, anomaly alerts, manual report
2. **Triage**: Severity classification, impact assessment
3. **Contain**: Immediate actions to prevent spread (freeze, halt, isolate)
4. **Investigate**: Root cause analysis, evidence collection
5. **Remediate**: Fix, patch, or workaround deployed
6. **Recover**: Resume operations, verify integrity
7. **Report**: Post-incident report, regulatory notification if required
8. **Improve**: Update risk register, adjust controls
