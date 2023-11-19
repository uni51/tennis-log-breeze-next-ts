import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useAuthQuery } from '@/hooks/authQuery'
import useCheckLoggedIn from '@/hooks/checkLoggedIn'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'

const DashboardTop = () => {
  const { user } = useAuthQuery({ middleware: 'auth' })
  const checkLoggedIn = useCheckLoggedIn()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const isLoggedIn = await checkLoggedIn()
      if (!isLoggedIn) {
        router.push('/login')
        return
      }
      setIsLoading(false)
    }
    init()
  }, [checkLoggedIn, router])

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
            <div className='p-6 bg-gray-100 border-b border-gray-200'>You're logged in!</div>
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
