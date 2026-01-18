/**
 * Advanced filters component (Pro feature)
 */

'use client';

import { memo, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setFilters } from '@/src/store/tokenSlice';
import { ProGate } from './ProGate';
import { Filter } from 'lucide-react';

export const AdvancedFilters = memo(function AdvancedFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tokens.filters);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minVolume, setMinVolume] = useState('');

  const handleApply = useCallback(() => {
    // In a real app, these would be added to the filters
    // For demo, we'll just show the pro gate
    console.log('Advanced filters:', { minPrice, maxPrice, minVolume });
  }, [minPrice, maxPrice, minVolume]);

  const advancedFiltersUI = (
    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-300">Advanced Filters</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="$0.00"
            className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="$1000.00"
            className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Min Volume (24h)</label>
          <input
            type="number"
            value={minVolume}
            onChange={(e) => setMinVolume(e.target.value)}
            placeholder="$10,000"
            className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={handleApply}
        className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <ProGate feature="advanced_filters" showBadge={true}>
      {advancedFiltersUI}
    </ProGate>
  );
});
