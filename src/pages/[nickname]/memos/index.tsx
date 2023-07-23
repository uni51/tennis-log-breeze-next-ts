import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import MemoListPaginationAdapter from '@/components/Pagination/MemoListPaginationAdapter'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { getMemosListByCategoryPageLink, getMemosListPageLink } from '@/lib/pagination-helper'
import { axiosRequest } from '@/lib/utils/axiosUtils'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

//サーバーサイドレンダリング
export async function getServerSideProps(context: {
  query: { nickname: string; category?: string; page?: string }
}) {
  const { nickname, category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  const publicMemoListByNicknameUriWithCategory = `/api/public/${nickname}/memos/category/${categoryNumber}?page=${pageNumber}`
  const publicMemoListByNicknameUri = `/api/public/${nickname}/memos?page=${pageNumber}`

  const response: ReturnType =
    categoryNumber !== null
      ? await axiosRequest('server', publicMemoListByNicknameUriWithCategory)
      : await axiosRequest('server', publicMemoListByNicknameUri)

  return {
    props: {
      memos: JSON.stringify(response),
      nickname: nickname,
      category: categoryNumber,
      // page: pageNumber,
    },
  }
}

/* ユーザー毎の公開メモ一覧ページ */
export default function PublicMemoListByNickname(props: {
  memos: string
  nickname: string
  category: number | null
}) {
  // const router = useRouter()
  const { memos, nickname, category } = props

  const memosData = (JSON.parse(memos) as unknown) as ReturnType

  const headline = `${nickname}さんの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(
    category,
  )}`

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-32'>
        <div className='mt-3'>
          {/* DBから取得したメモデータの一覧表示 */}
          <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
            {memosData?.data?.map((memo: Memo, index) => {
              return (
                <SingleMemoBlockForList
                  memo={memo}
                  renderMemoDetailLink={`/${memo.user_nickname}/memos/${memo.id}`}
                  renderMemoListByCategoryLink={`/${memo.user_nickname}/memos?category=${memo.category_id}`}
                  renderMemoListByNickNameLink={`/${memo.user_nickname}/memos/`}
                  key={index}
                />
              )
            })}
          </div>
          <MemoListPaginationAdapter
            baseUrl={`/${nickname}/memos`}
            totalItems={Number(memosData?.meta?.total)}
            currentPage={Number(memosData?.meta?.current_page)}
            renderPagerLinkFunc={
              category === undefined ? getMemosListPageLink : getMemosListByCategoryPageLink
            }
            category={category}
          />
        </div>
      </div>
    </AppLayout>
  )
}
