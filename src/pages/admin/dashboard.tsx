import Head from 'next/head'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import { AdminAuthGuard } from '@/features/admin/auth/components/AdminAuthGuard'

const AdminDashboard = () => {
  return (
    <AdminAuthGuard>
      <AdminAppLayout
        header={
          <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
            管理者画面 Dashboard
          </h2>
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
    </AdminAuthGuard>
  )
}

export default AdminDashboard
