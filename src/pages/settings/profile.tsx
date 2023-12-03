import type { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { useAgeRanges } from '@/hooks/profile/useAgeRanges'
import { useCareers } from '@/hooks/profile/useCareers'
import { useDominantHands } from '@/hooks/profile/useDominantHands'
import { useQueryGenders } from '@/hooks/profile/useQueryGenders'
import { useQueryPlayFrequencies } from '@/hooks/profile/useQueryPlayFrequencies'
import { useQueryTennisLevels } from '@/hooks/profile/useQueryTennisLevels'
import { AuthGuard } from '@/features/auth/components/AuthGuard'

const Profile: NextPage = () => {
  const { user } = useAuth({ middleware: 'auth' })

  // Custom Hooksを使用してローディングステータスを管理
  const fetchCareers = useCareers()
  const gendersQuery = useQueryGenders()
  const fetchAgeRanges = useAgeRanges()
  const fetchDomainHands = useDominantHands()
  const playFrequenciesQuery = useQueryPlayFrequencies()
  const tennisLevelsQuery = useQueryTennisLevels()

  // ローディングステータスを配列にまとめ、someでいずれかがpendingかどうかを判定
  const anyPending = [
    fetchCareers,
    gendersQuery,
    fetchAgeRanges,
    fetchDomainHands,
    playFrequenciesQuery,
    tennisLevelsQuery,
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
  if (gendersQuery.error) return renderError(gendersQuery.error, 'genders')
  if (fetchAgeRanges.error) return renderError(fetchAgeRanges.error, 'ageRanges')
  if (fetchDomainHands.error) return renderError(fetchDomainHands.error, 'dominantHands')
  if (playFrequenciesQuery.error) return renderError(playFrequenciesQuery.error, 'playFrequencies')
  if (tennisLevelsQuery.error) return renderError(tennisLevelsQuery.error, 'tennisLevels')
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
          genders={gendersQuery.data!}
          ageRanges={fetchAgeRanges.data!}
          dominantHands={fetchDomainHands.data!}
          playFrequencies={playFrequenciesQuery.data!}
          tennisLevels={tennisLevelsQuery.data!}
        />
      </AppLayout>
    </AuthGuard>
  )
}

export default Profile
