import { apiClient } from '@/lib/utils/apiClient'
import { Status } from '@/types/Status'

export const UseCareer = async (): Promise<Status[]> => {
  const responseStatuses = await apiClient.get('api/career')
  let objectResponseStatuses = Object.entries(responseStatuses.data)

  const arrayResponseStatuses = objectResponseStatuses.map((item: [string, unknown]) => {
    return Object.assign({ id: item[0], name: item[1] })
  })

  return arrayResponseStatuses
}
