import { Dispatch, SetStateAction, useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import MemoDetailNoContent from '@/features/memos/common/components/templates/MemoDetailNoContent'
import SingleMemoDetail from '@/features/memos/common/components/templates/SingleMemoDetail'
import { useMemoDetail } from '@/hooks/memos/useMemoDetail'
import { LoginUser } from '@/types/loginUser'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

type Props = {
  apiUrl: string
  loginUser: LoginUser
  setTitleText: Dispatch<SetStateAction<string>>
  categoryNumber: number | null
}

const DashboardMemoDetail = ({ apiUrl, loginUser, setTitleText, categoryNumber }: Props) => {
  const router = useRouter()
  const { showBoundary } = useErrorBoundary()

  const { data: memo, error } = useMemoDetail(apiUrl)

  useEffect(() => {
    if (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 422) {
        router.push('/dashboard/memos')
        return
      } else {
        showBoundary(axiosError)
      }
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
        <SingleMemoDetail
          memo={memo}
          loginUser={loginUser}
          renderMemoListByCategoryLink={`/dashboard/memos?category=${memo.category_id}`}
          renderMemoListByNickNameLink='/dashboard/memos/'
          renderMemoListByTagLink={
            categoryNumber
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
