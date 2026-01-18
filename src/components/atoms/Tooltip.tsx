/**
 * Tooltip component using Radix UI
 */

'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { memo, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
  className?: string;
}

export const Tooltip = memo(function Tooltip({
  children,
  content,
  side = 'top',
  delayDuration = 300,
  className,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={5}
            className={cn(
              'z-50 rounded-md bg-slate-900 px-3 py-1.5 text-sm text-slate-100 shadow-lg',
              'border border-slate-700',
              'animate-in fade-in-0 zoom-in-95',
              className
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-slate-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
});
