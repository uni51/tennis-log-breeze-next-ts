import { apiServer } from '@/lib/utils/apiServer'
import { AxiosResponse } from 'axios'

const getInitialPublishedMemoList = () => {
  const data = apiServer.get(`/api/public/memos`).then((response: AxiosResponse) => {
    return response.data
  })
  return data
}

export default getInitialPublishedMemoList
