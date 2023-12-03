import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import DashboardMemoList from '@/features/memos/dashboard/components/DashboardMemoList'
import { useAuth } from '@/hooks/auth'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { AuthGuard } from '@/features/auth/components/AuthGuard'

type DashboardMemoIndexProps = {
  pageIndex: number
  categoryNumber: number | null
}

const DashboardMemoIndex: NextPage<DashboardMemoIndexProps> = ({ pageIndex, categoryNumber }) => {
  const router = useRouter()
  const { page, category } = router.query
  const { user } = useAuth({ middleware: 'auth' })

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumberFromQuery = category === undefined ? null : Number(category)

  const headLine = user?.data?.nickname
    ? `${user.data.nickname}さんのメモ一覧${getMemosListByCategoryHeadLineTitle(
        categoryNumberFromQuery,
      )}`
    : 'あなたが作成したメモ一覧'

  if (!user) return null

  return (
    <AuthGuard>
      <Head>
        <title>{headLine}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headLine}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <DashboardMemoList pageIndex={pageNumber} categoryNumber={categoryNumberFromQuery} />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合は、このロジックをくぐらないようにさせる？ */}
          <div style={{ display: 'none' }}>
            <DashboardMemoList
              pageIndex={pageNumber + 1}
              categoryNumber={categoryNumberFromQuery}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoIndex
