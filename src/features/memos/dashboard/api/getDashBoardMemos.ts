import useSWR from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import { API_URL_DASHBOARD_MEMOS } from '@/constants/ApiUrlConst'

type ReturnType = DataWithPagination<Memo[]>

export const getDashBoardMemoList = () => {
  const { data, error, isLoading } = useSWR<ReturnType>(API_URL_DASHBOARD_MEMOS, () =>
    apiClient.get(API_URL_DASHBOARD_MEMOS).then((res: any) => res.data),
  )

  return {
    data,
    error,
    isLoading,
  }
}
