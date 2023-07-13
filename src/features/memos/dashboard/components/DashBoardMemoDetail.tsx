import { useErrorBoundary } from 'react-error-boundary'
import { getDashBoardMemoDetail } from '../api/getDashBoardMemoDetail'
import { LoginUser } from '@/types/loginUser'
import SingleMemoDetail from '@/components/templates/SingleMemoDetail'
import MemoDetailNoContent from '@/components/templates/MemoDetailNoContent'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  apiUrl: string
  loginUser: LoginUser
  setTitleText: Dispatch<SetStateAction<string>>
}

const DashboardMemoDetail = ({ apiUrl, loginUser, setTitleText }: Props) => {
  const { showBoundary } = useErrorBoundary()

  const { data: memo, error } = getDashBoardMemoDetail(apiUrl)
  if (error) showBoundary(error)
  if (!memo) return <div>Loading...</div>

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
