import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { toast } from 'react-toastify'

const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response
    switch (status) {
      case 422:
        if (data.errors) {
          Object.values<string[]>(data.errors).forEach((errorMessages) => {
            errorMessages.forEach((message) => toast.error(message))
          })
        }
        break
      case 500:
        alert('システムエラーです！！')
        break
    }
  }
  return Promise.reject(error)
}

const fetchMemoDetail = async (apiUrl: string): Promise<Memo> => {
  try {
    const { data } = await apiClient.get<{ data: Memo }>(apiUrl)
    return data.data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      return handleAxiosError(error as AxiosError)
    } else {
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
