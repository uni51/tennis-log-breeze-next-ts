import { Dispatch, SetStateAction } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import SingleMemoDetail from '@/features/memos/common/components/templates/SingleMemoDetail'
import { useGetMemoDetail } from '@/hooks/memos/useGetMemoDetail'

type Props = {
  apiUrl: string
  // setTitleText: Dispatch<SetStateAction<string>>
}

const NickNameMemoDetail = ({ apiUrl }: Props) => {
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

  // setTitleText(memo.title)

  return (
    <>
      <SingleMemoDetail memo={memo} />
    </>
  )
}

export default NickNameMemoDetail
