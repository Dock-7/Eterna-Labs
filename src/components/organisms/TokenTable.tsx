/**
 * Main token table component with three columns (NEW PAIRS, FINAL STRETCH, MIGRATED)
 */

'use client';

import { memo, useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setTokens } from '@/src/store/tokenSlice';
import { useTokensQuery } from '@/src/hooks/useTokensQuery';
import { useWsMock } from '@/src/hooks/useWsMock';
import { selectFilteredTokens, selectTokenCount } from '@/src/store/selectors';
import { TokenRow } from './TokenRow';
import { Skeleton } from '@/src/components/atoms/Skeleton';
import { FilterBar } from '@/src/components/molecules/FilterBar';
import { AdvancedFilters } from '@/src/components/molecules/AdvancedFilters';
import { SortPopover } from '@/src/components/molecules/SortPopover';
import { ExportButton } from '@/src/components/molecules/ExportButton';
import { TokenDetailsDialog } from './TokenDetailsDialog';
import { TokenStatus } from '@/src/lib/types';

export const TokenTable = memo(function TokenTable() {
  const dispatch = useAppDispatch();
  const { data: tokens, isLoading, error } = useTokensQuery();
  // Use optimized selectors
  const filteredTokens = useAppSelector(selectFilteredTokens);
  const tokenCount = useAppSelector(selectTokenCount);

  // Update Redux store when tokens are fetched
  useEffect(() => {
    if (tokens) {
      dispatch(setTokens(tokens));
    }
  }, [tokens, dispatch]);

  // Start WebSocket mock for real-time updates
  useWsMock(tokens || []);

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
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Pulse</h1>
            <p className="text-slate-400 text-sm">Axiom Trade token discovery - demo</p>
          </div>
          <div className="text-sm text-slate-400">
            {isLoading ? 'Loading...' : `Showing ${tokenCount} of ${tokens?.length || 0} tokens`}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
            <FilterBar />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
              <div className="text-sm text-slate-400">
                {isLoading ? 'Loading...' : `Showing ${tokenCount} of ${tokens?.length || 0} tokens`}
              </div>
              <div className="flex items-center gap-3">
                <ExportButton />
                <SortPopover />
              </div>
            </div>
          </div>
          
          {/* Advanced Filters (Pro) */}
          <AdvancedFilters />
        </div>
      </div>

      {/* Three Column Layout */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((col) => (
            <div key={col} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <Skeleton height={40} className="mb-4" />
              {skeletonArray.slice(0, 5).map((_, i) => (
                <Skeleton key={i} height={120} className="mb-2" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* NEW PAIRS Column */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-blue-400 uppercase">New Pairs</h2>
                <span className="text-xs text-slate-400">Bonding: 19.80%</span>
              </div>
            </div>
            <div className="divide-y divide-slate-800/50">
              {groupedTokens.new.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No new pairs</div>
              ) : (
                groupedTokens.new.map((token) => (
                  <TokenRow key={token.id} token={token} />
                ))
              )}
            </div>
          </div>

          {/* FINAL STRETCH Column */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-orange-500/20 border-b border-orange-500/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-orange-400 uppercase">Final Stretch</h2>
                <span className="text-xs text-slate-400">Bonding: 19.80%</span>
              </div>
            </div>
            <div className="divide-y divide-slate-800/50">
              {groupedTokens.final_stretch.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">No final stretch tokens</div>
              ) : (
                groupedTokens.final_stretch.map((token) => (
                  <TokenRow key={token.id} token={token} />
                ))
              )}
            </div>
          </div>

          {/* MIGRATED Column */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-purple-500/20 border-b border-purple-500/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-purple-400 uppercase">Migrated</h2>
                <span className="text-xs text-slate-400">Bonding: 19.80%</span>
              </div>
            </div>
            <div className="divide-y divide-slate-800/50">
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

      {/* Token Details Dialog */}
      <TokenDetailsDialog />
    </div>
  );
});
