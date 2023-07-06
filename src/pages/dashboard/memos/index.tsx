import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks/auth'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import DashboardMemoListQuery from '@/components/templates/DashboardMemoListQuery'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

type ReturnType = DataWithPagination<Memo[]>

/* Dashboard（マイページ）のメモ一覧ページ */
const DashboardMemoList: NextPage = () => {
  const router = useRouter()
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })

  const { page, category } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? undefined : Number(category)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      if (router.isReady) {
        const res: boolean = await checkLoggedIn()
        if (!res) {
          router.push('/login')
          return
        }
      }
      setIsLoading(false)
    }
    init()
  }, [pageNumber, categoryNumber])

  if (isLoading) return <Loading />

  const headline = user?.data?.name
    ? `${user.data.name}さんのメモ一覧${getMemosListByCategoryHeadLineTitle(categoryNumber)}`
    : ' 作成したメモ一覧'

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <DashboardMemoListQuery pageNumber={pageNumber} categoryNumber={categoryNumber} />
      </ErrorBoundary>
    </AppLayout>
  )
}

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <pre>react-error-boundary {error.message}</pre>
      <button type='button' onClick={resetErrorBoundary}>
        reset button
      </button>
    </>
  )
}

const onError = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}

export default DashboardMemoList
