import { AxiosError } from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import MemoEdit from '@/features/memos/dashboard/components/MemoEdit'
import { useAuth } from '@/hooks/auth'
import { useMemoCategories } from '@/hooks/memos/useMemoCategories'
import { useMemoStatuses } from '@/hooks/memos/useMemoStatuses'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'

const DashboardMemoDetailEdit: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [memo, setMemo] = useState<Memo | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryMemoCategoriesStatus, data: categories } = useMemoCategories()
  const { status: queryMemoStatusesStatus, data: statuses } = useMemoStatuses()
  const [filteredStatuses, setFilteredStatuses] = useState(statuses)

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
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 422) {
          const errors = axiosError.response?.data.errors
          Object.keys(errors).map((key: string) => {
            toast.error(errors[key][0])
          })
        }
        if (axiosError.response?.status === 500) {
          alert('システムエラーです！！')
        }
        router.push('/dashboard/memos')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (router.isReady && router.query.id) {
      fetchMemoData()
    }
  }, [router.isReady, router.query.id])

  useEffect(() => {
    if (memo && statuses && memo.status >= 0 && memo.status <= 3) {
      // memo.statusが0から3の場合、statusesから4番目以降の要素を削除
      const newStatuses = statuses.slice(0, 4)
      setFilteredStatuses(newStatuses)
    } else if (memo && statuses && memo.status === 4) {
      // memo.statusが5の場合、statusesから5番目の「修正待ち」の要素のみを抽出
      const newStatuses = statuses.slice(4, 5)
      setFilteredStatuses(newStatuses)
    }
  }, [memo, statuses])

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
        <MemoEdit memo={memo} statuses={filteredStatuses!} categories={categories!} />
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardMemoDetailEdit
