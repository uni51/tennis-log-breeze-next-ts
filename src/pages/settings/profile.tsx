import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { UseGetMemoCategories } from '@/hooks/memos/useGetMemoCategories'
import { UseGetMemoStatuses } from '@/hooks/memos/useGetMemoStatuses'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'

const Profile: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { checkLoggedIn, user } = useAuth({ middleware: 'auth' })
  const [category, setCategory] = useState<Category[]>([])
  const [status, setStatus] = useState<Status[]>([])

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
      setCategory(await UseGetMemoCategories())
      setStatus(await UseGetMemoStatuses())
    }
    init()
  }, [])

  if (!user) return null

  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Dashboard - メモの登録
        </h2>
      }
    >
      <Head>
        <title>Dashboard - メモの登録</title>
      </Head>
      <ProfileEdit user={user} status={status} category={category} />
    </AppLayout>
  )
}

export default Profile
