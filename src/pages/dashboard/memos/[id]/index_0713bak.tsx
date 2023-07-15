import { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoDetailNoContent from '@/features/memos/common/components/templates/MemoDetailNoContent'
import SingleMemoDetail from '@/features/memos/common/components/templates/SingleMemoDetail'
import { useAuth } from '@/hooks/auth'
import { apiClient } from '@/lib/utils/apiClient'
import { isAxiosError } from '@/lib/utils/axiosUtils'
import NotFoundPage from '@/pages/404'
import { Memo } from '@/types/Memo'

/* Dashboard（マイページ）のメモ詳細ページ */
const DashboardMemoDetail: NextPage<Memo> = () => {
  const [memo, setMemo] = useState<Memo>()
  const [isLoading, setIsLoading] = useState(true)
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })
  const { showBoundary } = useErrorBoundary()

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
        // .catch((err: AxiosError) => console.log(err.response))
        .catch((err) => {
          if (isAxiosError(err) && err.response && err.response.status === 400) {
            err.response.data.status = err.response.status
            showBoundary!(err.response.data)
          } else {
            showBoundary!(err)
          }
        })
        .finally(() => setIsLoading(false))
    }
  }, [router])

  if (isLoading) return <Loading />

  if (!memo) return <NotFoundPage />

  const headline = `${user!.data!.name}さんのメモ詳細`

  return (
    <>
      <Head>
        <title>{memo.title}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
      >
        {memo && loginUser && memo.user_id === loginUser.id && <SingleMemoDetail memo={memo} />}
        {memo && loginUser && memo.user_id !== loginUser.id && (
          <MemoDetailNoContent message={'閲覧権限がありません'} />
        )}
      </AppLayout>
    </>
  )
}

export default DashboardMemoDetail
