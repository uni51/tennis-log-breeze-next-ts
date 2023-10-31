import { apiClient } from '@/lib/utils/apiClient'
import { Career } from '@/types/profile/Career'

export const UseCareer = async (): Promise<Career[]> => {
  const responseCareers = await apiClient.get('api/career')
  let objectResponseCareers = Object.entries(responseCareers.data)

  const arrayResponseCareers = objectResponseCareers.map((item: [string, unknown]) => {
    return Object.assign({ id: Number(item[0]), name: item[1] })
  })

  return arrayResponseCareers
}
