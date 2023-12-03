import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

const fetchMemoDetail = async (apiUrl: string): Promise<Memo> => {
  const res = await apiClient.get(apiUrl)
  return res.data.data
}

export const useMemoDetail = (apiUrl: string) => {
  return useQuery<Memo, Error>({
    queryKey: ['memoDetail', apiUrl],
    queryFn: () => fetchMemoDetail(apiUrl),
    staleTime: 0, // 0に設定すると、常に最新のデータを取得するようにする
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!apiUrl, // apiUrlが存在する場合にのみクエリを有効にする
  })
}
