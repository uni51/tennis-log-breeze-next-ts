import Head from 'next/head'
import router from 'next/router'
import { useEffect, useState } from 'react'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import { Loading } from '@/components/Loading'
import { useAdminAuth } from '@/hooks/adminAuth'

const AdminDashboard = () => {
  const { admin, getAdmin } = useAdminAuth({ middleware: 'adminAuth' })
  const [isLoading, setIsLoading] = useState(false)

  // 初回レンダリング時にログインチェック
  useEffect(() => {
    const init = async () => {
      // // ログイン中か判定
      const res = await getAdmin.refetch()
      if (!res.data) {
        router.push('/admin/login')
        return
      }
      setIsLoading(false)
    }
    init()
  }, [])

  if (isLoading) return <Loading />
  // if (!admin) return null

  return (
    <AdminAppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>管理者画面 Dashboard</h2>
      }
    >
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              管理者画面にログインしました
            </div>
          </div>
        </div>
      </div>
    </AdminAppLayout>
  )
}

export default AdminDashboard
