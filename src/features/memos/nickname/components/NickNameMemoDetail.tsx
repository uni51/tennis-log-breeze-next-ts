import { Dispatch, SetStateAction, useEffect } from 'react'
import SingleMemoDetail from '@/features/memos/common/components/templates/SingleMemoDetail'
import { useMemoDetail } from '@/hooks/memos/useMemoDetail'
import { useHandleError } from '@/hooks/error/useHandleError'
import LoadingIndicator from '@/components/LoadingIndicator'

type Props = {
  apiUrl: string
  nickname: string
  setTitleText: Dispatch<SetStateAction<string>>
  categoryNumber: number | null
}

const NickNameMemoDetail = ({ apiUrl, nickname, setTitleText, categoryNumber }: Props) => {
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
      <SingleMemoDetail
        memo={memo}
        renderMemoListByCategoryLink={`/${nickname}/memos?category=${memo.category_id}`}
        renderMemoListByNickNameLink={`/${nickname}/memos/`}
        renderMemoListByTagLink={
          categoryNumber
            ? `/${nickname}/memos?category=${memo.category_id}&tag=`
            : `/${nickname}/memos?tag=`
        }
      />
    </>
  )
}

export default NickNameMemoDetail
