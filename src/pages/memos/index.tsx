import AppLayout from '../../components/Layouts/AppLayout'
import Head from 'next/head'
import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { useAuth } from '../../hooks/useAuth'
import { apiClient } from '../../lib/utils/apiClient'
import Link from 'next/link'

type Memo = {
  id: number
  title: string
  body: string
  category_name: string
}

const MemoList: NextPage = () => {
  const router = useRouter()
  // state定義
  const [memos, setMemos] = useState<Memo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { checkLoggedIn } = useAuth()

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/')
        return
      }
      apiClient
        .get('/memos')
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setMemos(response.data.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
    }
    init()
  }, [])

  if (isLoading) return <Loading />

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          メモ一覧
        </h2>
      }>
      <Head>
        <title>メモ一覧</title>
      </Head>
      <div className="mx-auto mt-32">
        <div className="w-1/2 mx-auto text-center">
          <button
            className="text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400"
            onClick={() => router.push('/memos/post')}>
            メモを追加する
          </button>
        </div>
        <div className="mt-3">
          {/* DBから取得したメモデータの一覧表示 */}
          <div className="grid w-4/5 mx-auto gap-4 grid-cols-2">
            {memos.map((memo: Memo, index) => {
              return (
                <Link href={`/memos/${memo.id}`} key={index}>
                  <div className="bg-gray-100 shadow-lg mb-5 p-4">
                    <p className="text-lg font-bold mb-1">{memo.title}</p>
                    <p className="">{memo.body}</p>
                    <p className="text-lg font-bold mb-1">
                      {memo.category_name}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default MemoList
