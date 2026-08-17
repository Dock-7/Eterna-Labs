/**
 * Main page component
 */

'use client';

import { TokenTable } from '@/src/components/organisms/TokenTable';
import { Topbar } from '@/src/components/layout/Topbar';
import { BottomBar } from '@/src/components/layout/BottomBar';
import { ErrorBoundary } from '@/src/components/ErrorBoundary';

export default function Home() {
  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      <Topbar />
      <main className="flex-1 min-h-0 overflow-hidden w-full pb-14 min-[641px]:pb-0">
        <ErrorBoundary>
          <TokenTable />
        </ErrorBoundary>
      </main>
      <BottomBar />
    </div>
  );
}
