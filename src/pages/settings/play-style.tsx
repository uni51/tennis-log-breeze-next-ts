import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks/auth'
import useCheckLoggedIn from '@/hooks/checkLoggedIn'
import { useCareers } from '@/hooks/profile/useCareers'

const PlayStyle: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const checkLoggedIn = useCheckLoggedIn()
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryProfileCareers, data: careers } = useCareers()

  // 認証ガード
  useEffect(() => {
    const res: boolean = checkLoggedIn()
    if (!res) {
      router.push('/login')
      return
    }
    setIsLoading(false)
  }, [])

  if (isLoading || queryProfileCareers === 'pending') return <Loading />
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
