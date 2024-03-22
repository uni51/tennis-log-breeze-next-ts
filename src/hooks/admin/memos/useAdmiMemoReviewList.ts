import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { MemoListReturnType } from '@/types/memoList'
import { AxiosError } from 'axios'
import { handleAxiosError } from '@/lib/utils/errorHandling'

const getUsers = async (): Promise<MemoListReturnType> => {
  try {
    const res = await apiClient.get('/api/admin/memos/review')
    return res.data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      return handleAxiosError(error as AxiosError)
    } else {
      throw new Error(`Failed to fetch memo detail: ${String(error)}`)
    }
  }
}

export const useAdminMemoReviewList = () => {
  return useQuery<MemoListReturnType, Error>({
    queryKey: ['adminMemoReviewList'],
    queryFn: getUsers,
    staleTime: 0,
  })
}
