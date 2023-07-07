import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, onError } from '@/components/ErrorBoundaryUtils'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import DashboardMemoQueryList from '@/components/features/memos/components/DashboardMemoQueryList'
import { useAuth } from '@/hooks/auth'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'

/* Dashboard（マイページ）のメモ一覧ページ */
const DashboardMemoList: NextPage = () => {
  const router = useRouter()
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })

  const { category } = router.query
  const categoryNumber = category === undefined ? undefined : Number(category)

  // state定義
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
  }, [categoryNumber])

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
        <DashboardMemoQueryList />
      </ErrorBoundary>
    </AppLayout>
  )
}

export default DashboardMemoList
