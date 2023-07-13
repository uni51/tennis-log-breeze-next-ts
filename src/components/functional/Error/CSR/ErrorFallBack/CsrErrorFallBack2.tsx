import { FallbackProps } from 'react-error-boundary'
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
