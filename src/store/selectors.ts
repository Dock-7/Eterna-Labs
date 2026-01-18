/**
 * Optimized Redux selectors for performance
 * Using Reselect-style memoization to prevent unnecessary re-renders
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Token, TokenStatus } from '@/src/lib/types';

/**
 * Select filtered tokens with memoization
 */
export const selectFilteredTokens = createSelector(
  [(state: RootState) => state.tokens.filteredTokens],
  (tokens) => tokens
);

/**
 * Select tokens by status with memoization
 */
export const selectTokensByStatus = createSelector(
  [
    (state: RootState) => state.tokens.tokens,
    (_state: RootState, status: TokenStatus) => status,
  ],
  (tokens, status) => tokens.filter((token) => token.status === status)
);

/**
 * Select subscription status
 */
export const selectSubscription = createSelector(
  [(state: RootState) => state.subscription.subscription],
  (subscription) => subscription
);

/**
 * Select isPro status
 */
export const selectIsPro = createSelector(
  [selectSubscription],
  (subscription) => {
    if (!subscription || !subscription.isActive) return false;
    return subscription.tier === 'pro' || subscription.tier === 'enterprise';
  }
);

/**
 * Select token count
 */
export const selectTokenCount = createSelector(
  [(state: RootState) => state.tokens.filteredTokens],
  (tokens) => tokens.length
);
