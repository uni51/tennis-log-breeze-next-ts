import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { UseCareer } from '@/hooks/memos/useCareer'
import { UseMemoCategories } from '@/hooks/memos/useMemoCategories'
import { UseMemoStatuses } from '@/hooks/memos/useMemoStatuses'
import { UsePlayFrequency } from '@/hooks/memos/usePlayFrequency'
import { Career } from '@/types/Career'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'
import { PlayFrequency } from '@/types/playFrequency'

const Profile: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })
  const [category, setCategory] = useState<Category[]>([])
  const [status, setStatus] = useState<Status[]>([])
  const [career, setCareer] = useState<Career[]>([])
  const [frequency, setFrequency] = useState<PlayFrequency[]>([])

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/login')
        return
      }
      setCategory(await UseMemoCategories())
      setStatus(await UseMemoStatuses())
      setCareer(await UseCareer())
      setFrequency(await UsePlayFrequency())
      // ローディング終了は、各種APIリクエストが終わってからにしないと、初期値の設定が正しくできない
      setIsLoading(false)
    }
    init()
  }, [])

  if (isLoading) return <Loading />
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
      <ProfileEdit
        user={user}
        status={status}
        category={category}
        career={career}
        frequency={frequency}
      />
    </AppLayout>
  )
}

export default Profile
