import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { toast } from 'react-toastify'

const fetchMemoDetail = async (apiUrl: string): Promise<any> => {
  try {
    const { data } = await apiClient.get(apiUrl)
    return data.data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 422) {
        const errors = axiosError.response?.data.errors
        Object.keys(errors).map((key: string) => {
          toast.error(errors[key][0])
        })
      }
      if (axiosError.response?.status === 500) {
        alert('システムエラーです！！')
      }
      return Promise.reject(error)
      // エラーハンドリング: エラーが発生した場合は適切に処理する
      // throw new Error(`Failed to fetch memo detail: ${error.message}`)
    } else {
      // error is not an instance of Error
      throw new Error(`Failed to fetch memo detail: ${String(error)}`)
    }
  }
}

export const useMemoDetail = (apiUrl: string) => {
  return useQuery<Memo, Error>({
    queryKey: ['memoDetail', apiUrl],
    queryFn: () => fetchMemoDetail(apiUrl),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!apiUrl,
  })
}
