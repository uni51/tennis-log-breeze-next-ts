import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import Pagination from '@/components/Pagination/Pagination'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

const MemoList: NextPage = () => {
  const router = useRouter()

  const { page } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      apiClient
        .get(`/api/public/memos?page=${pageNumber}`)
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setMemos(response.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
      setIsLoading(false)
    }
    init()
  }, [pageNumber])

  if (isLoading) return <Loading />

  const headline = '公開中のメモ一覧'

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-32'>
        <div className='w-1/2 mx-auto text-center'>
          <button
            className='text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400'
            onClick={() => router.push('/memos/post')}
          >
            メモを追加する
          </button>
        </div>
        <div className='mt-3'>
          {/* DBから取得したメモデータの一覧表示 */}
          <div className='grid w-4/5 mx-auto gap-4 grid-cols-2'>
            {memos?.data?.map((memo: Memo, index) => {
              return (
                <a href={`/memos/${memo.id}`} key={index}>
                  <div className='bg-gray-100 shadow-lg mb-5 p-4'>
                    <p className='text-lg font-bold mb-5'>{memo.title}</p>
                    <p className='mb-5'>{memo.body}</p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-1'>
                      {memo.category_name}
                    </p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1'>
                      公開中
                    </p>
                    <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 last:mr-0 mr-1'>
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
          <Pagination numberOfPage={Number(memos?.meta?.last_page)} tag={''} />
        </div>
      </div>
    </AppLayout>
  )
}

export default MemoList
