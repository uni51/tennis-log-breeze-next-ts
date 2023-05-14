import AppLayout from '../../components/Layouts/AppLayout'
import Head from 'next/head'
import { apiClient } from '../../lib/utils/apiClient'
import { useRouter } from 'next/router'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type Memo = {
  title: string
  body: string
}

const Dashboard = () => {
  const router = useRouter()
  const [memos, setMemos] = useState<Memo[]>([])

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    apiClient
      .get('/memos')
      .then((response: AxiosResponse) => {
        console.log(response.data)
        setMemos(response.data.data)
      })
      .catch((err: AxiosError) => console.log(err.response))
  }, [])

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard - メモ一覧
        </h2>
      }>
      <Head>
        <title>Dashboard - メモ一覧</title>
      </Head>

      <div className="w-2/3 mx-auto mt-32">
        <div className="w-1/2 mx-auto text-center">
          <button
            className="text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400"
            onClick={() => router.push('/memos/post')}>
            メモを追加する
          </button>
        </div>
        <div className="mt-3">
          {/* DBから取得したメモデータの一覧表示 */}
          <div className="grid w-2/3 mx-auto gap-4 grid-cols-2">
            {/* tempMemosをmemosに変更する */}
            {memos.map((memo: Memo, index) => {
              return (
                <div className="bg-gray-100 shadow-lg mb-5 p-4" key={index}>
                  <p className="text-lg font-bold mb-1">{memo.title}</p>
                  <p className="">{memo.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
