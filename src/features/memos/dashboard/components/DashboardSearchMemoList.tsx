import React from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { Loading } from '@/components/Loading'
import MemoCardForList from '@/features/memos/common/components/templates/MemoCardForList'
import AddMemoButton from '@/features/memos/dashboard/components/AddMemoButton'
import { useMemoList } from '@/hooks/memos/useMemoList'
import { Memo } from '@/types/Memo'
import { SearchMemoListParams } from '@/types/memo/MemosQueryParams'
import SearchMemoListPaginationLong from '@/components/Pagination/SearchMemoListPaginationLong'
import { convertFullSpaceToHalfSpace } from '@/lib/utils/utils'

const DashboardSearchMemoList: React.FC<SearchMemoListParams> = ({
  page,
  keyword,
}: SearchMemoListParams) => {
  const { showBoundary } = useErrorBoundary()
  const convertedSearchQuery = keyword ? convertFullSpaceToHalfSpace(keyword.trim()) : undefined
  const preApiUrl = `/api/dashboard/memos`

  console.log('page', page)

  const { data: memos, error, isLoading } = useMemoList({
    preApiUrl,
    page,
    keyword: convertedSearchQuery,
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
        key={index}
      />
    ))
  }

  return (
    <div className='mx-auto mt-20'>
      <AddMemoButton />
      <div className='mt-3'>
        <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>{renderMemoList()}</div>
        <div className='hidden sm:hidden md:block lg:block xl:block'>
          <SearchMemoListPaginationLong
            baseUrl={`/dashboard/memos/search?q=${keyword}`}
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardSearchMemoList
