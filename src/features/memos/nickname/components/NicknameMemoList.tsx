import React from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'
import MemoListPaginationShort from '@/components/Pagination/MemoListPaginationShort'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { useMemoList } from '@/hooks/memos/useMemoList'
import { getMemosListByCategoryPageLink } from '@/lib/pagination-helper'
import { Memo } from '@/types/Memo'
import { Loading } from '@/components/Loading'

type Props = {
  nickname: string
  pageNumber: number
  categoryId: number | null
  tag?: string
}

const NicknameMemoList: React.FC<Props> = ({ nickname, pageNumber, categoryId, tag }: Props) => {
  const { showBoundary } = useErrorBoundary()
  const preApiUrl = `/api/public/${nickname}/memos`
  const { data: memos, error, isLoading } = useMemoList({
    preApiUrl,
    pageNumber,
    categoryId,
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
      <SingleMemoBlockForList
        memo={memo}
        renderMemoDetailLink={`/${memo.user_nickname}/memos/${memo.id}`}
        renderMemoListByCategoryLink={`/${memo.user_nickname}/memos?category=${memo.category_id}`}
        renderMemoListByNickNameLink={`/${memo.user_nickname}/memos/`}
        renderMemoListByTagLink={
          categoryId
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
            baseUrl='/memos/'
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            renderPagerLinkFunc={getMemosListByCategoryPageLink}
            category={categoryId}
            tag={tag}
          />
        </div>
        <div className='hidden sm:hidden md:block lg:block xl:block'>
          <MemoListPaginationLong
            baseUrl='/memos/'
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            renderPagerLinkFunc={getMemosListByCategoryPageLink}
            category={categoryId}
            tag={tag}
          />
        </div>
      </div>
    </div>
  )
}

export default NicknameMemoList
