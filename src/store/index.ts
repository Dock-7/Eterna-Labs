/**
 * Redux store configuration
 */

import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import subscriptionReducer from './subscriptionSlice';

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
