import { apiClient } from '@/lib/utils/apiClient'
import { PlayFrequency } from '@/types/playFrequency'

export const UsePlayFrequency = async (): Promise<PlayFrequency[]> => {
  const responsePlayFrequencies = await apiClient.get('api/frequency')
  let objectResponsePlayFrequencies = Object.entries(responsePlayFrequencies.data)

  const arrayResponsePlayFrequencies = objectResponsePlayFrequencies.map(
    (item: [string, unknown]) => {
      return Object.assign({ id: Number(item[0]), name: item[1] })
    },
  )

  return arrayResponsePlayFrequencies
}
