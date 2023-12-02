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
import { useAuthQuery } from '@/hooks/authQuery'
import { onError } from '@/lib/error-helper'
import { Memo } from '@/types/Memo'

const DashboardMemoDetailIndex: NextPage<Memo> = () => {
  const { user } = useAuthQuery({ middleware: 'auth' })
  const [apiUrl, setApiUrl] = useState('')
  const [titleText, setTitleText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const loginUser = user?.data

  useEffect(() => {
    // Fetch用URL組み立て
    if (router.isReady) {
      const apiUri = `api/dashboard/memos/${router.query.id}`
      setApiUrl(apiUri)
    }

    setIsLoading(false)
  }, [router.isReady])

  if (isLoading) return <Loading />
  if (!user) return null

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
          <DashboardMemoDetail apiUrl={apiUrl} loginUser={loginUser} setTitleText={setTitleText} />
        </ErrorBoundary>
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoDetailIndex
