'use client';

import { TrendingUp, Compass, Radio, BarChart3, User } from 'lucide-react';

export const MobileBottomBar = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-slate-700/50 min-[641px]:hidden">
      <div className="flex items-center justify-around py-2">

        <button className="flex flex-col items-center text-slate-400">
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px]">Trending</span>
        </button>

        <button className="flex flex-col items-center text-slate-400">
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Track</span>
        </button>

        <button className="flex flex-col items-center text-white">
          <Radio className="w-6 h-6" />
          <span className="text-[11px] font-medium">Pulse</span>
        </button>

        <button className="flex flex-col items-center text-slate-400">
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px]">Perps</span>
        </button>

        <button className="flex flex-col items-center text-slate-400">
          <User className="w-5 h-5" />
          <span className="text-[10px]">Account</span>
        </button>

      </div>
    </footer>
  );
};
