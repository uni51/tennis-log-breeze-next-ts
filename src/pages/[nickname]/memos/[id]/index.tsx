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

/* ユーザー毎の公開中のメモ詳細ページ */
const MemoByNickNameDetail: NextPage<Memo> = () => {
  const router = useRouter()
  const { nickname, id } = router.query

  const [memo, setMemo] = useState<Memo>()
  const [isLoading, setIsLoading] = useState(true)

  console.log(id)
  console.log(nickname)

  useEffect(() => {
    if (router.isReady) {
      apiClient
        .get(`api/public/${nickname}/memos/${id}`)
        .then((response: AxiosResponse) => {
          setMemo(response.data.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
    }
  }, [nickname, id])

  if (isLoading) return <Loading />

  if (!memo) return <NotFoundPage />

  const headline = `${nickname}さんの公開メモ`

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>メモ詳細を表示</title>
      </Head>
      <SingleMemoDetail memo={memo} />
    </AppLayout>
  )
}

export default MemoByNickNameDetail
