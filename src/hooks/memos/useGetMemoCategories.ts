import { apiClient } from '@/lib/utils/apiClient'
import { Category } from '@/types/Category'

export const UseGetMemoCategories = async (): Promise<Category[]> => {
  const responseCategories = await apiClient.get('api/memos/categories')
  let objectResponseCategories = responseCategories.data.data

  const arrayResponseCategories = Object.keys(objectResponseCategories).map(function (key) {
    return objectResponseCategories[key]
  })

  return arrayResponseCategories
}
