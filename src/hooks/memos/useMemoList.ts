import useSWR from 'swr'
import { getMemoListApiUrl } from '@/lib/pagination-helper'
import { apiClient } from '@/lib/utils/apiClient'
import { MemoListReturnType } from '@/types/memoList'

type Props = {
  preApiUrl: string
  pageIndex: number
  categoryNumber: number | null
}

export const useMemoList = ({ preApiUrl, pageIndex, categoryNumber }: Props) => {
  // const { cache } = useSWRConfig()

  const apiUrl = getMemoListApiUrl({ preApiUrl, pageIndex, categoryNumber })

  const { data, error, isLoading } = useSWR<MemoListReturnType>(
    apiUrl,
    () => apiClient.get(apiUrl).then((res: any) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // キャッシュ確認時に利用
  // console.log(cache.get(apiUrl))

  return {
    data,
    error,
    isLoading,
  }
}
