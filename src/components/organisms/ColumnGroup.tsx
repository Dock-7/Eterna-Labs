/**
 * Column group component for table headers
 */

'use client';

import { memo, ReactNode, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { Filter } from 'lucide-react';
import { FilterModal } from './FilterModal';
import { TokenStatus } from '@/src/lib/types';

interface ColumnGroupProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  status: TokenStatus;
}

export const ColumnGroup = memo(function ColumnGroup({
  children,
  className,
  sticky = false,
  status,
}: ColumnGroupProps) {

  // ✅ HOOK INSIDE COMPONENT
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div
      className={cn(
        `
        flex items-center
        gap-2
        px-3 py-3
        min-w-0
        text-xs font-semibold
        text-slate-400 uppercase tracking-wider
        bg-slate-900/50
        border-b border-slate-800
        `,
        sticky && 'sticky top-0 z-10',
        className
      )}
    >
      {/* Left side content (title / P1 P2 P3 etc.) */}
      {children}

      {/* Spacer to push filter icon to right */}
      <div className="flex-1" />

      {/* ✅ FILTER ICON (P3 ke right side) */}
      <button
        onClick={() => setOpenFilter(true)}
        className="
          w-7 h-7
          flex items-center justify-center
          rounded-md
          border border-slate-700
          text-slate-400
          hover:text-white
          hover:bg-slate-800
          transition-colors
        "
      >
        <Filter className="w-4 h-4" />
      </button>

      {/* ✅ FILTER MODAL */}
      <FilterModal
        open={openFilter}
        onOpenChange={setOpenFilter}
        status={status}
        onApplyFilters={(filters) => {
          console.log('APPLIED FILTERS:', filters);
        }}
      />
    </div>
  );
});
