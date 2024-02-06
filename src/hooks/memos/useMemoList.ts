import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getMemoListApiUrl } from '@/lib/pagination-helper'
import { apiClient } from '@/lib/utils/apiClient'
import { UseMemoListHookProps } from '@/types/memo/MemosQueryParams'
import { MemoListReturnType } from '@/types/memoList'

const handleApiError = (err: any) => {
  if (err.response) {
    const errorMessage = err.response.data.message || 'エラーメッセージがありません'
    toast.error(`エラー: ${errorMessage}`)
  } else {
    toast.error('ネットワークエラーが発生しました')
  }
}

const fetchMemoList = async (apiUrl: string) => {
  try {
    const res = await apiClient.get(apiUrl)
    return res.data
  } catch (error) {
    handleApiError(error)
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
