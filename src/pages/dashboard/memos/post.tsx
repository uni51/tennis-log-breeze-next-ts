import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoPost from '@/features/memos/dashboard/components/MemoPost'
import { useAuthQuery } from '@/hooks/authQuery'
import useCheckLoggedIn from '@/hooks/checkLoggedIn'
import { useQueryMemoCategories } from '@/hooks/memos/useQueryMemoCategories'
import { useQueryMemoStatuses } from '@/hooks/memos/useQueryMemoStatuses'

const DashboardMemoPost: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthQuery({ middleware: 'auth' })
  const checkLoggedIn = useCheckLoggedIn()
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryMemoCategoriesStatus, data: categories } = useQueryMemoCategories()
  const { status: queryMemoStatusesStatus, data: statuses } = useQueryMemoStatuses()

  useEffect(() => {
    const init = async () => {
      const isLoggedIn = await checkLoggedIn()
      if (!isLoggedIn) {
        router.push('/login')
      }
      setIsLoading(false)
    }

    init()
  }, [router, checkLoggedIn])

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
          Dashboard - メモの登録
        </h2>
      }
    >
      <Head>
        <title>Dashboard - メモの登録</title>
      </Head>
      <MemoPost statuses={statuses!} categories={categories!} />
    </AppLayout>
  )
}

export default DashboardMemoPost
