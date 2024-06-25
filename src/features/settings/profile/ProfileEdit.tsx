import { FormProvider } from 'react-hook-form'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { ProfileForm, postEditProfile } from '@/features/settings/profile/lib/postEditProfile'
import { User } from '@/types/User'

import { SimpleSelect } from '@/types/form/SimpleSelect'
import { generateDays, generateMonths, generateYears } from '@/lib/utils/selectBirthdayUtils'
import useProfileForm from '@/hooks/form/useProfileForm' // カスタムフックのインポート

type Props = {
  user: User
  careers: SimpleSelect[]
  genders: SimpleSelect[]
  dominantHands: SimpleSelect[]
  playFrequencies: SimpleSelect[]
  tennisLevels: SimpleSelect[]
}

const ProfileEdit: React.FC<Props> = ({
  user,
  careers,
  genders,
  dominantHands,
  playFrequencies,
  tennisLevels,
}) => {
  // カスタムフックの使用
  const formMethods = useProfileForm(user)
  const { handleSubmit, setError } = formMethods

  const years = generateYears(1900, 2020)
  const months = generateMonths()
  const days = generateDays()

  return (
    <FormProvider {...formMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        <form onSubmit={handleSubmit((data: ProfileForm) => postEditProfile(data, setError))}>
          <TextInput
            target={'name'}
            required={true}
            label={'名前'}
            subText={'表示されることはありません'}
          />
          <TextInput target={'nickname'} required={true} label={'ニックネーム'} />
          <Select
            target={careers}
            target_id={'career_id'}
            required={true}
            label={'テニス歴'}
            defaultValue={formMethods.getValues('career_id')}
          />
          <Select
            target={genders}
            target_id={'gender_id'}
            required={true}
            label={'性別'}
            defaultValue={formMethods.getValues('gender_id')}
          />
          <Select
            target={years}
            target_id={'year'}
            required={true}
            label={'生年月日（年）'}
            defaultValue={formMethods.getValues('year')}
          />
          <Select
            target={months}
            target_id={'month'}
            required={true}
            label={'生年月日（月）'}
            defaultValue={formMethods.getValues('month')}
          />
          <Select
            target={days}
            target_id={'day'}
            required={true}
            label={'生年月日（日）'}
            defaultValue={formMethods.getValues('day')}
          />
          <Select
            target={dominantHands}
            target_id={'dominantHand_id'}
            required={true}
            label={'利き手'}
            defaultValue={formMethods.getValues('dominantHand_id')}
          />
          <Select
            target={playFrequencies}
            target_id={'playFrequency_id'}
            required={true}
            label={'プレー頻度'}
            defaultValue={formMethods.getValues('playFrequency_id')}
          />
          <Select
            target={tennisLevels}
            target_id={'tennisLevel_id'}
            required={true}
            label={'レベル'}
            defaultValue={formMethods.getValues('tennisLevel_id')}
          />
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default ProfileEdit
