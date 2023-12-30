import Head from 'next/head'
import Link from 'next/link'
import AppLayout from '@/components/Layouts/AppLayout'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { useAuth } from '@/hooks/auth'

const DashboardTop = () => {
  const { user } = useAuth({ middleware: 'auth' })
  if (!user) return null

  return (
    <AuthGuard>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Dashboard</h2>}
      >
        <Head>
          <title>テニスノート - Dashboard</title>
        </Head>

        <div className='py-12'>
          <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
              <div className='p-6 bg-gray-100 border-b border-gray-200'>You&apos;re logged in!</div>
            </div>
            <div className='mt-10'>
              <Link href='/dashboard/memos'>{user?.data?.nickname}さんのメモ一覧ページへ</Link>
            </div>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  )
}

export default DashboardTop
