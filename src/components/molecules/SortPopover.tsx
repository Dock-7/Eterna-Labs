/**
 * Sort popover component matching Axiom Trade design
 */

'use client';

import * as Popover from '@radix-ui/react-popover';
import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setSort } from '@/src/store/tokenSlice';
import { SortField, SortDirection } from '@/src/lib/types';
import { cn } from '@/src/lib/utils';
import { ChevronDown } from 'lucide-react';

const sortOptions: { field: SortField; label: string }[] = [
  { field: 'marketCap', label: 'Market Cap' },
  { field: 'volume24h', label: 'Volume' },
  { field: 'price', label: 'Price' },
  { field: 'priceChange24h', label: '24h Change' },
  { field: 'liquidity', label: 'Liquidity' },
  { field: 'createdAt', label: 'Newest' },
];

export const SortPopover = memo(function SortPopover() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.tokens.sort);

  const handleSort = useCallback(
    (field: SortField) => {
      const newDirection: SortDirection =
        sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
      dispatch(setSort({ field, direction: newDirection }));
    },
    [dispatch, sort]
  );

  const currentSortLabel = sortOptions.find((opt) => opt.field === sort.field)?.label || 'Market Cap';

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
          aria-label="Sort options"
        >
          <span className="text-xs">SORT</span>
          <span className="text-sm">{currentSortLabel}</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 w-56 rounded-lg bg-slate-900 border border-slate-700 shadow-lg p-2 animate-in fade-in-0 zoom-in-95"
          sideOffset={5}
        >
          <div className="space-y-1">
            {sortOptions.map((option) => {
              const isActive = sort.field === option.field;
              return (
                <button
                  key={option.field}
                  onClick={() => handleSort(option.field)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  )}
                >
                  <span>{option.label}</span>
                  {isActive && (
                    <span className="text-xs text-slate-400">
                      {sort.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <Popover.Arrow className="fill-slate-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});
