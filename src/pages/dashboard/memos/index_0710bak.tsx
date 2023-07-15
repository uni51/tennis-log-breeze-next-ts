import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoListPaginationAdapter from '@/components/Pagination/MemoListPaginationAdapter'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import AddMemoButton from '@/features/memos/dashboard/components/AddMemoButton'
import { useAuth } from '@/hooks/auth'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { getMemosListByCategoryPageLink, getMemosListPageLink } from '@/lib/pagination-helper'
import { axiosRequest } from '@/lib/utils/axiosUtils'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

/* Dashboard（マイページ）のメモ一覧ページ */
const DashboardMemoListCopy: NextPage = () => {
  const router = useRouter()
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })

  const { page, category } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? undefined : Number(category)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)
  const { showBoundary } = useErrorBoundary()

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      if (router.isReady) {
        const res: boolean = await checkLoggedIn()
        if (!res) {
          router.push('/login')
          return
        }
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

  const headline = user?.data?.name
    ? `${user.data.name}さんのメモ一覧${getMemosListByCategoryHeadLineTitle(categoryNumber)}`
    : ' 作成したメモ一覧'

  return (
    <>
      <Head>
        <title>{headline}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
      >
        <div className='mx-auto mt-20'>
          <AddMemoButton />
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
      </AppLayout>
    </>
  )
}

export default DashboardMemoListCopy