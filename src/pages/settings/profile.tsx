import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import ProfileEdit from '@/features/settings/profile/ProfileEdit'
import { useAuth } from '@/hooks/auth'
import { useQueryAgeRanges } from '@/hooks/profile/useQueryAgeRanges'
import { useQueryCareers } from '@/hooks/profile/useQueryCareers'
import { useQueryDominantHands } from '@/hooks/profile/useQueryDominantHands'
import { useQueryGenders } from '@/hooks/profile/useQueryGenders'
import { useQueryPlayFrequencies } from '@/hooks/profile/useQueryPlayFrequencies'
import { useQueryTennisLevels } from '@/hooks/profile/useQueryTennisLevels'

const Profile: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [isLoading, setIsLoading] = useState(true)

  const { status: careersStatus, data: careers, error: careersError } = useQueryCareers()

  const { status: gendersStatus, data: genders, error: gendersError } = useQueryGenders()
  // プルダウンの「選択してください」をフロント側で設定する場合は、ここでoption（デフォルト値）を追加する

  const { status: ageRangesStatus, data: ageRanges, error: ageRangesError } = useQueryAgeRanges()
  const {
    status: dominantHandsStatus,
    data: dominantHands,
    error: dominantHandsError,
  } = useQueryDominantHands()
  const {
    status: playFrequenciesStatus,
    data: palyFrequencies,
    error: playFrequenciesError,
  } = useQueryPlayFrequencies()
  const {
    status: tennisLevelsStatus,
    data: tennisLevels,
    error: tennisLevelsError,
  } = useQueryTennisLevels()

  useEffect(() => {
    const init = async () => {
      if (!user) {
        router.push('/login')
        return
      }
      setIsLoading(false)
    }
    init()
  }, [user, router])

  const anyPending =
    careersStatus === 'pending' ||
    gendersStatus === 'pending' ||
    ageRangesStatus === 'pending' ||
    dominantHandsStatus === 'pending' ||
    playFrequenciesStatus === 'pending' ||
    tennisLevelsStatus === 'pending'

  if (isLoading || anyPending) return <Loading />

  const renderError = (error: Error, dataType: string) => (
    <div>
      Error fetching {dataType} data: {error.message}
    </div>
  )

  if (careersError) return renderError(careersError, 'careers')
  if (gendersError) return renderError(gendersError, 'genders')
  if (ageRangesError) return renderError(ageRangesError, 'ageRanges')
  if (dominantHandsError) return renderError(dominantHandsError, 'dominantHands')
  if (playFrequenciesError) return renderError(playFrequenciesError, 'playFrequencies')
  if (tennisLevelsError) return renderError(tennisLevelsError, 'tennisLevels')
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
        careers={careers!}
        genders={genders!}
        ageRanges={ageRanges!}
        dominantHands={dominantHands!}
        playFrequencies={palyFrequencies!}
        tennisLevels={tennisLevels!}
      />
    </AppLayout>
  )
}

export default Profile
