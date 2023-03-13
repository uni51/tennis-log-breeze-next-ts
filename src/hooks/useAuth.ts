import { useUserState } from '../atoms/userAtom'
import { apiClient } from '../lib/utils/apiClient'

export const useAuth = () => {
  const { user, setUser } = useUserState()

  const checkLoggedIn = async (): Promise<boolean> => {
    if (user) {
      return true
    }

    try {
      const res = await apiClient.get('/api/user')
      if (!res.data.data) {
        return false
      }
      setUser(res.data.data)
      return true
    } catch {
      return false
    }
  }

  return { checkLoggedIn, user }
}
