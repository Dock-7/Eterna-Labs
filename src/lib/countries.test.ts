import { describe, expect, it } from 'vitest';
import { COUNTRIES, getCountryByCode, getDefaultCountry } from './countries';

describe('getCountryByCode', () => {
  it('finds a country by its code', () => {
    expect(getCountryByCode('IN')?.name).toBe('India');
  });

  it('returns undefined for an unknown code', () => {
    expect(getCountryByCode('ZZ')).toBeUndefined();
  });
});

describe('getDefaultCountry', () => {
  it('defaults to the first country (US) when there is no window', () => {
    expect(getDefaultCountry()).toBe(COUNTRIES[0]);
  });
});
