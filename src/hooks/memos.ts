import useSWR from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

const APIURL = '/api/dashboard/memos'

export const useDashBoardMemoList = () => {
  const { data, error } = useSWR<ReturnType>(APIURL, () =>
    apiClient.get(APIURL).then((res: any) => res.data),
  )

  return {
    data,
    error,
  }
}
