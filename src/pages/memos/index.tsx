import Head from 'next/head'
import { ErrorBoundary } from 'react-error-boundary'
import { SWRConfig } from 'swr'
import AppLayout from '@/components/Layouts/AppLayout'
import { ErrorDisplay } from '@/components/Layouts/Error/ErrorDisplay'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import getInitialPublishedMemoList from '@/features/memos/published/api/getInitialPublishedMemoList'
import PublishedMemoList from '@/features/memos/published/components/PublishedMemoList'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { MemoListReturnType } from '@/types/memoList'
import { getMemoListApiUrl } from '@/lib/pagination-helper'

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { category?: string; page?: string } }) {
  const { category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageIndex = page === undefined ? 1 : Number(page)

  const preApiUrl = '/api/public/memos'
  const apiUrl = getMemoListApiUrl({ preApiUrl, pageIndex, categoryNumber })

  const headline = `みんなの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(categoryNumber)}`

  try {
    const res = await getInitialPublishedMemoList(apiUrl)
    return {
      props: {
        pageIndex: pageIndex,
        categoryNumber: categoryNumber,
        headline: headline,
        fallback: {
          [`${apiUrl}`]: res,
        },
      },
    }
  } catch (error) {
    return { props: { ssrError: JSON.stringify(error) } }
  }
}

type Props = {
  pageIndex: number
  categoryNumber: number | null
  headline?: string
  fallback?: MemoListReturnType
  ssrError?: string
}

/* みんなの公開中のメモ一覧ページ */
const PublishedMemoIndex = ({ pageIndex, categoryNumber, headline, fallback, ssrError }: Props) => {
  if (ssrError) {
    const errorObj = JSON.parse(ssrError)
    errorObj.headline = headline
    return <ErrorDisplay {...errorObj} />
  }

  return (
    <>
      <Head>
        <title>{headline}</title>
      </Head>
      <AppLayout
        header={
          <h2 className='font-semibold text-xl text-gray-800 leading-tight'>{`${headline}`}</h2>
        }
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <SWRConfig value={{ fallback }}>
            <PublishedMemoList pageIndex={pageIndex} categoryNumber={categoryNumber} />
            {/* キャッシュ作成用に、次のページを事前にロードしておく */}
            {/* TODO: 最後のページの場合は、このロジックをくぐらないようにする */}
            <div style={{ display: 'none' }}>
              <PublishedMemoList pageIndex={pageIndex + 1} categoryNumber={categoryNumber} />
            </div>
          </SWRConfig>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default PublishedMemoIndex
