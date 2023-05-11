import { Memo } from '../../../types/Memo'
import { apiClient } from '../../../lib/utils/apiClient'
import { NextRouter } from 'next/router'
import { AxiosError } from 'axios'

export async function getMemoDetail(router: NextRouter) {
  try {
    const response: Memo = await apiClient.get(`api/memos/${router.query.id}`)
    return response.data
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err.response)
    }
  }
}

function isAxiosError(error: any): error is AxiosError {
  return !!error.isAxiosError
}
