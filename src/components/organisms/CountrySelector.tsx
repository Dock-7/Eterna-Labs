/**
 * Country/region selector modal, backed by the country list in lib/countries.ts
 */

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { memo, useMemo, useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { COUNTRIES, type Country } from '@/src/lib/countries';
import { cn } from '@/src/lib/utils';

interface CountrySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Country;
  onSelect: (country: Country) => void;
}

export const CountrySelector = memo(function CountrySelector({
  open,
  onOpenChange,
  selected,
  onSelect,
}: CountrySelectorProps) {
  const [query, setQuery] = useState('');

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(q) ||
        country.code.toLowerCase().includes(q) ||
        country.currency.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 animate-in fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-1rem)] sm:w-full max-w-sm h-[70vh] max-h-[500px] bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <Dialog.Title className="text-base font-semibold text-white">Region</Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="relative mb-3 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto -mx-2 px-2">
            {filteredCountries.map((country) => {
              const isActive = country.code === selected.code;
              return (
                <button
                  key={country.code}
                  onClick={() => {
                    onSelect(country);
                    onOpenChange(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition-colors',
                    isActive ? 'bg-blue-600/20 text-white' : 'text-slate-300 hover:bg-slate-800'
                  )}
                >
                  <span className="text-lg leading-none">{country.flag}</span>
                  <span className="flex-1 text-sm truncate">{country.name}</span>
                  <span className="text-xs text-slate-400">{country.currency}</span>
                  {isActive && <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                </button>
              );
            })}
            {filteredCountries.length === 0 && (
              <div className="text-center text-sm text-slate-400 py-6">No countries found</div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
