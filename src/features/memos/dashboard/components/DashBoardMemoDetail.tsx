import { Dispatch, SetStateAction, useEffect } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'
import MemoDetailCard from '@/features/memos/common/components/templates/MemoDetailCard'
import MemoDetailNoContent from '@/features/memos/common/components/templates/MemoDetailNoContent'
import { useHandleError } from '@/hooks/error/useHandleError'
import { useMemoDetail } from '@/hooks/memos/useMemoDetail'
import { LoginUser } from '@/types/loginUser'

type Props = {
  apiUrl: string
  loginUser: LoginUser
  setTitleText: Dispatch<SetStateAction<string>>
  category?: number
}

const DashboardMemoDetail = ({ apiUrl, loginUser, setTitleText, category }: Props) => {
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
      {memo && loginUser && memo.user_id === loginUser.id && (
        <MemoDetailCard
          memo={memo}
          loginUser={loginUser}
          renderMemoListByCategoryLink={`/dashboard/memos?category=${memo.category_id}`}
          renderMemoListByNickNameLink='/dashboard/memos/'
          renderMemoListByTagLink={
            category
              ? `/dashboard/memos?category=${memo.category_id}&tag=`
              : `/dashboard/memos?tag=`
          }
        />
      )}
      {memo && loginUser && memo.user_id !== loginUser.id && (
        <MemoDetailNoContent message={'閲覧権限がありません'} />
      )}
    </>
  )
}

export default DashboardMemoDetail
