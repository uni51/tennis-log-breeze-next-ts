import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'

const useCheckLoggedIn = () => {
  const { data: userData, isLoading, isError } = useQuery<boolean, Error>({
    queryKey: ['isLoggedIn'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/api/user')
        return Boolean(res.data.data)
      } catch {
        return false
      }
    },
  })

  const checkLoggedIn = (): boolean => {
    // If data is still loading, assume user is logged in
    if (isLoading) {
      return true
    }

    // If there's an error or the user is not logged in, return false
    return !isError && Boolean(userData)
  }

  return checkLoggedIn
}

export default useCheckLoggedIn
