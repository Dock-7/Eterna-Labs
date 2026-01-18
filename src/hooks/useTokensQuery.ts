/**
 * React Query hook for fetching tokens
 */

import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '@/src/lib/api';
import { Token } from '@/src/lib/types';

export function useTokensQuery() {
  return useQuery<Token[]>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
}
