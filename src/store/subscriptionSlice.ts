/**
 * Redux slice for subscription management
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subscription, SubscriptionTier } from '@/src/lib/subscription';

interface SubscriptionState {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: (() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('axiom_subscription');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  })(),
  isLoading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<Subscription | null>) => {
      state.subscription = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('axiom_subscription', JSON.stringify(action.payload));
        } else {
          localStorage.removeItem('axiom_subscription');
        }
      }
    },
    subscribe: (state, action: PayloadAction<SubscriptionTier>) => {
      const now = new Date();
      const expiresAt = new Date(now);
      expiresAt.setMonth(expiresAt.getMonth() + 1); // 1 month subscription

      state.subscription = {
        tier: action.payload,
        isActive: true,
        expiresAt: expiresAt.toISOString(),
        features: action.payload === 'pro' 
          ? ['Advanced token discovery', 'Real-time price alerts', 'Advanced filters & sorting', 'Priority support', 'Export data', 'Custom watchlists', 'Advanced analytics', 'API access']
          : ['All Pro features', 'White-label solution', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
      };

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('axiom_subscription', JSON.stringify(state.subscription));
      }
    },
    cancelSubscription: (state) => {
      if (state.subscription) {
        state.subscription.isActive = false;
        // Persist to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('axiom_subscription', JSON.stringify(state.subscription));
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSubscription, subscribe, cancelSubscription, setLoading, setError } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
