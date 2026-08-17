/**
 * Bottom bar component matching Eterna Labs design
 * Fully responsive across all breakpoints
 */

'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { ChevronDown, Wallet, Settings, MessageCircle, Compass, TrendingUp, BarChart3, Radio, Hand, Bell, Palette, FileText, Grid3x3, type LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface BottomBarProps {
  className?: string;
}

// Vertical separator component
const Separator = ({ className }: { className?: string } = {}) => (
  <div className={cn("w-px h-4 sm:h-5 md:h-6 bg-slate-700 flex-shrink-0", className)} />
);

// Navigation item with red dot indicator
const NavItemWithDot = ({ icon: Icon, label, href, className }: { icon: LucideIcon; label: string; href: string; className?: string }) => (
  <a href={href} className={cn("relative flex items-center gap-0.5 sm:gap-1 md:gap-1.5 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white hover:text-slate-300 transition-colors whitespace-nowrap flex-shrink-0", className)}>
    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
    <span className="inline whitespace-nowrap">{label}</span>
    <div className="absolute -top-0.5 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-500 rounded-full" />
  </a>
);

export const BottomBar = memo(function BottomBar({ className }: BottomBarProps) {
  const [showGlobalDropdown, setShowGlobalDropdown] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const globalDropdownRef = useRef<HTMLDivElement>(null);
  const walletDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        globalDropdownRef.current &&
        !globalDropdownRef.current.contains(event.target as Node)
      ) {
        setShowGlobalDropdown(false);
      }
      if (
        walletDropdownRef.current &&
        !walletDropdownRef.current.contains(event.target as Node)
      ) {
        setShowWalletDropdown(false);
      }
    };

    if (showGlobalDropdown || showWalletDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showGlobalDropdown, showWalletDropdown]);

  return (
    <footer
      className={cn(
        'hidden min-[641px]:block sticky bottom-0 z-40 w-full bg-black border-t border-slate-700/50',
        className
      )}
    >
      <div className="w-full overflow-x-auto scrollbar-hide">
  <div
    className="
      flex items-center
      gap-4
      whitespace-nowrap
      w-max
    "
  >


          {/* Left Section */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-3 flex-shrink-0 min-w-0">
            {/* Preset Button */}
            <button
  className="
    flex items-center gap-[6px]
    h-[24px]
    px-[8px]
    rounded-[6px]
    bg-[#343063]
    text-white
    text-[12px]
    font-semibold
    hover:opacity-90
    transition-opacity
    flex-shrink-0
    whitespace-nowrap
  "
>
  {/* Icon */}
  
    <div className="w-[14px] h-[14px] flex flex-col justify-between">
      <div className="w-full h-[2px] bg-white" />
      <div className="w-full h-[2px] bg-white" />
      <div className="w-full h-[2px] bg-white" />
      </div>

  {/* Text */}
  <span>PRESET 1</span>
</button>


            <button className="group flex items-center gap-2 h-[24px] px-3 rounded-full border border-slate-700 flex-shrink-0" aria-label="Wallet balance">

          <Wallet className="w-4 h-4 text-slate-400" />

          <span className="text-xs font-medium">1</span>

          <div className="flex items-center gap-1">
            <Image src="/solana.png" alt="Solana" width={14} height={14} />
            <span className="text-xs font-medium">0</span>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>


            {/* Wallet Indicator - Hidden on mobile, visible from sm */}
           

            <Separator className="hidden sm:block" />

            {/* Settings Icon - Hidden on mobile, visible from sm */}
            <button className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] text-white hover:text-slate-300 transition-colors hidden sm:flex items-center justify-center flex-shrink-0" aria-label="Settings">
              <Settings className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </button>

            {/* Navigation Items with Red Dots - Scrollable Container */}
            {/* Mobile: Show 5 icons, scrollable. Desktop: Show all 6, scrollable */}
            <div 
              className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-3 flex-shrink-0 overflow-x-auto scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 flex-nowrap">
                <NavItemWithDot icon={Wallet} label="Wallet" href="#" />
                <NavItemWithDot icon={MessageCircle} label="Social" href="#" />
                <NavItemWithDot icon={Compass} label="Discover" href="#" />
                <NavItemWithDot icon={TrendingUp} label="Pulse" href="#" />
                <NavItemWithDot icon={BarChart3} label="PnL" href="#" />
                {/* Alpha - Hidden below 640px, visible above */}
                <NavItemWithDot icon={Radio} label="Alpha" href="#" className="hidden min-[640px]:flex" />
              </div>
            </div>
          </div>
          <Separator className="hidden sm:block" />
          {/* Center Section */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-3 flex-1 justify-center min-w-0 flex-shrink-0 overflow-hidden">
            {/* Hand Icon with Gradient Ring - Hidden on mobile, visible from sm */}
            <div className="relative hidden sm:block flex-shrink-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-green-500 p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Hand className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-slate-400" />
                </div>
              </div>
            </div>
            <Separator className="hidden sm:block" />
            {/* BNB Price Display */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 flex-shrink-0">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 flex items-center justify-center flex-shrink-0">
                <Image src="/bnb.png" alt="BNB" width={20} height={20} className="w-full h-full object-contain" />
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-yellow-400 whitespace-nowrap">$903</span>
            </div>

            
            <div className="w-12 flex-shrink-0" />

            {/* Disconnected Status */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 bg-[#12AF8033] rounded-lg flex-shrink-0">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 flex-shrink-0"></div>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-white font-medium whitespace-nowrap">Connection is Stable</span>
            </div>

            {/* Global Dropdown - Hidden below md, visible from md */}
            <div className="relative hidden md:block" ref={globalDropdownRef}>
              <button
                onClick={() => setShowGlobalDropdown(!showGlobalDropdown)}
                className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] md:text-xs text-white hover:text-slate-300 transition-colors whitespace-nowrap flex-shrink-0"
              >
                <span>GLOBAL</span>
                <ChevronDown className={cn('w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform', showGlobalDropdown && 'rotate-180')} />
              </button>
              {showGlobalDropdown && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => setShowGlobalDropdown(false)}
                    className="w-full px-4 py-2 text-left text-xs text-white hover:bg-slate-800"
                  >
                    Global Settings
                  </button>
                  <button
                    onClick={() => setShowGlobalDropdown(false)}
                    className="w-full px-4 py-2 text-left text-xs text-white hover:bg-slate-800"
                  >
                    Preferences
                  </button>
                </div>
              )}
            </div>
                
            <Separator className="hidden lg:block" />

            {/* Utility Icons - Progressive visibility */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5">
              {/* Grid - Visible from md */}
              <button className="p-2 min-w-[44px] min-h-[44px] text-white hover:text-slate-300 transition-colors hidden md:flex items-center justify-center flex-shrink-0" aria-label="Grid view">
                <Grid3x3 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              {/* Bell - Visible from lg */}
              <button className="p-2 min-w-[44px] min-h-[44px] text-white hover:text-slate-300 transition-colors hidden lg:flex items-center justify-center flex-shrink-0" aria-label="Notifications">
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              {/* Palette - Visible from lg */}
              <button className="p-2 min-w-[44px] min-h-[44px] text-white hover:text-slate-300 transition-colors hidden lg:flex items-center justify-center flex-shrink-0" aria-label="Theme">
                <Palette className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              {/* X - Visible from lg */}
             
             
              {/* Discord - Visible from xl */}
              <button className="p-2 min-w-[44px] min-h-[44px] text-white hover:text-slate-300 transition-colors hidden xl:flex items-center justify-center flex-shrink-0" aria-label="Discord">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </button>
              {/* Docs - Visible from lg */}
              <a href="#" className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs text-white hover:text-slate-300 transition-colors whitespace-nowrap hidden lg:flex flex-shrink-0">
                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                <span>Docs</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
