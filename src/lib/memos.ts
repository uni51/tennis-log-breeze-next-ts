import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo.d'

// export async function getAllMemoIds() {
//   const res = await apiClient.get('/memos')
//   const memos = res.data.data

//   return memos.map((memo: Memo) => {
//     return {
//       params: {
//         id: memo.id.toString,
//         // id: String(memo.id),
//       },
//     }
//   })
// }

export const getAllPublicMemos = async () => {
  const res = await apiClient.get('/api/public/memos')

  const allPublicMemos = res.data

  return allPublicMemos
}

export async function getMemoData(id: string) {
  const res = await apiClient.get('/memos/${id}')
  const memo = res.data.data
  return memo
}
