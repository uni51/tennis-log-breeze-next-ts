import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { simpleUser } from '@/types/User'

const getMemos = async (): Promise<Memo[]> => {
  const responseMemos = await apiClient.get('/api/admin/memos')
  const objectResponseMemos = responseMemos.data.data

  const arrayResponseMemos = Object.values(objectResponseMemos) as Memo[]

  return arrayResponseMemos
}

export const useAdminMemoList = () => {
  return useQuery<Memo[], Error>({
    queryKey: ['adminMemos'],
    queryFn: getMemos,
    staleTime: 0,
  })
}
