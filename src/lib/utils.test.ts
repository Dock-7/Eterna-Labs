import { describe, expect, it, vi } from 'vitest';
import { cn, debounce, throttle } from './utils';

describe('cn', () => {
  it('merges class names and drops falsy values', () => {
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c');
  });

  it('resolves conflicting Tailwind classes to the last one', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});

describe('debounce', () => {
  it('only invokes the wrapped function once after the wait elapses', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('passes the latest arguments through', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced('first');
    debounced('second');
    vi.advanceTimersByTime(50);

    expect(fn).toHaveBeenCalledWith('second');
    vi.useRealTimers();
  });
});

describe('throttle', () => {
  it('invokes immediately then ignores calls within the limit window', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
