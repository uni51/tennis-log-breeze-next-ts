import useSWR from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import { useSWRConfig } from 'swr'

type ReturnType = DataWithPagination<Memo[]>

export const useGetMemoList = (pageIndex: number) => {
  const { cache } = useSWRConfig()

  const { data, error, isLoading } = useSWR<ReturnType>(`/api/public/memos?page=${pageIndex}`, () =>
    apiClient.get(`/api/public/memos?page=${pageIndex}`).then((res: any) => res.data),
  )

  // キャッシュ確認時に利用
  // console.log(cache.get(`/api/public/memos?page=${pageIndex}`))

  return {
    data,
    error,
    isLoading,
  }
}
