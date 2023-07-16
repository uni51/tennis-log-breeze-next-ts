import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Memo } from '@/types/Memo'
import getInitialPublishedMemoList from '@/features/memos/published/api/getInitialPublishedMemoList'
import { SWRConfig } from 'swr'
import PublishedMemoList from '@/features/memos/published/components/PublishedMemoList'
import { DataWithPagination } from '@/types/dataWithPagination'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { ErrorBoundary } from 'react-error-boundary'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import { onError } from '@/lib/error-helper'
import { HttpError, HttpErrorObject } from '@/types/HttpError'
import { ContentsError } from '@/components/Layouts/ContentsError'
import Error from 'next/error'

type ReturnType = DataWithPagination<Memo[]>

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { category?: string; page?: string } }) {
  const { category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  const apiUrl = categoryNumber
    ? `/api/public/memos/category/${categoryNumber}?page=${pageNumber}`
    : `/api/public/memos?page=${pageNumber}`

  const headline = `みんなの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(categoryNumber)}`

  try {
    const res = await getInitialPublishedMemoList()
    return {
      props: {
        apiUrl: apiUrl,
        categoryNumber: categoryNumber,
        headline: headline,
        fallback: {
          '/api/public/memos': res,
        },
      },
    }
  } catch (error) {
    return { props: { error: JSON.stringify(error) } }
  }
}

type Props = {
  apiUrl?: string
  categoryNumber?: number | null
  headline?: string
  fallback?: ReturnType
  error?: string
}

/* みんなの公開中のメモ一覧ページ */
export default function PublishedMemoIndex({
  apiUrl,
  categoryNumber,
  headline,
  fallback,
  error,
}: Props) {
  if (error) {
    const errorText = JSON.parse(error)
    errorText.headline = headline
    return <ContentsError {...errorText} />
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
            <PublishedMemoList apiUrl={apiUrl!} categoryNumber={categoryNumber!} />
          </SWRConfig>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}
