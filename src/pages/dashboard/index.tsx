import { AxiosError, AxiosResponse } from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { useAuthQuery } from '@/hooks/authQuery'
import useCheckLoggedIn from '@/hooks/checkLoggedIn'

/* dashboard（マイページ）のTOPページ */
const DashboardTop = () => {
  const { user } = useAuthQuery({ middleware: 'auth' })
  const checkLoggedIn = useCheckLoggedIn()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にログインチェック
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      const res: boolean = checkLoggedIn()
      if (!res) {
        router.push('/login')
        return
      }
      setIsLoading(false)
    }
    init()
  }, [])

  if (isLoading) return <Loading />
  if (!user) return null

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Dashboard</h2>}
    >
      <Head>
        <title>テニスノート - Dashboard</title>
      </Head>

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-gray-100 border-b border-gray-200'>Youre logged in!</div>
          </div>
          <div className='mt-10'>
            <Link href='/dashboard/memos'>{user?.data?.nickname}さんのメモ一覧ページへ</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default DashboardTop
