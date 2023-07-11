import useSWR from 'swr'
import axios from 'axios'
import { DataWithPagination } from '@/types/dataWithPagination'
import { Memo } from '@/types/Memo'
import { apiClient } from '@/lib/utils/apiClient'

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
