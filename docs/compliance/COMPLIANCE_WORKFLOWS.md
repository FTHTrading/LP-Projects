# Compliance Workflows

## 1. Entity & Offering Type Mapping

### Entity Types
| Entity | Role | Registration Requirement |
|--------|------|------------------------|
| Issuer SPV | Token issuer | Jurisdiction-specific |
| Transfer Agent | Cap table maintenance | SEC-registered (US) or equivalent |
| Broker-Dealer | Distribution, secondary trading | FINRA/SEC (US) or equivalent |
| Custodian | Reserve asset custody | Qualified custodian |
| KYC Provider | Identity verification | Licensed in operating jurisdictions |
| Auditor | Reserve attestation | Independent, licensed |

### Offering Types
| Type | Description | Reg Framework | Investor Restrictions |
|------|-------------|---------------|----------------------|
| Reg D 506(c) | US accredited only | SEC | Accredited investors, general solicitation allowed |
| Reg D 506(b) | US accredited + 35 sophisticated | SEC | No general solicitation |
| Reg S | Non-US persons | SEC | Not offered in US |
| Reg A+ | Mini-IPO | SEC | Qualified by SEC, retail allowed |
| EU Prospectus | European offering | ESMA | Per member state rules |
| Exempt | Below threshold | Various | Jurisdiction-specific |

---

## 2. Investor Onboarding Workflow

```
START
  ├── Email/SSO Registration
  ├── Basic Profile (name, entity type, country)
  ├── Jurisdiction Check
  │     ├── BLOCKED → "Not available in your jurisdiction" → END
  │     └── ALLOWED → Continue
  ├── KYC / KYB Submission
  │     ├── Individual: ID + proof of address + selfie
  │     └── Entity: incorporation docs + UBO disclosure + authorized signers
  ├── KYC Review (automated + manual escalation)
  │     ├── FAILED → "Additional documentation required" → Resubmit
  │     └── PASSED → Continue
  ├── Accreditation Check (if required by offering type)
  │     ├── Self-certification
  │     ├── Third-party letter
  │     └── Financial document verification
  ├── Suitability Assessment (if required)
  ├── Subscription Agreement Presentation
  │     ├── PPM / Offering Circular
  │     ├── Risk disclosures
  │     └── E-signature
  ├── Wallet Registration
  │     ├── Connect wallet
  │     └── Address whitelisted in compliance engine
  └── ONBOARDED → Investor dashboard access
```

---

## 3. Transfer Restriction Rules

### Jurisdiction Policy Matrix
```typescript
interface JurisdictionPolicy {
  countryCode: string;          // ISO 3166-1 alpha-2
  status: 'allowed' | 'restricted' | 'blocked';
  investorTypes: ('individual' | 'entity' | 'accredited_only')[];
  maxHolding?: number;          // per-investor cap
  lockupDays?: number;          // post-purchase lockup
  transferRestrictions: string[];
  notes: string;
}
```

### Transfer Check Flow
```
TRANSFER REQUEST (from, to, amount)
  ├── Is token halted? → BLOCK
  ├── Is sender frozen? → BLOCK
  ├── Is recipient whitelisted? → If no → BLOCK
  ├── Is recipient in allowed jurisdiction? → If no → BLOCK
  ├── Is sender in lockup period? → If yes → BLOCK
  ├── Does transfer exceed recipient's max holding? → If yes → BLOCK
  ├── Does transfer violate investor class restrictions? → If yes → BLOCK
  ├── Is transfer count within compliance limits? → If no → BLOCK
  └── ALL CHECKS PASSED → ALLOW
```

---

## 4. Token Lifecycle Compliance

### Admin Actions Requiring Compliance Approval
| Action | Required Approvals | Audit Level |
|--------|-------------------|-------------|
| Mint new tokens | Treasury + Compliance | CRITICAL |
| Burn tokens | Treasury + Compliance | CRITICAL |
| Freeze address | Compliance | HIGH |
| Unfreeze address | Compliance | HIGH |
| Seize tokens | Compliance + Legal | CRITICAL |
| Update whitelist | Compliance | MEDIUM |
| Modify transfer rules | Compliance + Legal | HIGH |
| Publish attestation | Compliance + Treasury | MEDIUM |
| Open redemption window | Treasury + Compliance | HIGH |

### Multi-Sig / Multi-Approval
- CRITICAL actions require 2-of-3 approvals (Treasury, Compliance, Admin)
- HIGH actions require 1-of-2 approvals (Compliance, Admin)
- MEDIUM actions require single authorized role

---

## 5. Immutable Event Log

### Structure
```typescript
interface AuditEvent {
  id: string;
  timestamp: Date;
  eventType: string;           // e.g., "compliance.transfer_blocked"
  actor: {
    id: string;
    role: string;
    ip?: string;
  };
  target: {
    type: string;              // e.g., "investor", "token", "rule"
    id: string;
  };
  action: string;
  details: Record<string, unknown>;
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  approvals?: Approval[];
  hash: string;                // SHA-256 of event payload for tamper detection
}
```

### Guarantees
- Append-only: no updates or deletes
- Every event includes actor identity and role
- Every state change records previous and new state
- Chain of hashes for tamper detection (each event hashes previous event's hash)

---

## 6. Regulator-Ready Export Packages

### Export Types
| Package | Contents | Format |
|---------|----------|--------|
| Investor Registry | All investors with KYC status, accreditation, jurisdiction | CSV + JSON |
| Cap Table | Current holdings by investor | CSV + JSON |
| Transaction History | All transfers with compliance check results | CSV + JSON |
| Compliance Events | All rule changes, blocks, freezes, seizures | CSV + JSON |
| Reserve Status | Current reserves with attestation status | PDF + JSON |
| Audit Trail | Complete event log for period | JSON + signed archive |

### Export Controls
- Only compliance officer and admin roles can generate
- Each export is logged in audit trail
- Exports are hash-signed with generation timestamp
- Retention policy: minimum 7 years

---

## 7. Partner Integrations

### KYC/KYB
- Primary: Jumio / Onfido / Sumsub (pluggable adapter)
- Webhook-based status updates
- Manual review escalation path
- Document retention per regulatory requirements

### Accreditation
- Primary: Verify Investor / Parallel Markets (pluggable adapter)
- Letter upload + verification
- Annual re-verification tracking

### Transfer Agent
- Cap table synchronization API
- Corporate action distribution
- Shareholder communication relay

### Broker-Dealer
- Subscription processing API
- Suitability check relay
- Regulatory filing data feed
