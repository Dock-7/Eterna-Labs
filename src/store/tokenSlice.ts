/**
 * Redux slice for token state management
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TokenTableFilters, SortConfig, PriceUpdate } from '@/src/lib/types';

interface TokenState {
  tokens: Token[];
  filteredTokens: Token[];
  filters: TokenTableFilters;
  sort: SortConfig;
  selectedToken: Token | null;
  priceUpdates: Record<string, PriceUpdate>;
}

const initialState: TokenState = {
  tokens: [],
  filteredTokens: [],
  filters: {},
  sort: {
    field: 'volume24h',
    direction: 'desc',
  },
  selectedToken: null,
  priceUpdates: {},
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.filteredTokens = applyFiltersAndSort(action.payload, state.filters, state.sort);
    },
    setFilters: (state, action: PayloadAction<TokenTableFilters>) => {
      state.filters = action.payload;
      state.filteredTokens = applyFiltersAndSort(state.tokens, action.payload, state.sort);
    },
    setSort: (state, action: PayloadAction<SortConfig>) => {
      state.sort = action.payload;
      state.filteredTokens = applyFiltersAndSort(state.tokens, state.filters, action.payload);
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      const { tokenId, price, priceChange24h, priceChangePercent24h } = action.payload;
      state.priceUpdates[tokenId] = action.payload;

      // Update token in the list
      const tokenIndex = state.tokens.findIndex((t) => t.id === tokenId);
      if (tokenIndex !== -1) {
        state.tokens[tokenIndex].price = price;
        state.tokens[tokenIndex].priceChange24h = priceChange24h;
        state.tokens[tokenIndex].priceChangePercent24h = priceChangePercent24h;
      }

      // Update filtered tokens
      const filteredIndex = state.filteredTokens.findIndex((t) => t.id === tokenId);
      if (filteredIndex !== -1) {
        state.filteredTokens[filteredIndex].price = price;
        state.filteredTokens[filteredIndex].priceChange24h = priceChange24h;
        state.filteredTokens[filteredIndex].priceChangePercent24h = priceChangePercent24h;
      }

      // Update selected token if it's the one being updated
      if (state.selectedToken?.id === tokenId) {
        state.selectedToken.price = price;
        state.selectedToken.priceChange24h = priceChange24h;
        state.selectedToken.priceChangePercent24h = priceChangePercent24h;
      }
    },
  },
});

/**
 * Apply filters and sorting to tokens
 */
function applyFiltersAndSort(
  tokens: Token[],
  filters: TokenTableFilters,
  sort: SortConfig
): Token[] {
  let filtered = [...tokens];

  // Apply status filter
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter((token) => filters.status!.includes(token.status));
  }

  // Apply chain filter
  if (filters.chain && filters.chain.length > 0) {
    filtered = filtered.filter((token) => filters.chain!.includes(token.chain));
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchLower) ||
        token.name.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    switch (sort.field) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'priceChange24h':
        aValue = a.priceChange24h;
        bValue = b.priceChange24h;
        break;
      case 'volume24h':
        aValue = a.volume24h;
        bValue = b.volume24h;
        break;
      case 'marketCap':
        aValue = a.marketCap;
        bValue = b.marketCap;
        break;
      case 'liquidity':
        aValue = a.liquidity;
        bValue = b.liquidity;
        break;
      case 'createdAt':
        aValue = a.createdAt;
        bValue = b.createdAt;
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sort.direction === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  return filtered;
}

export const { setTokens, setFilters, setSort, setSelectedToken, updatePrice } =
  tokenSlice.actions;
export default tokenSlice.reducer;
