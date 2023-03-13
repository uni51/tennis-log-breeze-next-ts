import useSWR from 'swr'
import { apiClient } from './../lib/apiClient'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()

  const { data: user, error, mutate } = useSWR('/api/user', () =>
    apiClient
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error

        router.push('/verify-email')
      }),
  )

  const csrf = () => apiClient.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }) => {
    await csrf()

    setErrors([])

    apiClient
      .post('/register', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    apiClient
      .post('/login', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    apiClient
      .post('/forgot-password', { email })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    apiClient
      .post('/reset-password', { token: router.query.token, ...props })
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }

  const resendEmailVerification = ({ setStatus }) => {
    apiClient
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status))
  }

  const logout = async () => {
    if (!error) {
      await apiClient.post('/logout').then(() => mutate())
    }

    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated)
    if (window.location.pathname === '/verify-email' && user?.email_verified_at)
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
  }
}
