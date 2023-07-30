import axios from 'axios'
import { getAuth } from '@firebase/auth'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FROM_CLIENT_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(async (request) => {
  //リクエスト前に毎回idTokenを取得する
  const idToken = await getAuth().currentUser?.getIdToken()
  //console.log(currentUser.accessToken)
  request.headers.Authorization = idToken
  return request
})
