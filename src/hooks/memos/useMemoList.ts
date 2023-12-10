import { useQuery } from '@tanstack/react-query'
import { getMemoListApiUrl } from '@/lib/pagination-helper'
import { apiClient } from '@/lib/utils/apiClient'
import { MemoListReturnType } from '@/types/memoList'

type Props = {
  preApiUrl: string
  pageIndex: number
  categoryId: number | null
}

const fetchMemoList = async (apiUrl: string): Promise<MemoListReturnType> => {
  try {
    const res = await apiClient.get(apiUrl)
    return res.data
  } catch (error) {
    if (error instanceof Error) {
      // エラーハンドリング: エラーが発生した場合は適切に処理する
      throw new Error(`Failed to fetch memo list: ${error.message}`)
    } else {
      // error is not an instance of Error
      throw new Error(`Failed to fetch memo list: ${String(error)}`)
    }
  }
}

export const useMemoList = ({ preApiUrl, pageIndex, categoryId }: Props) => {
  const apiUrl = getMemoListApiUrl({ preApiUrl, pageIndex, categoryId })

  return useQuery<MemoListReturnType, Error>({
    queryKey: ['memoList', apiUrl], // データの重複取得を避けるためにqueryKeyに依存変数を含める
    queryFn: () => fetchMemoList(apiUrl),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // 非同期操作が完了する前にコンポーネントがアンマウントされた場合のキャンセル
    enabled: !!apiUrl, // apiUrlが存在する場合にのみクエリを有効にする
  })
}
