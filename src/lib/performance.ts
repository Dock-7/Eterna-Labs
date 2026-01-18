/**
 * Performance utilities and optimizations
 * Ensures <100ms interactions and prevents layout shifts
 */

/**
 * Debounce function for expensive operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for frequent events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame throttle for smooth animations
 */
export function rafThrottle<T extends (...args: any[]) => any>(func: T): T {
  let rafId: number | null = null;
  return ((...args: Parameters<T>) => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  }) as T;
}

/**
 * Measure performance of a function
 */
export function measurePerformance<T>(
  name: string,
  fn: () => T,
  threshold: number = 100
): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  
  if (duration > threshold) {
    console.warn(`[Performance] ${name} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
  }
  
  return result;
}

/**
 * Prevent layout shift by reserving space
 */
export function reserveSpace(width: number, height: number): React.CSSProperties {
  return {
    width: `${width}px`,
    height: `${height}px`,
    minWidth: `${width}px`,
    minHeight: `${height}px`,
  };
}
