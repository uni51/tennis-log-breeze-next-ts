import useSWR from 'swr'
import { apiClient } from '../lib/utils/apiClient'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useRouter } from 'next/router'

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

export const useAdminAuth = ({
  middleware,
  redirectIfAuthenticated,
}: IUseAuth) => {
  const router = useRouter()

  const { data: admin, error, mutate } = useSWR<Admin>('/api/admin', () =>
    apiClient
      .get('/api/admin')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error

        router.push('/admin/verify-email')
      }),
  )

  const csrf = () => apiClient.get('/sanctum/csrf-cookie')

  const register = async (args: IApiRequest) => {
    const { setErrors, ...props } = args

    await csrf()

    setErrors([])

    apiClient
      .post('/admin/register', props)
      .then(() => mutate()) // データを更新
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async (args: IApiRequest) => {
    const { setErrors, setStatus, ...props } = args

    await csrf()

    setErrors([])
    setStatus(null)

    apiClient
      .post('/admin/login', props)
      .then(() => mutate()) // データを更新
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }

  const forgotPassword = async (args: IApiRequest) => {
    const { setErrors, setStatus, email } = args

    await csrf()

    setErrors([])
    setStatus(null)

    apiClient
      .post('/admin/forgot-password', { email })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const resetPassword = async (args: IApiRequest) => {
    const { setErrors, setStatus, ...props } = args
    await csrf()

    setErrors([])
    setStatus(null)

    apiClient
      .post('/admin/reset-password', { token: router.query.token, ...props })
      .then(response =>
        router.push('/admin/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }

  const resendEmailVerification = (args: IApiRequest) => {
    const { setStatus } = args

    apiClient
      .post('/admin/email/verification-notification')
      .then(response => setStatus(response.data.status))
  }

  const logout = async () => {
    if (!error) {
      await apiClient
        .post('/admin/logout')
        .then(() => mutate()) // データを更新
        .catch(error => {
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
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  }
}
