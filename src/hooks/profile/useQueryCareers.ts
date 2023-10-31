import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const fetchCareers = async (): Promise<SimpleSelect[]> => {
  const response = await apiClient.get('api/profile/career')
  const data = response.data

  const careers = Object.entries(data).map(([id, name]) => ({
    id: Number(id),
    name: name as string,
  }))

  return careers
}

export const useQueryCareers = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['careers'],
    queryFn: fetchCareers,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
