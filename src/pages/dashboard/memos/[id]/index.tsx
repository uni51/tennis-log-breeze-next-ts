import { AxiosError, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoDetailNoContent from '@/components/templates/MemoDetailNoContent'
import SingleMemoDetail from '@/components/templates/SingleMemoDetail'
import { useAuth } from '@/hooks/auth'
import { apiClient } from '@/lib/utils/apiClient'
import NotFoundPage from '@/pages/404'
import { Memo } from '@/types/Memo'

/* Dashboard（マイページ）のメモ詳細ページ */
const DashboardMemoDetail: NextPage<Memo> = () => {
  const [memo, setMemo] = useState<Memo>()
  const [isLoading, setIsLoading] = useState(true)
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })

  const router = useRouter()

  let loginUser = user?.data

  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      const checkLoginResponse: boolean = await checkLoggedIn()
      if (!checkLoginResponse) {
        router.push('/login')
        return
      }
    }
    init()
    if (router.isReady) {
      apiClient
        .get(`api/dashboard/memos/${router.query.id}`)
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
      {memo && loginUser && memo.user_id === loginUser.id && <SingleMemoDetail memo={memo} />}
      {memo && loginUser && memo.user_id !== loginUser.id && (
        <MemoDetailNoContent message={'閲覧権限がありません'} />
      )}
    </AppLayout>
  )
}

export default DashboardMemoDetail