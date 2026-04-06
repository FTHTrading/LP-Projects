# Exchange Adapter Framework

## Overview

The exchange adapter layer provides a uniform interface for connecting to multiple venue types — centralized exchanges (CEX), decentralized exchanges (DEX), OTC desks, and internal crossing engines. Each adapter normalizes market data, order management, and settlement into a consistent domain model.

## Adapter Interface

```typescript
interface ExchangeAdapter {
  readonly venueId: string;
  readonly venueType: 'cex' | 'dex' | 'otc' | 'internal';
  readonly status: 'connected' | 'degraded' | 'disconnected';

  connect(): Promise<void>;
  disconnect(): Promise<void>;
  healthCheck(): Promise<HealthStatus>;

  // Market Data
  getOrderBook(symbol: string): Promise<OrderBook>;
  getTicker(symbol: string): Promise<Ticker>;
  subscribeTicker(symbol: string, cb: (t: Ticker) => void): Unsubscribe;

  // Order Management
  placeOrder(order: NewOrder): Promise<OrderResult>;
  cancelOrder(orderId: string): Promise<void>;
  getOrder(orderId: string): Promise<OrderStatus>;
  getOpenOrders(symbol?: string): Promise<OrderStatus[]>;

  // Settlement
  getBalances(): Promise<VenueBalance[]>;
  requestWithdrawal(asset: string, amount: string, destination: string): Promise<WithdrawalResult>;
}
```

## Venue Onboarding

### Step 1: Adapter Implementation
Create a class implementing `ExchangeAdapter` for the target venue. Place in `packages/exchange-adapters/src/venues/<venue-id>.ts`.

### Step 2: Credential Configuration
Store API keys/secrets in vault. Reference via config:
```yaml
venues:
  - id: coinbase-prime
    type: cex
    adapter: coinbase
    credentials:
      apiKeyRef: vault://exchange/coinbase-prime/api-key
      secretRef: vault://exchange/coinbase-prime/secret
      passphrase: vault://exchange/coinbase-prime/passphrase
    rateLimit:
      requestsPerSecond: 10
      burstLimit: 30
```

### Step 3: Registration
Register adapter in `AdapterRegistry`:
```typescript
registry.register('coinbase-prime', new CoinbaseAdapter(config));
```

### Step 4: Health Monitoring
Adapter auto-enrolled in health check polling (every 30s). Degraded/disconnected status triggers alerts.

## Health Check Protocol

Each adapter health check verifies:
1. **Connectivity**: WebSocket/REST endpoint reachable
2. **Authentication**: API credentials valid
3. **Rate Limits**: Within acceptable thresholds
4. **Data Freshness**: Last tick received within expected window
5. **Order Capability**: Can place/cancel test orders (sandbox mode)

Response:
```typescript
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latencyMs: number;
  lastTickAt: string | null;
  errors: string[];
  capabilities: {
    marketData: boolean;
    orderManagement: boolean;
    settlement: boolean;
  };
}
```

## Supported Venue Types

| Type | Examples | Data Protocol | Settlement |
|------|----------|--------------|------------|
| CEX | Coinbase Prime, Kraken, Bitstamp | WebSocket + REST | Exchange internal |
| DEX | Uniswap v3, Curve, SushiSwap | On-chain events | Smart contract |
| OTC | Cumberland, Galaxy, Circle Trade | RFQ API / chat | Wire / on-chain |
| Internal | Crossing engine | In-memory | Ledger entry |

## Polling & Aggregation

The `AdapterRegistry.pollAll()` method:
1. Iterates all registered adapters
2. Calls `healthCheck()` on each
3. Collects order book snapshots from healthy adapters
4. Computes aggregate bid/ask depth and weighted-average spread
5. Returns unified `LiquiditySnapshot[]` for the market-ops engine

## Rate Limiting

Each adapter wraps API calls with a token-bucket rate limiter:
- Configurable per-venue `requestsPerSecond` and `burstLimit`
- Automatic retry with exponential backoff on 429 responses
- Circuit breaker trips after 3 consecutive failures (30s cooldown)

## Error Handling

- Network errors → adapter status transitions to `degraded`
- Auth errors → adapter status transitions to `disconnected`, alert emitted
- Rate limit exceeded → request queued with backoff
- All errors logged to audit trail with venue context
