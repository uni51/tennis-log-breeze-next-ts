import Head from 'next/head'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import MemoList from '@/features/admin/memos/components/MemoList'
import { AdminAuthGuard } from '@/features/admin/auth/components/AdminAuthGuard'

const AdminUsers = () => {
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

        <MemoList />
      </AdminAppLayout>
    </AdminAuthGuard>
  )
}

export default AdminUsers
