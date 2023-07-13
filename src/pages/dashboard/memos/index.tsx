import { NextPage } from 'next'
// eslint-disable-next-line
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary' // build時に、FallbackProps not found in 'react-error-boundary' のエラーが出る
import AppLayout from '@/components/Layouts/AppLayout'
import SingleMemoBlockForList from '@/components/templates/SingleMemoBlockForList'
import { useDashBoardMemoList } from '@/hooks/memos'
import { isAxiosError } from '@/lib/utils/axiosUtils'
import { Memo } from '@/types/Memo'
import { CsrErrorFallback } from '@/components/functional/Error/CSR/ErrorFallBack/CsrErrorFallBack'

const DashboardMemoList = () => {
  const { data: memos, error: err } = useDashBoardMemoList()
  const { showBoundary } = useErrorBoundary()

  console.log(err)

  if (err) {
    if (isAxiosError(err) && err.response) {
      err.response.data.status = err.response.status
      showBoundary!(err.response.data)
    } else {
      showBoundary!(err)
    }
  }

  if (!memos) return <div>Loading...</div>

  return (
    <div className='mt-3'>
      {/* DBから取得したメモデータの一覧表示 */}
      <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
        {memos?.data?.map((memo: Memo, index) => {
          return (
            <SingleMemoBlockForList
              memo={memo}
              renderMemoDetailLink={`/dashboard/memos/${memo.id}`}
              renderMemoListByCategoryLink={`/dashboard/memos?category=${memo.category_id}`}
              renderMemoListByNickNameLink={`/dashboard/memos/`}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

const Index: NextPage = () => {
  return (
    <AppLayout header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{''}</h2>}>
      <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
        <DashboardMemoList />
      </ErrorBoundary>
    </AppLayout>
  )
}

export default Index

const onError = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}
