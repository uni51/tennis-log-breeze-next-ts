import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import { apiClient } from '@/lib/utils/apiClient'

declare type AuthMiddleware = 'auth' | 'guest'

interface IUseAuth {
  middleware: AuthMiddleware
  redirectIfAuthenticated?: string
}

interface IApiRequest {
  setErrors: React.Dispatch<React.SetStateAction<never[]>>
  setStatus: React.Dispatch<React.SetStateAction<any | null>>
  [key: string]: any
}

interface IApiRequestLogin {
  setErrors: (errors: LoginError) => void
  setStatus: React.Dispatch<React.SetStateAction<any | null>>
  [key: string]: any
}

export interface User {
  data?: {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
  }
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
  const router = useRouter()

  const { data: user, error, mutate } = useSWR<User>('/api/user', () =>
    apiClient
      .get('/api/user')
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error

        router.push('/verify-email')
      }),
  )

  const csrf = () => apiClient.get('/auth/sanctum/csrf-cookie')

  const register = async (args: IApiRequest) => {
    const { setErrors, ...props } = args

    await csrf()

    setErrors([])

    apiClient
      .post('/register', props)
      // useSWR の mutate は、keyが対応付けられているため、keyの指定は必要ない
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async (args: IApiRequestLogin) => {
    const { setErrors, setStatus, ...props } = args

    await csrf()

    setErrors({ email: undefined, password: undefined })
    setStatus(null)

    apiClient
      .post('/auth/login', props)
      // useSWR の mutate は、keyが対応付けられているため、keyの指定は必要ない
      .then(() => mutate())
      .catch((error) => {
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
      .post('/forgot-password', { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
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
      .post('/reset-password', { token: router.query.token, ...props })
      .then((response) => router.push('/login?reset=' + btoa(response.data.status)))
      .catch((error) => {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }

  const resendEmailVerification = (args: IApiRequest) => {
    const { setStatus } = args
    apiClient
      .post('/email/verification-notification')
      .then((response) => setStatus(response.data.status))
  }

  const logout = async () => {
    if (!error) {
      // useSWR の mutate は、keyが対応付けられているため、keyの指定は必要ない
      await apiClient.post('/auth/logout').then(() => mutate())
    }

    window.location.pathname = '/login'
  }

  const checkLoggedIn = async (): Promise<boolean> => {
    if (user) {
      return true
    }

    try {
      const res = await apiClient.get('/api/user')
      if (!res.data.data) {
        return false
      }
      // console.log('checkLoggedIn')
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated)
    if (
      window.location.pathname === '/verify-email' &&
      redirectIfAuthenticated &&
      user?.data?.email_verified_at
    )
      router.push(redirectIfAuthenticated)
    if (middleware === 'auth' && error) logout()
  }, [user, error])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    checkLoggedIn,
  }
}
