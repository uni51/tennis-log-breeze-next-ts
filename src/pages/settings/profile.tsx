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

const Profile: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth({ middleware: 'auth' })
  const [isLoading, setIsLoading] = useState(true)

  const { status: careersStatus, data: careers, error: careersError } = useQueryCareers()
  const { status: gendersStatus, data: genders, error: gendersError } = useQueryGenders()
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
    playFrequenciesStatus === 'pending'

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
      />
    </AppLayout>
  )
}

export default Profile
