import { NextPage } from 'next'
// eslint-disable-next-line
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary' // build時に、FallbackProps not found in 'react-error-boundary' のエラーが出る
import AppLayout from '@/components/Layouts/AppLayout'
import { CsrErrorFallback } from '@/components/functional/Error/CSR/ErrorFallBack/CsrErrorFallBack'
import DashboardMemoList from '@/features/memos/dashboard/components/DashboardMemoList'

const DashboardMemoIndex: NextPage = () => {
  return (
    <AppLayout header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{''}</h2>}>
      <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
        <DashboardMemoList />
      </ErrorBoundary>
    </AppLayout>
  )
}

export default DashboardMemoIndex

const onError = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}
