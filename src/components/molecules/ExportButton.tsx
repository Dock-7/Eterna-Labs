/**
 * Export button component (Pro feature)
 */

'use client';

import { memo, useCallback } from 'react';
import { Download } from 'lucide-react';
import { useAppSelector } from '@/src/hooks/useRedux';
import { isProOrHigher } from '@/src/lib/subscription';
import { ProGate } from './ProGate';

interface ExportButtonProps {
  onExport?: () => void;
  className?: string;
}

export const ExportButton = memo(function ExportButton({
  onExport,
  className,
}: ExportButtonProps) {
  const subscription = useAppSelector((state) => state.subscription.subscription);
  const hasAccess = isProOrHigher(subscription);
  const tokens = useAppSelector((state) => state.tokens.filteredTokens);

  const handleExport = useCallback(() => {
    if (!hasAccess) return;

    // Export tokens to CSV
    const headers = ['Symbol', 'Name', 'Price', '24h Change %', 'Volume', 'Market Cap', 'Status', 'Chain'];
    const rows = tokens.map((token) => [
      token.symbol,
      token.name,
      token.price.toFixed(2),
      token.priceChangePercent24h.toFixed(2),
      token.volume24h.toFixed(2),
      token.marketCap.toFixed(2),
      token.status,
      token.chain,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `axiom-tokens-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onExport?.();
  }, [hasAccess, tokens, onExport]);

  const button = (
    <button
      onClick={handleExport}
      disabled={!hasAccess}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );

  if (hasAccess) {
    return button;
  }

  return (
    <ProGate feature="export" showBadge={false}>
      {button}
    </ProGate>
  );
});
