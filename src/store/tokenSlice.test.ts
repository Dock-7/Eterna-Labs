import { describe, expect, it } from 'vitest';
import reducer, { setFilters, setSort, setTokens, updatePrice } from './tokenSlice';
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

describe('tokenSlice', () => {
  it('populates filteredTokens when tokens are set', () => {
    const tokens = [makeToken({ id: 'a' }), makeToken({ id: 'b', status: 'migrated' })];
    const state = reducer(undefined, setTokens(tokens));
    expect(state.tokens).toHaveLength(2);
    expect(state.filteredTokens).toHaveLength(2);
  });

  it('filters by search term', () => {
    const tokens = [
      makeToken({ id: 'a', symbol: 'ETH', name: 'Ethereum' }),
      makeToken({ id: 'b', symbol: 'SOL', name: 'Solana' }),
    ];
    let state = reducer(undefined, setTokens(tokens));
    state = reducer(state, setFilters({ search: 'sol' }));
    expect(state.filteredTokens.map((t) => t.id)).toEqual(['b']);
  });

  it('filters by status', () => {
    const tokens = [
      makeToken({ id: 'a', status: 'new' }),
      makeToken({ id: 'b', status: 'migrated' }),
    ];
    let state = reducer(undefined, setTokens(tokens));
    state = reducer(state, setFilters({ status: ['migrated'] }));
    expect(state.filteredTokens.map((t) => t.id)).toEqual(['b']);
  });

  it('sorts ascending and descending', () => {
    const tokens = [
      makeToken({ id: 'a', price: 50 }),
      makeToken({ id: 'b', price: 150 }),
    ];
    let state = reducer(undefined, setTokens(tokens));

    state = reducer(state, setSort({ field: 'price', direction: 'asc' }));
    expect(state.filteredTokens.map((t) => t.id)).toEqual(['a', 'b']);

    state = reducer(state, setSort({ field: 'price', direction: 'desc' }));
    expect(state.filteredTokens.map((t) => t.id)).toEqual(['b', 'a']);
  });

  it('applies price updates to tokens, filteredTokens, and the selected token', () => {
    const token = makeToken({ id: 'a', price: 100 });
    let state = reducer(undefined, setTokens([token]));

    state = reducer(
      state,
      updatePrice({
        tokenId: 'a',
        price: 200,
        priceChange24h: 10,
        priceChangePercent24h: 10,
        timestamp: Date.now(),
      })
    );

    expect(state.tokens[0].price).toBe(200);
    expect(state.filteredTokens[0].price).toBe(200);
  });
});
