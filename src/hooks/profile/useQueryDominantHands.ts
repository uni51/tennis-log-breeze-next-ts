import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const fetchDominantHands = async (): Promise<SimpleSelect[]> => {
  const response = await apiClient.get('api/profile/dominant_hand')
  const data = response.data

  const dominantHands = Object.entries(data).map(([id, name]) => ({
    id: Number(id),
    name: name as string,
  }))

  return dominantHands
}

export const useQueryDominantHands = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['dominantHands'],
    queryFn: fetchDominantHands,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
