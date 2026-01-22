/**
 * Sorting component for token table
 * Allows users to sort tokens by various fields with ascending/descending order
 */

'use client';

import { memo, useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setSort } from '@/src/store/tokenSlice';
import { SortField, SortDirection } from '@/src/lib/types';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SortOption {
  field: SortField;
  label: string;
  icon?: React.ReactNode;
}

const sortOptions: SortOption[] = [
  { field: 'volume24h', label: 'Volume 24h' },
  { field: 'price', label: 'Price' },
  { field: 'priceChange24h', label: 'Price Change 24h' },
  { field: 'marketCap', label: 'Market Cap' },
  { field: 'liquidity', label: 'Liquidity' },
  { field: 'createdAt', label: 'Created At' },
];

interface SortingProps {
  className?: string;
  variant?: 'button' | 'dropdown';
}

export const Sorting = memo(function Sorting({ 
  className,
  variant = 'dropdown' 
}: SortingProps) {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.tokens.sort);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSortChange = (field: SortField) => {
    // If clicking the same field, toggle direction
    if (currentSort.field === field) {
      dispatch(
        setSort({
          field,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
        })
      );
    } else {
      // Otherwise, set new field with default descending direction
      dispatch(
        setSort({
          field,
          direction: 'desc',
        })
      );
    }
  };

  const toggleDirection = () => {
    dispatch(
      setSort({
        field: currentSort.field,
        direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
      })
    );
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.field === currentSort.field);
    return option?.label || 'Sort';
  };

  const getDirectionIcon = () => {
    if (currentSort.direction === 'asc') {
      return <ArrowUp className="w-3.5 h-3.5" />;
    }
    return <ArrowDown className="w-3.5 h-3.5" />;
  };

  if (variant === 'button') {
    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800 border border-slate-700 rounded-full text-white text-xs sm:text-sm font-medium hover:bg-slate-700 transition-colors"
          aria-label="Sort options"
        >
          <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{getCurrentSortLabel()}</span>
          <span className="sm:hidden">Sort</span>
          {getDirectionIcon()}
          <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
  <div
    className={cn(
      `
      absolute z-50 mt-2
      rounded-xl
      bg-gradient-to-b from-slate-900 to-slate-950
      border border-slate-700/60
      shadow-2xl
      overflow-hidden

      /* mobile safety */
      max-[360px]:fixed
      max-[360px]:left-1/2
      max-[360px]:-translate-x-1/2
      max-[360px]:top-[72px]
      max-[360px]:w-[calc(100vw-20px)]

      /* normal screens */
      min-[361px]:right-0
      min-[361px]:w-64
      `
    )}
  >


          {/* Sort Options */}
          <div className="max-[320px]:py-1 min-[321px]:py-1">
            {sortOptions.map((option) => {
              const isActive = currentSort.field === option.field;
              return (
                <button
                  key={option.field}
                  onClick={() => {
                    handleSortChange(option.field);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full max-[320px]:px-2.5 min-[321px]:px-4 max-[320px]:py-2 min-[321px]:py-2 text-left max-[320px]:text-xs min-[321px]:text-sm transition-colors flex items-center justify-between',
                    isActive
                      ? 'bg-blue-600/20 text-white'
                      : 'text-white hover:bg-slate-800'
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isActive && (
                    <span className="text-blue-400 flex-shrink-0 ml-2">
                      {currentSort.direction === 'asc' ? (
                        <ArrowUp className="max-[320px]:w-3.5 min-[321px]:w-4 max-[320px]:h-3.5 min-[321px]:h-4" />
                      ) : (
                        <ArrowDown className="max-[320px]:w-3.5 min-[321px]:w-4 max-[320px]:h-3.5 min-[321px]:h-4" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800 border border-slate-700 rounded-full text-white text-xs sm:text-sm font-medium hover:bg-slate-700 transition-colors"
        aria-label="Sort options"
      >
        <ArrowUpDown className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Sort</span>
        <ChevronDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
  <div
    className={cn(
      `
      absolute z-50 mt-2
      rounded-xl
      bg-gradient-to-b from-slate-900 to-slate-950
      border border-slate-700/60
      shadow-2xl
      overflow-hidden

      /* mobile safety */
      max-[360px]:fixed
      max-[360px]:left-1/2
      max-[360px]:-translate-x-1/2
      max-[360px]:top-[72px]
      max-[360px]:w-[calc(100vw-20px)]

      /* normal screens */
      min-[361px]:right-0
      min-[361px]:w-64
      `
    )}
  >


          {/* Sort Options */}
          <div className="max-[320px]:py-1 min-[321px]:py-1">
            {sortOptions.map((option) => {
              const isActive = currentSort.field === option.field;
              return (
                <button
                  key={option.field}
                  onClick={() => {
                    handleSortChange(option.field);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full max-[320px]:px-2.5 min-[321px]:px-4 max-[320px]:py-2 min-[321px]:py-2 text-left max-[320px]:text-xs min-[321px]:text-sm transition-colors flex items-center justify-between',
                    isActive
                      ? 'bg-blue-600/20 text-white'
                      : 'text-white hover:bg-slate-800'
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isActive && (
                    <span className="text-blue-400 flex-shrink-0 ml-2">
                      {currentSort.direction === 'asc' ? (
                        <ArrowUp className="max-[320px]:w-3.5 min-[321px]:w-4 max-[320px]:h-3.5 min-[321px]:h-4" />
                      ) : (
                        <ArrowDown className="max-[320px]:w-3.5 min-[321px]:w-4 max-[320px]:h-3.5 min-[321px]:h-4" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
