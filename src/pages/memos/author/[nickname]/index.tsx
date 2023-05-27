import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

const MemoList: NextPage = () => {
  const router = useRouter()
  const { nickname } = router.query

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  const [pageIndex, setPageIndex] = useState(1)

  const userId = nickname === undefined ? 1 : Number(nickname)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      apiClient
        .get(`/api/public/memos/${userId}`)
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setMemos(response.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
      setIsLoading(false)
    }
    init()
  }, [userId])

  if (isLoading) return <Loading />

  const headline = memos?.data[0]?.user_name
    ? `${memos?.data[0]?.user_name}さんの公開中のメモ一覧`
    : '公開中のメモ一覧'

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-32'>
        <div className='mt-3'>
          {/* DBから取得したメモデータの一覧表示 */}
          <div className='grid w-4/5 mx-auto gap-4 grid-cols-2'>
            {memos?.data?.map((memo: Memo, index) => {
              return (
                <a href={`/memos/${memo.id}`} key={index}>
                  <div className='bg-gray-100 shadow-lg mb-5 p-4'>
                    <p className='text-lg font-bold mb-5'>{memo.title}</p>
                    <p className='mb-5'>{memo.body}</p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1'>
                      {memo.category_name}
                    </p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1'>
                      公開中
                    </p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1'>
                      {memo.user_name}
                    </p>
                    <p className='text-sm leading-6 text-gray-500 mt-2'>
                      更新日時：{memo.updated_at}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default MemoList
