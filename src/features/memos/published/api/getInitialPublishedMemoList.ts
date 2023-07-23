import { AxiosResponse } from 'axios'
import { apiServer } from '@/lib/utils/apiServer'

const getInitialPublishedMemoList = (apiUrl: string) => {
  const data = apiServer.get(apiUrl).then((response: AxiosResponse) => {
    return response.data
  })
  return data
}

export default getInitialPublishedMemoList
