import Head from 'next/head'
import { Key } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { ErrorDisplay } from '@/components/Layouts/Error/ErrorDisplay'
import MemoListPaginationAdapter from '@/components/Pagination/MemoListPaginationAdapter'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { getMemosListByCategoryPageLink, getMemosListPageLink } from '@/lib/pagination-helper'
import { axiosRequest } from '@/lib/utils/axiosUtils'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { category?: string; page?: string } }) {
  const { category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  const publicMemoListUriWithCategory = `/api/public/memos/category/${categoryNumber}?page=${pageNumber}`
  const publicMemoListUri = `/api/public/memos?page=${pageNumber}`

  try {
    const response: ReturnType =
      categoryNumber !== null
        ? await axiosRequest('server', publicMemoListUriWithCategory)
        : await axiosRequest('server', publicMemoListUri)

    return {
      props: {
        memos: JSON.stringify(response),
        category: categoryNumber,
      },
    }
  } catch (err) {
    return { props: { error: JSON.stringify(err) } }
  }
}

type Props = {
  memos: string
  category: number | null
  error?: string
}

/* みんなの公開中のメモ一覧ページ */
export default function PublicMemoList(props: Props) {
  // const router = useRouter()

  const { memos, category, error } = props

  const headline = `みんなの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(category)}`

  if (error) {
    const errorText = JSON.parse(error)
    errorText.headline = headline

    return <ErrorDisplay {...errorText} />
  }

  const memosData = (JSON.parse(memos) as unknown) as ReturnType

  return (
    <>
      <Head>
        <title>{headline}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
      >
        <div className='mx-auto mt-32'>
          <div className='mt-3'>
            {/* DBから取得したメモデータの一覧表示 */}
            <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
              {memosData?.data?.map((memo: Memo, index: Key | null | undefined) => {
                return (
                  <SingleMemoBlockForList
                    memo={memo}
                    renderMemoDetailLink={`/${memo.user_nickname}/memos/${memo.id}`}
                    renderMemoListByCategoryLink={`/memos?category=${memo.category_id}`}
                    renderMemoListByNickNameLink={`/${memo.user_nickname}/memos/`}
                    key={index}
                  />
                )
              })}
            </div>
            <MemoListPaginationAdapter
              baseUrl={'/memos/'}
              totalItems={Number(memosData?.meta?.total)}
              currentPage={Number(memosData?.meta?.current_page)}
              renderPagerLinkFunc={
                category === null ? getMemosListPageLink : getMemosListByCategoryPageLink
              }
              category={category}
            />
          </div>
        </div>
      </AppLayout>
    </>
  )
}
