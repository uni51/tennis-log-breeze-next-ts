import { apiClient } from '@/lib/utils/apiClient'
import { Status } from '@/types/Status'

export const UseMemoStatuses = async (): Promise<Status[]> => {
  const responseStatuses = await apiClient.get('api/memos/status')
  let objectResponseStatuses = Object.entries(responseStatuses.data)

  const arrayResponseStatuses = objectResponseStatuses.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseStatuses
}