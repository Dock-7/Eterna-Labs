/**
 * Pro badge component to indicate pro features
 */

import { memo } from 'react';
import { Crown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProBadge = memo(function ProBadge({ className, size = 'sm' }: ProBadgeProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs px-1.5 py-0.5',
    md: 'w-5 h-5 text-sm px-2 py-1',
    lg: 'w-6 h-6 text-base px-2.5 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border border-yellow-500/30 rounded-md',
        sizeClasses[size],
        className
      )}
    >
      <Crown className="w-3 h-3" />
      <span>PRO</span>
    </span>
  );
});
