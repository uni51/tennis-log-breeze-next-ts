import { isAxiosError } from './axiosUtils'
import { useErrorBoundary } from 'react-error-boundary'

export const handlingAxiosError = (error: any) => {
  const { showBoundary } = useErrorBoundary()

  if (isAxiosError(error) && error.response) {
    error.response.data.status = error.response.status
    showBoundary!(error.response.data)
  } else {
    showBoundary!(error)
  }
}
