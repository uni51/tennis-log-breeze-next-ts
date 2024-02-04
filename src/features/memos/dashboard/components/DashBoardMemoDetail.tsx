import { Dispatch, SetStateAction, useEffect } from 'react'
import MemoDetailNoContent from '@/features/memos/common/components/templates/MemoDetailNoContent'
import SingleMemoDetail from '@/features/memos/common/components/templates/SingleMemoDetail'
import { useMemoDetail } from '@/hooks/memos/useMemoDetail'
import { LoginUser } from '@/types/loginUser'
import { useHandleError } from '@/hooks/error/useHandleError'
import LoadingIndicator from '@/components/LoadingIndicator'

type Props = {
  apiUrl: string
  loginUser: LoginUser
  setTitleText: Dispatch<SetStateAction<string>>
  categoryId: number | null
}

const DashboardMemoDetail = ({ apiUrl, loginUser, setTitleText, categoryId }: Props) => {
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
        <SingleMemoDetail
          memo={memo}
          loginUser={loginUser}
          renderMemoListByCategoryLink={`/dashboard/memos?category=${memo.category_id}`}
          renderMemoListByNickNameLink='/dashboard/memos/'
          renderMemoListByTagLink={
            categoryId
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
