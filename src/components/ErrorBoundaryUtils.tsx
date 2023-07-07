import { FallbackProps } from 'react-error-boundary/dist/declarations/src/types'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <pre>react-error-boundary {error}</pre>
      <button type='button' onClick={resetErrorBoundary}>
        reset button
      </button>
    </>
  )
}

export const onError = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}
