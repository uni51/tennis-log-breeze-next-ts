import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { Memo } from '@/types/Memo'
import useSWR from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import { Key } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import { useGetMemoList } from '@/hooks/memos/useGetMemoList'
import ClipLoader from 'react-spinners/ClipLoader'

type Props = {
  apiUrl: string
  // categoryNumber: number | null
}

const PublishedMemoList = ({ apiUrl }: Props) => {
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
    <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
      {memos?.data?.map((memo: Memo, index: Key | null | undefined) => {
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
  )
}

export default PublishedMemoList
