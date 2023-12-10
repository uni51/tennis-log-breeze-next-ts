import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { axiosRequest } from '@/lib/utils/axiosUtils'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import { onError } from '@/lib/error-helper'
import NicknameMemoList from '@/features/memos/published/components/NicknameMemoList'

type ReturnType = DataWithPagination<Memo[]>
const queryClient = new QueryClient()

export async function getServerSideProps(context: {
  query: { nickname: string; category?: string; page?: string }
}) {
  const { nickname, category, page } = context.query

  const pageIndex = page === undefined ? 1 : Number(page)
  const categoryId = category === undefined ? null : Number(category)

  const baseUri = `/api/public/${nickname}/memos`
  const categoryUri = categoryId !== null ? `/category/${categoryId}` : ''
  const pageUri = `?page=${pageIndex}`

  const uri = `${baseUri}${categoryUri}${pageUri}`

  try {
    const response: ReturnType = await axiosRequest('server', uri)

    return {
      props: {
        pageIndex,
        category: categoryId,
        memos: JSON.stringify(response),
        nickname,
      },
    }
  } catch (error) {
    console.error('Error fetching memo list data:', error)

    return {
      props: {
        ssrError: JSON.stringify(error),
      },
    }
  }
}

type Props = {
  pageIndex: number
  category: number | null
  memos: string
  nickname: string
  fallback?: ReturnType
  ssrError?: string
}

/* ユーザー毎の公開メモ一覧ページ */
const PublicMemoListByNickname = ({ pageIndex, category, nickname, fallback, ssrError }: Props) => {
  const headline = `${nickname}さんの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(
    category,
  )}`

  return (
    <>
      <Head>
        <title>{headline}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <QueryClientProvider client={queryClient}>
            <NicknameMemoList pageIndex={pageIndex} categoryId={category} nickname={nickname} />
            {/* キャッシュ作成用に、次のページを事前にロードしておく */}
            {/* TODO: 最後のページの場合は、このロジックをくぐらないようにする */}
            <div style={{ display: 'none' }}>
              <NicknameMemoList
                pageIndex={pageIndex + 1}
                categoryId={category}
                nickname={nickname}
              />
            </div>
          </QueryClientProvider>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default PublicMemoListByNickname
