// pages/memos/search.tsx

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSearchStore from '@/stores/searchStore'

const MemoSearchResult = () => {
  const router = useRouter()
  const responseData = useSearchStore((state) => state.responseData) // Use responseData instead of searchData
  console.log('responseData', responseData)

  useEffect(() => {
    // Fetch data if necessary (you can use responseData to check if data is available)
    // Example: fetchData(router.query.q);

    // Cleanup: Clear responseData in Zustand store when component unmounts
    return () => {
      useSearchStore.getState().clearSearchData()
    }
  }, [router.query.q])

  return (
    <div>
      <h1>Search Results</h1>
      <div>Search query: {router.query.q}</div>
      <div>Search data: {JSON.stringify(responseData)}</div>
    </div>
  )
}

export default MemoSearchResult
