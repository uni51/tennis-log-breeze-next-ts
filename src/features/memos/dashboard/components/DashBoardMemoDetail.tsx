import { Dispatch, SetStateAction, useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import MemoDetailNoContent from '@/features/memos/common/components/templates/MemoDetailNoContent'
import SingleMemoDetail from '@/features/memos/common/components/templates/SingleMemoDetail'
import { useQueryMemoDetail } from '@/hooks/memos/useQueryMemoDetail'
import { LoginUser } from '@/types/loginUser'

type Props = {
  apiUrl: string
  loginUser: LoginUser
  setTitleText: Dispatch<SetStateAction<string>>
}

const DashboardMemoDetail = ({ apiUrl, loginUser, setTitleText }: Props) => {
  const { showBoundary } = useErrorBoundary()

  const { data: memo, error } = useQueryMemoDetail(apiUrl)

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }

    if (memo && setTitleText) {
      setTitleText(memo.title)
    }
  }, [error, memo, setTitleText])

  if (!memo) {
    return (
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>
          <ClipLoader />
        </div>
      </div>
    )
  }

  return (
    <>
      {memo && loginUser && memo.user_id === loginUser.id && (
        <SingleMemoDetail memo={memo} loginUser={loginUser} />
      )}
      {memo && loginUser && memo.user_id !== loginUser.id && (
        <MemoDetailNoContent message={'閲覧権限がありません'} />
      )}
    </>
  )
}

export default DashboardMemoDetail
