import { describe, expect, it } from 'vitest';
import { formatCurrency, formatNumber, formatPercentage, generateMockTokens } from './api';

describe('formatCurrency', () => {
  it('abbreviates millions', () => {
    expect(formatCurrency(2_500_000)).toBe('$2.50M');
  });

  it('abbreviates thousands', () => {
    expect(formatCurrency(1_234)).toBe('$1.23K');
  });

  it('formats small values as plain dollars', () => {
    expect(formatCurrency(4.2)).toBe('$4.20');
  });
});

describe('formatPercentage', () => {
  it('prefixes positive values with a plus sign', () => {
    expect(formatPercentage(12.345)).toBe('+12.35%');
  });

  it('does not double up the minus sign for negative values', () => {
    expect(formatPercentage(-3.1)).toBe('-3.10%');
  });
});

describe('formatNumber', () => {
  it('formats with the given number of decimals', () => {
    expect(formatNumber(1234.5, 1)).toBe('1,234.5');
  });

  it('defaults to two decimals', () => {
    expect(formatNumber(1000)).toBe('1,000.00');
  });
});

describe('generateMockTokens', () => {
  it('generates 50 tokens with well-formed pair addresses', () => {
    const tokens = generateMockTokens();
    expect(tokens).toHaveLength(50);
    for (const token of tokens) {
      expect(token.pairAddress).toMatch(/^0x[0-9a-f]{40}$/);
    }
  });

  it('produces unique ids', () => {
    const tokens = generateMockTokens();
    const ids = new Set(tokens.map((t) => t.id));
    expect(ids.size).toBe(tokens.length);
  });
});
