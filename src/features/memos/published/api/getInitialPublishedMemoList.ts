import { apiServer } from '@/lib/utils/apiServer'
import { AxiosResponse } from 'axios'

const getInitialPublishedMemoList = (apiUrl: string) => {
  const data = apiServer.get(apiUrl).then((response: AxiosResponse) => {
    return response.data
  })
  return data
}

export default getInitialPublishedMemoList
