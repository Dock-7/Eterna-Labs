/**
 * Skeleton loading component with shimmer effect
 */

import { memo } from 'react';
import { cn } from '@/src/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton = memo(function Skeleton({
  className,
  width,
  height,
  rounded = 'md',
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'skeleton bg-slate-800 animate-pulse',
        roundedClasses[rounded],
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
      aria-label="Loading..."
    />
  );
});
