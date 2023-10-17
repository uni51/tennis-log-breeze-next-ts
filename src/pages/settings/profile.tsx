import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { useQueryProfileCareers } from '@/hooks/memos/useQueryProfileCareer'

const Profile: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [isLoading, setIsLoading] = useState(true)

  const { status: queryProfileCareers, data: careers } = useQueryProfileCareers()

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      if (!user) {
        router.push('/login')
        return
      }

      // ローディング終了は、各種APIリクエストが終わってからにしないと、初期値の設定が正しくできない
      setIsLoading(false)
    }
    init()
  }, [])

  if (isLoading || queryProfileCareers === 'pending') return <Loading />
  if (!user) return null

  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>プロフィールの編集</h2>
      }
    >
      <Head>
        <title>プロフィールの編集</title>
      </Head>
      <ProfileEdit user={user} careers={careers!} />
    </AppLayout>
  )
}

export default Profile
