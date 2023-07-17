import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { Memo } from '@/types/Memo'
import { useErrorBoundary } from 'react-error-boundary'
import { useGetMemoList } from '@/hooks/memos/useGetMemoList'
import ClipLoader from 'react-spinners/ClipLoader'
import { getMemosListByCategoryPageLink } from '@/lib/pagination-helper'
import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'

type Props = {
  apiUrl: string
  categoryNumber: number | null
}

const PublishedMemoList0717 = ({ apiUrl, categoryNumber }: Props) => {
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
      <div className='mt-3'>
        {/* DBから取得したメモデータの一覧表示 */}
        <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
          {memos?.data?.map((memo: Memo, index: number) => {
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
        <MemoListPaginationLong
          baseUrl={'/memos/'}
          totalItems={Number(memos?.meta?.total)}
          currentPage={Number(memos?.meta?.current_page)}
          renderPagerLinkFunc={getMemosListByCategoryPageLink}
          category={categoryNumber}
        />
      </div>
    </div>
  )
}

export default PublishedMemoList0717
