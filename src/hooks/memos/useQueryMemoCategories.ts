import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Category } from '@/types/Category'

const getCatgeories = async (): Promise<Category[]> => {
  const responseCategories = await apiClient.get('api/memos/categories')
  let objectResponseCategories = responseCategories.data.data

  const arrayResponseCategories = Object.keys(objectResponseCategories).map(function (key) {
    return objectResponseCategories[key]
  })

  return arrayResponseCategories
}

export const useQueryMemoCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getCatgeories,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでのfetchが自動的に行われない
  })
}
