import { AxiosError, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import SingleMemoDetail from '@/components/templates/SingleMemoDetail'
import { apiClient } from '@/lib/utils/apiClient'
import NotFoundPage from '@/pages/404'
import { Memo } from '@/types/Memo'

/* 公開記事のメモ詳細ページ */
const PublicMemoDetail: NextPage<Memo> = () => {
  const [memo, setMemo] = useState<Memo>()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      apiClient
        .get(`api/public/memos/${router.query.id}`)
        .then((response: AxiosResponse) => {
          setMemo(response.data.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
    }
  }, [router])

  if (isLoading) return <Loading />

  if (!memo) return <NotFoundPage />

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>メモ詳細</h2>}
    >
      <Head>
        <title>メモ詳細を表示</title>
      </Head>
      <SingleMemoDetail memo={memo} />
    </AppLayout>
  )
}

export default PublicMemoDetail
