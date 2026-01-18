# Quick Start Guide

## Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features to Test

### 1. Token Table
- View all tokens with their prices, changes, volume, and market cap
- See sparkline charts for each token
- Notice status badges (New, Final Stretch, Migrated)

### 2. Filtering
- Use the search bar to filter tokens by name or symbol
- Click status buttons to filter by token status
- Multiple filters can be applied simultaneously

### 3. Sorting
- Click the "Sort" button in the top right
- Select different sort criteria (Price, Volume, Market Cap, etc.)
- Click again to toggle ascending/descending order

### 4. Token Details
- Click any token row to open the details modal
- View comprehensive token information
- See full sparkline chart
- Access pair address with external link

### 5. Real-time Updates
- Watch for price updates (simulated every 2-5 seconds)
- Notice color transitions (green for increases, red for decreases)
- Price pills flash when values change

### 6. Responsive Design
- Resize browser window to test responsive layout
- Test on mobile viewport (320px+)
- Columns adapt based on screen size
- Touch-friendly interactions on mobile

### 7. Loading States
- Refresh page to see skeleton loaders
- Notice shimmer animation on loading skeletons
- Progressive loading of token data

### 8. Error Handling
- Error boundaries catch and display errors gracefully
- API failures fall back to mock data

## Performance Tips

- All components are memoized for optimal re-rendering
- Redux selectors are optimized
- React Query handles caching and refetching
- Images and assets are optimized by Next.js

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### TypeScript Errors
- Run type check: `npx tsc --noEmit`
- Ensure all imports use correct paths

### Styling Issues
- Verify Tailwind config is correct
- Check that `globals.css` is imported in layout

## Next Steps

1. Deploy to Vercel (see DEPLOYMENT.md)
2. Record demo video showcasing all features
3. Test on various devices and browsers
4. Run Lighthouse audit for performance metrics
