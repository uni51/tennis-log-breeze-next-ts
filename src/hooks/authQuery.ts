import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { firebaseConfig } from '@/lib/firebase-helpers'
import { apiClient } from '@/lib/utils/apiClient'
import { User } from '@/types/User'

// Type for authentication middleware
type AuthMiddleware = 'auth' | 'guest'

// Interface for useAuthQuery hook
interface IUseAuth {
  middleware: AuthMiddleware
  redirectIfAuthenticated?: string
}

// Interface for API request parameters
interface IApiRequest {
  setErrors: (errors: string[]) => void
  setStatus: React.Dispatch<React.SetStateAction<any | null>>
  [key: string]: any
}

// Initialize Firebase auth
const auth = getAuth(initializeApp(firebaseConfig))

// Custom hook for authentication queries
export const useAuthQuery = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  // Function to get CSRF cookie
  const csrf = () => apiClient.get('/auth/sanctum/csrf-cookie')

  // Query to get user data
  const getUser = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await apiClient.get('/api/user')
      return response.data
    },
    staleTime: Infinity,
  })

  // useMutation for logging in
  const loginMutation = useMutation<void, Error, IApiRequest, unknown>({
    mutationFn: async ({ idToken, setErrors, setStatus }: IApiRequest) => {
      await csrf()
      setErrors([])
      setStatus(null)
      try {
        console.log(idToken)
        await apiClient.post('/auth/login', { idToken })
      } catch (error: any) {
        if (error.response.status !== 422) throw error
        setErrors(error.response.data.errors)
      }
    },
    onSuccess: async () => {
      router.push('/dashboard')
    },
    onError: (error) => {
      // Handle error
      // do something on error
    },
    onSettled: () => {
      // Handle settled
      // do something on settled
    },
    mutationKey: ['login'],
  })

  // useMutation for logging out
  const logoutMutation = useMutation<void, Error, void, unknown>({
    mutationFn: async () => {
      await apiClient.post('/auth/logout')
    },
    onSuccess: async () => {
      sessionStorage.removeItem('token')
      router.push('/login')
    },
    onError: () => {
      // Handle error
      // do something on error
    },
    onSettled: () => {
      // Handle settled
      // do something on settled
    },
    mutationKey: ['logout'],
  })

  // Get user data from the query client
  const user = queryClient.getQueryData<User>(['user'])

  // Function to handle login
  const handleLogin = async (idToken: string) => {
    const setErrors = (errors: string[]) => {
      // Handle errors
      // do something with errors
    }
    const setStatus = (status: string | null) => {
      // Handle status
      // do something with status
    }

    // Call the login mutation
    await loginMutation.mutateAsync({ idToken, setErrors, setStatus })
  }

  // useEffect(() => {
  //   if (middleware === 'guest' && redirectIfAuthenticated && user)
  //     router.push(redirectIfAuthenticated)
  // }, [middleware, redirectIfAuthenticated, router, user])

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
  }

  const renderLogin = () => {
    window.location.pathname = '/login'
  }

  // Return the necessary values and functions
  return {
    user,
    getUser,
    renderLogin,
    firebaseLogin: handleLogin,
    firebaseLogout: handleLogout,
  }
}
