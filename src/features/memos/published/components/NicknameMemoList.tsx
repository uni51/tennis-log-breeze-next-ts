import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'
import MemoListPaginationShort from '@/components/Pagination/MemoListPaginationShort'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { useMemoList } from '@/hooks/memos/useMemoList'
import { getMemosListByCategoryPageLink } from '@/lib/pagination-helper'
import { Memo } from '@/types/Memo'

type Props = {
  pageIndex: number
  categoryId: number | null
  nickname: string
}

const NicknameMemoList = ({ pageIndex, categoryId, nickname }: Props) => {
  const { showBoundary } = useErrorBoundary()

  const preApiUrl = `/api/public/${nickname}/memos`
  const { data: memos, error } = useMemoList({ preApiUrl, pageIndex, categoryId })

  if (error) {
    showBoundary(error)
    return null
  }

  const isLoading = !memos

  const renderLoadingIndicator = () => (
    <div className='mx-auto mt-20'>
      <div className='w-1/2 mx-auto text-center'>
        <ClipLoader />
      </div>
    </div>
  )

  const renderMemoList = () => (
    <div className='mx-auto mt-20'>
      <div className='mt-3'>
        <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
          {memos?.data?.map((memo: Memo, index: number) => (
            <SingleMemoBlockForList
              memo={memo}
              renderMemoDetailLink={`/${nickname}/memos/${memo.id}`}
              renderMemoListByCategoryLink={`/${nickname}/memos?category=${memo.category_id}`}
              renderMemoListByNickNameLink={`/${nickname}/memos/`}
              key={index}
            />
          ))}
        </div>
        <div className='md:hidden'>
          <MemoListPaginationShort
            baseUrl={`/${nickname}/memos/`}
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            renderPagerLinkFunc={getMemosListByCategoryPageLink}
            category={categoryId}
          />
        </div>
        <div className='hidden sm:hidden md:block lg:block xl:block'>
          <MemoListPaginationLong
            baseUrl={`/${nickname}/memos/`}
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            renderPagerLinkFunc={getMemosListByCategoryPageLink}
            category={categoryId}
          />
        </div>
      </div>
    </div>
  )

  return isLoading ? renderLoadingIndicator() : renderMemoList()
}

export default NicknameMemoList
