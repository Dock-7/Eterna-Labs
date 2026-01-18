/**
 * Main page component
 */

'use client';

import { TokenTable } from '@/src/components/organisms/TokenTable';
import { Topbar } from '@/src/components/layout/Topbar';
import { BottomBar } from '@/src/components/layout/BottomBar';
import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Topbar />
      <main className="flex-1 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 w-full max-w-[1600px]">
        <ErrorBoundary>
          <TokenTable />
        </ErrorBoundary>
      </main>
      <BottomBar />
    </div>
  );
}
