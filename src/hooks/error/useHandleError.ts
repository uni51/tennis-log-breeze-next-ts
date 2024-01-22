import { AxiosError } from 'axios'
import router from 'next/router'
import { useErrorBoundary } from 'react-error-boundary'

export const useHandleError = () => {
  const { showBoundary } = useErrorBoundary()

  const handleError = (error: Error, redirectUrl: string) => {
    const axiosError = error as AxiosError
    if (
      axiosError.response?.status === 403 || // 403はForbiddenエラー
      axiosError.response?.status === 405 || // 405はメソッドが許可されていない（ルートが存在しない）エラー
      axiosError.response?.status === 422 // 422はバリデーションエラー
    ) {
      router.push(redirectUrl)
    } else {
      showBoundary(axiosError)
    }
  }

  return handleError
}
