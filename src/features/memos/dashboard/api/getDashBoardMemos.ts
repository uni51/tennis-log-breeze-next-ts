import useSWR from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

export const getDashBoardMemoList = (apiUrl: string) => {
  const { data, error, isLoading } = useSWR<ReturnType>(apiUrl, () =>
    apiClient.get(apiUrl).then((res: any) => res.data),
  )

  return {
    data,
    error,
    isLoading,
  }
}
