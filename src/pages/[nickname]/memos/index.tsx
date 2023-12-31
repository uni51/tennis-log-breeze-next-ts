import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { getMemosListByCategoryPageLink } from '@/lib/pagination-helper'
import { axiosRequest } from '@/lib/utils/axiosUtils'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'

type ReturnType = DataWithPagination<Memo[]>

export async function getServerSideProps(context: {
  query: { nickname: string; category?: string; page?: string }
}) {
  const { nickname, category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  const baseUri = `/api/public/${nickname}/memos`
  const categoryUri = categoryNumber !== null ? `/category/${categoryNumber}` : ''
  const pageUri = `?page=${pageNumber}`

  const uri = `${baseUri}${categoryUri}${pageUri}`

  try {
    const response: ReturnType = await axiosRequest('server', uri)

    return {
      props: {
        memos: JSON.stringify(response),
        nickname,
        category: categoryNumber,
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

/* ユーザー毎の公開メモ一覧ページ */
export default function PublicMemoListByNickname(props: {
  memos: string
  nickname: string
  category: number | null
}) {
  const { memos, nickname, category } = props
  const memosData = JSON.parse(memos) as ReturnType

  const headline = `${nickname}さんの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(
    category,
  )}`

  console.log('category', category)
  console.log('nickname', nickname)

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-32'>
        <div className='mt-3'>
          <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
            {memosData?.data?.map((memo: Memo, index) => (
              <SingleMemoBlockForList
                memo={memo}
                renderMemoDetailLink={`/${memo.user_nickname}/memos/${memo.id}`}
                renderMemoListByCategoryLink={`/${memo.user_nickname}/memos?category=${memo.category_id}`}
                renderMemoListByNickNameLink={`/${memo.user_nickname}/memos/`}
                key={index}
              />
            ))}
          </div>
          <MemoListPaginationLong
            baseUrl={`/${nickname}/memos`}
            totalItems={Number(memosData?.meta?.total)}
            currentPage={Number(memosData?.meta?.current_page)}
            renderPagerLinkFunc={getMemosListByCategoryPageLink}
            category={category}
          />
        </div>
      </div>
    </AppLayout>
  )
}
