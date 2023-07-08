import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { Loading } from '@/components/Loading'
import MemoListPaginationAdapter from '@/components/Pagination/MemoListPaginationAdapter'
import SingleMemoBlockForList from '@/components/templates/SingleMemoBlockForList'
import { getMemosListByCategoryPageLink, getMemosListPageLink } from '@/lib/pagination-helper'
import { axiosRequest } from '@/lib/utils/axiosUtils'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

/* Dashboard（マイページ）のメモ一覧ページ */
export default function DashboardMemoQueryList(): ReactElement {
  const router = useRouter()
  const { showBoundary } = useErrorBoundary()

  const { page, category } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? undefined : Number(category)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      if (router.isReady) {
        if (categoryNumber === undefined) {
          const dashboardMemoListUri = `/api/dashboard/memos?page=${pageNumber}`
          const response = await axiosRequest('client', dashboardMemoListUri, showBoundary)
          setMemos(response)
        } else {
          const dashboardMemoListUriWithCategory = `/api/dashboard/memos/category/${categoryNumber}?page=${pageNumber}`
          const response = await axiosRequest(
            'client',
            dashboardMemoListUriWithCategory,
            showBoundary,
          )
          setMemos(response)
        }
      }
      setIsLoading(false)
    }
    init()
  }, [pageNumber, categoryNumber])

  if (isLoading) return <Loading />

  return (
    <div className='mx-auto mt-20'>
      <div className='w-1/2 mx-auto text-center'>
        <button
          className='text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400'
          onClick={() => router.push('/dashboard/memos/post')}
        >
          メモを追加する
        </button>
      </div>

      <div className='mt-3'>
        {/* DBから取得したメモデータの一覧表示 */}
        <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
          {memos?.data?.map((memo: Memo, index) => {
            return (
              <SingleMemoBlockForList
                memo={memo}
                renderMemoDetailLink={`/dashboard/memos/${memo.id}`}
                renderMemoListByCategoryLink={`/dashboard/memos?category=${memo.category_id}`}
                renderMemoListByNickNameLink={`/dashboard/memos/`}
                key={index}
              />
            )
          })}
        </div>
        <MemoListPaginationAdapter
          baseUrl='/dashboard/memos/'
          totalItems={Number(memos?.meta?.total)}
          currentPage={Number(memos?.meta?.current_page)}
          renderPagerLinkFunc={
            categoryNumber === undefined ? getMemosListPageLink : getMemosListByCategoryPageLink
          }
          category={categoryNumber}
        />
      </div>
    </div>
  )
}
