import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { ErrorDisplay } from '@/components/Layouts/Error/ErrorDisplay'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import getInitialPublishedMemoList from '@/features/memos/published/api/getInitialPublishedMemoList'
import PublishedMemoList from '@/features/memos/published/components/PublishedMemoList'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { getMemoListApiUrl } from '@/lib/pagination-helper'
import { MemoListReturnType } from '@/types/memoList'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useAuth } from '@/hooks/auth'

const queryClient = new QueryClient()

type Props = {
  pageIndex: number
  categoryNumber: number | null
  tag?: string
}

/* みんなの公開中のメモ一覧ページ */
const PublishedMemoIndex: NextPage = () => {
  const router = useRouter()
  const { page, category, tag } = router.query

  const pageIndex = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? null : Number(category)
  const tagText = tag === undefined ? undefined : Array.isArray(tag) ? tag.join('') : tag

  const headLine = `みんなの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(categoryNumber)}`

  let categoryText = ''
  if (categoryNumber) {
    categoryText = getMemosListByCategoryHeadLineTitle(categoryNumber)
  }

  return (
    <>
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
          <PublishedMemoList pageIndex={pageIndex} categoryNumber={categoryNumber} tag={tagText} />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合は、このロジックをくぐらないようにする */}
          <div style={{ display: 'none' }}>
            <PublishedMemoList
              pageIndex={pageIndex + 1}
              categoryNumber={categoryNumber}
              tag={tagText}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default PublishedMemoIndex
