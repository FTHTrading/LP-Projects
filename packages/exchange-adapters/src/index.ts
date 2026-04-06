// Exchange Adapters — venue connectivity, order book polling, trade execution
// Stub: define adapter interface + implement per-venue adapters

import type { LiquiditySnapshot, Venue } from '@sov/shared-types';

export interface ExchangeAdapter {
  venueId: string;
  venueName: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getSnapshot(tokenSymbol: string): Promise<LiquiditySnapshot>;
  isHealthy(): Promise<boolean>;
}

export class AdapterRegistry {
  private adapters = new Map<string, ExchangeAdapter>();

  register(adapter: ExchangeAdapter) {
    this.adapters.set(adapter.venueId, adapter);
  }

  get(venueId: string): ExchangeAdapter | undefined {
    return this.adapters.get(venueId);
  }

  getAll(): ExchangeAdapter[] {
    return Array.from(this.adapters.values());
  }

  async pollAll(tokenSymbol: string): Promise<LiquiditySnapshot[]> {
    const results: LiquiditySnapshot[] = [];
    for (const adapter of this.adapters.values()) {
      try {
        const snapshot = await adapter.getSnapshot(tokenSymbol);
        results.push(snapshot);
      } catch {
        // Log error, continue polling other venues
      }
    }
    return results;
  }
}

export const adapterRegistry = new AdapterRegistry();
