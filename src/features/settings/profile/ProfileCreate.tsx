import { FormProvider } from 'react-hook-form'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { postCreateProfile } from '@/features/settings/profile/lib/postCreateProfile'
import { ProfileForm } from '@/types/form/profile/ProfileForm'
import { User } from '@/types/User'

import { SimpleSelect } from '@/types/form/SimpleSelect'
import { generateDays, generateMonths, generateYears } from '@/lib/utils/selectBirthdayUtils'
import useProfileCreate from '@/hooks/form/useProfileCreate' // カスタムフックのインポート

type Props = {
  user: User
  careers: SimpleSelect[]
  genders: SimpleSelect[]
  dominantHands: SimpleSelect[]
  playFrequencies: SimpleSelect[]
  tennisLevels: SimpleSelect[]
}

const ProfileCreate: React.FC<Props> = ({
  user,
  careers,
  genders,
  dominantHands,
  playFrequencies,
  tennisLevels,
}) => {
  // カスタムフックの使用
  const formMethods = useProfileCreate(user)
  const { handleSubmit, setError } = formMethods

  const years = generateYears(1900, 2020)
  const months = generateMonths()
  const days = generateDays()

  return (
    <FormProvider {...formMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        <form onSubmit={handleSubmit((data: ProfileForm) => postCreateProfile(data, setError))}>
          {/* 名前 */}
          <TextInput
            target={'name'}
            required={true}
            label={'名前'}
            subText={'表示されることはありません'}
          />
          {/* ニックネーム */}
          <TextInput target={'nickname'} required={false} label={'ニックネーム'} disabled={true} />
          {/* テニス歴 */}
          <Select
            target={careers}
            target_id={'career_id'}
            required={true}
            label={'テニス歴'}
            defaultValue={formMethods.getValues('career_id')}
          />
          {/* 性別 */}
          <Select
            target={genders}
            target_id={'gender_id'}
            required={true}
            label={'性別'}
            defaultValue={formMethods.getValues('gender_id')}
          />
          {/* 生年月日 */}
          <div className='flex flex-row justify-start items-center mb-4'>
            <label>生年月日</label>
            <p className='text-lg text-red-500 ml-1'>*</p>
            <Select
              target={years}
              target_id={'birthYear'}
              required={false}
              label={'（年）'}
              defaultValue={formMethods.getValues('birthYear')}
              style={'mr-6'}
            />
            <Select
              target={months}
              target_id={'birthMonth'}
              required={false}
              label={'（月）'}
              defaultValue={formMethods.getValues('birthMonth')}
              style={'mr-6'}
            />
            <Select
              target={days}
              target_id={'birthDay'}
              required={false}
              label={'（日）'}
              defaultValue={formMethods.getValues('birthDay')}
            />
          </div>

          {/* 利き手 */}
          <Select
            target={dominantHands}
            target_id={'dominantHand_id'}
            required={true}
            label={'利き手'}
            defaultValue={formMethods.getValues('dominantHand_id')}
          />
          {/* プレー頻度 */}
          <Select
            target={playFrequencies}
            target_id={'playFrequency_id'}
            required={true}
            label={'プレー頻度'}
            defaultValue={formMethods.getValues('playFrequency_id')}
          />
          {/* レベル */}
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

export default ProfileCreate
