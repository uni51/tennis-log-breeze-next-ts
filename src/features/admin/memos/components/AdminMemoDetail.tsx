import { Dispatch, SetStateAction, useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import { useMemoDetail } from '@/hooks/memos/useMemoDetail'
import AdminSingleMemoDetail from './AdminSingleMemoDetail'

type Props = {
  apiUrl: string
  setHeadLine: Dispatch<SetStateAction<string>>
}

const AdminMemoDetail = ({ apiUrl, setHeadLine }: Props) => {
  const { showBoundary } = useErrorBoundary()

  const { data: memo, error } = useMemoDetail(apiUrl)

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }

    if (memo && setHeadLine) {
      setHeadLine(`${memo.user_nickname}さんのメモ詳細`)
    }
  }, [error, memo, setHeadLine])

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
      <AdminSingleMemoDetail memo={memo} />
    </>
  )
}

export default AdminMemoDetail
