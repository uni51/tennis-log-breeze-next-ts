import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoEdit from '@/features/memos/dashboard/components/MemoEdit'
import { useAuth } from '@/hooks/auth'
import { useQueryMemoCategories } from '@/hooks/memos/useQueryMemoCategories'
import { useQueryMemoStatuses } from '@/hooks/memos/useQueryMemoStatuses'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

const DashboardMemoDetailEdit: NextPage = () => {
  // ルーター定義
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [memo, setMemo] = useState<Memo>()
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryMemoCategoriesStatus, data: categories } = useQueryMemoCategories()
  const { status: queryMemoStatusesStatus, data: statuses } = useQueryMemoStatuses()

  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      if (!user) {
        router.push('/login')
        return
      }

      if (!router.query.id) {
        router.push('/dashboard/memos')
        return
      }

      try {
        const memo = await apiClient.get(`api/dashboard/memos/${router.query.id}`)
        setMemo(memo.data.data)
        if (!memo) {
          router.push('/dashboard/memos')
          return
        }
      } catch (err) {
        // TODO：エラー処理
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [router, router.query.id])

  if (isLoading || queryMemoCategoriesStatus === 'pending' || queryMemoStatusesStatus === 'pending')
    return <Loading />
  if (!user) return null

  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Dashboard - メモの編集
        </h2>
      }
    >
      <Head>
        <title>Dashboard - メモの編集</title>
      </Head>
      <MemoEdit memo={memo!} statuses={statuses!} categories={categories!} />
    </AppLayout>
  )
}

export default DashboardMemoDetailEdit
