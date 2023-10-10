import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoPost from '@/features/memos/dashboard/components/MemoPost'
import { useAuth } from '@/hooks/auth'
import { useQueryMemoCategories } from '@/hooks/memos/useQueryMemoCategories'
import { UseMemoStatuses } from '@/hooks/memos/useMemoStatuses'
import { Status } from '@/types/Status'

const DashboardMemoPost: NextPage = () => {
  // ルーター定義
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [isLoading, setIsLoading] = useState(true)
  const { status: useQueryStatus, data: categories } = useQueryMemoCategories()

  const [statuses, setStatuses] = useState<Status[]>([])

  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      if (!user) {
        router.push('/login')
        return
      }

      // setCategory(await useQueryMemoCategories())
      setStatuses(await UseMemoStatuses())
      setIsLoading(false)
    }
    init()
  }, [])

  if (isLoading || useQueryStatus === 'pending') return <Loading />
  if (!user) return null

  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Dashboard - メモの登録
        </h2>
      }
    >
      <Head>
        <title>Dashboard - メモの登録</title>
      </Head>
      <MemoPost statuses={statuses} categories={categories!} />
    </AppLayout>
  )
}

export default DashboardMemoPost
