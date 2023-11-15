import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' // Import react-query hooks
import { firebaseConfig } from '@/lib/firebase-helpers'
import { fetchWithParams } from '@/lib/user'
import { apiClient } from '@/lib/utils/apiClient'
import { User } from '@/types/User'
import { LoginError } from '@/types/authError'

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

const auth = getAuth(initializeApp(firebaseConfig))

export const useAuthQuery = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const csrf = () => apiClient.get('/auth/sanctum/csrf-cookie')

  const getAdmin = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await apiClient.get('/api/user')
      return response.data
    },
    staleTime: Infinity,
  })

  // useMutation for logging in
  const loginMutation = useMutation<void, Error, IApiRequest, unknown>({
    mutationFn: async ({ setErrors, setStatus, ...props }: IApiRequest) => {
      await csrf()
      setErrors([])
      setStatus(null)
      try {
        await apiClient.post('/auth/login', props)
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
    mutationKey: ['login'],
  })

  const logoutMutation = useMutation<void, Error, void, unknown>({
    mutationFn: async () => {
      await apiClient.post('/auth/logout')
    },
    onSuccess: async () => {
      router.push('/login')
    },
    onError: () => {
      // do something on error
    },
    onSettled: () => {
      // do something on settled
    },
    mutationKey: ['logout'],
  })

  const user = queryClient.getQueryData<User>(['user'])

  return {
    user,
    firebaseLogin: loginMutation.mutate,
  }
}
