import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/utils/apiClient'

declare type AdminAuthMiddleware = 'adminAuth' | 'guest'

interface IUseAuth {
  middleware: AdminAuthMiddleware
  redirectIfAuthenticated?: string
}

type Admin = {
  id?: number
  name?: string
  email?: string
  email_verified_at?: string
  must_verify_email?: boolean // this is custom attribute
  created_at?: string
  updated_at?: string
}

type IApiRequest = {
  email: string
  password: string
  setErrors: (errors: string[]) => void
  setStatus: (status: string | null) => void
}

export const useAdminAuthQuery = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const csrf = async () => {
    await apiClient.get('/auth/sanctum/csrf-cookie')
  }

  const getAdmin = useQuery<Admin, Error>({
    queryKey: ['admin'],
    queryFn: async () => {
      const response = await apiClient.get('/api/admin')
      return response.data
    },
    staleTime: Infinity,
  })

  const loginMutation = useMutation<void, Error, IApiRequest, unknown>({
    mutationFn: async ({ email, password, setErrors, setStatus }: IApiRequest) => {
      await csrf()
      setErrors([])
      setStatus(null)
      try {
        await apiClient.post('/admin/login', { email, password })
      } catch (error: any) {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      }
    },
    onSuccess: async () => {
      // router.push('/admin/dashboard')
    },
    onError: (error) => {
      // do something on error
    },
    onSettled: () => {
      // do something on settled
    },
    mutationKey: ['adminLogin'],
  })

  const logoutMutation = useMutation<void, Error, void, unknown>({
    mutationFn: async () => {
      await apiClient.post('/admin/logout')
    },
    onSuccess: async () => {
      router.push('/admin/login')
    },
    onError: () => {
      // do something on error
    },
    onSettled: () => {
      // do something on settled
    },
    mutationKey: ['adminLogout'],
  })

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    const setErrors = (errors: string[]) => {
      // do something with errors
    }
    const setStatus = (status: string | null) => {
      // do something with status
    }
    await loginMutation.mutateAsync({ email, password, setErrors, setStatus })
  }

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
  }

  const admin = queryClient.getQueryData<Admin>(['admin'])

  // const isAdmin = (user: any): user is Admin => {
  //   return (
  //     user &&
  //     user.hasOwnProperty('id') &&
  //     user.hasOwnProperty('name') &&
  //     user.hasOwnProperty('email')
  //   )
  // }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && admin)
      router.push(redirectIfAuthenticated)
  }, [admin])

  return { admin, getAdmin, login: handleLogin, logout: handleLogout }
}
