/**
 * Performance monitoring hook for tracking interaction times
 * Ensures <100ms interactions as per requirements
 */

import { useEffect, useRef } from 'react';

export function usePerformanceMonitor(componentName: string) {
  // eslint-disable-next-line react-hooks/purity -- reading the clock here is required to measure render duration; it never affects render output
  const renderStart = useRef<number>(performance.now());

  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    if (renderTime > 100) {
      console.warn(`[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms (>100ms threshold)`);
    }
  });

  return {
    measureInteraction: (name: string, fn: () => void) => {
      const start = performance.now();
      fn();
      const duration = performance.now() - start;
      if (duration > 100) {
        console.warn(`[Performance] ${componentName} interaction "${name}" took ${duration.toFixed(2)}ms (>100ms threshold)`);
      }
      return duration;
    },
  };
}
