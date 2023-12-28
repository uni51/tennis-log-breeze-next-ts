import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Status } from '@/types/Status'

const convertToStatusArray = (response: Record<string, unknown>): Status[] => {
  return Object.entries(response).map(([id, name]) => ({
    id: Number(id),
    name: name as string,
  }))
}

const fetchMemoStatuses = async (): Promise<Status[]> => {
  try {
    const res = await apiClient.get('api/memos/status')
    return convertToStatusArray(res.data)
  } catch (error) {
    if (error instanceof Error) {
      // エラーハンドリング: エラーが発生した場合は適切に処理する
      throw new Error(`Failed to fetch memo statuses: ${error.message}`)
    } else {
      // error is not an instance of Error
      throw new Error(`Failed to fetch memo statuses: ${String(error)}`)
    }
  }
}

export const useMemoStatuses = () => {
  return useQuery<Status[], Error>({
    queryKey: ['statuses'],
    queryFn: fetchMemoStatuses,
    // staleTime: 60000, // 60秒
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
