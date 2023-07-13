import { FallbackProps } from 'react-error-boundary'
import CsrErrorDisplay from '@/components/Layouts/Error/CSR/CsrErrorDisplay'

export const CsrErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <CsrErrorDisplay {...error} resetErrorBoundary={resetErrorBoundary} />
    </>
  )
}
