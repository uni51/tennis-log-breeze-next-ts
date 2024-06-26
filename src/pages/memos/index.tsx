import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import PublicMemoList from '@/features/memos/public/components/PublicMemoList'
import { onError } from '@/lib/error-helper'
import { getCategoryText } from '@/lib/headline-helper'
import { MemoQueryParams } from '@/types/memo/MemosQueryParams'

/* みんなの公開中のメモ一覧ページ */
const PublicMemoIndex: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [queryParams, setQueryParams] = useState<MemoQueryParams>({
    page: 1,
    category: undefined,
    tag: undefined,
  })

  useEffect(() => {
    if (router.isReady) {
      const { page, category, tag } = router.query
      setQueryParams({
        page: Number(page) || 1,
        category: category ? Number(category) : undefined,
        tag: typeof tag === 'string' ? tag : tag?.join(''),
      })
      setIsLoading(false)
    }
  }, [router.isReady, router.query])

  if (isLoading) return <Loading />

  const headLine = `みんなの公開中のメモ一覧`

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
            {queryParams.category && (
              <span className='text-gray-800 font-bold mr-4'>
                {getCategoryText(queryParams.category)}
              </span>
            )}
            {queryParams.tag && <span className='text-gray-800 font-bold'>#{queryParams.tag}</span>}
          </>
        }
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <PublicMemoList
            page={queryParams.page}
            category={queryParams.category}
            tag={queryParams.tag}
          />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合のロジックの実装を検討 */}
          <div style={{ display: 'none' }}>
            <PublicMemoList
              page={queryParams.page + 1}
              category={queryParams.category}
              tag={queryParams.tag}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default PublicMemoIndex
