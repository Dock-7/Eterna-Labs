import { describe, expect, it } from 'vitest';
import tokenReducer, { setTokens } from './tokenSlice';
import subscriptionReducer, { setSubscription } from './subscriptionSlice';
import {
  selectFilteredTokens,
  selectIsPro,
  selectTokenCount,
  selectTokensByStatus,
} from './selectors';
import type { RootState } from './index';
import type { Token } from '@/src/lib/types';

function makeToken(overrides: Partial<Token> = {}): Token {
  return {
    id: 'token-1',
    symbol: 'ETH',
    name: 'Ethereum Token',
    price: 100,
    priceChange24h: 1,
    priceChangePercent24h: 1,
    volume24h: 1000,
    marketCap: 10000,
    liquidity: 5000,
    sparkline: [1, 2, 3],
    status: 'new',
    chain: 'Ethereum',
    pairAddress: '0xabc',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

function makeRootState(tokens: Token[]): RootState {
  return {
    tokens: tokenReducer(undefined, setTokens(tokens)),
    subscription: subscriptionReducer(undefined, { type: '@@INIT' }),
  };
}

describe('selectFilteredTokens / selectTokenCount', () => {
  it('reflects the filteredTokens slice and its length', () => {
    const state = makeRootState([makeToken({ id: 'a' }), makeToken({ id: 'b' })]);
    expect(selectFilteredTokens(state)).toHaveLength(2);
    expect(selectTokenCount(state)).toBe(2);
  });
});

describe('selectTokensByStatus', () => {
  it('filters the unfiltered token list by status', () => {
    const state = makeRootState([
      makeToken({ id: 'a', status: 'new' }),
      makeToken({ id: 'b', status: 'migrated' }),
    ]);
    expect(selectTokensByStatus(state, 'migrated').map((t) => t.id)).toEqual(['b']);
  });
});

describe('selectIsPro', () => {
  it('is false with no subscription', () => {
    const state = makeRootState([]);
    expect(selectIsPro(state)).toBe(false);
  });

  it('is true for an active pro subscription', () => {
    let state = makeRootState([]);
    state = {
      ...state,
      subscription: subscriptionReducer(
        state.subscription,
        setSubscription({ tier: 'pro', isActive: true, features: [] })
      ),
    };
    expect(selectIsPro(state)).toBe(true);
  });

  it('is false for an inactive subscription', () => {
    let state = makeRootState([]);
    state = {
      ...state,
      subscription: subscriptionReducer(
        state.subscription,
        setSubscription({ tier: 'enterprise', isActive: false, features: [] })
      ),
    };
    expect(selectIsPro(state)).toBe(false);
  });
});
