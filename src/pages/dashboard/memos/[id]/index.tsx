import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import DashboardMemoDetail from '@/features/memos/dashboard/components/DashBoardMemoDetail'
import { useAuth } from '@/hooks/auth'
import { onError } from '@/lib/error-helper'
import { Memo } from '@/types/Memo'

/* Dashboard（マイページ）のメモ詳細ページ */
const DashboardMemoIndex: NextPage<Memo> = () => {
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })
  const [apiUrl, setApiUrl] = useState('')
  const [titleText, setTitleText] = useState('')

  const router = useRouter()
  let loginUser = user?.data

  // 初回レンダリング時にログインチェック、Fetch用URL組み立て
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      if (router.isReady) {
        const res: boolean = await checkLoggedIn()
        if (!res) {
          router.push('/login')
          return
        }
        const apiUri = `api/dashboard/memos/${router.query.id}`
        setApiUrl(apiUri)
      }
    }
    init()
  }, [router, apiUrl])

  const headLine = `${user?.data?.name}さんのメモ詳細`

  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headLine}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <DashboardMemoDetail apiUrl={apiUrl} loginUser={loginUser} setTitleText={setTitleText} />
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default DashboardMemoIndex
