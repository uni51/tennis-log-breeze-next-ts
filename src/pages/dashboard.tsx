import AppLayout from '../components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '../lib/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type Memo = {
  title: string
  body: string
}

const Dashboard = () => {
  const [memos, setMemos] = useState<Memo[]>([])

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    axios
      .get('/api/memos')
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
          Dashboard
        </h2>
      }>
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              You're logged in!
            </div>
          </div>
        </div>
      </div>

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
    </AppLayout>
  )
}

export default Dashboard
