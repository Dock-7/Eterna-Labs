/**
 * Top navigation bar component matching Axiom Trade design
 */

'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { Search, Bell, Settings, ChevronDown, Crown } from 'lucide-react';
import { useAppSelector } from '@/src/hooks/useRedux';
import { isProOrHigher } from '@/src/lib/subscription';
import { SubscriptionModal } from '@/src/components/organisms/SubscriptionModal';
import { CountrySelector } from '@/src/components/molecules/CountrySelector';
import Link from 'next/link';

interface TopbarProps {
  className?: string;
}

export const Topbar = memo(function Topbar({ className }: TopbarProps) {
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const networkDropdownRef = useRef<HTMLDivElement>(null);
  const subscription = useAppSelector((state) => state.subscription.subscription);
  const isPro = isProOrHigher(subscription);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        networkDropdownRef.current &&
        !networkDropdownRef.current.contains(event.target as Node)
      ) {
        setShowNetworkDropdown(false);
      }
    };

    if (showNetworkDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showNetworkDropdown]);

  const navLinks = [
    { label: 'Discover', href: '#', active: false },
    { label: 'Pulse', href: '#', active: true },
    { label: 'Trackers', href: '#', active: false },
    { label: 'Perpetuals', href: '#', active: false },
    { label: 'Portfolio', href: '#', active: false },
    { label: 'Rewards', href: '#', active: false },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80',
        className
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-slate-100 whitespace-nowrap">AXIOM Pro</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors relative',
                  link.active
                    ? 'text-green-400'
                    : 'text-slate-400 hover:text-slate-100'
                )}
              >
                {link.label}
                {link.active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-400 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by token or CA..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Country Selector */}
            <CountrySelector />

            {/* Network Selector */}
            <div className="relative" ref={networkDropdownRef}>
              <button
                onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-yellow-400" />
                <span className="text-sm font-medium hidden sm:inline">BNB</span>
                <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', showNetworkDropdown && 'rotate-180')} />
              </button>
              {showNetworkDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => setShowNetworkDropdown(false)}
                    className="w-full px-4 py-2 text-left text-sm text-slate-100 hover:bg-slate-800"
                  >
                    BNB Chain
                  </button>
                  <button
                    onClick={() => setShowNetworkDropdown(false)}
                    className="w-full px-4 py-2 text-left text-sm text-slate-100 hover:bg-slate-800"
                  >
                    Ethereum
                  </button>
                  <button
                    onClick={() => setShowNetworkDropdown(false)}
                    className="w-full px-4 py-2 text-left text-sm text-slate-100 hover:bg-slate-800"
                  >
                    Polygon
                  </button>
                </div>
              )}
            </div>

            {/* Subscription Status / Upgrade */}
            {isPro ? (
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all"
              >
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">{subscription?.tier === 'enterprise' ? 'Enterprise' : 'Pro'}</span>
              </button>
            ) : (
              <Link
                href="/pricing"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Get started
              </Link>
            )}

            {/* Deposit Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/20">
              Deposit
            </button>

            {/* Icons */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 cursor-pointer hover:opacity-80 transition-opacity" />
              <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="relative group">
                <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <a
                    href="/subscription"
                    className="block px-4 py-2 text-sm text-slate-100 hover:bg-slate-800"
                  >
                    Subscription
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-100 hover:bg-slate-800"
                  >
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal} />

      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-slate-800 px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap',
                link.active
                  ? 'text-green-400 bg-green-400/10'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
});
