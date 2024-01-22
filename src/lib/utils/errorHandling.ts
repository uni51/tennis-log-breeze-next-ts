import { AxiosError } from 'axios'
import router from 'next/router'
import { useErrorBoundary } from 'react-error-boundary'
import { toast } from 'react-toastify'

export const handleError = (error: Error, redirectUrl: string) => {
  const { showBoundary } = useErrorBoundary()

  const axiosError = error as AxiosError
  if (axiosError.response?.status === 422) {
    router.push(redirectUrl)
  } else {
    showBoundary(axiosError)
  }
}

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response
    switch (status) {
      case 422:
        if (data.errors) {
          Object.values<string[]>(data.errors).forEach((errorMessages) => {
            errorMessages.forEach((message) => toast.error(message))
          })
        }
        break
      case 500:
        alert('システムエラーです！！')
        break
    }
  }
  return Promise.reject(error)
}
