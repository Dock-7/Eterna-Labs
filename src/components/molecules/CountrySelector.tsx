/**
 * Country selector component similar to TradingView
 */

'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { COUNTRIES, getDefaultCountry, Country } from '@/src/lib/countries';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const CountrySelector = memo(function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(getDefaultCountry());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('axiom_country', country.code);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
        aria-label="Select country"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{selectedCountry.code}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-400 transition-transform',
            showDropdown && 'rotate-180'
          )}
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-xl z-50">
          <div className="p-2">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => handleSelectCountry(country)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors',
                  selectedCountry.code === country.code
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{country.name}</div>
                  <div className="text-xs text-slate-500">{country.code}</div>
                </div>
                {selectedCountry.code === country.code && (
                  <span className="text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
