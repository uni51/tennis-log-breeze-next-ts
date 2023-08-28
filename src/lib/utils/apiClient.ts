import axios from 'axios'
import { parseCookies } from 'nookies'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FROM_CLIENT_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use((request) => {
  //リクエスト前に毎回idTokenを取得する
  const cookie = parseCookies()
  console.log(cookie)
  // const idToken = sessionStorage.getItem('idToken')
  // const idToken = localStorage.getItem('idToken')
  const idToken = cookie.appToken
  request.headers!.Authorization = `Bearer ${idToken}`
  return request
})
