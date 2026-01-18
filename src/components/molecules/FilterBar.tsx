/**
 * Filter bar component matching Axiom Trade design
 */

'use client';

import { memo, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setFilters } from '@/src/store/tokenSlice';
import { TokenStatus } from '@/src/lib/types';
import { cn } from '@/src/lib/utils';

const statusOptions: { value: TokenStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'final_stretch', label: 'Final Stretch' },
  { value: 'migrated', label: 'Migrated' },
];

const itemsPerPageOptions = [20, 50, 100];

export const FilterBar = memo(function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tokens.filters);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const handleStatusToggle = useCallback(
    (status: TokenStatus | 'all') => {
      if (status === 'all') {
        dispatch(
          setFilters({
            ...filters,
            status: undefined,
          })
        );
      } else {
        const currentStatuses = filters.status || [];
        const newStatuses = currentStatuses.includes(status)
          ? currentStatuses.filter((s) => s !== status)
          : [...currentStatuses, status];

        dispatch(
          setFilters({
            ...filters,
            status: newStatuses.length > 0 ? newStatuses : undefined,
          })
        );
      }
    },
    [dispatch, filters]
  );

  const isAllSelected = !filters.status || filters.status.length === 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => {
          const isActive =
            option.value === 'all' ? isAllSelected : filters.status?.includes(option.value as TokenStatus);
          return (
            <button
              key={option.value}
              onClick={() => handleStatusToggle(option.value as TokenStatus | 'all')}
              className={cn(
                'px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors',
                isActive
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Items Per Page */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs text-slate-400 hidden sm:inline">Show:</span>
        {itemsPerPageOptions.map((count) => (
          <button
            key={count}
            onClick={() => setItemsPerPage(count)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
              itemsPerPage === count
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            )}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
});
