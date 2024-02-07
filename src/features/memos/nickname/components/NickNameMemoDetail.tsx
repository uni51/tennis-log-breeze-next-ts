import { Dispatch, SetStateAction, useEffect } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'
import MemoDetailCard from '@/features/memos/common/components/templates/MemoDetailCard'
import { useHandleError } from '@/hooks/error/useHandleError'
import { useMemoDetail } from '@/hooks/memos/useMemoDetail'

type Props = {
  apiUrl: string
  nickname: string
  setTitleText: Dispatch<SetStateAction<string>>
  categoryId: number | null
}

const NickNameMemoDetail = ({ apiUrl, nickname, setTitleText, categoryId }: Props) => {
  const handleError = useHandleError()
  const { data: memo, error } = useMemoDetail(apiUrl)

  useEffect(() => {
    if (error) {
      handleError(error, '/dashboard/memos')
    }

    if (memo) {
      setTitleText(memo.title)
    }
  }, [error, memo, setTitleText])

  if (!memo) {
    return <LoadingIndicator />
  }

  return (
    <>
      <MemoDetailCard
        memo={memo}
        renderMemoListByCategoryLink={`/${nickname}/memos?category=${memo.category_id}`}
        renderMemoListByNickNameLink={`/${nickname}/memos/`}
        renderMemoListByTagLink={
          categoryId
            ? `/${nickname}/memos?category=${memo.category_id}&tag=`
            : `/${nickname}/memos?tag=`
        }
      />
    </>
  )
}

export default NickNameMemoDetail
