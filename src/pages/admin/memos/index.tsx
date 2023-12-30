import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import { AdminAuthGuard } from '@/features/admin/auth/components/AdminAuthGuard'
import AdminMemoList from '@/features/admin/memos/components/AdminMemoList'

const AdminUsers: NextPage = () => {
  const router = useRouter()
  const { page, category } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = category === undefined ? null : Number(category)

  console.log('pageNumber', pageNumber)
  console.log('categoryNumber', categoryNumber)

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

        <AdminMemoList pageIndex={pageNumber} categoryNumber={categoryNumber} />
      </AdminAppLayout>
    </AdminAuthGuard>
  )
}

export default AdminUsers
