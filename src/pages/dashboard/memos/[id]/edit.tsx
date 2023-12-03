import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import MemoEdit from '@/features/memos/dashboard/components/MemoEdit'
import { useAuthQuery } from '@/hooks/authQuery'
import { useMemoCategories } from '@/hooks/memos/useMemoCategories'
import { useQueryMemoStatuses } from '@/hooks/memos/useQueryMemoStatuses'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

const DashboardMemoDetailEdit: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthQuery({ middleware: 'auth' })
  const [memo, setMemo] = useState<Memo | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryMemoCategoriesStatus, data: categories } = useMemoCategories()
  const { status: queryMemoStatusesStatus, data: statuses } = useQueryMemoStatuses()

  const fetchMemoData = async () => {
    try {
      const memoResponse = await apiClient.get(`api/dashboard/memos/${router.query.id}`)
      const memoData = memoResponse.data.data

      if (!memoData) {
        router.push('/dashboard/memos')
        return
      }

      setMemo(memoData)
    } catch (error) {
      console.error('Error fetching memo data:', error)
      router.push('/dashboard/memos')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (router.isReady && router.query.id) {
      fetchMemoData()
    }
  }, [router.isReady, router.query.id])

  if (
    isLoading ||
    !memo ||
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
        <MemoEdit memo={memo} statuses={statuses!} categories={categories!} />
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoDetailEdit
