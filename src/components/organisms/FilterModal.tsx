/**
 * Axiom-style Filter Modal
 * Fixed dimensions, top-offset, internal scroll, responsive
 */

'use client';

import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, RefreshCw } from 'lucide-react';
import { AdvancedFilterState, TokenStatus } from '@/src/lib/types';
import { cn } from '@/src/lib/utils';

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: TokenStatus;
  onApplyFilters: (filters: AdvancedFilterState) => void;
}

/* ---------------- DATA ---------------- */

const protocols = [
  { id: 'pump', name: 'Pump', icon: '💊', color: 'green' },
  { id: 'mayhem', name: 'Mayhem', icon: '🚀', color: 'red' },
  { id: 'bags', name: 'Bags', icon: '💰', color: 'green' },
  { id: 'bonk', name: 'Bonk', icon: '🔥', color: 'orange' },
  { id: 'bonkers', name: 'Bonkers', icon: '🔥', color: 'orange' },
  { id: 'soar', name: 'Soar', icon: 'S', color: 'blue' },
  { id: 'moonshot', name: 'Moonshot', icon: '🌙', color: 'purple' },
  { id: 'heaven', name: 'Heaven', icon: '━', color: 'grey' },
  { id: 'daos', name: 'Daos.fun', icon: '👾', color: 'blue' },
  { id: 'candle', name: 'Candle', icon: '🕯️', color: 'orange' },
  { id: 'sugar', name: 'Sugar', icon: '🍩', color: 'pink' },
  { id: 'believe', name: 'Believe', icon: 'B', color: 'green' },
  { id: 'jupiter', name: 'Jupiter Studio', icon: '🌀', color: 'brown' },
  { id: 'moonit', name: 'Moonit', icon: '⬆️', color: 'yellow' },
  { id: 'boop', name: 'Boop', icon: '🦉', color: 'blue' },
  { id: 'launchlab', name: 'LaunchLab', icon: '🚀', color: 'teal' },
  { id: 'dynamic', name: 'Dynamic BC', icon: '🌊', color: 'pink' },
  { id: 'raydium', name: 'Raydium', icon: 'R', color: 'grey' },
  { id: 'meteora', name: 'Meteora AMM', icon: '', color: 'brown' },
  { id: 'meteora2', name: 'Meteora AMM V2', icon: '', color: 'brown' },
  { id: 'pumpamm', name: 'Pump AMM', icon: '💊', color: 'grey' },
  { id: 'orca', name: 'Orca', icon: '🐋', color: 'green' },
];

const filterTabs: TokenStatus[] = ['new', 'final_stretch', 'migrated'];
const filterCategories = ['Protocols', 'Audit', '$ Metrics', 'Socials'];

/* ---------------- COMPONENT ---------------- */

export const FilterModal = memo(function FilterModal({
  open,
  onOpenChange,
  status,
  onApplyFilters,
}: FilterModalProps) {
  const [activeTab, setActiveTab] = useState<TokenStatus>(status);
  const [activeCategory, setActiveCategory] = useState('Protocols');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [excludeKeywords, setExcludeKeywords] = useState('');
  const [selectedProtocols, setSelectedProtocols] = useState<Set<string>>(new Set());

  const modalRef = useRef<HTMLDivElement>(null);

  /* ---- LOCK PAGE SCROLL ---- */
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* ---- CLICK OUTSIDE ---- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onOpenChange]);

  const toggleProtocol = useCallback((id: string) => {
    setSelectedProtocols((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleApply = useCallback(() => {
    onApplyFilters({
      status: activeTab,
      search: searchKeywords,
      exclude: excludeKeywords,
      protocols: Array.from(selectedProtocols),
    });
    onOpenChange(false);
  }, [activeTab, searchKeywords, excludeKeywords, selectedProtocols, onApplyFilters, onOpenChange]);

  if (!open) return null;

  /* ---------------- UI ---------------- */

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div
        ref={modalRef}
        className="
          w-full
          max-w-[500px]
          h-[90vh]
          max-h-[800px]
          min-h-[400px]

          bg-[#111214]
          border border-slate-700
          rounded-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.85)]

          flex flex-col
          overflow-hidden
        "
      >
        {/* ---------- HEADER ---------- */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-500 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Filters</h2>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                setSearchKeywords('');
                setExcludeKeywords('');
                setSelectedProtocols(new Set());
              }}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Reset filters"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ---------- TABS ---------- */}
        <div className="flex gap-3 sm:gap-6 px-4 sm:px-6 pt-3 sm:pt-4 border-b border-slate-800 flex-shrink-0 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'pb-3 text-xs sm:text-sm font-medium capitalize relative whitespace-nowrap transition-colors',
                activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              {tab === 'new' ? 'New Pairs' : tab === 'final_stretch' ? 'Final Stretch' : 'Migrated'}
              {activeTab === tab && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* ---------- BODY (SCROLL) ---------- */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-6">
          {/* Keywords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs sm:text-sm text-slate-300 block mb-1 sm:mb-2">Search Keywords</label>
              <input
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
                placeholder="keyword1, keyword2..."
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm text-slate-300 block mb-1 sm:mb-2">Exclude Keywords</label>
              <input
                value={excludeKeywords}
                onChange={(e) => setExcludeKeywords(e.target.value)}
                placeholder="keyword1, keyword2..."
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6">
            {filterCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  'px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors flex-shrink-0',
                  activeCategory === c
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Protocol Pills */}
          {activeCategory === 'Protocols' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {protocols.map((p) => {
                const active = selectedProtocols.has(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProtocol(p.id)}
                    className={cn(
                      'px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm flex items-center gap-1 sm:gap-2 justify-center transition-colors',
                      active
                        ? 'border-white text-white bg-white/10'
                        : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                    )}
                  >
                    <span className="text-xs sm:text-base">{p.icon}</span>
                    <span className="truncate">{p.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-800 flex gap-2 sm:gap-3 flex-shrink-0 flex-wrap sm:flex-nowrap">
          <button className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0 py-2 sm:py-3 rounded-full bg-slate-700 text-white text-xs sm:text-sm hover:bg-slate-600 transition-colors">
            Import
          </button>
          <button className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0 py-2 sm:py-3 rounded-full bg-slate-700 text-white text-xs sm:text-sm hover:bg-slate-600 transition-colors">
            Export
          </button>
          <button className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0 py-2 sm:py-3 rounded-full bg-slate-700 text-white text-xs sm:text-sm hover:bg-slate-600 transition-colors">
            Share
          </button>
          <button
            onClick={handleApply}
            className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0 py-2 sm:py-3 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Apply All
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
});
