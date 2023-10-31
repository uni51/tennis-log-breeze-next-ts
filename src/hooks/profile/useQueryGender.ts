import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Gender } from '@/types/profile/Gender'

const getGenders = async (): Promise<Gender[]> => {
  const responseGenders = await apiClient.get('api/gender')
  let objectResponseGenders = Object.entries(responseGenders.data)

  const arrayResponseGenders = objectResponseGenders.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseGenders
}

export const useQueryGenders = () => {
  return useQuery<Gender[], Error>({
    queryKey: ['genders'],
    queryFn: getGenders,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
