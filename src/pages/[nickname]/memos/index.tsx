import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import NicknameMemoList from '@/features/memos/nickname/components/NicknameMemoList'
import { onError } from '@/lib/error-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'

/* ユーザー毎の公開メモ一覧ページ */
const PublicMemoListByNickname: NextPage = () => {
  const router = useRouter()
  const { nickname, page, category, tag } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryId = category === undefined ? null : Number(category)
  const tagText = tag === undefined ? undefined : Array.isArray(tag) ? tag.join('') : tag

  const headLine = `${nickname}さんのメモ一覧${getMemosListByCategoryHeadLineTitle(categoryId)}`

  let categoryText = ''
  if (categoryId) {
    categoryText = getMemosListByCategoryHeadLineTitle(categoryId)
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
          <NicknameMemoList
            nickname={nickname as string}
            pageNumber={pageNumber}
            categoryId={categoryId}
            tag={tagText}
          />
          {/* キャッシュ作成用に、次のページを事前にロードしておく */}
          {/* TODO: 最後のページの場合は、このロジックをくぐらないようにする */}
          <div style={{ display: 'none' }}>
            <NicknameMemoList
              nickname={nickname as string}
              pageNumber={pageNumber + 1}
              categoryId={categoryId}
              tag={tagText}
            />
          </div>
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default PublicMemoListByNickname
