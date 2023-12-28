import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { SimpleSelect } from '@/types/form/SimpleSelect'

const convertToSimpleSelectArray = (data: Record<string, unknown>): SimpleSelect[] => {
  return Object.entries(data).map(([id, name]) => ({
    id: Number(id),
    name: name as string,
  }))
}

const fetchTennisLevels = async (): Promise<SimpleSelect[]> => {
  try {
    const response = await apiClient.get('api/profile/tennis_level')
    const data = response.data
    return convertToSimpleSelectArray(data)
  } catch (error) {
    if (error instanceof Error) {
      // エラーハンドリング: エラーが発生した場合は適切に処理する
      throw new Error(`Failed to fetch tennis levels: ${error.message}`)
    } else {
      // error is not an instance of Error
      throw new Error(`Failed to fetch tennis levels: ${String(error)}`)
    }
  }
}

export const useTennisLevels = () => {
  return useQuery<SimpleSelect[], Error>({
    queryKey: ['tennisLevels'],
    queryFn: fetchTennisLevels,
    staleTime: Infinity, // キャッシュは常に新しいものとみなされるため、バックグラウンドでの fetch が自動的に行われない
  })
}
