import React from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import { Loading } from '@/components/Loading'
import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'
import MemoListPaginationShort from '@/components/Pagination/MemoListPaginationShort'
import MemoCardForList from '@/features/memos/common/components/templates/MemoCardForList'
import { useMemoList } from '@/hooks/memos/useMemoList'
import { Memo } from '@/types/Memo'
import { NicknameMemosQueryParams } from '@/types/memo/MemosQueryParams'

const NicknameMemoList: React.FC<NicknameMemosQueryParams> = ({
  nickname,
  page,
  category,
  tag,
}: NicknameMemosQueryParams) => {
  const { showBoundary } = useErrorBoundary()
  const preApiUrl = `/api/public/${nickname}/memos`
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
        <div className='w-1/2 mx-auto text-center'>
          <ClipLoader />
        </div>
      </div>
    )
  }

  const renderMemoList = () => {
    return memos?.data?.map((memo: Memo, index: number) => (
      <MemoCardForList
        memo={memo}
        renderMemoDetailLink={`/${memo.user_nickname}/memos/${memo.id}`}
        renderMemoListByCategoryLink={`/${memo.user_nickname}/memos?category=${memo.category_id}`}
        renderMemoListByNickNameLink={`/${memo.user_nickname}/memos/`}
        renderMemoListByTagLink={
          category
            ? `/${memo.user_nickname}/memos?category=${memo.category_id}&tag=`
            : `/${memo.user_nickname}/memos?tag=`
        }
        key={index}
      />
    ))
  }

  return (
    <div className='mx-auto mt-20'>
      <div className='mt-3'>
        {/* DBから取得したメモデータの一覧表示 */}
        <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>{renderMemoList()}</div>
        <div className='md:hidden'>
          <MemoListPaginationShort
            baseUrl={`/${nickname}/memos/`}
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            category={category}
            tag={tag}
          />
        </div>
        <div className='hidden sm:hidden md:block lg:block xl:block'>
          <MemoListPaginationLong
            baseUrl={`/${nickname}/memos/`}
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

export default NicknameMemoList
