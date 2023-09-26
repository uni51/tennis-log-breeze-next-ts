import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import MemoPost from '@/features/memos/dashboard/components/MemoPost'
import { useAuth } from '@/hooks/auth'
import { UseGetMemoCategories } from '@/hooks/memos/useGetMemoCategories'
import { UseGetMemoStatuses } from '@/hooks/memos/useGetMemoStatuses'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'

const DashboardMemoPost: NextPage = () => {
  // ルーター定義
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [category, setCategory] = useState<Category[]>([])
  const [status, setStatus] = useState<Status[]>([])

  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      if (!user) {
        router.push('/login')
        return
      }

      setCategory(await UseGetMemoCategories())
      setStatus(await UseGetMemoStatuses())
    }
    init()
  }, [])

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
      <MemoPost status={status} category={category} />
    </AppLayout>
  )
}

export default DashboardMemoPost
