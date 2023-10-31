import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { useQueryCareers } from '@/hooks/profile/useQueryCareers'

const PlayStyle: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryProfileCareers, data: careers } = useQueryCareers()

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {}, [])

  if (queryProfileCareers === 'pending') return <Loading />
  if (!user) return null

  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>プレースタイルの編集</h2>
      }
    >
      <Head>
        <title></title>
      </Head>
      {/* <ProfileEdit user={user} careers={careers!} /> */}
    </AppLayout>
  )
}

export default PlayStyle
