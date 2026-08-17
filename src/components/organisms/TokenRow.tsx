/**
 * Token row component matching Eterna Labs design
 */

'use client';

import { memo, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { Token } from '@/src/lib/types';
import { useAppDispatch } from '@/src/hooks/useRedux';
import { setSelectedToken } from '@/src/store/tokenSlice';
import { formatCurrency } from '@/src/lib/api';
import { cn } from '@/src/lib/utils';
import { usePerformanceMonitor } from '@/src/hooks/usePerformance';
import { Copy, Check, Search, Users, BarChart3, Trophy, Crown, Eye, Flame } from 'lucide-react';
import Image from 'next/image';

interface TokenRowProps {
  token: Token;
  isSelected?: boolean;
}

export const TokenRow = memo(function TokenRow({ token, isSelected }: TokenRowProps) {
  const dispatch = useAppDispatch();
  const { measureInteraction } = usePerformanceMonitor('TokenRow');
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    measureInteraction('selectToken', () => {
      dispatch(setSelectedToken(token));
    });
  }, [dispatch, token, measureInteraction]);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(token.symbol);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [token.symbol]);

  // Memoize formatted values to prevent recalculation
  const formattedMarketCap = useMemo(() => formatCurrency(token.marketCap), [token.marketCap]);
  const formattedVolume = useMemo(() => formatCurrency(token.volume24h), [token.volume24h]);
  
  // Generate a stable TX count based on token ID
  const txCount = useMemo(() => {
    const hash = token.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 2000) + 500;
  }, [token.id]);

  const tokenSymbol = useMemo(() => token.symbol.substring(0, 2).toUpperCase(), [token.symbol]);
  const shortAddress = useMemo(() => {
    const addr = token.pairAddress || token.id;
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  }, [token.pairAddress, token.id]);

  // Generate unique hash for this token
  const tokenHash = useMemo(() => {
    return token.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }, [token.id]);

  // Generate unique colors for token logo based on token ID
  const logoColors = useMemo(() => {
    const colorSchemes = [
      { from: 'from-yellow-400', via: 'via-yellow-500', to: 'to-yellow-600', text: 'text-yellow-900' },
      { from: 'from-blue-400', via: 'via-blue-500', to: 'to-blue-600', text: 'text-blue-900' },
      { from: 'from-purple-400', via: 'via-purple-500', to: 'to-purple-600', text: 'text-purple-900' },
      { from: 'from-pink-400', via: 'via-pink-500', to: 'to-pink-600', text: 'text-pink-900' },
      { from: 'from-green-400', via: 'via-green-500', to: 'to-green-600', text: 'text-green-900' },
      { from: 'from-red-400', via: 'via-red-500', to: 'to-red-600', text: 'text-red-900' },
      { from: 'from-indigo-400', via: 'via-indigo-500', to: 'to-indigo-600', text: 'text-indigo-900' },
      { from: 'from-orange-400', via: 'via-orange-500', to: 'to-orange-600', text: 'text-orange-900' },
      { from: 'from-cyan-400', via: 'via-cyan-500', to: 'to-cyan-600', text: 'text-cyan-900' },
      { from: 'from-emerald-400', via: 'via-emerald-500', to: 'to-emerald-600', text: 'text-emerald-900' },
    ];
    return colorSchemes[tokenHash % colorSchemes.length];
  }, [tokenHash]);

  // Generate unique badge color classes - using black text for high contrast
  const badgeColorClasses = useMemo(() => {
    const colorSchemes = [
      { bg: 'bg-yellow-400', text: 'text-black' },
      { bg: 'bg-blue-400', text: 'text-black' },
      { bg: 'bg-purple-400', text: 'text-black' },
      { bg: 'bg-pink-400', text: 'text-black' },
      { bg: 'bg-green-400', text: 'text-black' },
      { bg: 'bg-red-400', text: 'text-black' },
      { bg: 'bg-indigo-400', text: 'text-black' },
      { bg: 'bg-orange-400', text: 'text-black' },
      { bg: 'bg-cyan-400', text: 'text-black' },
      { bg: 'bg-emerald-400', text: 'text-black' },
    ];
    return colorSchemes[tokenHash % colorSchemes.length];
  }, [tokenHash]);

  // Generate unique profile picture pattern
  const profilePattern = useMemo(() => {
    const patterns = [
      { type: 'circle', letter: tokenSymbol[0] || 'T' },
      { type: 'square', letter: tokenSymbol[1] || 'K' },
      { type: 'diamond', letter: tokenSymbol[0] || 'T' },
      { type: 'star', letter: tokenSymbol[1] || 'K' },
    ];
    return patterns[tokenHash % patterns.length];
  }, [tokenHash, tokenSymbol]);

  // Generate mock data for badges and stats
  const timeAgo = useMemo(() => {
    return `${(tokenHash % 60) + 1}s`;
  }, [tokenHash]);

  const holderCount = useMemo(() => {
    return (tokenHash % 50) + 1;
  }, [tokenHash]);

  // Track previous percentages for change detection
  const prevPercentagesRef = useRef<Record<string, number>>({});
  const [changedBadges, setChangedBadges] = useState<Set<string>>(new Set());

  // Track current time to drive time-based percentage animation, refreshed every second
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  // Calculate real-time percentages based on token data with staggered variation
  const percentages = useMemo(() => {

    // Badge 1 - Price change (updates first, cycle: 12s)
    const badge1Time = ((now + 0) % 12000) / 12000;
    const priceChangeAbs = Math.abs(token.priceChangePercent24h);
    const badge1 = Math.min(99, Math.max(0, priceChangeAbs + (badge1Time - 0.5) * 30));
    
    // Badge 2 - Liquidity (updates second, cycle: 14s, offset: 2s)
    let liquidityPercent = 0;
    if (token.liquidity > 0 && token.marketCap > 0) {
      const basePercent = (token.liquidity / token.marketCap) * 100;
      const badge2Time = ((now + 2000) % 14000) / 14000;
      liquidityPercent = Math.min(99, Math.max(0, basePercent + (badge2Time - 0.5) * 40));
    } else {
      const badge2Time = ((now + 2000) % 14000) / 14000;
      liquidityPercent = 30 + (badge2Time * 50);
    }
    
    // Badge 3 - Volume (updates third, cycle: 11s, offset: 4s)
    let volumePercent = 0;
    if (token.marketCap > 0) {
      const basePercent = (token.volume24h / token.marketCap) * 100;
      const badge3Time = ((now + 4000) % 11000) / 11000;
      volumePercent = Math.min(99, Math.max(0, basePercent + (badge3Time - 0.5) * 35));
    } else {
      const badge3Time = ((now + 4000) % 11000) / 11000;
      volumePercent = 25 + (badge3Time * 55);
    }
    
    // Badge 4 - Holders (updates fourth, cycle: 16s, offset: 6s)
    const badge4Time = ((now + 6000) % 16000) / 16000;
    const holderPercent = 20 + (badge4Time * 60);
    
    // Badge 5 - Status (updates fifth, cycle: 13s, offset: 8s)
    const badge5Time = ((now + 8000) % 13000) / 13000;
    const statusPercent = token.status === 'migrated' 
      ? 0 
      : Math.min(99, Math.max(0, 10 + (badge5Time * 70)));

    return {
      badge1: Math.min(99, Math.max(0, badge1)),
      badge2: Math.min(99, Math.max(0, liquidityPercent)),
      badge3: Math.min(99, Math.max(0, volumePercent)),
      badge4: Math.min(99, Math.max(0, holderPercent)),
      badge5: Math.min(99, Math.max(0, statusPercent)),
    };
  }, [token.priceChangePercent24h, token.liquidity, token.marketCap, token.volume24h, token.status, now]);

  // Detect changes and trigger flash animation, especially color changes.
  // This effect intentionally synchronizes local animation state (which
  // badges are flashing, and for how long) with derived `percentages`
  // values, then schedules the CSS flash to clear itself — a legitimate
  // "synchronize with an external timer" use of an effect.
  useEffect(() => {
    const changed = new Set<string>();
    const colorChanged = new Set<string>();
    const prev = prevPercentagesRef.current;

    Object.keys(percentages).forEach((key) => {
      const current = percentages[key as keyof typeof percentages];
      const previous = prev[key];

      if (previous !== undefined) {
        // Detect any value change
        if (Math.abs(current - previous) > 0.1) {
          changed.add(key);
        }

        // Detect color change (crossing 50% threshold)
        const wasRed = previous >= 50;
        const isRed = current >= 50;
        if (wasRed !== isRed) {
          colorChanged.add(key);
          changed.add(key);
        }
      }
    });

    prevPercentagesRef.current = { ...percentages };

    if (changed.size === 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- flash animation state is derived from `percentages` changes and must be set as soon as they're detected
    setChangedBadges(changed);
    // Clear the flash after animation (longer for color changes)
    const timer = setTimeout(() => {
      setChangedBadges(new Set());
    }, colorChanged.size > 0 ? 1500 : 1000);
    return () => clearTimeout(timer);
  }, [percentages]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'px-2 sm:px-4 py-2 sm:py-3 cursor-pointer transition-all hover:bg-slate-800/30 border-b border-slate-800/30 last:border-b-0',
        isSelected && 'bg-blue-500/10'
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Left Section - Token Image with Badges */}
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden">
            {/* Token Image - Unique color gradient per token */}
            <div className={`w-full h-full bg-gradient-to-br ${logoColors.from} ${logoColors.via} ${logoColors.to} flex items-center justify-center relative`}>
              {/* Unique pattern based on token */}
              {profilePattern.type === 'circle' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full bg-white/20 flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${logoColors.text}`}>{profilePattern.letter}</span>
                  </div>
                </div>
              )}
              {profilePattern.type === 'square' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-10 h-10 rotate-45 bg-white/20 flex items-center justify-center`}>
                    <span className={`text-xl font-bold ${logoColors.text} -rotate-45`}>{profilePattern.letter}</span>
                  </div>
                </div>
              )}
              {profilePattern.type === 'diamond' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-10 h-10 bg-white/20 transform rotate-45 flex items-center justify-center`}>
                    <span className={`text-xl font-bold ${logoColors.text} -rotate-45`}>{profilePattern.letter}</span>
                  </div>
                </div>
              )}
              {profilePattern.type === 'star' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className={`w-12 h-12 ${logoColors.text} fill-current`} viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              )}
            </div>
            
            {/* Top-left Badge - Unique color per token */}
            <div className={`absolute top-1 left-1 px-1.5 py-0.5 ${badgeColorClasses.bg} rounded text-[10px] font-bold ${badgeColorClasses.text}`}>
              {tokenSymbol}
            </div>
            
            {/* Bottom-right Badge - Flame icon with unique color */}
            <div className={`absolute bottom-1 right-1 w-5 h-5 ${badgeColorClasses.bg} rounded-full flex items-center justify-center`}>
              <Flame className={`w-3 h-3 ${badgeColorClasses.text}`} />
            </div>
          </div>
          {/* Token Address */}
          <div className="mt-1 text-xs text-slate-400 font-mono">{shortAddress}</div>
        </div>

        {/* Right Section - Token Info */}
        <div className="flex-1 min-w-0">
          {/* Top Row - Token Name, Copy, MC, V */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
              <span className="text-sm sm:text-base font-bold text-white truncate">{token.name.toLowerCase()}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-[10px] sm:text-xs text-slate-400">{token.symbol.toLowerCase()}</span>
                <button
                  onClick={handleCopy}
                  className="p-2 min-w-[44px] min-h-[44px] -m-1.5 text-slate-400 hover:text-white transition-colors flex-shrink-0 flex items-center justify-center"
                  aria-label={copied ? `Copied ${token.symbol} symbol` : `Copy ${token.symbol} symbol`}
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs flex-shrink-0">
              <div className="text-right">
                <span className="text-slate-400">MC </span>
                <span className="text-green-400 font-medium">{formattedMarketCap}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400">V </span>
                <span className="text-green-400 font-medium">{formattedVolume}</span>
              </div>
            </div>
          </div>

          {/* Middle Row 1 - Icons and Stats */}
          <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-2 text-[10px] sm:text-xs flex-wrap">
            <span className="text-green-400 font-medium">{timeAgo}</span>
            <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className="text-slate-300">{holderCount}</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className="text-slate-300">0</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className="text-slate-300">0</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400" />
              <span className="text-slate-300">9/18</span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className="text-slate-300">1</span>
            </div>
          </div>

          {/* Middle Row 2 - F icon, Solana, TX with progress */}
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 text-[10px] sm:text-xs">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <span className="text-white font-bold">F</span>
              <span className="text-slate-300">0.031</span>
            </div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
              <Image src="/solana.png" alt="Solana" width={16} height={16} className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <span className="text-slate-300">TX {txCount}</span>
              <div className="w-6 sm:w-8 h-0.5 bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Bottom Row - Percentage Badges - Dynamic values with real-time updates */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {/* Badge 1 - Person with star - Price change percentage */}
            <div className={cn(
              "flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] transition-colors duration-500 ease-in-out flex-shrink-0",
              "min-w-[2.5rem] sm:min-w-[3rem] justify-center", // Fixed minimum width
              percentages.badge1 >= 50 
                ? "bg-red-500/10 border border-red-500/30" 
                : "bg-green-500/10 border border-green-500/30",
              changedBadges.has('badge1') && "ring-2 ring-offset-1 ring-offset-black",
              changedBadges.has('badge1') && percentages.badge1 >= 50 && "ring-red-500/50",
              changedBadges.has('badge1') && percentages.badge1 < 50 && "ring-green-500/50"
            )}>
              <svg className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 transition-colors",
                percentages.badge1 >= 50 ? "text-red-400" : "text-green-400"
              )} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span className={cn(
                "font-medium transition-colors whitespace-nowrap",
                percentages.badge1 >= 50 ? "text-red-400" : "text-green-400"
              )}>
                {percentages.badge1.toFixed(0)}%
              </span>
            </div>
            
            {/* Badge 2 - Chef hat - Liquidity percentage */}
            <div className={cn(
              "flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] transition-colors duration-500 ease-in-out flex-shrink-0",
              "min-w-[3rem] sm:min-w-[3.5rem] justify-center", // Fixed minimum width for "XX% 1h"
              percentages.badge2 >= 50 
                ? "bg-red-500/10 border border-red-500/30" 
                : "bg-green-500/10 border border-green-500/30",
              changedBadges.has('badge2') && "ring-2 ring-offset-1 ring-offset-black",
              changedBadges.has('badge2') && percentages.badge2 >= 50 && "ring-red-500/50",
              changedBadges.has('badge2') && percentages.badge2 < 50 && "ring-green-500/50"
            )}>
              <svg className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 transition-colors",
                percentages.badge2 >= 50 ? "text-red-400" : "text-green-400"
              )} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className={cn(
                "font-medium transition-colors whitespace-nowrap",
                percentages.badge2 >= 50 ? "text-red-400" : "text-green-400"
              )}>
                {percentages.badge2.toFixed(0)}% 1h
              </span>
            </div>
            
            {/* Badge 3 - Target - Volume percentage */}
            <div className={cn(
              "flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] transition-colors duration-500 ease-in-out flex-shrink-0",
              "min-w-[2.5rem] sm:min-w-[3rem] justify-center", // Fixed minimum width
              percentages.badge3 >= 50 
                ? "bg-red-500/10 border border-red-500/30" 
                : "bg-green-500/10 border border-green-500/30",
              changedBadges.has('badge3') && "ring-2 ring-offset-1 ring-offset-black",
              changedBadges.has('badge3') && percentages.badge3 >= 50 && "ring-red-500/50",
              changedBadges.has('badge3') && percentages.badge3 < 50 && "ring-green-500/50"
            )}>
              <svg className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 transition-colors",
                percentages.badge3 >= 50 ? "text-red-400" : "text-green-400"
              )} fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
              <span className={cn(
                "font-medium transition-colors whitespace-nowrap",
                percentages.badge3 >= 50 ? "text-red-400" : "text-green-400"
              )}>
                {percentages.badge3.toFixed(0)}%
              </span>
            </div>
            
            {/* Badge 4 - Ghost - Holder percentage */}
            <div className={cn(
              "flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] transition-colors duration-500 ease-in-out flex-shrink-0",
              "min-w-[2.5rem] sm:min-w-[3rem] justify-center", // Fixed minimum width
              percentages.badge4 >= 50 
                ? "bg-red-500/10 border border-red-500/30" 
                : "bg-green-500/10 border border-green-500/30",
              changedBadges.has('badge4') && "ring-2 ring-offset-1 ring-offset-black",
              changedBadges.has('badge4') && percentages.badge4 >= 50 && "ring-red-500/50",
              changedBadges.has('badge4') && percentages.badge4 < 50 && "ring-green-500/50"
            )}>
              <svg className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 transition-colors",
                percentages.badge4 >= 50 ? "text-red-400" : "text-green-400"
              )} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className={cn(
                "font-medium transition-colors whitespace-nowrap",
                percentages.badge4 >= 50 ? "text-red-400" : "text-green-400"
              )}>
                {percentages.badge4.toFixed(0)}%
              </span>
            </div>
            
            {/* Badge 5 - Network/Cubes - Status percentage */}
            <div className={cn(
              "flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] transition-colors duration-500 ease-in-out flex-shrink-0",
              "min-w-[2.5rem] sm:min-w-[3rem] justify-center", // Fixed minimum width
              percentages.badge5 >= 50 
                ? "bg-red-500/10 border border-red-500/30" 
                : "bg-green-500/10 border border-green-500/30",
              changedBadges.has('badge5') && "ring-2 ring-offset-1 ring-offset-black",
              changedBadges.has('badge5') && percentages.badge5 >= 50 && "ring-red-500/50",
              changedBadges.has('badge5') && percentages.badge5 < 50 && "ring-green-500/50"
            )}>
              <svg className={cn(
                "w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 transition-colors",
                percentages.badge5 >= 50 ? "text-red-400" : "text-green-400"
              )} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className={cn(
                "font-medium transition-colors whitespace-nowrap",
                percentages.badge5 >= 50 ? "text-red-400" : "text-green-400"
              )}>
                {percentages.badge5.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
