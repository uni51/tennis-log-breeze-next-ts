import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const fetchTennisLevels = async (): Promise<SimpleSelect[]> => {
  const response = await apiClient.get('api/profile/tennis_level')
  const data = response.data

  const tennisLevels = Object.entries(data).map(([id, name]) => ({
    id: Number(id),
    name: name as string,
  }))

  return tennisLevels
}

export const useQueryTennisLevels = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['tennisLevels'],
    queryFn: fetchTennisLevels,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
