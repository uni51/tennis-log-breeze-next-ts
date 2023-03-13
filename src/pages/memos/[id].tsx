import { apiClient, apiServer } from 'lib/utils/apiClient'

export default function MemoDetail({ memo }) {
  return (
    <div className="wrapper">
      <h1>メモ詳細を表示</h1>
      <ul>
        <p>ID：{memo.id}</p>
        <p>タイトル：{memo.title}</p>
        <p>本文：{memo.body}</p>
        <p>カテゴリー：{memo.category_name}</p>
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { query, req } = context

  const res = await apiServer.get(
    `http://laravel-laravel.test-1:80/api/memos/${query.id}`,
    {
      headers: {
        origin: 'localhost:3000',
        Cookie: req.headers.cookie,
      },
    },
  )
  const memo = res.data.data

  return {
    props: { memo },
  }
}
