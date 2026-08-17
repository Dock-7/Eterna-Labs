/**
 * Type definitions for the Eterna Labs Token Discovery Table
 */

export type TokenStatus = 'new' | 'final_stretch' | 'migrated';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  sparkline: number[];
  status: TokenStatus;
  chain: string;
  pairAddress: string;
  createdAt: string;
}

export interface TokenTableFilters {
  status?: TokenStatus[];
  chain?: string[];
  search?: string;
}

export interface AdvancedFilterState {
  status: TokenStatus;
  search: string;
  exclude: string;
  protocols: string[];
}

export type SortField = 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity' | 'createdAt';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface TokenTableState {
  tokens: Token[];
  filters: TokenTableFilters;
  sort: SortConfig;
  selectedToken: Token | null;
  isLoading: boolean;
  error: string | null;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  volume24h?: number;
  marketCap?: number;
  liquidity?: number;
  timestamp: number;
}
