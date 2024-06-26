import React from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { Loading } from '@/components/Loading'
import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'
import MemoListPaginationShort from '@/components/Pagination/MemoListPaginationShort'
import MemoCardForList from '@/features/memos/common/components/templates/MemoCardForList'
import AddMemoButton from '@/features/memos/dashboard/components/AddMemoButton'
import { useMemoList } from '@/hooks/memos/useMemoList'
import { Memo } from '@/types/Memo'
import { DashboardMemoQueryParams } from '@/types/memo/MemosQueryParams'

const DashboardMemoList: React.FC<DashboardMemoQueryParams> = ({
  page,
  category,
  tag,
}: DashboardMemoQueryParams) => {
  const { showBoundary } = useErrorBoundary()
  const preApiUrl = '/api/dashboard/memos'
  const { data: memos, error, isLoading } = useMemoList({
    preApiUrl,
    page,
    category,
    tag,
  })

  if (error) {
    showBoundary(error)
  }

  if (isLoading) {
    return <Loading />
  }

  if (!memos) {
    return (
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>メモがありません</div>
      </div>
    )
  }

  const renderMemoList = () => {
    return memos?.data?.map((memo: Memo, index: number) => (
      <MemoCardForList
        memo={memo}
        renderMemoDetailLink={`/dashboard/memos/${memo.id}`}
        renderMemoListByCategoryLink={`/dashboard/memos?category=${memo.category_id}`}
        renderMemoListByNickNameLink='/dashboard/memos/'
        renderMemoListByTagLink={
          category ? `/dashboard/memos?category=${memo.category_id}&tag=` : `/dashboard/memos?tag=`
        }
        key={index}
      />
    ))
  }

  return (
    <div className='mx-auto mt-20'>
      <AddMemoButton />
      <div className='mt-3'>
        <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>{renderMemoList()}</div>
        <div className='md:hidden'>
          <MemoListPaginationShort
            baseUrl='/dashboard/memos/'
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            category={category}
            tag={tag}
          />
        </div>
        <div className='hidden sm:hidden md:block lg:block xl:block'>
          <MemoListPaginationLong
            baseUrl='/dashboard/memos/'
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            category={category}
            tag={tag}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardMemoList
