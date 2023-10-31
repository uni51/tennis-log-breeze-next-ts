import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const getCareers = async (): Promise<SimpleSelect[]> => {
  const responseCareers = await apiClient.get('api/career')
  let objectResponseCareers = Object.entries(responseCareers.data)

  const arrayResponseCareers = objectResponseCareers.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseCareers
}

export const useQueryProfileCareers = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['careers'],
    queryFn: getCareers,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
