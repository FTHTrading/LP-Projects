'use client';

import { useState } from 'react';

type Step = 'welcome' | 'investor_type' | 'kyc_info' | 'accreditation' | 'wallet' | 'review';

const steps: { id: Step; label: string }[] = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'investor_type', label: 'Investor Type' },
  { id: 'kyc_info', label: 'Identity' },
  { id: 'accreditation', label: 'Accreditation' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'review', label: 'Review' },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  const next = () => {
    if (currentIndex < steps.length - 1) setCurrentStep(steps[currentIndex + 1].id);
  };
  const prev = () => {
    if (currentIndex > 0) setCurrentStep(steps[currentIndex - 1].id);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-1">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                  i <= currentIndex
                    ? 'bg-gold-500 text-obsidian-950'
                    : 'bg-obsidian-800 text-obsidian-500'
                }`}
              >
                {i < currentIndex ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-px w-8 sm:w-16 ${i < currentIndex ? 'bg-gold-500' : 'bg-obsidian-800'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-obsidian-400 text-center">
          Step {currentIndex + 1} of {steps.length}: {steps[currentIndex].label}
        </p>
      </div>

      {/* Step content */}
      <div className="min-h-[200px]">
        {currentStep === 'welcome' && (
          <div className="text-center space-y-3 py-8">
            <h3 className="text-lg font-semibold text-obsidian-100">Welcome to Sovereign Assets</h3>
            <p className="text-xs text-obsidian-400 max-w-md mx-auto">
              Complete this onboarding process to participate in asset-backed token offerings.
              You will need to verify your identity and accreditation status.
            </p>
          </div>
        )}

        {currentStep === 'investor_type' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-obsidian-200">Select Investor Type</h4>
            {['Individual', 'Entity / Corporation', 'Trust', 'Fund / LP'].map((type) => (
              <button
                key={type}
                className="w-full text-left p-3 rounded-lg border border-obsidian-700 hover:border-gold-500/40 transition-colors text-xs text-obsidian-300"
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'kyc_info' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-obsidian-200">Identity Verification</h4>
            <p className="text-xs text-obsidian-400">
              Your information is encrypted and stored securely. We use a third-party KYC provider.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Legal First Name" className="px-3 py-2 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200 placeholder-obsidian-500" />
              <input placeholder="Legal Last Name" className="px-3 py-2 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200 placeholder-obsidian-500" />
            </div>
            <input placeholder="Country of Residence" className="w-full px-3 py-2 text-xs bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200 placeholder-obsidian-500" />
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400">
              Document upload (passport, driver license) will be handled by the KYC provider in production.
            </div>
          </div>
        )}

        {currentStep === 'accreditation' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-obsidian-200">Accreditation Verification</h4>
            <p className="text-xs text-obsidian-400">
              For US persons, accredited investor status is required for security token offerings.
            </p>
            {[
              'Net worth exceeds $1M (excluding primary residence)',
              'Annual income exceeds $200K (individual) or $300K (joint)',
              'Licensed Series 7, 65, or 82 holder',
              'Qualified institutional buyer',
            ].map((criteria) => (
              <label key={criteria} className="flex items-start gap-2 p-2 rounded hover:bg-obsidian-900/30">
                <input type="checkbox" className="mt-0.5" />
                <span className="text-xs text-obsidian-300">{criteria}</span>
              </label>
            ))}
          </div>
        )}

        {currentStep === 'wallet' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-obsidian-200">Connect Wallet</h4>
            <p className="text-xs text-obsidian-400">
              Link your Ethereum wallet to receive tokens. This address will be added to the token whitelist.
            </p>
            <input
              placeholder="0x... Ethereum address"
              className="w-full px-3 py-2 text-xs font-mono bg-obsidian-900 border border-obsidian-700 rounded text-obsidian-200 placeholder-obsidian-500"
            />
            <button className="px-4 py-2 text-xs rounded-lg bg-obsidian-800 text-obsidian-300 hover:text-obsidian-100 transition-colors border border-obsidian-700">
              Or Connect via WalletConnect
            </button>
          </div>
        )}

        {currentStep === 'review' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-obsidian-200">Review & Submit</h4>
            <div className="p-3 rounded-lg bg-obsidian-900/50 text-xs text-obsidian-400 space-y-1">
              <p>Investor Type: <span className="text-obsidian-200">Individual</span></p>
              <p>Country: <span className="text-obsidian-200">United States</span></p>
              <p>Accreditation: <span className="text-amber-400">Pending Verification</span></p>
              <p>Wallet: <span className="text-obsidian-200 font-mono">Not connected</span></p>
            </div>
            <p className="text-[10px] text-obsidian-500">
              By submitting, you agree to the terms of the Private Placement Memorandum and authorize identity verification.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-xs rounded-lg bg-obsidian-800 text-obsidian-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-obsidian-200 transition-colors"
        >
          ← Back
        </button>
        {currentIndex < steps.length - 1 ? (
          <button
            onClick={next}
            className="px-4 py-2 text-xs rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/40 hover:bg-gold-500/30 transition-colors"
          >
            Continue →
          </button>
        ) : (
          <button className="px-4 py-2 text-xs rounded-lg bg-gold-500 text-obsidian-950 font-semibold hover:bg-gold-400 transition-colors">
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
}
