# Deployment Guide

## Vercel Deployment

### Step 1: Prepare Repository
1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Axiom Trade Token Discovery Table"
   ```

2. Push to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### Step 3: Verify Deployment

- Check the deployment URL provided by Vercel
- Test all features:
  - Token table loading
  - Filtering and sorting
  - Token details modal
  - Responsive design (test on mobile)
  - Real-time price updates

## Environment Variables

No environment variables are required for the current implementation. The app uses mock data.

## Performance Optimization

The app is optimized for:
- Fast initial load
- Smooth interactions (<100ms)
- Lighthouse score ≥90

## Responsive Testing

Test the application at these breakpoints:
- 320px (mobile - smallest)
- 640px (tablet)
- 768px (tablet landscape)
- 1024px (desktop)
- 1280px+ (large desktop)

## Video Recording

For the 1-2 minute demo video, showcase:
1. Initial page load with skeleton states
2. Token table with all columns
3. Filtering by status (New, Final Stretch, Migrated)
4. Sorting by different columns
5. Clicking a token to open details modal
6. Real-time price updates with color transitions
7. Responsive design on mobile viewport
