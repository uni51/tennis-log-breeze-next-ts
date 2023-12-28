import router from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { Loading } from '@/components/Loading'
import { useAdminAuth } from '@/hooks/adminAuth'
import { Admin } from '@/types/Admin'

type Props = {
  children: ReactNode
}

export const AdminAuthGuard = ({ children }: Props) => {
  const { getAdmin } = useAdminAuth({ middleware: 'adminAuth' })
  const [isLoading, setIsLoading] = useState(true)
  const [admin, setAdmin] = useState<Admin | null>(null)

  // 初回レンダリング時にログインチェック
  useEffect(() => {
    const checkAdminLogin = async () => {
      // ログイン中か判定
      const res = await getAdmin.refetch()
      if (!res.data) {
        router.push('/admin/login')
        return
      }
      setAdmin(res.data)
      setIsLoading(false)
    }

    checkAdminLogin()
  }, [])

  if (isLoading) {
    return <Loading />
  }
  if (!admin) return null

  return <>{children}</>
}
