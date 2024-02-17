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
  const { user, isAuthLoading } = useAuth({ middleware: 'auth' })
  const [apiUrl, setApiUrl] = useState('')
  const [titleText, setTitleText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const category = router.query.category ? Number(router.query.category) : undefined

  useEffect(() => {
    if (!isAuthLoading && user === null) {
      router.push('/login')
      return
    }

    if (router.isReady && !isAuthLoading) {
      setApiUrl(`api/dashboard/memos/${router.query.id}`)
      setIsLoading(false)
    }
  }, [router, user, isAuthLoading])

  if (isLoading) return <Loading />

  const headline = `${user?.data?.nickname}さんのメモ詳細`

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
            loginUser={user?.data}
            setTitleText={setTitleText}
            category={category}
          />
        </ErrorBoundary>
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoDetailIndex
