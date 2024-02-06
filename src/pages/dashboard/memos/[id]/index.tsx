import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import DashboardMemoDetail from '@/features/memos/dashboard/components/DashBoardMemoDetail'
import { useAuth } from '@/hooks/auth'
import { onError } from '@/lib/error-helper'
import { Memo } from '@/types/Memo'

const DashboardMemoDetailIndex: NextPage<Memo> = () => {
  const router = useRouter()
  const { id, category } = router.query
  // const { user } = useAuth({ middleware: 'auth' })
  const { user, isAuthLoading } = useAuth({ middleware: 'auth' })
  const [isUserReady, setIsUserReady] = useState(false)
  const [apiUrl, setApiUrl] = useState('')
  const [titleText, setTitleText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loginUser = user?.data
  const categoryId = category === undefined ? null : Number(category)

  useEffect(() => {
    // Fetch用URL組み立て
    if (router.isReady) {
      const apiUri = `api/dashboard/memos/${id}`
      setApiUrl(apiUri)
      setIsLoading(false)
    }
    if (!isAuthLoading) {
      setIsUserReady(true)
    }
  }, [router, isAuthLoading])

  if (isLoading) return <Loading />
  // ユーザーの状態が確定するまで待機
  if (!isUserReady) {
    return <Loading /> // または別のローディング表示
  }
  if (!user) {
    router.push('/login')
  }

  const headline = `${user?.data?.name}さんのメモ詳細`

  return (
    <AuthGuard>
      <Head>
        <title>{titleText}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <DashboardMemoDetail
            apiUrl={apiUrl}
            loginUser={loginUser}
            setTitleText={setTitleText}
            categoryId={categoryId}
          />
        </ErrorBoundary>
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoDetailIndex
