/**
 * Pro gate component - shows upgrade prompt for pro features
 */

'use client';

import { memo, ReactNode, useState } from 'react';
import { useAppSelector } from '@/src/hooks/useRedux';
import { isProOrHigher } from '@/src/lib/subscription';
import { SubscriptionModal } from '@/src/components/organisms/SubscriptionModal';
import { ProBadge } from './ProBadge';
import { Lock } from 'lucide-react';

interface ProGateProps {
  children: ReactNode;
  feature: string;
  showBadge?: boolean;
  className?: string;
}

export const ProGate = memo(function ProGate({
  children,
  feature,
  showBadge = true,
  className,
}: ProGateProps) {
  const subscription = useAppSelector((state) => state.subscription.subscription);
  const [showModal, setShowModal] = useState(false);
  const hasAccess = isProOrHigher(subscription);

  if (hasAccess) {
    return (
      <>
        {showBadge && (
          <div className="inline-flex items-center gap-2">
            {children}
            <ProBadge size="sm" />
          </div>
        )}
        {!showBadge && children}
      </>
    );
  }

  return (
    <>
      <div
        className={`relative group cursor-pointer ${className}`}
        onClick={() => setShowModal(true)}
      >
        <div className="opacity-50 pointer-events-none">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col items-center gap-2 p-4">
            <Lock className="w-8 h-8 text-yellow-400" />
            <span className="text-sm font-semibold text-slate-100">Pro Feature</span>
            <span className="text-xs text-slate-400 text-center">
              Upgrade to Pro to unlock this feature
            </span>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
      <SubscriptionModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
});
