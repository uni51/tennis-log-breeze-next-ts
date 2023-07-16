import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import MemoListPagination from '@/components/Pagination/MemoListPagination'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import AddMemoButton from '@/features/memos/dashboard/components/AddMemoButton'
import { useGetMemoList } from '@/hooks/memos/useGetMemoList'
import { getMemosListByCategoryPageLink } from '@/lib/pagination-helper'
import { Memo } from '@/types/Memo'

type Props = {
  apiUrl: string
  categoryNumber: number | undefined
}

const DashboardMemoList = ({ apiUrl, categoryNumber }: Props) => {
  const { showBoundary } = useErrorBoundary()
  const { data: memos, error } = useGetMemoList(apiUrl)

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
        <MemoListPagination
          baseUrl='/dashboard/memos/'
          totalItems={Number(memos?.meta?.total)}
          currentPage={Number(memos?.meta?.current_page)}
          renderPagerLinkFunc={getMemosListByCategoryPageLink}
          category={categoryNumber}
        />
      </div>
    </div>
  )
}

export default DashboardMemoList
