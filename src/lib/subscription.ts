/**
 * Subscription types and utilities
 */

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface Subscription {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt?: string;
  features: string[];
}

export const SUBSCRIPTION_FEATURES: Record<SubscriptionTier, string[]> = {
  free: [
    'Basic token discovery',
    'Standard filters',
    'Basic sorting',
  ],
  pro: [
    'Advanced token discovery',
    'Real-time price alerts',
    'Advanced filters & sorting',
    'Priority support',
    'Export data',
    'Custom watchlists',
    'Advanced analytics',
    'API access',
  ],
  enterprise: [
    'All Pro features',
    'White-label solution',
    'Dedicated support',
    'Custom integrations',
    'SLA guarantee',
  ],
};

export const SUBSCRIPTION_PLANS = {
  pro: {
    name: 'Pro',
    price: 29.99,
    period: 'month',
    features: SUBSCRIPTION_FEATURES.pro,
  },
  enterprise: {
    name: 'Enterprise',
    price: 299.99,
    period: 'month',
    features: SUBSCRIPTION_FEATURES.enterprise,
  },
};

/**
 * Check if user has access to a feature
 */
export function hasFeatureAccess(
  subscription: Subscription | null,
  feature: string
): boolean {
  if (!subscription || !subscription.isActive) {
    return false;
  }
  return subscription.features.includes(feature);
}

/**
 * Check if user is pro or higher
 */
export function isProOrHigher(subscription: Subscription | null): boolean {
  if (!subscription || !subscription.isActive) {
    return false;
  }
  return subscription.tier === 'pro' || subscription.tier === 'enterprise';
}
