# Axiom Trade - Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit, and React Query.

## Features

- ✅ **All Token Columns**: New pairs, Final Stretch, Migrated status badges
- ✅ **Interactive Components**: Popover (sorting), Tooltip (hover info), Modal (token details)
- ✅ **Real-time Updates**: WebSocket mock with smooth color transitions for price changes
- ✅ **Loading States**: Skeleton loaders with shimmer effect, progressive loading, error boundaries
- ✅ **Sorting & Filtering**: Multi-criteria sorting and status/chain filtering
- ✅ **Responsive Design**: Fully responsive down to 320px width
- ✅ **Performance Optimized**: Memoized components, optimized re-renders, <100ms interactions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI (Dialog, Popover, Tooltip)
- **Charts**: Recharts (Sparkline)
- **Architecture**: Atomic Design Pattern

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── providers.tsx      # Redux & React Query providers
├── components/
│   ├── atoms/             # Basic building blocks
│   │   ├── Skeleton.tsx
│   │   └── Tooltip.tsx
│   ├── molecules/         # Composite components
│   │   ├── FilterBar.tsx
│   │   ├── PriceChangePill.tsx
│   │   ├── SortPopover.tsx
│   │   ├── Sparkline.tsx
│   │   └── TokenBadges.tsx
│   ├── organisms/         # Complex components
│   │   ├── ColumnGroup.tsx
│   │   ├── TokenDetailsDialog.tsx
│   │   ├── TokenRow.tsx
│   │   └── TokenTable.tsx
│   └── layout/            # Layout components
│       ├── BottomBar.tsx
│       └── Topbar.tsx
├── hooks/                  # Custom React hooks
│   ├── useRedux.ts
│   ├── useTokensQuery.ts
│   └── useWsMock.ts
├── lib/                    # Utilities & types
│   ├── api.ts
│   ├── types.ts
│   └── utils.ts
└── store/                  # Redux store
    ├── index.ts
    └── tokenSlice.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Key Features Implementation

### Real-time Price Updates
- Mock WebSocket hook (`useWsMock`) simulates real-time price updates
- Smooth color transitions (green for increases, red for decreases)
- Price flash animations on updates

### Loading States
- Skeleton loaders with shimmer animation
- Progressive loading with React Query
- Error boundaries for graceful error handling

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 640px (sm), 768px (md), 1024px (lg)
- Adaptive column layouts
- Touch-friendly interactions

### Performance Optimizations
- React.memo for component memoization
- useCallback and useMemo for expensive operations
- Optimized Redux selectors
- Code splitting with Next.js

## API

The application includes a mock API endpoint at `/api/tokes` that returns token data. In production, this would connect to a real API.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Environment Variables

No environment variables required for the mock implementation.

## Performance Metrics

Target Lighthouse scores:
- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Acknowledgments

Built as a replica of [Axiom Trade](https://axiom.trade/pulse) for educational purposes.
