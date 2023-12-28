import { apiServer } from '@/lib/utils/apiServer'

const getInitialPublishedMemoList = async (apiUrl: string) => {
  try {
    const response = await apiServer.get(apiUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching initial published memo list:', error)
    throw new Error('Failed to fetch initial published memo list.')
  }
}

export default getInitialPublishedMemoList
