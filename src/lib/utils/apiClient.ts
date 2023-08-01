import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import axios from 'axios'
import { firebaseConfig } from '@/lib/firebase-helpers'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FROM_CLIENT_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(async (request) => {
  //リクエスト前に毎回idTokenを取得する
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const idToken = await auth.currentUser?.getIdToken()
  //console.log(auth.currentUser.accessToken)
  request.headers!.Authorization = `Bearer ${idToken}`
  return request
})
