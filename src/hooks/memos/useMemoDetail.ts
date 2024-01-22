import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { handleAxiosError } from '@/lib/utils/errorHandling'

const fetchMemoDetail = async (apiUrl: string): Promise<Memo> => {
  try {
    const { data } = await apiClient.get<{ data: Memo }>(apiUrl)
    return data.data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      return handleAxiosError(error as AxiosError)
    } else {
      throw new Error(`Failed to fetch memo detail: ${String(error)}`)
    }
  }
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
