/**
 * Column group component for table headers
 */

import { memo, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface ColumnGroupProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

export const ColumnGroup = memo(function ColumnGroup({
  children,
  className,
  sticky = false,
}: ColumnGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50 border-b border-slate-800',
        sticky && 'sticky top-0 z-10',
        className
      )}
    >
      {children}
    </div>
  );
});
