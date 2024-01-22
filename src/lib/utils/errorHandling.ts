import { AxiosError } from 'axios'
import router from 'next/router'
import { useErrorBoundary } from 'react-error-boundary'

export const handleError = (error: Error, redirectUrl: string) => {
  const { showBoundary } = useErrorBoundary()

  const axiosError = error as AxiosError
  if (axiosError.response?.status === 422) {
    router.push(redirectUrl)
  } else {
    showBoundary(axiosError)
  }
}
