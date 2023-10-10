import { apiClient } from '@/lib/utils/apiClient'
import { useQuery } from '@tanstack/react-query'
import { Status } from '@/types/Status'

const getStatuses = async (): Promise<Status[]> => {
  const responseStatuses = await apiClient.get('api/memos/status')
  let objectResponseStatuses = Object.entries(responseStatuses.data)

  const arrayResponseStatuses = objectResponseStatuses.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseStatuses
}

export const useQueryMemoStatuses = () => {
  return useQuery<Status[], Error>({
    queryKey: ['statuses'],
    queryFn: getStatuses,
    // staleTime: 60000, // 60秒
    staleTime: Infinity,
  })
}
