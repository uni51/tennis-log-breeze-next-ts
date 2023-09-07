import axios from 'axios'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FROM_CLIENT_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

// ヘッダーにAuthorizationを付与すると、Sanctumの場合、
// ログアウト時に、personal_access_tokensにSQLを発行してしまう。
// apiClient.interceptors.request.use((request) => {
//   //リクエスト前に毎回idTokenを取得する
//   // const idToken = localStorage.getItem('idToken')
//   const idToken = cookie.get('appToken')
//   request.headers!.Authorization = `Bearer ${idToken}`
//   return request
// })
