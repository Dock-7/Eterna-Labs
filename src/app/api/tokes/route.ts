/**
 * API route for fetching tokens
 */

import { NextResponse } from 'next/server';
import { generateMockTokens } from '@/src/lib/api';

export async function GET() {
  try {
    const tokens = generateMockTokens();
    return NextResponse.json({ tokens });
  } catch (error) {
    console.error('Error in tokens API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}
