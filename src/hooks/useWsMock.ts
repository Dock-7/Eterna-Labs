/**
 * Mock WebSocket hook for real-time price updates
 */

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store';
import { updatePrice } from '@/src/store/tokenSlice';
import { Token, PriceUpdate } from '@/src/lib/types';

/**
 * Mock WebSocket hook that simulates real-time price updates
 */
export function useWsMock(tokens: Token[]) {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tokens.length === 0) return;

    // Simulate WebSocket updates every 2-5 seconds
    const updateInterval = () => {
      const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
      const priceChange = (Math.random() - 0.5) * 0.1; // ±5% change
      const newPrice = Math.max(0.01, randomToken.price * (1 + priceChange));
      const priceChange24h = randomToken.priceChange24h + priceChange;
      const priceChangePercent24h = (priceChange24h / newPrice) * 100;

      const update: PriceUpdate = {
        tokenId: randomToken.id,
        price: newPrice,
        priceChange24h,
        priceChangePercent24h,
        timestamp: Date.now(),
      };

      dispatch(updatePrice(update));
    };

    // Initial update after 1 second
    const initialTimeout = setTimeout(() => {
      updateInterval();
      // Then update every 2-5 seconds
      intervalRef.current = setInterval(updateInterval, 2000 + Math.random() * 3000);
    }, 1000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens, dispatch]);
}
