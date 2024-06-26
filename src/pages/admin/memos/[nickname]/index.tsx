import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import AdminNicknameMemoList from '@/features/admin/memos/components/AdminNickNameMemoList'
import { onError } from '@/lib/error-helper'
import { getCategoryText } from '@/lib/headline-helper'
import { NicknameMemosQueryParams } from '@/types/memo/MemosQueryParams'

/* ユーザー毎の公開メモ一覧ページ */
const AdminMemoListByNickname: NextPage = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true) // ローディング状態の管理
  const [queryParams, setQueryParams] = useState<NicknameMemosQueryParams>({
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
    return <Loading />
  }

  const headLine = `${queryParams.nickname}さんのメモ一覧`

  let categoryText = ''
  if (queryParams.category !== null) {
    // categoryIdがnullでないことをチェック
    categoryText = getCategoryText(queryParams.category)
  }

  return (
    <>
      <Head>
        <title>{headLine}</title>
      </Head>
      <AppLayout
        header={
          <>
            <h2 className='font-semibold text-xl text-gray-800 leading-tight mb-7'>
              管理者画面 Dashboard
            </h2>
            <h3 className='font-semibold text-xl text-gray-800 leading-tight inline-block mr-4'>
              {headLine}
            </h3>
            {categoryText && <span className='text-gray-800 font-bold mr-4'>{categoryText}</span>}
            {queryParams.tag && <span className='text-gray-800 font-bold'>#{queryParams.tag}</span>}
          </>
        }
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <AdminNicknameMemoList
            nickname={queryParams.nickname}
            page={queryParams.page as number}
            category={queryParams.category}
            tag={queryParams.tag}
          />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合は、このロジックをくぐらないようにする */}
          <div style={{ display: 'none' }}>
            <AdminNicknameMemoList
              nickname={queryParams.nickname}
              page={queryParams.page as number}
              category={queryParams.category}
              tag={queryParams.tag}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default AdminMemoListByNickname
