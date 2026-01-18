/**
 * Subscription management page
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/hooks/useRedux';
import { cancelSubscription, subscribe } from '@/src/store/subscriptionSlice';
import { SubscriptionModal } from '@/src/components/organisms/SubscriptionModal';
import { ProBadge } from '@/src/components/molecules/ProBadge';
import { SUBSCRIPTION_FEATURES, SubscriptionTier } from '@/src/lib/subscription';
import { Crown, Check, X, Calendar } from 'lucide-react';

function SubscriptionContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const subscription = useAppSelector((state) => state.subscription.subscription);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) {
      // Map plan names to subscription tiers
      const planMap: Record<string, SubscriptionTier> = {
        essential: 'pro', // Map essential to pro for demo
        plus: 'pro',
        premium: 'pro',
        ultimate: 'enterprise',
      };
      const tier = planMap[plan.toLowerCase()];
      if (tier && (!subscription || !subscription.isActive)) {
        dispatch(subscribe(tier));
      }
      setShowUpgradeModal(true);
    }
  }, [searchParams, dispatch, subscription]);

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      dispatch(cancelSubscription());
    }
  };

  const isActive = subscription?.isActive;
  const expiresAt = subscription?.expiresAt
    ? new Date(subscription.expiresAt).toLocaleDateString()
    : null;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Subscription</h1>
          <p className="text-slate-400">Manage your subscription and billing</p>
        </div>

        {/* Current Plan */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                Current Plan
                {isActive && subscription?.tier !== 'free' && (
                  <ProBadge size="md" />
                )}
              </h2>
              <p className="text-slate-400">
                {subscription?.tier
                  ? subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)
                  : 'Free'}
              </p>
            </div>
            {isActive && subscription?.tier !== 'free' ? (
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Cancel Subscription
              </button>
            ) : (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Upgrade to Pro
              </button>
            )}
          </div>

          {isActive && expiresAt && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Renews on {expiresAt}</span>
            </div>
          )}

          {/* Features List */}
          {subscription?.features && subscription.features.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Your Features</h3>
              <ul className="space-y-2">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Available Plans */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pro Plan */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-slate-100">Pro</h3>
                <span className="ml-auto text-2xl font-bold text-slate-100">$29.99</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-2 mb-4">
                {SUBSCRIPTION_FEATURES.pro.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowUpgradeModal(true)}
                disabled={subscription?.tier === 'pro' && subscription?.isActive}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscription?.tier === 'pro' && subscription?.isActive
                  ? 'Current Plan'
                  : 'Upgrade to Pro'}
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-900/50 border-2 border-purple-500/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-slate-100">Enterprise</h3>
                <span className="ml-auto text-2xl font-bold text-slate-100">$299.99</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-2 mb-4">
                {SUBSCRIPTION_FEATURES.enterprise.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowUpgradeModal(true)}
                disabled={subscription?.tier === 'enterprise' && subscription?.isActive}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscription?.tier === 'enterprise' && subscription?.isActive
                  ? 'Current Plan'
                  : 'Upgrade to Enterprise'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <SubscriptionContent />
    </Suspense>
  );
}
