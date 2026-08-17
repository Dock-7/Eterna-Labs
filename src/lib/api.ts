/**
 * API utilities for fetching token data
 */

import { Token } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Fetch all tokens from the API
 */
export async function fetchTokens(): Promise<Token[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tokes`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tokens: ${response.statusText}`);
    }
    const data = await response.json();
    return data.tokens || [];
  } catch (error) {
    console.error('Error fetching tokens:', error);
    // Return mock data if API fails
    return generateMockTokens();
  }
}

/**
 * Generate mock token data for development/testing
 */
export function generateMockTokens(): Token[] {
  const tokens: Token[] = [];
  const symbols = ['ETH', 'BTC', 'SOL', 'AVAX', 'MATIC', 'ADA', 'DOT', 'LINK', 'UNI', 'AAVE'];
  const chains = ['Ethereum', 'Solana', 'Polygon', 'Avalanche', 'BSC'];
  const statuses: Token['status'][] = ['new', 'final_stretch', 'migrated'];

  for (let i = 0; i < 50; i++) {
    const symbol = symbols[i % symbols.length];
    const basePrice = Math.random() * 1000 + 10;
    const priceChange = (Math.random() - 0.5) * 20;
    const sparkline = Array.from({ length: 24 }, () => basePrice + (Math.random() - 0.5) * 50);

    tokens.push({
      id: `token-${i}`,
      symbol: `${symbol}${i > 9 ? i : ''}`,
      name: `${symbol} Token ${i}`,
      price: basePrice,
      priceChange24h: priceChange,
      priceChangePercent24h: (priceChange / basePrice) * 100,
      volume24h: Math.random() * 10000000,
      marketCap: Math.random() * 100000000,
      liquidity: Math.random() * 5000000,
      sparkline,
      status: statuses[i % statuses.length],
      chain: chains[i % chains.length],
      pairAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return tokens;
}

/**
 * Format number with commas and decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format currency
 */
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
