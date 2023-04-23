import { Memo } from '../../../types/Memo'
import { apiClient } from '../../../lib/utils/apiClient'

export async function getMemoDetail(router) {
  try {
    const response: Memo = await apiClient.get(`api/memos/${router.query.id}`)
    return response.data
  } catch (err) {
    console.log(err.response)
  }
}
