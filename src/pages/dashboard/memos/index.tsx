import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import DashboardMemoList from '@/features/memos/dashboard/components/DashboardMemoList'
import { useAuth } from '@/hooks/auth'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'

const DashboardMemoIndex: NextPage = () => {
  const router = useRouter()
  const { page, category, tag } = router.query
  const { user } = useAuth({ middleware: 'auth' })

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? null : Number(category)
  const tagText = tag === undefined ? null : Array.isArray(tag) ? tag.join('') : tag

  let headLine = user?.data?.nickname
    ? `${user.data.nickname}さんのメモ一覧`
    : 'あなたが作成したメモ一覧'

  let categoryText = ''
  if (categoryNumber) {
    categoryText = getMemosListByCategoryHeadLineTitle(categoryNumber)
  }

  if (!user) return null

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
            {tagText && <span className='text-gray-800 font-bold'>#{tagText}</span>}
          </>
        }
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <DashboardMemoList pageIndex={pageNumber} categoryNumber={categoryNumber} tag={tagText} />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合は、このロジックをくぐらないようにさせる？ */}
          <div style={{ display: 'none' }}>
            <DashboardMemoList
              pageIndex={pageNumber + 1}
              categoryNumber={categoryNumber}
              tag={tagText}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoIndex
