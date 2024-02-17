// 必要なインポートのみを保持
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import { Loading } from '@/components/Loading'
import { AdminAuthGuard } from '@/features/admin/auth/components/AdminAuthGuard'
import useSearchStore from '@/stores/searchStore'
import { SearchMemoListParams } from '@/types/memo/MemosQueryParams'
import AdminSearchMemoList from '@/features/admin/memos/components/AdminSearchMemoList'

const DashboardSearchMemoIndex: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const keyword = useSearchStore((state) => state.keyword)

  const [queryParams, setQueryParams] = useState<SearchMemoListParams>({
    page: 1,
    keyword: undefined,
    category: undefined,
  })

  useEffect(() => {
    if (router.isReady) {
      const { page, category } = router.query
      setQueryParams({
        page: Number(page) || 1,
        keyword: keyword,
        category: category ? Number(category) : undefined,
      })
    }
    setIsLoading(false)
  }, [router.isReady, router.query])

  if (isLoading) return <Loading />

  return (
    <AdminAuthGuard>
      <Head>
        <title>Dashboard - メモの検索結果</title>
      </Head>
      <AdminAppLayout
        header={
          <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
            Dashboard - メモの検索結果
          </h2>
        }
      >
        <AdminSearchMemoList
          page={queryParams.page}
          keyword={queryParams.keyword}
          category={queryParams.category}
        />
      </AdminAppLayout>
    </AdminAuthGuard>
  )
}

export default DashboardSearchMemoIndex
