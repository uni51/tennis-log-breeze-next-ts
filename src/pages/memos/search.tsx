// pages/memos/search.tsx

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSearchStore from '@/stores/searchStore'

const MemoSearchResult = () => {
  const router = useRouter()
  const responseData = useSearchStore((state) => state.responseData) // Use responseData instead of searchData

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
      <h1>Public Memos Search Results</h1>
      <div>Public Memos Search query: {router.query.q}</div>
      <div>Public Memos Search data: {JSON.stringify(responseData)}</div>
    </div>
  )
}

export default MemoSearchResult