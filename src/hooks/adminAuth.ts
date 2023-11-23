import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import { apiClient } from '../lib/utils/apiClient'

declare type AdminAuthMiddleware = 'adminAuth' | 'guest'

interface IUseAuth {
  middleware: AdminAuthMiddleware
  redirectIfAuthenticated?: string
}

interface IApiRequest {
  setErrors: React.Dispatch<React.SetStateAction<never[]>>
  setStatus: React.Dispatch<React.SetStateAction<any | null>>
  [key: string]: any
}

export interface Admin {
  id?: number
  name?: string
  email?: string
  email_verified_at?: string
  must_verify_email?: boolean // this is custom attribute
  created_at?: string
  updated_at?: string
}

export const useAdminAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
  const router = useRouter()

  const { data: admin, error, mutate } = useSWR<Admin>('/api/admin', () =>
    apiClient
      .get('/api/admin')
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error

        router.push('/admin/verify-email')
      }),
  )

  const csrf = () => apiClient.get('/auth/sanctum/csrf-cookie')

  const login = async (args: IApiRequest) => {
    const { setErrors, setStatus, ...props } = args

    await csrf()

    setErrors([])
    setStatus(null)

    apiClient
      .post('/admin/login', props)
      .then(() => mutate()) // データを更新
      .catch((error) => {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }

  const logout = async () => {
    if (!error) {
      await apiClient
        .post('/admin/logout')
        .then(() => mutate()) // データを更新
        .catch((error) => {
          console.log(error)
        })
    }

    window.location.pathname = '/admin/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && admin)
      router.push(redirectIfAuthenticated)
    if (
      window.location.pathname === '/admin/verify-email' &&
      redirectIfAuthenticated &&
      admin?.email_verified_at
    )
      router.push(redirectIfAuthenticated)
    if (middleware === 'adminAuth' && error) logout()
  }, [admin, error])

  return {
    admin,
    login,
    logout,
  }
}
