import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import { Loading } from '@/components/Loading'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import { AdminAuthGuard } from '@/features/admin/auth/components/AdminAuthGuard'
import { onError } from '@/lib/error-helper'
import { MemoQueryParams } from '@/types/memo/MemosQueryParams'
import AdminMemoReviewList from '@/features/admin/memos/components/AdminMemoReviewList'

const AdminMemosWaitingReviewIndex: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [queryParams, setQueryParams] = useState<MemoQueryParams>({
    page: 1,
    category: undefined,
    tag: undefined,
  })

  useEffect(() => {
    if (router.isReady) {
      const { page, category, tag } = router.query
      setQueryParams({
        page: Number(page) || 1,
        category: category ? Number(category) : undefined,
        tag: typeof tag === 'string' ? tag : tag?.join(''),
      })
    }
    setIsLoading(false)
  }, [router.isReady, router.query])

  if (isLoading) return <Loading />

  const headLine = '管理者レビュー待ちのメモ一覧'

  return (
    <AdminAuthGuard>
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>
      <AdminAppLayout
        header={
          <>
            <h2 className='font-semibold text-xl text-gray-800 leading-tight mb-7'>
              管理者画面 Dashboard
            </h2>
            <h3 className='font-semibold text-xl text-gray-800 leading-tight inline-block mr-4'>
              {headLine}
            </h3>
          </>
        }
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <AdminMemoReviewList
            page={queryParams.page}
            category={queryParams.category}
            tag={queryParams.tag}
          />
        </ErrorBoundary>
      </AdminAppLayout>
    </AdminAuthGuard>
  )
}

export default AdminMemosWaitingReviewIndex
