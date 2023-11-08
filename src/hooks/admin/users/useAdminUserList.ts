import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { simpleUser } from '@/types/User'

const getUsers = async (): Promise<simpleUser[]> => {
  const responseUsers = await apiClient.get('/api/admin/users')
  const objectResponseUsers = responseUsers.data.data

  const arrayResponseUsers = Object.values(objectResponseUsers) as simpleUser[]

  return arrayResponseUsers
}

export const useAdminUserList = () => {
  return useQuery<simpleUser[], Error>({
    queryKey: ['adminUsers'],
    queryFn: getUsers,
    staleTime: 0,
  })
}
