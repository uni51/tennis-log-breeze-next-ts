import axios from 'axios'

export default function Users({ category }) {
  console.log(category)

  return (
    <div className="wrapper">
      <h1>ユーザー一覧を表示</h1>
      <ul>
        <p>名前：{category.name}</p>
      </ul>
    </div>
  )
}

export const getStaticPaths = async () => {
  const res = await axios.get('http://laravel-laravel.test-1:80/api/categories')
  const categories = res.data.data
  const paths = categories.map(category => ({
    params: { id: category.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await axios.get(
    `http://laravel-laravel.test-1:80/api/categories/${params.id}`,
  )
  const category = res.data.data
  return {
    props: { category },
  }
}
