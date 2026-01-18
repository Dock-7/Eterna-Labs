/**
 * Price change pill component with color transitions
 */

'use client';

import { memo, useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { formatPercentage } from '@/src/lib/api';

interface PriceChangePillProps {
  value: number;
  className?: string;
  showSign?: boolean;
}

export const PriceChangePill = memo(function PriceChangePill({
  value,
  className,
  showSign = true,
}: PriceChangePillProps) {
  const [flashClass, setFlashClass] = useState<string>('');
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (prevValue !== value) {
      const isIncrease = value > prevValue;
      setFlashClass(isIncrease ? 'price-flash--up' : 'price-flash--down');
      setPrevValue(value);

      // Clear flash after animation
      const timeout = setTimeout(() => setFlashClass(''), 300);
      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  const isPositive = value >= 0;
  const displayValue = showSign ? formatPercentage(value) : `${Math.abs(value).toFixed(2)}%`;

  return (
    <span
      className={cn(
        'price-flash inline-flex items-center px-2 py-0.5 text-xs font-medium transition-all duration-300',
        isPositive
          ? 'text-green-400 bg-green-400/10'
          : 'text-red-400 bg-red-400/10',
        flashClass,
        className
      )}
    >
      {displayValue}
    </span>
  );
});
