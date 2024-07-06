import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/utils/apiClient'
import { AxiosError } from 'axios'
import { handleAxiosError } from '@/lib/utils/errorHandling'
import { Profile } from '@/types/Profile'

const fetchGetProfile = async () => {
  try {
    const responseProfile = await apiClient.get('/api/profile')
    return responseProfile.data.data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      return handleAxiosError(error as AxiosError)
    } else {
      throw new Error(`Failed to fetch memo detail: ${String(error)}`)
    }
  }
}

export const useProfile = () => {
  return useQuery<Profile, Error>({
    queryKey: ['getProfile'],
    queryFn: () => fetchGetProfile(),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
