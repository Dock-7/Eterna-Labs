/**
 * Top navigation bar component matching Eterna Labs design
 */

'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { Search, Bell, Settings, ChevronDown, Star, Wallet, User, LogOut, Rocket, Languages, TrendingUp, Menu, X, Eye, Gift, DollarSign, Globe } from 'lucide-react';
import { ExchangeModal } from '@/src/components/organisms/ExchangeModal';
import { CountrySelector } from '@/src/components/organisms/CountrySelector';
import { Tooltip } from '@/src/components/atoms/Tooltip';
import { getDefaultCountry, setStoredCountry, type Country } from '@/src/lib/countries';
import Image from "next/image";


interface TopbarProps {
  className?: string;
}

// Solana icon component - colorful gradient icon (Solana logo style with three horizontal bars)
const SolanaIcon = ({ className }: { className?: string }) => {
  const defaultSize = 'w-4 h-4';
  const finalClassName = className || defaultSize;
  return (
    <div className={cn('flex items-center justify-center', finalClassName)}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Three horizontal bars - Solana logo style */}
        <rect x="4" y="8" width="16" height="2" rx="1" fill="url(#solana-gradient)" />
        <rect x="4" y="11" width="16" height="2" rx="1" fill="url(#solana-gradient)" opacity="0.8" />
        <rect x="4" y="14" width="16" height="2" rx="1" fill="url(#solana-gradient)" opacity="0.6" />
        <defs>
          <linearGradient id="solana-gradient" x1="0" y1="0" x2="24" y2="0">
            <stop offset="0%" stopColor="#9945FF" />
            <stop offset="50%" stopColor="#14F195" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Dollar icon with gear overlay
const DollarIcon = ({ className }: { className?: string }) => {
  const defaultSize = 'w-4 h-4';
  const size = className || defaultSize;
  const isLarge = size.includes('w-6');
  const textSize = isLarge ? 'text-xs' : 'text-[10px]';
  const dotSize = isLarge ? 'w-2.5 h-2.5' : 'w-2 h-2';
  return (
    <div className="relative">
      <div className={cn('rounded-full bg-blue-500 flex items-center justify-center', size)}>
        <span className={cn('text-white font-bold', textSize)}>$</span>
      </div>
      <div className={cn('absolute -top-0.5 -right-0.5 rounded-full bg-teal-400 border border-slate-900', dotSize)} />
    </div>
  );
};

export const Topbar = memo(function Topbar({ className }: TopbarProps) {
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => getDefaultCountry());
  const networkDropdownRef = useRef<HTMLDivElement>(null);
  const walletDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        networkDropdownRef.current &&
        !networkDropdownRef.current.contains(event.target as Node)
      ) {
        setShowNetworkDropdown(false);
      }
      if (
        walletDropdownRef.current &&
        !walletDropdownRef.current.contains(event.target as Node)
      ) {
        setShowWalletDropdown(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    if (showNetworkDropdown || showWalletDropdown || showProfileDropdown || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showNetworkDropdown, showWalletDropdown, showProfileDropdown, showMobileMenu]);

  const navLinks = [
    { label: 'Pulse', href: '#', active: false },
    { label: 'Trackers', href: '#', active: false },
    { label: 'Perpetuals', href: '#', active: false },
    { label: 'Yield', href: '#', active: false },
    { label: 'Portfolio', href: '#', active: false },
    { label: 'Vision', href: '#', active: false },
    { label: 'Rewards', href: '#', active: false },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-black border-b border-slate-700/50',
        className
      )}
    >
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 max-w-[1920px] mx-auto">
          {/* Left Section - Logo, Name, and Navigation */}
          {/* Left Section - Logo + Scrollable Navigation */}
<div className="flex items-center gap-2 sm:gap-5 flex-10 min-w-0">

{/* Logo */}
<div className="flex items-center gap-2.5 flex-shrink-0">
  <div className="w-6 h-6 sm:w-8 sm:h-8">
    <Image src="/logo.png" alt="Eterna Labs logo" width={32} height={32} className="w-full h-full object-contain" />
  </div>
  <span className="text-sm sm:text-lg font-semibold text-white whitespace-nowrap">
    Eterna Labs
  </span>
</div>

{/* Scrollable Nav (Eterna Labs style) */}
<nav
  className="
    flex items-center gap-4
    overflow-x-auto whitespace-nowrap scrollbar-hide
    min-w-0
    max-[700px]:hidden
  "
>

  <a className="text-sm font-medium text-[#8B5CF6] flex-shrink-0">
    Discover
  </a>

  {navLinks.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className="text-sm font-medium text-white flex-shrink-0 hover:text-slate-300 transition-colors"
    >
      {link.label}
    </a>
  ))}
</nav>
</div>


          {/* Spacer to push right section to the end */}
          <div className="flex-1 min-w-0" />

          {/* Hamburger Menu Button - Mobile Only (< 640px) */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Right Section - Actions (visible >= 640px) */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Search Button - Circular */}
            <button 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>

            {/* Currency Selector - Oval with green border */}
            <div className="relative flex-shrink-0" ref={networkDropdownRef}>
              <button
                onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                className="
                hidden min-[750px]:flex
                items-center
                gap-2
                px-3 py-1.5
                rounded-full
                border
                border-[rgba(20,241,149,0.25)]
                bg-[#0b0f14]
                shadow-[0_0_0_1px_rgba(20,241,149,0.15),0_0_12px_rgba(20,241,149,0.15)]
                hover:shadow-[0_0_0_1px_rgba(20,241,149,0.3),0_0_16px_rgba(20,241,149,0.25)]
                transition-all
                whitespace-nowrap
              "
                aria-label="Select network"
              >

                <Image
                  src="/solana.png"
                  alt="Solana"
                  width={16}
                  height={16}
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
                <span className="text-xs sm:text-sm font-medium text-white">SOL</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </button>
              {showNetworkDropdown && (
                <div className="hidden min-[750px]:flex absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => setShowNetworkDropdown(false)}
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-800"
                  >
                    Solana
                  </button>
                  <button
                    onClick={() => setShowNetworkDropdown(false)}
                    className="hidden min-[750px]:flexw-full px-4 py-2 text-left text-sm text-white hover:bg-slate-800"
                  >
                    Ethereum
                  </button>
                  <button
                    onClick={() => setShowNetworkDropdown(false)}
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-slate-800"
                  >
                    BNB Chain
                  </button>
                </div>
              )}
            </div>

            {/* Deposit Button - Solid blue-purple oval */}
            <button
              onClick={() => setShowExchangeModal(true)}
              className="hidden min-[750px]:flex px-2 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0"
            >
              Deposit
            </button>

            {/* Favorites Icon - Circular */}
            <button 
              className="hidden min-[750px]:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Favorites"
            >
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>

            {/* Notifications Icon - Circular */}
            <button 
              className="hidden min-[750px]:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </button>

            {/* Wallet/Assets Display - Elongated oval */}
            <div className="relative flex-shrink-0 hidden sm:block" ref={walletDropdownRef}>
              <button
                onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors whitespace-nowrap"
                aria-label="Wallet"
              >
                <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <SolanaIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium text-white">0</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <DollarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium text-white">0</span>
                </div>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </button>
              {showWalletDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  {/* Top Section */}
                  <div className="p-4 border-b border-slate-700">
                    <div className="flex items-start justify-between">
                      {/* Total Value */}
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Total Value</div>
                        <div className="text-2xl font-bold text-white">$0</div>
                      </div>
                      {/* Tabs */}
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-2 py-1 rounded text-sm text-slate-300 hover:text-white transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-medium">Solana</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-2 py-1 rounded text-sm text-slate-500 hover:text-white transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-medium">Perps</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - Asset Balances */}
                  <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      {/* SOL Balance */}
                      <div className="flex items-center gap-1.5">
                        <Image
                          src="/solana.png"
                          alt="Solana"
                          width={14}
                          height={14}
                          className="flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-white leading-none">0</span>
                      </div>

                      {/* Conversion Arrow */}
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      {/* Dollar Balance */}
                      <div className="flex items-center gap-2">
                        <DollarIcon className="w-6 h-6" />
                        <span className="text-lg font-medium text-white">0</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Action Buttons */}
                  <div className="p-4 flex gap-3">
                    <button
                      onClick={() => {
                        setShowWalletDropdown(false);
                        setShowExchangeModal(true);
                      }}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Deposit
                    </button>
                    <button className="flex-1 px-4 py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors">
                      Withdraw
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar - Circular with purple/pink gradient and green dot */}
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                <span className="text-white text-sm font-medium">46</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-black" />
            </div>

            {/* Settings Icon - Circular with person+gear */}
            <div className="relative flex-shrink-0" ref={profileDropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors relative"
                aria-label="Profile settings"
              >
                <User className="w-4 h-4 text-white" />
                <Settings className="w-2.5 h-2.5 text-white absolute bottom-1 right-1" />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  {/* Account and Security */}
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-800 transition-colors text-left">
                    <User className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Account and Security</span>
                  </button>

                  {/* Settings */}
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-800 transition-colors text-left">
                    <Settings className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  {/* Auto Translate */}
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-800 transition-colors text-left">
                    <Languages className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Auto Translate</span>
                  </button>

                  {/* Feature Updates */}
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-800 transition-colors text-left">
                    <Rocket className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium">Feature Updates</span>
                  </button>

                  {/* Log Out - Pink/Magenta */}
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors text-left border-t border-slate-700">
                    <LogOut className="w-5 h-5 text-[#EC4899]" />
                    <span className="text-sm font-medium text-[#EC4899]">Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Icons Bar - Settings, Watchlist, Active Positions */}
      <div className="w-full bg-black border-t border-b border-slate-700/50 px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2">
        <Tooltip content="Settings">
          <button 
            className="min-w-[44px] min-h-[44px] p-2 border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors rounded-lg"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </Tooltip>
        
        <Tooltip content="Watchlist">
          <button 
            className="min-w-[44px] min-h-[44px] p-2 border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors rounded-lg"
            aria-label="Watchlist"
          >
            <Star className="w-5 h-5 text-slate-400" />
          </button>
        </Tooltip>
        
        <Tooltip content="Active Positions">
          <button 
            className="min-w-[44px] min-h-[44px] p-2 border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors rounded-lg"
            aria-label="Active Positions"
          >
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </button>
        </Tooltip>
      </div>

      {/* Exchange Modal */}
      <ExchangeModal open={showExchangeModal} onOpenChange={setShowExchangeModal} initialTab="deposit" />

      {/* Country/Region Selector */}
      <CountrySelector
        open={showCountrySelector}
        onOpenChange={setShowCountrySelector}
        selected={selectedCountry}
        onSelect={(country) => {
          setSelectedCountry(country);
          setStoredCountry(country.code);
        }}
      />

      {/* Mobile Menu - Sidebar/Drawer from left */}
      {showMobileMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Sidebar Menu */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900 border-l border-slate-700 z-50 lg:hidden overflow-y-auto scrollbar-hide animate-in slide-in-from-right"
          >
            <div className="flex flex-col h-full">
              {/* User Profile Header */}
              <div className="px-4 py-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-green-500 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">US</span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-slate-900" />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold text-white">User</div>
                    <div className="text-xs text-slate-400">0 wallets</div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-green-500/20 rounded-lg border border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-xs text-white">0</span>
                    <Menu className="w-3 h-3 text-white" />
                    <span className="text-xs text-white">0</span>
                  </div>
                </div>
              </div>

              {/* Navigation Section */}
              <div className="px-4 py-4">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                  NAVIGATION
                </div>
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <Eye className="w-5 h-5 text-slate-400" />
                    <span>Vision</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <Gift className="w-5 h-5 text-slate-400" />
                    <span>Rewards</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <DollarSign className="w-5 h-5 text-slate-400" />
                    <span>Yield</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <Star className="w-5 h-5 text-slate-400" />
                    <span>Watchlist</span>
                  </button>
                </div>
              </div>

              {/* Settings Section */}
              <div className="px-4 py-4">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                  SETTINGS
                </div>
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowCountrySelector(true);
                    }}
                    className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <span className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-slate-400" />
                      <span>Regions</span>
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedCountry.flag} {selectedCountry.code}
                    </span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <User className="w-5 h-5 text-slate-400" />
                    <span>Account and Security</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span>Notifications</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <Languages className="w-5 h-5 text-slate-400" />
                    <span>Auto Translate</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <Rocket className="w-5 h-5 text-slate-400" />
                    <span>Feature Updates</span>
                  </button>
                </div>
              </div>

              {/* Account Section */}
              <div className="px-4 py-4 mt-auto">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                  ACCOUNT
                </div>
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => {
                      setShowExchangeModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-slate-800 transition-colors text-left"
                  >
                    <Wallet className="w-5 h-5 text-slate-400" />
                    <span>Deposit</span>
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-[#EC4899] hover:bg-slate-800 transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5 text-[#EC4899]" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
    </header>
  );
});

