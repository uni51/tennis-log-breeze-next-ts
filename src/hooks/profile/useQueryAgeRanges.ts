import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Gender } from '@/types/profile/Gender'

const getAgeRanges = async (): Promise<Gender[]> => {
  const responseAgeRanges = await apiClient.get('api/age_range')
  let objectResponseAgeRanges = Object.entries(responseAgeRanges.data)

  const arrayResponseAgeRanges = objectResponseAgeRanges.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseAgeRanges
}

export const useQueryAgeRanges = () => {
  return useQuery<Gender[], Error>({
    queryKey: ['ageRanges'],
    queryFn: getAgeRanges,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
