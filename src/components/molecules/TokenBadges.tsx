/**
 * Token status badges component
 */

import { memo } from 'react';
import { TokenStatus } from '@/src/lib/types';
import { cn } from '@/src/lib/utils';

interface TokenBadgesProps {
  status: TokenStatus;
  chain: string;
  className?: string;
}

const statusConfig: Record<TokenStatus, { label: string; className: string }> = {
  new: {
    label: 'New',
    className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  final_stretch: {
    label: 'Final Stretch',
    className: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
  migrated: {
    label: 'Migrated',
    className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
};

export const TokenBadges = memo(function TokenBadges({
  status,
  chain,
  className,
}: TokenBadgesProps) {
  const statusInfo = statusConfig[status];

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      <span
        className={cn(
          'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border',
          statusInfo.className
        )}
      >
        {statusInfo.label}
      </span>
      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800/50 text-slate-300">
        {chain}
      </span>
    </div>
  );
});
