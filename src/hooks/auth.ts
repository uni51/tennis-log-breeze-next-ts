import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { apiClient } from '@/lib/utils/apiClient'
import { User } from '@/types/User'

// Type for authentication middleware
type AuthMiddleware = 'auth' | 'guest'

// Custom hook for authentication queries
export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware: AuthMiddleware
  redirectIfAuthenticated?: string
}) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  // Query to get user data
  const getUser = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await apiClient.get('/api/user')
      return response.data
    },
    staleTime: Infinity,
  })

  const isAuthLoading = getUser.isLoading

  // useMutation for logging in
  const loginMutation = useMutation<void, Error, { idToken: string }, unknown>({
    mutationFn: async ({ idToken }) => {
      await apiClient.get('/auth/sanctum/csrf-cookie')
      await apiClient.post('/auth/login', { idToken })
    },
    onSuccess: () => {
      router.push('/dashboard')
    },
    onError: (error) => {
      // Improved error handling
      if (error instanceof Error) {
        console.error('Login error:', error.message)
      }
    },
    mutationKey: ['login'],
  })

  // useMutation for logging out
  const logoutMutation = useMutation<void, Error, void, unknown>({
    mutationFn: async () => {
      await apiClient.post('/auth/logout')
    },
    onSuccess: () => {
      sessionStorage.removeItem('token')
      router.push('/login')
    },
    mutationKey: ['logout'],
  })

  const user = queryClient.getQueryData<User>(['user'])

  const handleLogin = async (idToken: string) => {
    await loginMutation.mutateAsync({ idToken })
  }

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
  }

  const renderLogin = () => {
    window.location.pathname = '/login'
  }

  return {
    user,
    isAuthLoading,
    getUser,
    renderLogin,
    firebaseLogin: handleLogin,
    firebaseLogout: handleLogout,
  }
}
