import type { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuthQuery } from '@/hooks/authQuery'
import { useQueryAgeRanges } from '@/hooks/profile/useQueryAgeRanges'
import { useQueryCareers } from '@/hooks/profile/useQueryCareers'
import { useQueryDominantHands } from '@/hooks/profile/useQueryDominantHands'
import { useQueryGenders } from '@/hooks/profile/useQueryGenders'
import { useQueryPlayFrequencies } from '@/hooks/profile/useQueryPlayFrequencies'
import { useQueryTennisLevels } from '@/hooks/profile/useQueryTennisLevels'
import { AuthGuard } from '@/features/auth/components/AuthGuard'

const Profile: NextPage = () => {
  const { user } = useAuthQuery({ middleware: 'auth' })

  // Custom Hooksを使用してローディングステータスを管理
  const careersQuery = useQueryCareers()
  const gendersQuery = useQueryGenders()
  const ageRangesQuery = useQueryAgeRanges()
  const dominantHandsQuery = useQueryDominantHands()
  const playFrequenciesQuery = useQueryPlayFrequencies()
  const tennisLevelsQuery = useQueryTennisLevels()

  // ローディングステータスを配列にまとめ、someでいずれかがpendingかどうかを判定
  const anyPending = [
    careersQuery,
    gendersQuery,
    ageRangesQuery,
    dominantHandsQuery,
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
  if (careersQuery.error) return renderError(careersQuery.error, 'careers')
  if (gendersQuery.error) return renderError(gendersQuery.error, 'genders')
  if (ageRangesQuery.error) return renderError(ageRangesQuery.error, 'ageRanges')
  if (dominantHandsQuery.error) return renderError(dominantHandsQuery.error, 'dominantHands')
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
          careers={careersQuery.data!}
          genders={gendersQuery.data!}
          ageRanges={ageRangesQuery.data!}
          dominantHands={dominantHandsQuery.data!}
          playFrequencies={playFrequenciesQuery.data!}
          tennisLevels={tennisLevelsQuery.data!}
        />
      </AppLayout>
    </AuthGuard>
  )
}

export default Profile
