import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Category } from '@/types/Category'

const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('api/memos/categories')
  const categoriesObject = response.data.data

  const categoriesArray = Object.values(categoriesObject) as Category[]

  return categoriesArray
}

export const useMemoCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  })
}
