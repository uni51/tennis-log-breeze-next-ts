import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import NicknameMemoList from '@/features/memos/nickname/components/NicknameMemoList'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'

interface QueryParams {
  nickname: string
  page?: number
  category?: number
  tag?: string
}

/* ユーザー毎の公開メモ一覧ページ */
const PublicMemoListByNickname: NextPage = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true) // ローディング状態の管理
  const [queryParams, setQueryParams] = useState<QueryParams>({
    nickname: '',
    page: 1,
    category: undefined,
    tag: undefined,
  })

  useEffect(() => {
    if (router.isReady) {
      // routerが準備完了したら
      const { nickname, page, category, tag } = router.query
      const pageNumber = page ? Number(page) : 1
      const categoryId = category ? Number(category) : undefined
      const tagText = tag ? (Array.isArray(tag) ? tag.join('') : tag) : undefined

      setQueryParams({
        nickname: nickname as string,
        page: pageNumber,
        category: categoryId,
        tag: tagText,
      })
      setIsLoading(false) // ローディング状態を解除
    }
  }, [router.isReady, router.query])

  if (isLoading) {
    return <div>ローディング中...</div> // ローディング表示
  }
  const headLine = `${queryParams.nickname}さんのメモ一覧${getMemosListByCategoryHeadLineTitle(
    queryParams.category,
  )}`

  let categoryText = ''
  if (queryParams.category !== null) {
    // categoryIdがnullでないことをチェック
    categoryText = getMemosListByCategoryHeadLineTitle(queryParams.category)
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
            {queryParams.tag && <span className='text-gray-800 font-bold'>#{queryParams.tag}</span>}
          </>
        }
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <NicknameMemoList
            nickname={queryParams.nickname}
            pageNumber={queryParams.page as number}
            categoryId={queryParams.category}
            tag={queryParams.tag}
          />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合は、このロジックをくぐらないようにする */}
          <div style={{ display: 'none' }}>
            <NicknameMemoList
              nickname={queryParams.nickname}
              pageNumber={queryParams.page as number}
              categoryId={queryParams.category}
              tag={queryParams.tag}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default PublicMemoListByNickname
