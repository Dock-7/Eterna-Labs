/**
 * Pricing page similar to TradingView
 */

'use client';

import { useState } from 'react';
import { useAppSelector } from '@/src/hooks/useRedux';
import { SUBSCRIPTION_PLANS } from '@/src/lib/subscription';
import { getDefaultCountry } from '@/src/lib/countries';
import { Check, Crown, Zap, Rocket, Sparkles } from 'lucide-react';
import Link from 'next/link';

type BillingCycle = 'monthly' | 'annually';

interface PricingPlan {
  name: string;
  description: string;
  icon: typeof Crown;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
  trialDays: number;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Essential',
    description: 'Perfect for beginners',
    icon: Zap,
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    features: [
      'Basic token discovery',
      'Standard filters',
      'Basic sorting',
      'Real-time price updates',
      '10 price alerts',
      'Email support',
    ],
    trialDays: 30,
  },
  {
    name: 'Plus',
    description: 'For active traders',
    icon: Crown,
    monthlyPrice: 19.99,
    annualPrice: 15.99,
    features: [
      'Advanced token discovery',
      'Advanced filters & sorting',
      '100 price alerts',
      'Custom watchlists',
      'Export data (CSV)',
      'Priority email support',
      'Advanced analytics',
    ],
    popular: true,
    trialDays: 30,
  },
  {
    name: 'Premium',
    description: 'For professional traders',
    icon: Rocket,
    monthlyPrice: 39.99,
    annualPrice: 31.99,
    features: [
      'All Plus features',
      '400 price alerts',
      'API access',
      'Webhook integrations',
      'Advanced charting',
      'Portfolio tracking',
      'Priority support',
      'Custom integrations',
    ],
    trialDays: 30,
  },
  {
    name: 'Ultimate',
    description: 'For institutions',
    icon: Sparkles,
    monthlyPrice: 99.99,
    annualPrice: 79.99,
    features: [
      'All Premium features',
      'Unlimited price alerts',
      'White-label solution',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom development',
      '24/7 phone support',
      'On-premise deployment',
    ],
    trialDays: 7,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually');
  const subscription = useAppSelector((state) => state.subscription.subscription);
  const country = getDefaultCountry();

  const formatPrice = (price: number) => {
    if (country.currency === 'INR') {
      return `₹${Math.round(price * 83)}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const calculateAnnualSavings = (monthlyPrice: number, annualPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const annualTotal = annualPrice * 12;
    return monthlyTotal - annualTotal;
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-100 mb-4">
            Plans for every level of ambition
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the perfect plan for your trading journey
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all
              ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }
            `}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all relative
              ${
                billingCycle === 'annually'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }
            `}
          >
            Annually
            {billingCycle === 'annually' && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save up to 20%
              </span>
            )}
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            const savings = billingCycle === 'annually'
              ? calculateAnnualSavings(plan.monthlyPrice, plan.annualPrice)
              : 0;
            const isCurrentPlan =
              subscription?.tier === plan.name.toLowerCase() && subscription?.isActive;

            return (
              <div
                key={plan.name}
                className={`
                  relative bg-slate-900/80 backdrop-blur border rounded-2xl p-6
                  ${plan.popular ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-slate-800'}
                  ${isCurrentPlan ? 'ring-2 ring-green-500/50' : ''}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      CURRENT PLAN
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-slate-100">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-100">
                      {formatPrice(price)}
                    </span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  {billingCycle === 'annually' && (
                    <div className="mt-2 text-sm text-slate-400">
                      billed annually
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-sm text-green-400">
                      <span>Save {formatPrice(savings)} a year</span>
                      <span className="text-slate-500 cursor-help" title="Annual billing discount">
                        ℹ️
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href={isCurrentPlan ? '#' : `/subscription?plan=${plan.name.toLowerCase()}`}
                  className={`
                    block w-full text-center px-6 py-3 rounded-lg font-semibold mb-4 transition-all
                    ${
                      isCurrentPlan
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed pointer-events-none'
                        : plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700'
                    }
                  `}
                >
                  {isCurrentPlan
                    ? 'Current Plan'
                    : `Try free for ${plan.trialDays} days`}
                </Link>

                {!isCurrentPlan && (
                  <div className="text-center text-xs text-slate-500 mb-6">
                    or{' '}
                    <button className="text-blue-400 hover:text-blue-300 underline">
                      skip trial and pay now
                    </button>
                  </div>
                )}

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-4">
            All plans include a free trial. Cancel anytime. No credit card required for trial.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span>✓ Secure payment</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
