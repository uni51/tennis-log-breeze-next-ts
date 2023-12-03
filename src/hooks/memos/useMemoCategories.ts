import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { Category } from '@/types/Category'

const fetchMemoCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get('api/memos/categories')
    const categoriesObject = response.data.data

    const categoriesArray = Object.values(categoriesObject) as Category[]

    return categoriesArray
  } catch (error) {
    if (error instanceof Error) {
      // エラーハンドリング: エラーが発生した場合は適切に処理する
      throw new Error(`Failed to fetch memo categories: ${error.message}`)
    } else {
      // error is not an instance of Error
      throw new Error(`Failed to fetch memo categories: ${String(error)}`)
    }
  }
}

export const useMemoCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchMemoCategories,
    staleTime: Infinity,
  })
}
