# Admin Backoffice Operating Manual

## Role Hierarchy

| Role | Description | Permissions |
|------|-------------|------------|
| **Super Admin** | Platform owner / CTO | Full access, role management, system config |
| **Compliance Officer** | Regulatory oversight | Investor review, rule management, freeze/halt, audit read |
| **Treasury Manager** | Reserve operations | Reserve management, mint/burn approval, settlement, treasury movements |
| **Market Operator** | Liquidity operations | Venue management, spread policy, circuit breakers, market data |
| **Auditor** | Read-only oversight | Full read access, audit log export, no write operations |
| **Support** | Investor assistance | Investor profile read, document access, limited write |

## Approval Workflows

### Single-Approval Actions
Actions any authorized role can execute immediately:
- View dashboards, audit logs, investor profiles
- Update spread policies and circuit breaker thresholds
- Whitelist/blacklist investor addresses
- Publish attestation records

### Multi-Signature Actions
Actions requiring M-of-N approvals (configurable per action type):

| Action | Default Threshold | Eligible Roles |
|--------|------------------|---------------|
| Mint tokens | 2-of-3 | Treasury Manager, Super Admin |
| Burn tokens (>$100K) | 2-of-3 | Treasury Manager, Super Admin |
| Halt token | 2-of-2 | Compliance Officer, Super Admin |
| Resume from HALTED | 3-of-3 | Compliance, Treasury, Super Admin |
| Modify compliance rules | 2-of-2 | Compliance Officer, Super Admin |
| Treasury movement (>$500K) | 2-of-3 | Treasury Manager, Super Admin |
| Role assignment | 2-of-2 | Super Admin (2 required) |

### Approval Flow
```
1. Initiator creates action request
2. System validates against role permissions
3. If multi-sig required: request enters PENDING state
4. Eligible approvers notified (email + in-app)
5. Each approver reviews and signs (approve/reject)
6. Upon threshold met: action executed automatically
7. Audit event emitted with all approver signatures
8. If rejected or expired (24h default): action cancelled
```

## Operational Procedures

### Daily Operations
- [ ] Review overnight attestation results
- [ ] Check NAV computation (compare to prior day)
- [ ] Review pending redemption queue
- [ ] Check venue health dashboard (all green)
- [ ] Review anomaly alerts from prior 24h

### Weekly Operations
- [ ] Reconcile treasury balances across all custody accounts
- [ ] Review compliance rule effectiveness
- [ ] Audit new investor onboarding pipeline
- [ ] Review spread performance vs targets
- [ ] Export audit log for compliance archive

### Monthly Operations
- [ ] Full reserve attestation (Tier 2 — custodian signed)
- [ ] Investor communication (NAV report, reserve status)
- [ ] Regulatory filing review and preparation
- [ ] Venue performance review (uptime, fill rates, fees)
- [ ] Risk register review and update

### Quarterly Operations
- [ ] Independent auditor attestation (Tier 3)
- [ ] Board report: AUM, redemptions, compliance, incidents
- [ ] Disaster recovery test
- [ ] Penetration testing and security audit

## Admin Console Pages

| Page | Purpose | Key Actions |
|------|---------|------------|
| Dashboard | KPIs, alerts, quick actions | Monitor, triage |
| Tokens | Token class management | Mint, burn, freeze, configure |
| Reserves | Reserve composition + attestation | Register assets, trigger attestation |
| Treasury | Custody accounts + movements | Approve transfers, reconcile |
| Compliance | Transfer rules + jurisdiction | Create rules, review violations |
| Market Ops | Liquidity health + venues | Configure spreads, manage breakers |
| Investors | Investor registry + KYC | Review, approve, whitelist |
| Audit Log | Immutable action history | Search, filter, export |

## Session Security

- Session timeout: 15 minutes idle, 8 hours absolute
- Multi-factor authentication required for all admin roles
- IP allowlisting optional (recommended for Treasury Manager+)
- All admin actions logged with IP, user agent, timestamp
- Sensitive operations require re-authentication
