import useSWR, { useSWRConfig } from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import { MemoListReturnType } from '@/types/memoList'
import { getMemoListApiUrl } from '@/lib/pagination-helper'

type Props = {
  preApiUrl: string
  pageIndex: number
  categoryNumber: number | null
}

export const useGetMemoList = ({ preApiUrl, pageIndex, categoryNumber }: Props) => {
  const { cache } = useSWRConfig()

  const apiUrl = getMemoListApiUrl({ preApiUrl, pageIndex, categoryNumber })

  const { data, error, isLoading } = useSWR<MemoListReturnType>(apiUrl, () =>
    apiClient.get(apiUrl).then((res: any) => res.data),
  )

  // キャッシュ確認時に利用
  console.log(cache.get(apiUrl))

  return {
    data,
    error,
    isLoading,
  }
}
