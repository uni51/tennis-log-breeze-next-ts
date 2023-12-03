import Head from 'next/head'
import router from 'next/router'
import { useEffect, useState } from 'react'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import { Loading } from '@/components/Loading'
import MemoList from '@/features/admin/memos/components/MemoList'
import { useAdminAuth } from '@/hooks/adminAuth'

const AdminUsers = () => {
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

  return (
    <AdminAppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>管理者画面 Dashboard</h2>
      }
    >
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>

      <MemoList />
    </AdminAppLayout>
  )
}

export default AdminUsers
