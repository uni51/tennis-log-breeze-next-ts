// eslint-disable-next-line
import { FallbackProps } from 'react-error-boundary' // build時に、FallbackProps not found in 'react-error-boundary' のエラーが出る
import CsrErrorDisplay from '@/components/Layouts/Error/CSR/CsrErrorDisplay'
import { isAxiosError } from '@/lib/utils/axiosUtils'

export const CsrErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (isAxiosError(error) && error.response) {
    error.response.data.status = error.response.status
    error = error.response.data
  }

  return (
    <>
      <CsrErrorDisplay {...error} resetErrorBoundary={resetErrorBoundary} />
    </>
  )
}
