#  Eterna Labs - Token Discovery Platform

A pixel-perfect, high-performance token discovery platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Features real-time price updates, advanced filtering, responsive design, and accessibility compliance.

Core Functionality

- Three-Column Token Layout: New Pairs, Final Stretch, and Migrated tokens
- Real-time Price Updates: WebSocket simulation with smooth color transitions
- Advanced Filtering: Filter tokens by market cap, volume, liquidity, and more
- Multi-criteria Sorting: Sort by various metrics with ascending/descending options
- Token Details Modal: Comprehensive token information with charts and actions

UI/UX

- Fully Responsive: Works seamlessly from 320px to 4K displays
- Mobile Bottom Navigation: Touch-friendly navigation for mobile devices
- Column Selector: Mobile-friendly dropdown to switch between token categories
- Skeleton Loading: Beautiful loading states with shimmer animations
- Toast Notifications: User feedback for actions

Performance & Accessibility

- Lighthouse Score ≥90: Optimized for performance, accessibility, best practices, and SEO
- WCAG 2.1 Compliant: Proper contrast ratios, aria-labels, and touch targets
- Memoized Components: Optimized re-renders with React.memo and useMemo
- Code Splitting: Automatic code splitting with Next.js App Router

## 🛠️ Tech Stack

Category :	Technology
Framework :	Next.js 16 (App Router)
Language :	TypeScript 5 (Strict Mode)
UI Library :	React 19
Styling	Tailwind : CSS 4
State Management :	Redux Toolkit 2.2
Data Fetching :	TanStack React Query 5
UI Components :	Radix UI (Dialog, Popover, Tooltip)
Charts :	Recharts
Icons :	Lucide React
Architecture :	Atomic Design Pattern

##  Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/tokes/               # API routes for token data
│   ├── globals.css              # Global styles & Tailwind
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main page component
│   └── providers.tsx            # Redux & React Query providers
│
├── components/
│   ├── atoms/                   # Basic building blocks
│   │   ├── Skeleton.tsx        # Loading skeleton
│   │   └── Tooltip.tsx         # Tooltip wrapper
│   │
│   ├── molecules/               # Composite components
│   │   ├── Sparkline.tsx       # Price sparkline chart
│   │   └── TokenBadges.tsx     # Token status badges
│   │
│   ├── organisms/               # Complex components
│   │   ├── ExchangeModal.tsx   # Buy/Sell/Convert modal
│   │   ├── FilterModal.tsx     # Advanced filtering modal
│   │   ├── Sorting.tsx         # Sort popover component
│   │   ├── TokenDetailsDialog.tsx  # Token details modal
│   │   ├── TokenRow.tsx        # Individual token row
│   │   └── TokenTable.tsx      # Main token table
│   │
│   ├── layout/                  # Layout components
│   │   ├── BottomBar.tsx       # Desktop bottom bar
│   │   ├── MobileBottomBar.tsx # Mobile bottom navigation
│   │   └── Topbar.tsx          # Top navigation bar
│   │
│   └── ErrorBoundary.tsx       # Error boundary wrapper
│
├── hooks/                       # Custom React hooks
│   ├── usePerformance.ts       # Performance monitoring
│   ├── useRedux.ts             # Typed Redux hooks
│   ├── useTokensQuery.ts       # Token data fetching
│   └── useWsMock.ts            # WebSocket simulation
│
├── lib/                         # Utilities & helpers
│   ├── api.ts                  # API client functions
│   ├── countries.ts            # Country data
│   ├── performance.ts          # Performance utilities
│   ├── subscription.ts         # Subscription helpers
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
│
└── store/                       # Redux store
    ├── index.ts                # Store configuration
    ├── selectors.ts            # Memoized selectors
    ├── subscriptionSlice.ts    # Subscription state
    └── tokenSlice.ts           # Token state management
```

##  Getting Started

### Prerequisites

- Node.js 20.9 or later (Next.js 16 requires it; see `.nvmrc`)
- npm 9+ or yarn 1.22+ or pnpm 8+

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Dock-7/Eterna-Labs.git
   cd Eterna-Labs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Other Scripts

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest unit tests
```

##  Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column with dropdown selector |
| Tablet | 640px - 1023px | Single column with dropdown selector |
| Desktop | 1024px - 1310px | Single column with horizontal scroll option |
| Large Desktop | > 1310px | Three-column side-by-side layout |

## Screenshots

### Desktop View
![Desktop View](public/desktop.png)


### Mobile View
![Mobile View](public/mobile.png)



##  Key Features Implementation

### Real-time Price Updates
```typescript
// WebSocket simulation with smooth color transitions
useWsMock(tokens); // Simulates real-time price updates
// - Green flash for price increases
// - Red flash for price decreases
// - Smooth CSS transitions
```

### Advanced Filtering
- Market Cap range (min/max)
- Volume range (min/max)
- Liquidity threshold
- Token age
- Holder count
- Custom filters per column

### Token Details Modal
- Comprehensive token information
- Price charts with Recharts
- Quick actions (Buy, Sell, Convert)
- Social links and contract info
- Copy address functionality

### Tailwind Configuration

Custom configuration in `tailwind.config.ts` includes:
- Custom color palette (slate-based dark theme)
- Custom breakpoints
- Animation utilities
- Scrollbar hiding utilities

##  Performance Metrics

Target Lighthouse Scores:

| Metric | Target | Description |
|--------|--------|-------------|
| Performance | ≥90 | Fast loading, optimized assets |
| Accessibility | ≥90 | WCAG 2.1 compliant |
| Best Practices | ≥90 | Modern web standards |
| SEO | ≥90 | Search engine optimized |



<p align="center">
  Made with ❤️ by <a href="https://github.com/Dock-7">Your Name</a>
</p>
