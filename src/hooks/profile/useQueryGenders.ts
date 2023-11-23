import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const fetchGenders = async (): Promise<SimpleSelect[]> => {
  const response = await apiClient.get('api/profile/gender')
  const data = response.data

  const genders = Object.entries(data).map(([id, name]) => ({
    id: Number(id),
    name: name as string,
  }))

  return genders
}

export const useQueryGenders = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['genders'],
    queryFn: fetchGenders,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
