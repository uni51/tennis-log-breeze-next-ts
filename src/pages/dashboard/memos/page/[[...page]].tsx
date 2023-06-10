import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks/auth'
import Pagination from '@/components/Pagination/Pagination'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import SingleBlockMemoForList from '@/components/templates/SingleBlockMemoForList'

type ReturnType = DataWithPagination<Memo[]>

/* マイページのメモ一覧ページ（withページャー） */
const MemoList: NextPage = () => {
  const router = useRouter()
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })

  const { page } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
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
        .get(`/api/dashboard/memos?page=${pageNumber}`)
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

  const headline = user?.data?.name
    ? `DashBoard > ${user.data.name}さんのメモ一覧（withページャー）`
    : 'DashBoard > メモ一覧（withページャー）'

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
            {memos?.data?.map((memo: Memo, index) => {
              return (
                <a href={`/memos/${memo.id}`} key={index}>
                  <SingleBlockMemoForList memo={memo} />
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
