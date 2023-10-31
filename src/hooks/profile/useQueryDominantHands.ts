import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const getDominantHands = async (): Promise<SimpleSelect[]> => {
  const responseDominantHands = await apiClient.get('api/profile/dominant_hand')
  let objectResponseDominantHands = Object.entries(responseDominantHands.data)

  const arrayResponseDominantHands = objectResponseDominantHands.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseDominantHands
}

export const useQueryDominantHands = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['dominantHands'],
    queryFn: getDominantHands,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
