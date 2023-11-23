import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const fetchPlayFrequencies = async (): Promise<SimpleSelect[]> => {
  const response = await apiClient.get('api/profile/play_frequency')
  const data = response.data

  const playFrequencies = Object.entries(data).map(([id, name]) => ({
    id: Number(id),
    name: name as string,
  }))

  return playFrequencies
}

export const useQueryPlayFrequencies = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['playFrequencies'],
    queryFn: fetchPlayFrequencies,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
