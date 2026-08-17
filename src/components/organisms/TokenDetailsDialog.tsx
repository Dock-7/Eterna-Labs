/**
 * Token details dialog/modal component using Radix UI
 */

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setSelectedToken } from '@/src/store/tokenSlice';
import { TokenBadges } from '@/src/components/molecules/TokenBadges';
import { Sparkline } from '@/src/components/molecules/Sparkline';
import { formatCurrency, formatPercentage } from '@/src/lib/api';
import { cn } from '@/src/lib/utils';
import { X, ExternalLink } from 'lucide-react';

export const TokenDetailsDialog = memo(function TokenDetailsDialog() {
  const dispatch = useAppDispatch();
  const selectedToken = useAppSelector((state) => state.tokens.selectedToken);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        dispatch(setSelectedToken(null));
      }
    },
    [dispatch]
  );

  if (!selectedToken) return null;

  const isPositive = selectedToken.priceChangePercent24h >= 0;

  return (
    <Dialog.Root open={!!selectedToken} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 animate-in fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-1rem)] max-w-md max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <Dialog.Title className="text-lg sm:text-xl font-bold text-slate-100 mb-1">
                {selectedToken.name}
              </Dialog.Title>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-300">{selectedToken.symbol}</span>
                <TokenBadges status={selectedToken.status} chain={selectedToken.chain} />
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Price Section */}
          <div className="mb-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-100">
                {formatCurrency(selectedToken.price)}
              </span>
              <span className={cn(
                'text-xs font-medium',
                selectedToken.priceChangePercent24h >= 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {formatPercentage(selectedToken.priceChangePercent24h)}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              24h Change: {formatCurrency(selectedToken.priceChange24h)} (
              {formatPercentage(selectedToken.priceChangePercent24h)})
            </div>
          </div>

          {/* Sparkline - Real-time animated with axes */}
          <div className="mb-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 mb-2">24h Price Trend</h3>
            <div className="w-full relative" style={{ height: '120px' }}>
              <Sparkline
                data={selectedToken.sparkline}
                isPositive={isPositive}
                width={400}
                height={120}
                className="w-full"
                animate={true}
                animationInterval={800}
                showAxes={true}
                basePrice={selectedToken.price}
              />
            </div>
          </div>

          {/* Stats Grid - Compact */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-[10px] text-slate-400 mb-0.5">24h Volume</div>
              <div className="text-sm font-semibold text-slate-100">
                {formatCurrency(selectedToken.volume24h)}
              </div>
            </div>
            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-[10px] text-slate-400 mb-0.5">Market Cap</div>
              <div className="text-sm font-semibold text-slate-100">
                {formatCurrency(selectedToken.marketCap)}
              </div>
            </div>
            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-[10px] text-slate-400 mb-0.5">Liquidity</div>
              <div className="text-sm font-semibold text-slate-100">
                {formatCurrency(selectedToken.liquidity)}
              </div>
            </div>
            <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-[10px] text-slate-400 mb-0.5">Chain</div>
              <div className="text-sm font-semibold text-slate-100">{selectedToken.chain}</div>
            </div>
          </div>

          {/* Pair Address - Compact */}
          <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-[10px] text-slate-400 mb-1">Pair Address</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs text-slate-300 font-mono break-all line-clamp-1">
                {selectedToken.pairAddress}
              </code>
              <a
                href={`https://etherscan.io/address/${selectedToken.pairAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                aria-label="View on Etherscan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
