import AppLayout from '../../components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { apiClient } from '../../lib/utils/apiClient'
import { Loading } from '../../components/Loading'

type Memo = {
  id: number
  title: string
  body: string
  category_name: string
}

const MemoDetail = () => {
  const [memo, setMemo] = useState<Memo>()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      apiClient
        .get(`api/memos/${router.query.id}`)
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setMemo(response.data.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
    }
  }, [router])

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
        <div className="grid w-4/5 mx-auto gap-4">
          <div className="bg-gray-100 shadow-lg mb-5 p-4">
            <p className="text-lg font-bold mb-1">{memo.title}</p>
            <p className="">{memo.body}</p>
            <p className="text-lg font-bold mb-1">{memo.category_name}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default MemoDetail
