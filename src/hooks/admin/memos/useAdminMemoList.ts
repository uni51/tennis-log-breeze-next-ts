import { useQuery } from '@tanstack/react-query'
import { getMemoListApiUrl } from '@/lib/pagination-helper'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { MemoListReturnType } from '@/types/memoList'

type Props = {
  preApiUrl: string
  pageIndex: number
  categoryNumber: number | null
}

const fetchAdminMemoList = async (apiUrl: string): Promise<MemoListReturnType> => {
  try {
    const res = await apiClient.get(apiUrl)
    return res.data
  } catch (error) {
    if (error instanceof Error) {
      // エラーハンドリング: エラーが発生した場合は適切に処理する
      throw new Error(`Failed to fetch admin memo list: ${error.message}`)
    } else {
      // error is not an instance of Error
      throw new Error(`Failed to fetch admin memo list: ${String(error)}`)
    }
  }
}

export const useAdminMemoList = ({ preApiUrl, pageIndex, categoryNumber }: Props) => {
  const apiUrl = getMemoListApiUrl({ preApiUrl, pageIndex, categoryNumber })

  return useQuery<MemoListReturnType, Error>({
    queryKey: ['adminMemoList', apiUrl], // データの重複取得を避けるためにqueryKeyに依存変数を含める
    queryFn: () => fetchAdminMemoList(apiUrl),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // 非同期操作が完了する前にコンポーネントがアンマウントされた場合のキャンセル
    enabled: !!apiUrl, // apiUrlが存在する場合にのみクエリを有効にする
  })
}
