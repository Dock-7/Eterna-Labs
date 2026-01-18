/**
 * Bottom bar component matching Axiom Trade design
 */

'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { ChevronDown } from 'lucide-react';

interface BottomBarProps {
  className?: string;
}

export const BottomBar = memo(function BottomBar({ className }: BottomBarProps) {
  const [showGlobalDropdown, setShowGlobalDropdown] = useState(false);
  const globalDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        globalDropdownRef.current &&
        !globalDropdownRef.current.contains(event.target as Node)
      ) {
        setShowGlobalDropdown(false);
      }
    };

    if (showGlobalDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showGlobalDropdown]);

  const navLinks = [
    { label: 'Wallet', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Discover', href: '#' },
    { label: 'Pulse', href: '#', active: true },
    { label: 'PnL', href: '#' },
  ];

  return (
    <footer
      className={cn(
        'sticky bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80',
        className
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Left Side - Preset and Navigation */}
          <div className="flex items-center gap-4 min-w-0">
            <button className="px-3 py-1.5 text-xs font-medium bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors whitespace-nowrap">
              PRESET 1
            </button>
            <nav className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                    link.active
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center - Balance */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="text-slate-300">
              Balance <span className="text-slate-100 font-semibold">$81.2K</span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-100 font-semibold">$3,075</span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-100 font-semibold">$920</span>
            </div>
          </div>

          {/* Right Side - Status and Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Connection is stable</span>
            </div>
            <div className="relative" ref={globalDropdownRef}>
              <button
                onClick={() => setShowGlobalDropdown(!showGlobalDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              >
                GLOBAL
                <ChevronDown className={cn('w-3 h-3 transition-transform', showGlobalDropdown && 'rotate-180')} />
              </button>
              {showGlobalDropdown && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => setShowGlobalDropdown(false)}
                    className="w-full px-4 py-2 text-left text-xs text-slate-100 hover:bg-slate-800"
                  >
                    Global Settings
                  </button>
                  <button
                    onClick={() => setShowGlobalDropdown(false)}
                    className="w-full px-4 py-2 text-left text-xs text-slate-100 hover:bg-slate-800"
                  >
                    Preferences
                  </button>
                </div>
              )}
            </div>
            <a
              href="#"
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-100 transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});
