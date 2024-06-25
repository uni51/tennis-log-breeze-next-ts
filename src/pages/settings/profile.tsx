import type { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { useCareers } from '@/hooks/profile/useCareers'
import { useDominantHands } from '@/hooks/profile/useDominantHands'
import { useGenders } from '@/hooks/profile/useGenders'
import { usePlayFrequencies } from '@/hooks/profile/usePlayFrequencies'
import { useTennisLevels } from '@/hooks/profile/useTennisLevels'

const Profile: NextPage = () => {
  const { user } = useAuth({ middleware: 'auth' })

  // Custom Hooksを使用してローディングステータスを管理
  const fetchCareers = useCareers()
  const fetchGenders = useGenders()
  const fetchDomainHands = useDominantHands()
  const fetchPlayFrequencies = usePlayFrequencies()
  const fetchTennisLevels = useTennisLevels()

  // ローディングステータスを配列にまとめ、someでいずれかがpendingかどうかを判定
  const anyPending = [
    fetchCareers,
    fetchGenders,
    fetchDomainHands,
    fetchPlayFrequencies,
    fetchTennisLevels,
  ].some((query) => query.status === 'pending')

  if (anyPending) return <Loading />

  // エラーハンドリングの共通関数
  const renderError = (error: Error, dataType: string) => (
    <div>
      Error fetching {dataType} data: {error.message}
    </div>
  )

  // エラーがあれば該当する関数を呼び出してエラーメッセージを表示
  if (fetchCareers.error) return renderError(fetchCareers.error, 'careers')
  if (fetchGenders.error) return renderError(fetchGenders.error, 'genders')
  if (fetchDomainHands.error) return renderError(fetchDomainHands.error, 'dominantHands')
  if (fetchPlayFrequencies.error) return renderError(fetchPlayFrequencies.error, 'playFrequencies')
  if (fetchTennisLevels.error) return renderError(fetchTennisLevels.error, 'tennisLevels')
  if (!user) return null

  return (
    <AuthGuard>
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
          careers={fetchCareers.data!}
          genders={fetchGenders.data!}
          dominantHands={fetchDomainHands.data!}
          playFrequencies={fetchPlayFrequencies.data!}
          tennisLevels={fetchTennisLevels.data!}
        />
      </AppLayout>
    </AuthGuard>
  )
}

export default Profile
