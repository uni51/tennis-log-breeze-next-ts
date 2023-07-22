import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const getKey = (pageIndex: any, previousPageData: string | any[]) => {
  if (previousPageData && !previousPageData.length) return null // 最後に到達した
  return `/api/public/memos?page=${pageIndex}` // SWR キー
}

const fetcher = (dataKey: string): Promise<Memo[]> => {
  return apiClient.get(dataKey).then((res: any) => res.data.data)
}

export default function App() {
  const [page, setPage] = useState(0)
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
  if (!data) return 'loading'

  // これで、すべてのユーザー数を計算できます
  let totalUsers = 0
  for (let i = 0; i < data.length; i++) {
    totalUsers += 6
  }

  return (
    <div>
      <p>{totalUsers} ユーザーがリストされています</p>
      {data.map((memos, index) => {
        if (index === page) {
          // `data` は、各ページの API レスポンスの配列です
          return memos.map((memo) => <div key={memo.id}>{memo.id}</div>)
        }
      })}
      <button
        onClick={() => {
          setSize(size - 1), setPage(page - 1)
        }}
      >
        前に戻る
      </button>
      <button
        onClick={() => {
          setSize(size + 1), setPage(page + 1)
        }}
      >
        さらに読み込む
      </button>
    </div>
  )
}
