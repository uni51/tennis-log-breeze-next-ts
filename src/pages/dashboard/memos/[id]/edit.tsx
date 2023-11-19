import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoEdit from '@/features/memos/dashboard/components/MemoEdit'
import { useAuthQuery } from '@/hooks/authQuery'
import { useQueryMemoCategories } from '@/hooks/memos/useQueryMemoCategories'
import { useQueryMemoStatuses } from '@/hooks/memos/useQueryMemoStatuses'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import useCheckLoggedIn from '@/hooks/checkLoggedIn'

const DashboardMemoDetailEdit: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthQuery({ middleware: 'auth' })
  const checkLoggedIn = useCheckLoggedIn()
  const [memo, setMemo] = useState<Memo | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryMemoCategoriesStatus, data: categories } = useQueryMemoCategories()
  const { status: queryMemoStatusesStatus, data: statuses } = useQueryMemoStatuses()

  useEffect(() => {
    const init = async () => {
      const isLoggedIn = await checkLoggedIn()

      if (!isLoggedIn) {
        router.push('/login')
        return
      }

      if (!router.query.id) {
        router.push('/dashboard/memos')
        return
      }

      try {
        const memoResponse = await apiClient.get(`api/dashboard/memos/${router.query.id}`)
        const memoData = memoResponse.data.data

        if (!memoData) {
          router.push('/dashboard/memos')
          return
        }

        setMemo(memoData)
      } catch (err) {
        console.error(err) // エラー処理は適切に行う
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [router, router.query.id, checkLoggedIn])

  if (
    isLoading ||
    queryMemoCategoriesStatus === 'pending' ||
    queryMemoStatusesStatus === 'pending'
  ) {
    return <Loading />
  }

  if (!user) {
    return null
  }

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
