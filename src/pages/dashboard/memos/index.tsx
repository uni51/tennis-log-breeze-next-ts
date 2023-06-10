import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks/auth'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import SingleDetailMemo from '@/components/templates/SingleDetailMemo'

/* マイページのメモ一覧ページ */
const DashboardMemosList: NextPage = () => {
  const router = useRouter()
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })

  // state定義
  const [memos, setMemos] = useState<Memo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/login')
        return
      }
      apiClient
        .get('/api/dashboard/memos')
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

  const headline = user?.data?.name
    ? `DashBoard > ${user.data.name}さんのメモ一覧`
    : 'DashBoard > メモ一覧'

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>
          <button
            className='text-xl mb-5 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400'
            onClick={() => router.push('/memos/post')}
          >
            メモを追加する
          </button>
        </div>
        <div className='mt-3'>
          {/* DBから取得したメモデータの一覧表示 */}
          <div className='grid w-4/5 mx-auto gap-4'>
            {memos.map((memo: Memo, index) => {
              return (
                <a href={`/memos/${memo.id}`} key={index}>
                  <SingleDetailMemo memo={memo} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default DashboardMemosList
