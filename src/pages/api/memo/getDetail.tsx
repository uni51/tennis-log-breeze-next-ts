import { AxiosError } from 'axios'
import { NextRouter } from 'next/router'
import { apiClient } from '@/lib/utils/apiClient'

export async function getMemoDetail(router: NextRouter) {
  try {
    const response = await apiClient.get(`api/memos/${router.query.id}`)
    return response.data.data
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err.response)
    }
  }
}

function isAxiosError(error: any): error is AxiosError {
  return !!error.isAxiosError
}
