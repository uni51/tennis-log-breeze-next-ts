import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'
import MemoListPaginationShort from '@/components/Pagination/MemoListPaginationShort'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import AddMemoButton from '@/features/memos/dashboard/components/AddMemoButton'
import { useMemoList } from '@/hooks/memos/useMemoList'
import { getMemosListByCategoryPageLink } from '@/lib/pagination-helper'
import { Memo } from '@/types/Memo'

type Props = {
  pageIndex: number
  categoryNumber: number | null
}

const DashboardMemoList = ({ pageIndex, categoryNumber }: Props) => {
  const { showBoundary } = useErrorBoundary()

  const preApiUrl = '/api/dashboard/memos'
  const { data: memos, error } = useMemoList({ preApiUrl, pageIndex, categoryNumber })

  if (error) showBoundary(error)

  if (!memos)
    return (
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>
          <ClipLoader />
        </div>
      </div>
    )

  return (
    <div className='mx-auto mt-20'>
      <AddMemoButton />
      <div className='mt-3'>
        {/* DBから取得したメモデータの一覧表示 */}
        <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
          {memos?.data?.map((memo: Memo, index: number) => {
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
        <div className='md:hidden'>
          <MemoListPaginationShort
            baseUrl='/dashboard/memos/'
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            renderPagerLinkFunc={getMemosListByCategoryPageLink}
            category={categoryNumber}
          />
        </div>
        <div className='hidden sm:hidden md:block lg:block  xl:block'>
          <MemoListPaginationLong
            baseUrl='/dashboard/memos/'
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            renderPagerLinkFunc={getMemosListByCategoryPageLink}
            category={categoryNumber}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardMemoList
