import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

const fetchMemoDetail = async (apiUrl: string): Promise<Memo> => {
  const { data } = await apiClient.get(apiUrl)
  return data.data
}

export const useMemoDetail = (apiUrl: string) => {
  return useQuery<Memo, Error>({
    queryKey: ['memoDetail', apiUrl],
    queryFn: () => fetchMemoDetail(apiUrl),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!apiUrl,
  })
}
