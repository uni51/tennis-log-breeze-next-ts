import { NextPage } from 'next'
import Head from 'next/head'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import AdminMemoList from '@/features/admin/memos/components/AdminMemoList'
import { AdminAuthGuard } from '@/features/admin/auth/components/AdminAuthGuard'
import { useRouter } from 'next/router'

const AdminUsers: NextPage = () => {
  const router = useRouter()
  const { page, category } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryId = category === undefined ? null : Number(category)

  console.log('pageNumber', pageNumber)
  console.log('categoryId', categoryId)

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

        <AdminMemoList pageIndex={pageNumber} categoryId={categoryId} />
      </AdminAppLayout>
    </AdminAuthGuard>
  )
}

export default AdminUsers
