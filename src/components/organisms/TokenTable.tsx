/**
 * Main token table component with three columns (NEW PAIRS, FINAL STRETCH, MIGRATED)
 */

'use client';

import { memo, useEffect, useMemo, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setTokens } from '@/src/store/tokenSlice';
import { useTokensQuery } from '@/src/hooks/useTokensQuery';
import { useWsMock } from '@/src/hooks/useWsMock';
import { selectFilteredTokens } from '@/src/store/selectors';
import { TokenRow } from './TokenRow';
import { Skeleton } from '@/src/components/atoms/Skeleton';
import { TokenDetailsDialog } from './TokenDetailsDialog';
import { TokenStatus } from '@/src/lib/types';
import { Menu, Volume2, Wallet, ChevronDown, Settings, Star, TrendingUp, Zap, Filter } from 'lucide-react';
import Image from 'next/image';
import { Tooltip } from '@/src/components/atoms/Tooltip';
import { cn } from '@/src/lib/utils';
import { FilterModal } from '@/src/components/organisms/FilterModal';
import { Sorting } from '@/src/components/organisms/Sorting';



export const TokenTable = memo(function TokenTable() {
  const [openFilter, setOpenFilter] = useState(false);
const [activeFilterColumn, setActiveFilterColumn] =
  useState<TokenStatus>('new');

  const dispatch = useAppDispatch();
  const { data: tokens, isLoading, error } = useTokensQuery();
  const [showDisplayDropdown, setShowDisplayDropdown] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<Record<string, 'P1' | 'P2' | 'P3'>>({
    new: 'P1',
    final_stretch: 'P1',
    migrated: 'P1',
  });
  const [selectedColumn, setSelectedColumn] = useState<TokenStatus>('new');
  const displayDropdownRef = useRef<HTMLDivElement>(null);
  const columnDropdownRef = useRef<HTMLDivElement>(null);
  // Use optimized selectors
  const filteredTokens = useAppSelector(selectFilteredTokens);



  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        displayDropdownRef.current &&
        !displayDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDisplayDropdown(false);
      }
      if (
        columnDropdownRef.current &&
        !columnDropdownRef.current.contains(event.target as Node)
      ) {
        setShowColumnDropdown(false);
      }
    };

    if (showDisplayDropdown || showColumnDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDisplayDropdown, showColumnDropdown]);

  // Update Redux store when tokens are fetched (only once)
  useEffect(() => {
    if (tokens) {
      dispatch(setTokens(tokens));
    }
  }, [tokens, dispatch]);

  // Enable real-time WebSocket updates
  useWsMock(filteredTokens);

  // Memoize token grouping to prevent recalculation
  const groupedTokens = useMemo(() => {
    const groups: Record<TokenStatus, typeof filteredTokens> = {
      new: [],
      final_stretch: [],
      migrated: [],
    };

    // Use for loop for better performance with large arrays
    for (let i = 0; i < filteredTokens.length; i++) {
      const token = filteredTokens[i];
      groups[token.status].push(token);
    }

    return groups;
  }, [filteredTokens]);

  // Memoize skeleton array to prevent recreation
  const skeletonArray = useMemo(() => Array.from({ length: 10 }), []);

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-400 mb-2">Error loading tokens</div>
        <div className="text-sm text-slate-400">{String(error)}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Topbar */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0">
        
        {/* Left Section - Pulse Title and Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <h1 className="text-base sm:text-xl font-bold text-white">Pulse</h1>
          {/* Solana logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image
                src="/solana.png"
                alt="Solana"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            {/* BNB logo */}
<div className="w-6 h-6 flex items-center justify-center">
  <Image
    src="/bnb-fill.svg"
    alt="BNB"
    width={14}
    height={14}
    className="opacity-90"
  />
</div>


          </div>
          {/* Sorting Button - Mobile Only (below 360px) */}
          <div className="max-[360px]:block hidden">
            <Sorting />
          </div>
        </div>

          {/* Right Section - Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-3">
            {/* Display Button */}
            <div className="relative" ref={displayDropdownRef}>
              <button
                onClick={() => setShowDisplayDropdown(!showDisplayDropdown)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800 border border-slate-700 rounded-full text-white text-xs sm:text-sm font-medium hover:bg-slate-700 transition-colors"
                aria-label="Display options"
                aria-expanded={showDisplayDropdown}
                aria-haspopup="menu"
              >
                <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Display</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            {showDisplayDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
                <button 
                  onClick={() => setShowDisplayDropdown(false)}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-800"
                >
                  List View
                </button>
                <button 
                  onClick={() => setShowDisplayDropdown(false)}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-800"
                >
                  Grid View
                </button>
                <button 
                  onClick={() => setShowDisplayDropdown(false)}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-800"
                >
                  Compact View
                </button>
              </div>
            )}
          </div>

          {/* Bookmark Icon with X - Hide on very small screens */}
          <button 
            className="hidden sm:flex w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-slate-700 items-center justify-center hover:bg-slate-800 transition-colors relative"
            aria-label="Bookmarks"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[8px] text-white">×</span>
            </span>
          </button>

          {/* Speaker/Volume Icon - Hide on very small screens */}
          <button 
            className="hidden sm:flex w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-slate-700 items-center justify-center hover:bg-slate-800 transition-colors"
            aria-label="Toggle sound"
          >
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </button>

          {/* Wallet/Currency Button - Responsive sizing */}
          <button 
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-700 border border-slate-600 rounded-full text-white text-xs sm:text-sm font-medium hover:bg-slate-600 transition-colors"
            aria-label="Wallet balance"
          >
            <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">1</span>
            <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
              <Image
                src="/bnb-fill.svg"
                alt="BNB"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="hidden xs:inline">0</span>
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* Three Column Layout */}
      <div
  className="
    flex-1
    min-h-0
    px-2 sm:px-4 pb-4

    /* default - allow column scrolling */
    overflow-hidden

    /* ONLY between 1024px–1320px */
    min-[1024px]:max-[1320px]:overflow-x-auto
    min-[1024px]:max-[1320px]:overflow-y-hidden
    scrollbar-hide
    scroll-smooth
  "
>


        {isLoading ? (
          <div className="flex flex-col lg:flex-row h-full gap-2 lg:gap-0 min-[1024px]:max-[1310px]:w-max">
            {[1, 2, 3].map((col, index) => (
              <div key={col} className="flex-1 flex flex-col">
                {index > 0 && <div className="hidden lg:block w-px bg-slate-700 flex-shrink-0" />}
                <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-lg p-2 sm:p-4">
                  <Skeleton height={40} className="mb-4" />
                  {skeletonArray.slice(0, 5).map((_, i) => (
                    <Skeleton key={i} height={120} className="mb-2" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row h-full min-h-0 gap-2 lg:gap-0 items-stretch">
            {/* NEW PAIRS Column */}
            <div className={cn(
              "flex-1 min-w-0 min-h-0 bg-slate-900/50 overflow-hidden flex-col",
              "h-full lg:h-full",
              "lg:border-r lg:border-slate-700",
              // Show only selected column on mobile, all on desktop
              selectedColumn === 'new' ? "flex" : "hidden lg:flex",
            )}>
              <div className="bg-slate-800 border-b border-slate-700 px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0 ">
                <div className="flex items-center justify-between gap-2">
                  {/* Column Selector Dropdown - Mobile Only */}
                  <div className="relative lg:hidden" ref={columnDropdownRef}>
                    <button
                      onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                      className="text-sm sm:text-base font-bold text-white whitespace-nowrap flex items-center gap-2 hover:opacity-80 transition-opacity"
                      aria-label="Select column"
                      aria-expanded={showColumnDropdown}
                      aria-haspopup="menu"
                    >
                      {selectedColumn === 'new' && 'New Pairs'}
                      {selectedColumn === 'final_stretch' && 'Final Stretch'}
                      {selectedColumn === 'migrated' && 'Migrated'}
                      <ChevronDown className={cn("w-4 h-4 transition-transform", showColumnDropdown && "rotate-180")} />
                    </button>
                    {showColumnDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
                        <button
                          onClick={() => {
                            setSelectedColumn('new');
                            setShowColumnDropdown(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2 text-left text-sm transition-colors",
                            selectedColumn === 'new' 
                              ? 'bg-blue-600 text-white' 
                              : 'text-white hover:bg-slate-800'
                          )}
                        >
                          New Pairs
                        </button>
                        <button
                          onClick={() => {
                            setSelectedColumn('final_stretch');
                            setShowColumnDropdown(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2 text-left text-sm transition-colors",
                            selectedColumn === 'final_stretch' 
                              ? 'bg-blue-600 text-white' 
                              : 'text-white hover:bg-slate-800'
                          )}
                        >
                          Final Stretch
                        </button>
                        <button
                          onClick={() => {
                            setSelectedColumn('migrated');
                            setShowColumnDropdown(false);
                          }}
                          className={cn(
                            "w-full px-4 py-2 text-left text-sm transition-colors",
                            selectedColumn === 'migrated' 
                              ? 'bg-blue-600 text-white' 
                              : 'text-white hover:bg-slate-800'
                          )}
                        >
                          Migrated
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Desktop Header - Always visible */}
                  <h2 className="hidden lg:block text-sm sm:text-base font-bold text-white whitespace-nowrap">New Pairs</h2>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Interactive Elements */}
                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-900 rounded-lg flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="text-xs text-white whitespace-nowrap">0</span>
                      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                        <Image src="/bnb-fill.svg" alt="BNB" width={14} height={14} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, new: 'P1' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.new === 'P1' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P1
                        </button>
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, new: 'P2' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.new === 'P2' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P2
                        </button>
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, new: 'P3' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.new === 'P3' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P3
                        </button>
                      </div>
                    </div>
                    <button
                    onClick={() => {
                      setActiveFilterColumn('new');
                      setOpenFilter(true);
                    }}
                    aria-label="Filter New Pairs"
                  >
                    <Filter className="w-4 h-4 text-white" />
                  </button>
                  <div className="min-[360px]:block hidden">
                    <Sorting />
                  </div>

                  </div>
                </div>
              </div>
              <div
  className={cn(
    "divide-y divide-slate-800/50 overflow-y-auto flex-1 min-h-0",
  )}
>

                {groupedTokens.new.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No new pairs</div>
                ) : (
                  groupedTokens.new.map((token) => (
                    <TokenRow key={token.id} token={token} />
                  ))
                )}
              </div>
            </div>

            {/* Separator Line */}
            <div className="hidden lg:block w-px bg-slate-700 flex-shrink-0" />

            {/* FINAL STRETCH Column */}
            <div className={cn(
              "flex-1 min-w-0 min-h-0 bg-slate-900/50 overflow-hidden flex-col",
              "h-full lg:h-full",
              "lg:border-r lg:border-slate-700",
              // Show only selected column on mobile, all on desktop
              selectedColumn === 'final_stretch' ? "flex" : "hidden lg:flex",
            )}>
              <div className="bg-slate-800 border-b border-slate-700 px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white whitespace-nowrap">Final Stretch</h2>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Interactive Elements */}
                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-900 rounded-lg flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="text-xs text-white whitespace-nowrap">0</span>
                      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                        <Image src="/bnb-fill.svg" alt="BNB" width={14} height={14} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, final_stretch: 'P1' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.final_stretch === 'P1' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P1
                        </button>
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, final_stretch: 'P2' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.final_stretch === 'P2' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P2
                        </button>
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, final_stretch: 'P3' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.final_stretch === 'P3' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P3
                        </button>
                      </div>
                    </div>
                    <button
                  onClick={() => {
                    setActiveFilterColumn('final_stretch');
                    setOpenFilter(true);
                  }}
                  className="p-1 text-white hover:text-slate-300 transition-colors flex-shrink-0"
                  aria-label="Filter Final Stretch"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <div className="min-[361px]:block hidden">
                  <Sorting />
                </div>

                  </div>
                </div>
              </div>
              <div
  className={cn(
    "divide-y divide-slate-800/50 overflow-y-auto flex-1 min-h-0",
  )}
>

                {groupedTokens.final_stretch.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No final stretch tokens</div>
                ) : (
                  groupedTokens.final_stretch.map((token) => (
                    <TokenRow key={token.id} token={token} />
                  ))
                )}
              </div>
            </div>

            {/* Separator Line */}
            <div className="hidden lg:block w-px bg-slate-700 flex-shrink-0" />

            {/* MIGRATED Column */}
            <div className={cn(
              "flex-1 min-w-0 min-h-0 bg-slate-900/50 overflow-hidden flex-col",
              "h-full lg:h-full",
              // Show only selected column on mobile, all on desktop
              selectedColumn === 'migrated' ? "flex" : "hidden lg:flex",
            )}>
              <div className="bg-slate-800 border-b border-slate-700 px-2 sm:px-4 py-2 sm:py-3 flex-shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white whitespace-nowrap">Migrated</h2>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Interactive Elements */}
                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-900 rounded-lg flex-shrink-0">
                      <Zap className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="text-xs text-white whitespace-nowrap">0</span>
                      <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                        <Image src="/bnb-fill.svg" alt="BNB" width={14} height={14} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex items-center gap-1 ml-1 flex-shrink-0">
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, migrated: 'P1' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.migrated === 'P1' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P1
                        </button>
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, migrated: 'P2' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.migrated === 'P2' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P2
                        </button>
                        <button
                          onClick={() => setSelectedPeriod({ ...selectedPeriod, migrated: 'P3' })}
                          className={cn(
                            'px-1.5 py-0.5 text-[10px] font-medium rounded whitespace-nowrap',
                            selectedPeriod.migrated === 'P3' ? 'bg-blue-600 text-white' : 'text-white'
                          )}
                        >
                          P3
                        </button>
                      </div>
                    </div>
                    <button
                    onClick={() => {
                      setActiveFilterColumn('migrated');
                      setOpenFilter(true);
                    }}
                    className="p-1 text-white hover:text-slate-300 transition-colors flex-shrink-0"
                    aria-label="Filter Migrated"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  <div className="min-[361px]:block hidden">
                    <Sorting />
                  </div>

                  </div>
                </div>
              </div>
              <div
  className={cn(
    "divide-y divide-slate-800/50 overflow-y-auto flex-1 min-h-0",
  )}
>

                {groupedTokens.migrated.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No migrated tokens</div>
                ) : (
                  groupedTokens.migrated.map((token) => (
                    <TokenRow key={token.id} token={token} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
            <FilterModal
        open={openFilter}
        status={activeFilterColumn}
        onOpenChange={setOpenFilter}
        onApplyFilters={(filters) => {
          console.log(
            'APPLIED FILTERS FOR',
            activeFilterColumn,
            filters
          );
        }}
      />


      {/* Token Details Dialog */}
      <TokenDetailsDialog />
    </div>
  );
});
