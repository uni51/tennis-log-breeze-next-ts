import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import ProfileEditZod from '@/features/settings/profile/ProfileEditZod'
import { useAuth } from '@/hooks/auth'
import { Career } from '@/types/Career'
import { UseCareer } from '@/hooks/memos/useCareer'

const Profile: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })

  const [career, setCareer] = useState<Career[]>([])

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/login')
        return
      }

      setCareer(await UseCareer())
      // ローディング終了は、各種APIリクエストが終わってからにしないと、初期値の設定が正しくできない
      setIsLoading(false)
    }
    init()
  }, [])

  if (isLoading) return <Loading />
  if (!user) return null

  console.log(user)

  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>プロフィールの編集</h2>
      }
    >
      <Head>
        <title>プロフィールの編集</title>
      </Head>
      <ProfileEditZod user={user} career={career} />
    </AppLayout>
  )
}

export default Profile
