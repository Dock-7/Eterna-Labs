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
    staleTime: Infinity, // Never refetch - keep data static
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
