import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getMemoListApiUrl } from '@/lib/pagination-helper'
import { apiClient } from '@/lib/utils/apiClient'
import { handleAxiosError } from '@/lib/utils/errorHandling'
import { UseMemoListHookProps } from '@/types/memo/MemosQueryParams'
import { MemoListReturnType } from '@/types/memoList'

const fetchMemoList = async (apiUrl: string) => {
  try {
    const { data } = await apiClient.get(apiUrl)
    console.log(data)
    return data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      return handleAxiosError(error as AxiosError)
    } else {
      throw new Error(`Failed to fetch memo detail: ${String(error)}`)
    }
  }
}

export const useMemoList = ({ preApiUrl, page, category, tag }: UseMemoListHookProps) => {
  const apiUrl = getMemoListApiUrl({ preApiUrl, page, category, tag })

  return useQuery<MemoListReturnType, Error>({
    queryKey: ['memoList', apiUrl], // データの重複取得を避けるためにqueryKeyに依存変数を含める
    queryFn: () => fetchMemoList(apiUrl),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // 非同期操作が完了する前にコンポーネントがアンマウントされた場合のキャンセル
    enabled: !!apiUrl, // apiUrlが存在する場合にのみクエリを有効にする
  })
}
