/**
 * Country and language data
 */

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', currency: 'RUB' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currency: 'PLN' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'SEK' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', currency: 'NOK' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', currency: 'DKK' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', currency: 'EUR' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', currency: 'EUR' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currency: 'NZD' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', currency: 'ARS' },
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'en-IN', name: 'English (India)' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'pl', name: 'Polski' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'th', name: 'ภาษาไทย' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
];

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getDefaultCountry(): Country {
  // Try to detect from browser or default to US
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('axiom_country');
    if (stored) {
      const country = getCountryByCode(stored);
      if (country) return country;
    }
  }
  return COUNTRIES[0]; // Default to US
}
