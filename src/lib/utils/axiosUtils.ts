import { AxiosError, AxiosResponse } from 'axios'
import { apiClient } from '@/lib/utils/apiClient'
import { apiServer } from '@/lib/utils/apiServer'

function isAxiosError(error: any): error is AxiosError {
  return !!error.isAxiosError
}

export const axiosRequest = async (type: 'client' | 'server', uri: string) => {
  switch (type) {
    case 'client':
      return await apiClient
        .get(uri)
        .then((response: AxiosResponse) => {
          return response.data
        })
        .catch((err) => {
          if (isAxiosError(err) && err.response && err.response.status === 400) {
            throw new Error(err.response.data.message)
          } else {
            throw new Error(err.message)
          }
        })
    case 'server':
      return await apiServer
        .get(uri)
        .then((response: AxiosResponse) => {
          return response.data
        })
        .catch((err) => {
          if (isAxiosError(err) && err.response && err.response.status === 400) {
            throw new Error(err.response.data.message)
          } else {
            throw new Error(err.message)
          }
        })
  }
}
