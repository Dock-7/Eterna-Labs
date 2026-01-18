/**
 * Subscription modal component for upgrading to Pro
 */

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { subscribe } from '@/src/store/subscriptionSlice';
import { SUBSCRIPTION_PLANS, SubscriptionTier } from '@/src/lib/subscription';
import { X, Check, Zap, Crown } from 'lucide-react';

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionModal = memo(function SubscriptionModal({
  open,
  onOpenChange,
}: SubscriptionModalProps) {
  const dispatch = useAppDispatch();
  const currentSubscription = useAppSelector((state) => state.subscription.subscription);

  const handleSubscribe = useCallback(
    (tier: SubscriptionTier) => {
      // In a real app, this would integrate with a payment provider
      // For demo purposes, we'll just set the subscription
      dispatch(subscribe(tier));
      onOpenChange(false);
    },
    [dispatch, onOpenChange]
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 animate-in fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <Dialog.Title className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                <Crown className="w-8 h-8 text-yellow-400" />
                Upgrade to Pro
              </Dialog.Title>
              <Dialog.Description className="text-slate-400">
                Unlock advanced features and get priority support
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Pro Plan */}
            <div className="relative p-6 bg-slate-800/50 border-2 border-blue-500/50 rounded-xl">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full">
                  POPULAR
                </span>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-100 mb-1">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-100">
                    ${SUBSCRIPTION_PLANS.pro.price}
                  </span>
                  <span className="text-slate-400">/{SUBSCRIPTION_PLANS.pro.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {SUBSCRIPTION_PLANS.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe('pro')}
                disabled={currentSubscription?.tier === 'pro' && currentSubscription?.isActive}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentSubscription?.tier === 'pro' && currentSubscription?.isActive
                  ? 'Current Plan'
                  : 'Subscribe to Pro'}
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="relative p-6 bg-slate-800/50 border-2 border-purple-500/50 rounded-xl">
              <div className="absolute top-4 right-4">
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-100 mb-1">Enterprise</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-100">
                    ${SUBSCRIPTION_PLANS.enterprise.price}
                  </span>
                  <span className="text-slate-400">/{SUBSCRIPTION_PLANS.enterprise.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {SUBSCRIPTION_PLANS.enterprise.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe('enterprise')}
                disabled={currentSubscription?.tier === 'enterprise' && currentSubscription?.isActive}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentSubscription?.tier === 'enterprise' && currentSubscription?.isActive
                  ? 'Current Plan'
                  : 'Subscribe to Enterprise'}
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-400">
                <p className="mb-1">
                  <strong className="text-slate-300">Note:</strong> This is a demo implementation.
                  In production, this would integrate with payment providers like Stripe, PayPal, or
                  crypto payment gateways.
                </p>
                <p>
                  Subscriptions are stored locally for demo purposes. Cancel anytime from your
                  account settings.
                </p>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
