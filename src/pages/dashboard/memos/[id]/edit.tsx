import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import MemoEdit from '@/features/memos/dashboard/components/MemoEdit'
import { useAuthQuery } from '@/hooks/authQuery'
import { useQueryMemoCategories } from '@/hooks/memos/useQueryMemoCategories'
import { useQueryMemoStatuses } from '@/hooks/memos/useQueryMemoStatuses'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

const DashboardMemoDetailEdit: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthQuery({ middleware: 'auth' })
  const [memo, setMemo] = useState<Memo | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryMemoCategoriesStatus, data: categories } = useQueryMemoCategories()
  const { status: queryMemoStatusesStatus, data: statuses } = useQueryMemoStatuses()

  useEffect(() => {
    const init = async () => {
      if (router.isReady) {
        if (!router.query.id) {
          router.push('/dashboard/memos')
          return
        }

        const memoResponse = await apiClient.get(`api/dashboard/memos/${router.query.id}`)
        const memoData = memoResponse.data.data

        if (!memoData) {
          router.push('/dashboard/memos')
          return
        }
        console.log(memoData)
        setMemo(memoData)
      }
      setIsLoading(false)
    }
    init()
  }, [router.isReady])

  if (
    isLoading ||
    memo === undefined ||
    queryMemoCategoriesStatus === 'pending' ||
    queryMemoStatusesStatus === 'pending'
  ) {
    return <Loading />
  }

  if (!user) {
    return null
  }

  return (
    <AuthGuard>
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
    </AuthGuard>
  )
}

export default DashboardMemoDetailEdit
