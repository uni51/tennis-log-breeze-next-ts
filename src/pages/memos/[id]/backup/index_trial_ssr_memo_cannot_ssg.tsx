import { apiServer } from 'lib/utils/apiServer'

export default function MemoDetail({ memo }) {
  return (
    <div className="wrapper">
      <h1>メモ詳細を表示</h1>
      <ul>
        <p>id：{memo.id}</p>
        <p>タイトル：{memo.title}</p>
        <p>本文：{memo.body}</p>
        <p>カテゴリー：{memo.category_name}</p>
      </ul>
    </div>
  )
}

// export const getStaticPaths = async () => {
//   const res = await apiServer.get('http://laravel-laravel.test-1:80/api/memos')
//   const users = res.data.data
//   const paths = users.map(user => ({
//     params: { id: user.id.toString() },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps = async ({ params }) => {
//   const res = await apiServer.get(
//     `http://laravel-laravel.test-1:80/api/memos/${params.id}`,
//   )
//   const category = res.data.data
//   return {
//     props: { category },
//   }
// }

export async function getServerSideProps(context) {
  const { query, req } = context

  console.log(query)

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

  console.log(memo)

  return {
    props: { memo },
  }
}
