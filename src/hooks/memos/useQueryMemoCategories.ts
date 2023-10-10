import { apiClient } from '@/lib/utils/apiClient'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@/types/Category'

const getCatgeories = async () => {
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
    // staleTime: 60000, // 60秒
    staleTime: Infinity,
  })
}
