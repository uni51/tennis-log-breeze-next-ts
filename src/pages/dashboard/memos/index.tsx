import { NextPage } from 'next'
import Head from 'next/head'
// eslint-disable-next-line
import { ErrorBoundary } from 'react-error-boundary' // build時に、FallbackProps not found in 'react-error-boundary' のエラーが出る
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import DashboardMemoList from '@/features/memos/dashboard/components/DashboardMemoList'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { useAuth } from '@/hooks/auth'

const DashboardMemoIndex: NextPage = () => {
  const router = useRouter()
  const { page, category } = router.query
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })
  const [apiUrl, setApiUrl] = useState('')

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? undefined : Number(category)

  // 初回レンダリング時にログインチェック
  useEffect(() => {
    const authCheck = async () => {
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/login')
        return
      }
    }
    authCheck()
  }, [])

  // Fetch用URL組み立て
  useEffect(() => {
    const init = () => {
      if (router.isReady) {
        const apiUri =
          categoryNumber === undefined
            ? `/api/dashboard/memos?page=${pageNumber}`
            : `/api/dashboard/memos/category/${categoryNumber}?page=${pageNumber}`
        setApiUrl(apiUri)
      }
    }
    init()
  }, [pageNumber, categoryNumber])

  const headLine = user?.data?.name
    ? `${user.data.name}さんのメモ一覧${getMemosListByCategoryHeadLineTitle(categoryNumber)}`
    : ' 作成したメモ一覧'

  return (
    <>
      <Head>
        <title>{headLine}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headLine}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <DashboardMemoList apiUrl={apiUrl} categoryNumber={categoryNumber} />
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default DashboardMemoIndex
