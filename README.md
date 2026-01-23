# 🚀 Eterna Labs - Token Discovery Platform

A pixel-perfect, high-performance token discovery platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Features real-time price updates, advanced filtering, responsive design, and accessibility compliance.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Functionality
- **Three-Column Token Layout**: New Pairs, Final Stretch, and Migrated tokens
- **Real-time Price Updates**: WebSocket simulation with smooth color transitions
- **Advanced Filtering**: Filter tokens by market cap, volume, liquidity, and more
- **Multi-criteria Sorting**: Sort by various metrics with ascending/descending options
- **Token Details Modal**: Comprehensive token information with charts and actions

### UI/UX
- **Fully Responsive**: Works seamlessly from 320px to 4K displays
- **Mobile Bottom Navigation**: Touch-friendly navigation for mobile devices
- **Column Selector**: Mobile-friendly dropdown to switch between token categories
- **Skeleton Loading**: Beautiful loading states with shimmer animations
- **Toast Notifications**: User feedback for actions

### Performance & Accessibility
- **Lighthouse Score ≥90**: Optimized for performance, accessibility, best practices, and SEO
- **WCAG 2.1 Compliant**: Proper contrast ratios, aria-labels, and touch targets
- **Memoized Components**: Optimized re-renders with React.memo and useMemo
- **Code Splitting**: Automatic code splitting with Next.js App Router

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 (Strict Mode) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Redux Toolkit 2.2 |
| **Data Fetching** | TanStack React Query 5 |
| **UI Components** | Radix UI (Dialog, Popover, Tooltip) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Architecture** | Atomic Design Pattern |

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ or **yarn** 1.22+ or **pnpm** 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dock-7/eterna-labs-pulse.git
   cd eterna-labs-pulse
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

4. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3002)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column with dropdown selector |
| Tablet | 640px - 1023px | Single column with dropdown selector |
| Desktop | 1024px - 1310px | Single column with horizontal scroll option |
| Large Desktop | > 1310px | Three-column side-by-side layout |

## 🎨 Key Features Implementation

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

## 🔧 Configuration

### Environment Variables

No environment variables are required for the mock implementation. For production:

```env
# Optional: Add your API endpoints
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_WS_URL=wss://your-websocket.com
```

### Tailwind Configuration

Custom configuration in `tailwind.config.ts` includes:
- Custom color palette (slate-based dark theme)
- Custom breakpoints
- Animation utilities
- Scrollbar hiding utilities

## 📊 Performance Metrics

Target Lighthouse Scores:

| Metric | Target | Description |
|--------|--------|-------------|
| Performance | ≥90 | Fast loading, optimized assets |
| Accessibility | ≥90 | WCAG 2.1 compliant |
| Best Practices | ≥90 | Modern web standards |
| SEO | ≥90 | Search engine optimized |

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js and deploys

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dock-7/eterna-labs-pulse)

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by [Axiom Trade](https://axiom.trade/pulse)
- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Dock-7">Your Name</a>
</p>
