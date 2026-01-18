/**
 * Token row component matching Axiom Trade design
 */

'use client';

import { memo, useCallback, useMemo } from 'react';
import { Token } from '@/src/lib/types';
import { useAppDispatch } from '@/src/hooks/useRedux';
import { setSelectedToken } from '@/src/store/tokenSlice';
import { PriceChangePill } from '@/src/components/molecules/PriceChangePill';
import { Tooltip } from '@/src/components/atoms/Tooltip';
import { formatCurrency, formatNumber } from '@/src/lib/api';
import { cn } from '@/src/lib/utils';
import { usePerformanceMonitor } from '@/src/hooks/usePerformance';

interface TokenRowProps {
  token: Token;
  isSelected?: boolean;
}

export const TokenRow = memo(function TokenRow({ token, isSelected }: TokenRowProps) {
  const dispatch = useAppDispatch();
  const { measureInteraction } = usePerformanceMonitor('TokenRow');

  const handleClick = useCallback(() => {
    measureInteraction('selectToken', () => {
      dispatch(setSelectedToken(token));
    });
  }, [dispatch, token, measureInteraction]);

  // Memoize formatted values to prevent recalculation
  const formattedPrice = useMemo(() => formatCurrency(token.price), [token.price]);
  const formattedMarketCap = useMemo(() => formatCurrency(token.marketCap), [token.marketCap]);
  const formattedVolume = useMemo(() => formatCurrency(token.volume24h), [token.volume24h]);
  
  // Generate a stable TX count based on token ID
  const txCount = useMemo(() => {
    const hash = token.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 2000) + 500;
  }, [token.id]);

  const tokenSymbol = useMemo(() => token.symbol.substring(0, 2).toUpperCase(), [token.symbol]);
  const tokenId = useMemo(() => token.id.split('-')[1] || '000', [token.id]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'px-4 py-3 cursor-pointer transition-all hover:bg-slate-800/30 border-b border-slate-800/30 last:border-b-0',
        isSelected && 'bg-blue-500/10'
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-start gap-3">
        {/* Token Icon Placeholder */}
        <div className="w-10 h-10 rounded-lg bg-slate-800 flex-shrink-0 flex items-center justify-center border border-slate-700">
          <span className="text-xs font-bold text-slate-400">
            {tokenSymbol}
          </span>
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-slate-100">{token.name}</span>
              <span className="text-xs text-slate-500 font-mono">
                {token.symbol.substring(0, 4).toUpperCase()}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">ID {tokenId}</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-500">MC </span>
              <span className="text-slate-300 font-medium">{formattedMarketCap}</span>
            </div>
            <div>
              <span className="text-slate-500">Vol </span>
              <span className="text-slate-300 font-medium">{formattedVolume}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500">TX </span>
              <span className="text-slate-300 font-medium">{txCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Price and Change */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-semibold text-slate-100">
              {formattedPrice}
            </span>
            <PriceChangePill value={token.priceChangePercent24h} />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle add BNB action
            }}
            className="px-3 py-1.5 text-xs font-medium bg-purple-600/20 text-purple-400 border border-purple-600/30 rounded-lg hover:bg-purple-600/30 transition-colors whitespace-nowrap"
          >
            + 0 BNB
          </button>
        </div>
      </div>
    </div>
  );
});
