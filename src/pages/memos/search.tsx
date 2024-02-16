// 必要なインポートのみを保持
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import DashboardSearchMemoList from '@/features/memos/dashboard/components/DashboardSearchMemoList'
import { useAuth } from '@/hooks/auth'
import useSearchStore from '@/stores/searchStore'
import { SearchMemoListParams } from '@/types/memo/MemosQueryParams'

const SearchPublicMemoIndex: NextPage = () => {
  const router = useRouter()
  const { user, isAuthLoading } = useAuth({ middleware: 'auth' })
  const [isLoading, setIsLoading] = useState(true)
  const keyword = useSearchStore((state) => state.keyword)

  const [queryParams, setQueryParams] = useState<SearchMemoListParams>({
    page: 1,
    keyword: undefined,
  })

  useEffect(() => {
    if (!isAuthLoading) {
      if (!user) {
        router.push('/login')
        return
      }
      setIsLoading(false)
    }

    if (router.isReady) {
      const { page } = router.query
      setQueryParams({
        page: Number(page) || 1,
        keyword: keyword,
      })
    }
  }, [isAuthLoading, user, router])

  useEffect(() => {
    return () => useSearchStore.getState().clearKeyword()
  }, [])

  if (isLoading) return <Loading />

  return (
    <AuthGuard>
      <Head>
        <title>Dashboard - メモの検索結果</title>
      </Head>
      <AppLayout
        header={
          <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
            Dashboard - メモの検索結果
          </h2>
        }
      >
        <DashboardSearchMemoList page={queryParams.page} keyword={queryParams.keyword} />
      </AppLayout>
    </AuthGuard>
  )
}

export default SearchPublicMemoIndex
