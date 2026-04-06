// Config — shared configuration, environment variables, feature flags

export const config = {
  app: {
    name: 'Sovereign Assets Platform',
    version: '0.0.1',
    environment: (process.env.NODE_ENV ?? 'development') as 'development' | 'production' | 'test',
  },
  chain: {
    rpcUrl: process.env.RPC_URL ?? 'http://localhost:8545',
    chainId: parseInt(process.env.CHAIN_ID ?? '1', 10),
  },
  pricing: {
    navComputationInterval: '1h',
    referencePriceMethod: 'vwap' as const,
    circuitBreakerSpreadBps: 500,
    circuitBreakerDeviationPct: 10,
  },
  compliance: {
    kycProvider: process.env.KYC_PROVIDER ?? 'stub',
    maxHoldingPct: 5,
    lockupDays: 180,
    coolingPeriodHours: 48,
  },
  treasury: {
    approvalThresholdUsd: 100_000,
    requiredApprovals: 2,
    settlementWindowDays: 3,
  },
} as const;

export type AppConfig = typeof config;
