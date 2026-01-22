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

    // Simulate WebSocket updates every 1-3 seconds
    const updateInterval = () => {
      const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
      
      // More dramatic price changes to ensure percentage crosses thresholds
      const priceChange = (Math.random() - 0.5) * 0.2; // ±10% change for more volatility
      const newPrice = Math.max(0.01, randomToken.price * (1 + priceChange));
      
      // Make priceChangePercent24h oscillate around 0 to cross 50% threshold
      const basePriceChange = (Math.random() - 0.5) * 100; // ±50% range
      const priceChange24h = basePriceChange;
      const priceChangePercent24h = basePriceChange;

      // Simulate volume, marketCap, and liquidity changes with more variation
      // Volume changes more dramatically
      const volumeChange = (Math.random() - 0.5) * 0.4; // ±20% change for big swings
      const newVolume = Math.max(1000, randomToken.volume24h * (1 + volumeChange));
      
      // Market cap changes independently with variation
      const marketCapChange = (Math.random() - 0.5) * 0.3; // ±15% change
      const newMarketCap = Math.max(10000, randomToken.marketCap * (1 + marketCapChange));
      
      // Liquidity changes with significant variation
      const liquidityChange = (Math.random() - 0.5) * 0.35; // ±17.5% change
      const newLiquidity = Math.max(5000, randomToken.liquidity * (1 + liquidityChange));

      const update: PriceUpdate = {
        tokenId: randomToken.id,
        price: newPrice,
        priceChange24h,
        priceChangePercent24h,
        volume24h: newVolume,
        marketCap: newMarketCap,
        liquidity: newLiquidity,
        timestamp: Date.now(),
      };

      dispatch(updatePrice(update));
    };

    // Initial update after 0.5 seconds
    const initialTimeout = setTimeout(() => {
      updateInterval();
      // Then update every 1-3 seconds for more frequent updates
      intervalRef.current = setInterval(updateInterval, 1000 + Math.random() * 2000);
    }, 500);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens, dispatch]);
}
