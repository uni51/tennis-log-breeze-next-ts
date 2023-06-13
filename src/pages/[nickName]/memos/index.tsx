import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

/* ユーザー毎の公開中の記事一覧ページ */
const MemoList: NextPage = () => {
  const router = useRouter()
  const { nickName } = router.query

  // state定義
  const [memos, setMemos] = useState<Memo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    if (router.isReady) {
      apiClient
        .get(`/api/public/${nickName}/memos`)
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setMemos(response.data.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
    }
  }, [nickName])

  if (isLoading) return <Loading />

  const headline = `${nickName}さんの公開メモ一覧`

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-20'>
        <div className='mt-3'>
          {/* DBから取得したメモデータの一覧表示 */}
          <div className='grid w-4/5 mx-auto gap-4 grid-cols-2'>
            {memos.map((memo: Memo, index) => {
              return (
                <Link href={`/${nickName}/memos/${memo.id}`} key={index}>
                  <div className='bg-gray-100 shadow-lg mb-5 p-4'>
                    <p className='text-lg font-bold mb-5'>{memo.title}</p>
                    <p className='mb-5'>{memo.body}</p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-1'>
                      {memo.category_name}
                    </p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1'>
                      公開中
                    </p>
                    <p className='text-sm leading-6 text-gray-500 mt-2'>
                      更新日時：{memo.updated_at}
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
