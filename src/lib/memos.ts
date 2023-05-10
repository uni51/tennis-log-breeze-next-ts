import { Memo } from './../types/Memo.d'
import { apiClient } from './utils/apiClient'

export async function getAllMemoIds() {
  const res = await apiClient.get('/api/memos')
  const memos = res.data.data

  return memos.map((memo: Memo['data']['memo']) => {
    return {
      params: {
        id: memo.id.toString,
        // id: String(memo.id),
      },
    }
  })
}

export async function getMemoData(id: string) {
  const res = await apiClient.get('/api/memos/${id}')
  const memo = res.data.data
  return memo
}
