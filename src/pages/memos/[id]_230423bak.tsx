import { NextPage } from 'next'
import { apiServer } from 'lib/utils/apiServer'

type APIResponseMemo = {
  data: {
    memo: {
      id: number
      title: string
      body: string
      category_id: number
      category_name: string
      // tag_list: ['tags', 'normalized']
    }
  }
}

type Props = APIResponseMemo['data']

export async function getServerSideProps(context) {
  const { query, req } = context

  const res = await apiServer.get(`/api/memos/${query.id}`, {
    headers: {
      origin: 'localhost:3000',
      Cookie: req.headers.cookie,
    },
  })
  const memo = res.data.data

  return {
    props: { memo },
  }
}

const MemoDetail: NextPage<Props> = ({ memo }) => {
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

export default MemoDetail
