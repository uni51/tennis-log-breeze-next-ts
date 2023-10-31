import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const getGenders = async (): Promise<SimpleSelect[]> => {
  const responseGenders = await apiClient.get('api/gender')
  let objectResponseGenders = Object.entries(responseGenders.data)

  const arrayResponseGenders = objectResponseGenders.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseGenders
}

export const useQueryGenders = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['genders'],
    queryFn: getGenders,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
