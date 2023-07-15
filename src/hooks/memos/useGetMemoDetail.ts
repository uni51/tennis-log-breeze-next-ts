import useSWR from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

export const useGetMemoDetail = (apiUrl: string) => {
  const { data, error, isLoading } = useSWR<Memo>(apiUrl, () =>
    apiClient.get(apiUrl).then((res: any) => res.data.data),
  )

  return {
    data,
    error,
    isLoading,
  }
}