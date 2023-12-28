import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

const getMemoList = async (): Promise<Memo[]> => {
  const responseMemos = await apiClient.get('/api/admin/memos')
  const objectResponseMemos = responseMemos.data.data

  const arrayResponseMemos = Object.values(objectResponseMemos) as Memo[]

  return arrayResponseMemos
}

export const useAdminMemoList_231204bak = () => {
  return useQuery<Memo[], Error>({
    queryKey: ['adminMemoList'],
    queryFn: getMemoList,
    staleTime: 0,
  })
}
