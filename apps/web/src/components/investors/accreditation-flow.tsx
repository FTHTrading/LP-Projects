'use client';

import { useState } from 'react';

type AccreditationMethod = 'income' | 'net_worth' | 'professional' | 'entity';

const methods: { id: AccreditationMethod; label: string; description: string }[] = [
  { id: 'income', label: 'Income Test', description: 'Annual income exceeding $200K (individual) or $300K (joint) for the past two years with expectation of the same.' },
  { id: 'net_worth', label: 'Net Worth Test', description: 'Individual or joint net worth exceeding $1M, excluding the value of primary residence.' },
  { id: 'professional', label: 'Professional Certification', description: 'Holder of Series 7, Series 65, or Series 82 license in good standing.' },
  { id: 'entity', label: 'Qualified Entity', description: 'Entity with total assets exceeding $5M, or entity in which all equity owners are accredited investors.' },
];

type VerificationStatus = 'not_started' | 'documents_uploaded' | 'in_review' | 'verified' | 'rejected';

const statusConfig: Record<VerificationStatus, { label: string; color: string }> = {
  not_started: { label: 'Not Started', color: 'text-obsidian-400' },
  documents_uploaded: { label: 'Documents Uploaded', color: 'text-sky-400' },
  in_review: { label: 'Under Review', color: 'text-amber-400' },
  verified: { label: 'Verified', color: 'text-emerald-400' },
  rejected: { label: 'Rejected', color: 'text-red-400' },
};

export function AccreditationFlow() {
  const [selectedMethod, setSelectedMethod] = useState<AccreditationMethod | null>(null);
  const [status] = useState<VerificationStatus>('not_started');

  const currentStatus = statusConfig[status];

  return (
    <div className="glass-card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-obsidian-200">Accreditation Verification</h3>
        <span className={`text-xs font-medium ${currentStatus.color}`}>{currentStatus.label}</span>
      </div>

      <p className="text-xs text-obsidian-400">
        Under SEC Regulation D, investors in security token offerings must be accredited.
        Select a verification method and upload supporting documentation.
      </p>

      {/* Method selection */}
      <div className="space-y-2">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selectedMethod === method.id
                ? 'border-gold-500/40 bg-gold-500/5'
                : 'border-obsidian-700 hover:border-obsidian-600 bg-obsidian-900/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full border-2 ${
                selectedMethod === method.id ? 'border-gold-500 bg-gold-500' : 'border-obsidian-600'
              }`} />
              <span className="text-xs font-medium text-obsidian-200">{method.label}</span>
            </div>
            <p className="text-[10px] text-obsidian-500 mt-1 ml-5">{method.description}</p>
          </button>
        ))}
      </div>

      {/* Upload section */}
      {selectedMethod && (
        <div className="space-y-3 border-t border-obsidian-800 pt-4">
          <h4 className="text-xs font-semibold text-obsidian-300">Upload Supporting Documents</h4>
          <p className="text-[10px] text-obsidian-500">
            {selectedMethod === 'income' && 'Upload tax returns, W-2s, or a CPA letter for the past two years.'}
            {selectedMethod === 'net_worth' && 'Upload recent bank/brokerage statements and a signed net worth attestation.'}
            {selectedMethod === 'professional' && 'Upload your FINRA BrokerCheck report or license certificate.'}
            {selectedMethod === 'entity' && 'Upload SEC filings, audited financials, or formation documents.'}
          </p>

          <div className="border-2 border-dashed border-obsidian-700 rounded-lg p-6 text-center hover:border-obsidian-600 transition-colors">
            <p className="text-xs text-obsidian-400">Drag & drop files here, or click to browse</p>
            <p className="text-[10px] text-obsidian-600 mt-1">PDF, JPG, PNG up to 10MB each</p>
          </div>

          <button className="w-full py-2.5 text-xs font-semibold rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/40 hover:bg-gold-500/30 transition-colors">
            Submit for Verification
          </button>

          <p className="text-[10px] text-obsidian-600 text-center">
            Verification typically takes 2–3 business days. You will be notified upon completion.
          </p>
        </div>
      )}
    </div>
  );
}
