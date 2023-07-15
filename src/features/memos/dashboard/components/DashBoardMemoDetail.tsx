import { Dispatch, SetStateAction } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import MemoDetailNoContent from '@/features/memos/common/components/templates/MemoDetailNoContent'
import SingleMemoDetail from '@/features/memos/common/components/templates/SingleMemoDetail'
import { useGetMemoDetail } from '@/hooks/memos/useGetMemoDetail'
import { LoginUser } from '@/types/loginUser'

type Props = {
  apiUrl: string
  loginUser: LoginUser
  setTitleText: Dispatch<SetStateAction<string>>
}

const DashboardMemoDetail = ({ apiUrl, loginUser, setTitleText }: Props) => {
  const { showBoundary } = useErrorBoundary()

  const { data: memo, error } = useGetMemoDetail(apiUrl)
  if (error) showBoundary(error)
  if (!memo)
    return (
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>
          <ClipLoader />
        </div>
      </div>
    )

  setTitleText(memo.title)

  return (
    <>
      {memo && loginUser && memo.user_id === loginUser.id && <SingleMemoDetail memo={memo} />}
      {memo && loginUser && memo.user_id !== loginUser.id && (
        <MemoDetailNoContent message={'閲覧権限がありません'} />
      )}
    </>
  )
}

export default DashboardMemoDetail
