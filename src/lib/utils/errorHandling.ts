import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response
    switch (status) {
      case 403:
        toast.error(data.message)
        break
      case 422:
        if (data.errors) {
          Object.values<string[]>(data.errors).forEach((errorMessages) => {
            errorMessages.forEach((message) => toast.error(message))
          })
        }
        if (data.message && !data.errors) {
          toast.error(data.message)
        }
        break
      case 500:
        alert('システムエラーです！！')
        break
    }
  }
  return Promise.reject(error)
}
