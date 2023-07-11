import { AxiosError, AxiosResponse } from 'axios'
import { apiClient } from '@/lib/utils/apiClient'
import { apiServer } from '@/lib/utils/apiServer'
import { HttpError } from '@/types/HttpError'

export const isAxiosError = (error: any): error is AxiosError => {
  return !!error.isAxiosError
}

export const axiosRequest = async (
  type: 'client' | 'server',
  uri: string,
  showBoundary?: (error: any) => void,
) => {
  switch (type) {
    case 'client':
      return await apiClient
        .get(uri)
        .then((response: AxiosResponse) => {
          return response.data
        })
        .catch((err) => {
          if (isAxiosError(err) && err.response) {
            err.response.data.status = err.response.status
            showBoundary!(err.response.data)
          } else {
            showBoundary!(err)
          }
        })
    case 'server':
      return await apiServer.get(uri).then((response: AxiosResponse) => {
        return response.data
      })
  }
}
