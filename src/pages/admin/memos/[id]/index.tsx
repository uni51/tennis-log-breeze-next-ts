import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Loading } from '@/components/Loading'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'
import { useAuth } from '@/hooks/auth'
import { onError } from '@/lib/error-helper'
import { Memo } from '@/types/Memo'
import AdminMemoDetail from '@/features/admin/memos/components/AdminMemoDetail'
import AdminAppLayout from '@/components/Layouts/Admin/AdminAppLayout'
import { AdminAuthGuard } from '@/features/admin/auth/components/AdminAuthGuard'
import { useMemoDetail } from '@/hooks/memos/useMemoDetail'

const AdminMemoDetailIndex: NextPage<Memo> = () => {
  const [apiUrl, setApiUrl] = useState('')
  const [headLine, setHeadLine] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    // Fetch用URL組み立て
    if (router.isReady) {
      const apiUri = `api/admin/memos/${router.query.id}`
      setApiUrl(apiUri)
    }

    setIsLoading(false)
  }, [router.isReady])

  if (isLoading) return <Loading />

  return (
    <AdminAuthGuard>
      <Head>
        <title>管理者ページ：メモ詳細</title>
      </Head>
      <AdminAppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headLine}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <AdminMemoDetail apiUrl={apiUrl} setHeadLine={setHeadLine} />
        </ErrorBoundary>
      </AdminAppLayout>
    </AdminAuthGuard>
  )
}

export default AdminMemoDetailIndex