import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { UseMemoCategories } from '@/hooks/memos/UseMemoCategories'
import { UseMemoStatuses } from '@/hooks/memos/UseMemoStatuses'
import { UseCareer } from '@/hooks/memos/useCareerTypes'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'

const Profile: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })
  const [category, setCategory] = useState<Category[]>([])
  const [status, setStatus] = useState<Status[]>([])
  const [career, setCareer] = useState<any[]>([])

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      // ログイン中か判定
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/login')
        return
      }
      setIsLoading(false)
      setCategory(await UseMemoCategories())
      setStatus(await UseMemoStatuses())
      setCareer(await UseCareer())
    }
    init()
  }, [])

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
      <ProfileEdit user={user} status={status} category={category} career={career} />
    </AppLayout>
  )
}

export default Profile
