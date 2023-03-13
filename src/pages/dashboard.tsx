import AppLayout from '../components/Layouts/AppLayout'
import Head from 'next/head'
import { apiClient } from '../lib/apiClient'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Memo = {
  title: string
  body: string
}

const Dashboard = () => {
  const [memos, setMemos] = useState<Memo[]>([])

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    apiClient
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
            <div className="p-6 bg-gray-100 border-b border-gray-200">
              You're logged in!
            </div>
          </div>
          <div className="mt-10">
            <Link href="/memos">メモ一覧ページへ</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
