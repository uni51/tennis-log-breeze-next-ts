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

const AdminNicknameMemoList: React.FC<NicknameMemosQueryParams> = ({
  nickname,
  page,
  category,
  tag,
}: NicknameMemosQueryParams) => {
  const { showBoundary } = useErrorBoundary()
  const preApiUrl = `/api/admin/${nickname}/memos`
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
        renderMemoDetailLink={`/admin/memos/${memo.user_nickname}/${memo.id}`}
        renderMemoListByCategoryLink={`/admin/memos/${memo.user_nickname}?category=${memo.category_id}`}
        renderMemoListByNickNameLink={`/admin/memos/${memo.user_nickname}`}
        renderMemoListByTagLink={
          category
            ? `/admin/memos/${memo.user_nickname}?category=${memo.category_id}&tag=`
            : `/admin/memos/${memo.user_nickname}?tag=`
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
            baseUrl={`/admin/memos/${nickname}`}
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            category={category}
            tag={tag}
          />
        </div>
        <div className='hidden sm:hidden md:block lg:block xl:block'>
          <MemoListPaginationLong
            baseUrl={`/admin/memos/${nickname}`}
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

export default AdminNicknameMemoList
