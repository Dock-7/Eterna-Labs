/**
 * Token details dialog/modal component using Radix UI
 */

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { memo, useCallback } from 'react';
import { Token } from '@/src/lib/types';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { setSelectedToken } from '@/src/store/tokenSlice';
import { PriceChangePill } from '@/src/components/molecules/PriceChangePill';
import { TokenBadges } from '@/src/components/molecules/TokenBadges';
import { Sparkline } from '@/src/components/molecules/Sparkline';
import { formatCurrency, formatNumber, formatPercentage } from '@/src/lib/api';
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
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold text-slate-100 mb-2">
                {selectedToken.name}
              </Dialog.Title>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-slate-300">{selectedToken.symbol}</span>
                <TokenBadges status={selectedToken.status} chain={selectedToken.chain} />
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Price Section */}
          <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-slate-100">
                {formatCurrency(selectedToken.price)}
              </span>
              <PriceChangePill value={selectedToken.priceChangePercent24h} />
            </div>
            <div className="text-sm text-slate-400">
              24h Change: {formatCurrency(selectedToken.priceChange24h)} (
              {formatPercentage(selectedToken.priceChangePercent24h)})
            </div>
          </div>

          {/* Sparkline */}
          <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">24h Price Trend</h3>
            <div className="w-full" style={{ minHeight: '100px' }}>
              <Sparkline
                data={selectedToken.sparkline}
                isPositive={isPositive}
                width={600}
                height={100}
                className="w-full"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">24h Volume</div>
              <div className="text-lg font-semibold text-slate-100">
                {formatCurrency(selectedToken.volume24h)}
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Market Cap</div>
              <div className="text-lg font-semibold text-slate-100">
                {formatCurrency(selectedToken.marketCap)}
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Liquidity</div>
              <div className="text-lg font-semibold text-slate-100">
                {formatCurrency(selectedToken.liquidity)}
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Chain</div>
              <div className="text-lg font-semibold text-slate-100">{selectedToken.chain}</div>
            </div>
          </div>

          {/* Pair Address */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-xs text-slate-400 mb-2">Pair Address</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm text-slate-300 font-mono break-all">
                {selectedToken.pairAddress}
              </code>
              <a
                href={`https://etherscan.io/address/${selectedToken.pairAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="View on Etherscan"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
