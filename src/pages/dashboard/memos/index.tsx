import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import DashboardMemoList from '@/features/memos/dashboard/components/DashboardMemoList'
import { useAuth } from '@/hooks/auth'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { DashboardMemoQueryParams } from '@/types/memo/MemosQueryParams'

const DashboardMemoIndex: NextPage = () => {
  const router = useRouter()
  const { user, isAuthLoading } = useAuth({ middleware: 'auth' })
  const [isLoading, setIsLoading] = useState(true)
  const [queryParams, setQueryParams] = useState<DashboardMemoQueryParams>({
    page: 1,
    category: undefined,
    tag: undefined,
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
      const { page, category, tag } = router.query
      setQueryParams({
        page: Number(page) || 1,
        category: category ? Number(category) : undefined,
        tag: typeof tag === 'string' ? tag : tag?.join(''),
      })
    }
  }, [router.isReady, router.query, isAuthLoading, user])

  if (isLoading) return <Loading />

  const headLine = user?.data?.nickname
    ? `${user.data.nickname}さんのメモ一覧`
    : 'あなたが作成したメモ一覧'

  const categoryText = queryParams.category
    ? getMemosListByCategoryHeadLineTitle(queryParams.category)
    : ''

  return (
    <AuthGuard>
      <Head>
        <title>{headLine}</title>
      </Head>
      <AppLayout
        header={
          <>
            <h2 className='font-semibold text-xl text-gray-800 leading-tight inline-block mr-4'>
              {headLine}
            </h2>
            {categoryText && <span className='text-gray-800 font-bold mr-4'>{categoryText}</span>}
            {queryParams.tag && <span className='text-gray-800 font-bold'>#{queryParams.tag}</span>}
          </>
        }
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <DashboardMemoList
            page={queryParams.page}
            category={queryParams.category}
            tag={queryParams.tag}
          />
          {/* TODO: 最後のページの場合のロジックの実装を検討 */}
          <div style={{ display: 'none' }}>
            <DashboardMemoList
              page={queryParams.page + 1}
              category={queryParams.category}
              tag={queryParams.tag}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoIndex
