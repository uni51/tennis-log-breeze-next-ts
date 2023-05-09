import useSWR from 'swr'
import { apiClient } from '../lib/utils/apiClient'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAdminAuth = ({
  middleware,
  redirectIfAuthenticated,
}: { middleware?: string; redirectIfAuthenticated?: string } = {}) => {
  const router = useRouter()

  const { data: admin, error, mutate } = useSWR('/api/admin', () =>
    apiClient
      .get('/api/admin')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error

        router.push('/admin/verify-email')
      }),
  )

  const csrf = () => apiClient.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }) => {
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

  const login = async ({ setErrors, setStatus, ...props }) => {
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

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
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

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
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

  const resendEmailVerification = ({ setStatus }) => {
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
