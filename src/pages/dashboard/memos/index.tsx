'use client'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary' // build時に、FallbackProps not found in 'react-error-boundary' のエラーが出る
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import DashboardMemoList from '@/features/memos/dashboard/components/DashboardMemoList'
import { useAuth } from '@/hooks/auth'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
// import { useSWRConfig } from 'swr'

const DashboardMemoIndex: NextPage = () => {
  const router = useRouter()
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })
  // const { cache } = useSWRConfig()
  const { page, category } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? null : Number(category)

  // Fetch用URL組み立て
  useEffect(() => {
    // console.log(cache)
    // ログイン中か判定
    const init = async () => {
      // ログイン中か判定
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/login')
        return
      }
    }
    init()
  }, [router, pageNumber, categoryNumber])
  // }, [router, pageNumber, categoryNumber, cache])

  const headLine = user?.data?.nickname
    ? `${user.data.nickname}さんのメモ一覧${getMemosListByCategoryHeadLineTitle(categoryNumber)}`
    : ' あなたが作成したメモ一覧'

  if (!user) return null

  return (
    <>
      <Head>
        <title>{headLine}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headLine}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <DashboardMemoList pageIndex={pageNumber} categoryNumber={categoryNumber} />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合は、このロジックをくぐらないようにさせる？ */}
          <div style={{ display: 'none' }}>
            <DashboardMemoList pageIndex={pageNumber + 1} categoryNumber={categoryNumber} />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default DashboardMemoIndex
