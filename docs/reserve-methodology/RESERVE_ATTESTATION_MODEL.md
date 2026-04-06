# Reserve Attestation Model

## 1. Purpose

This document defines how the Sovereign Assets Platform proves that its reserve claims are real. The attestation model exists because **the single biggest credibility gap in asset-backed token platforms is the distance between what the marketing says and what the evidence shows**.

---

## 2. Core Principle: Attestation Over Assertion

Every claim about reserves must fall into one of three categories:

| Category | Definition | Display Treatment |
|----------|-----------|-------------------|
| **Attested** | Backed by a third-party report, on-chain proof, or signed document with hash anchor | Green badge: "Independently Verified" |
| **Self-Reported** | Issuer's own records, not yet independently verified | Amber badge: "Issuer-Reported — Pending Verification" |
| **Unverified** | Claimed but with no supporting evidence uploaded | Red badge: "Unverified Claim" |

The platform **never displays an unverified claim as fact**. Every reserve widget shows its attestation status.

---

## 3. Reserve Asset Registry

### Data Model
```typescript
interface ReserveAsset {
  id: string;
  assetClass: 'gold' | 'silver' | 'platinum' | 'real_estate' | 'commodity' | 'cash' | 'other';
  name: string;                    // e.g., "Cerro Prieto Gold Deposit"
  description: string;
  location: string;                // geographic
  custodian: string;               // who holds it
  custodianVerified: boolean;
  acquisitionDate: Date;
  lastValuationDate: Date;
  lastValuationAmount: number;
  valuationCurrency: string;
  valuationMethodology: string;
  attestationStatus: 'attested' | 'self_reported' | 'unverified';
  documents: ReserveDocument[];
  timeline: AssetStatusEvent[];
}

interface ReserveDocument {
  id: string;
  type: 'assay_report' | 'title_deed' | 'custody_receipt' | 'audit_report' | 'valuation_report' | 'insurance_cert' | 'other';
  title: string;
  issuer: string;                  // who produced the document
  issuerType: 'third_party_auditor' | 'government' | 'custodian' | 'issuer_self' | 'legal_counsel';
  date: Date;
  expirationDate?: Date;
  fileHash: string;                // SHA-256 of uploaded file
  chainAnchorTx?: string;         // on-chain hash anchor (optional)
  url: string;                     // secure download link
  verified: boolean;
}
```

---

## 4. Valuation Methodology

### Multi-Source Approach
```
Reserve NAV = Σ (asset_i × valuation_i × confidence_weight_i)

Where:
  valuation_i = weightedAverage(
    thirdPartyAppraisal × APPRAISAL_WEIGHT,
    marketComparable    × MARKET_WEIGHT,
    costBasis           × COST_WEIGHT
  )

  confidence_weight_i = f(
    attestation_status,
    recency_of_valuation,
    custodian_verification,
    document_completeness
  )
```

### Staleness Rules
| Condition | Treatment |
|-----------|-----------|
| Valuation < 30 days old | Full weight |
| Valuation 30–90 days old | 90% weight, amber indicator |
| Valuation 90–180 days old | 75% weight, warning |
| Valuation > 180 days old | 50% weight, stale flag |
| No valuation on record | 0% weight, excluded from NAV |

---

## 5. Proof Document Ingestion

### Workflow
1. Admin uploads document (PDF, image, structured data)
2. System computes SHA-256 hash
3. Document classified by type and issuer type
4. If third-party issued: flagged for verification
5. Optional: hash anchored on-chain (Ethereum / Polygon)
6. Document added to asset's proof timeline
7. Attestation status updated

### Chain-of-Custody
Every document has a history:
```
UPLOADED → CLASSIFIED → REVIEWED → VERIFIED (or FLAGGED) → PUBLISHED → [SUPERSEDED]
```

---

## 6. Attestation Dashboard

### Public View
- Reserve composition pie chart (by asset class)
- Total reserve value (with attestation coverage %)
- Token supply vs reserve backing ratio
- Asset-by-asset table with attestation badges
- Latest attestation reports (linked, hash-verified)
- Valuation freshness indicators
- Liabilities disclosure (if any)

### Admin View (additional)
- Document queue (pending review)
- Expiring documents (need refresh)
- Stale valuations (need update)
- Gap analysis (assets without recent attestation)
- Publishing workflow for new reports

---

## 7. Hash Anchoring

### Process
1. Document is finalized and hash computed (SHA-256)
2. Hash is posted to a public blockchain (Ethereum mainnet or Polygon)
3. Transaction hash is recorded alongside the document
4. Anyone can verify: download document → compute hash → check chain

### Verification API
```
GET /api/v1/attestations/:id/verify

Response:
{
  "documentHash": "sha256:abc123...",
  "chainAnchor": {
    "chain": "polygon",
    "txHash": "0x...",
    "blockNumber": 12345678,
    "timestamp": "2026-01-15T00:00:00Z"
  },
  "verified": true,
  "hashMatch": true
}
```

---

## 8. Reserve-to-Token Ratio

### Computation
```
backing_ratio = total_reserve_NAV / (token_supply × token_reference_price)

Display:
  > 1.0  → "Over-collateralized" (green)
  = 1.0  → "Fully backed" (green)
  0.8–1.0 → "Partially backed" (amber)
  < 0.8  → "Under-collateralized" (red, compliance alert)
```

### Requirements
- Displayed on public proof center
- Updated at least daily
- Historical chart available
- Source data for both numerator and denominator disclosed

---

## 9. Liabilities Disclosure

The reserve attestation model **must** track liabilities, not just assets:
- Outstanding tokens (liability to holders)
- Pending redemptions
- Operating expenses funded from reserves
- Encumbrances or liens on reserve assets
- Credit facility drawdowns

```
Net Reserve Position = Gross Reserve Assets - Total Liabilities
```

---

## 10. Report Publishing Engine

### Workflow
1. Report drafted or received from third party
2. Hash computed, stored
3. Compliance review
4. Legal review (if material)
5. Treasury sign-off
6. Published to proof center
7. Investors notified
8. Hash anchored on-chain (optional)
9. Previous version marked as superseded (not deleted)
