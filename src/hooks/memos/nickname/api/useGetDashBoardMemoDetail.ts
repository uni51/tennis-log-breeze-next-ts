import useSWR from 'swr'
import { apiServer } from '@/lib/utils/apiServer'
import { Memo } from '@/types/Memo'

export const useGetNickNameMemoDetail = (apiUrl: string) => {
  const { data, error, isLoading } = useSWR<Memo>(apiUrl, () =>
    apiServer.get(apiUrl).then((res: any) => res.data.data),
  )

  return {
    data,
    error,
    isLoading,
  }
}
