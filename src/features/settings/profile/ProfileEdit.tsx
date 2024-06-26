import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { ProfileForm, postEditProfile } from '@/features/settings/profile/lib/postEditProfile'
import { User } from '@/types/User'
import { SimpleSelect } from '@/types/form/SimpleSelect'

type Props = {
  user: User
  careers: SimpleSelect[]
  genders: SimpleSelect[]
  ageRanges: SimpleSelect[]
  dominantHands: SimpleSelect[]
  playFrequencies: SimpleSelect[]
  tennisLevels: SimpleSelect[]
}

const ProfileSchema = z.object({
  name: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  nickname: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  career_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  gender_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  ageRange_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  dominantHand_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  playFrequency_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  tennisLevel_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
})

const ProfileEdit: React.FC<Props> = ({
  user,
  careers,
  genders,
  ageRanges,
  dominantHands,
  playFrequencies,
  tennisLevels,
}) => {
  const defaultValues = {
    name: user.data?.name,
    nickname: user.data?.nickname,
    career_id: '0', // 「選択してください」の値
    gender_id: '0', // 「選択してください」の値
    ageRange_id: '0', // 「選択してください」の値
    dominantHand_id: '0', // 「選択してください」の値
    playFrequency_id: '0', // 「選択してください」の値
    tennisLevel_id: '0', // 「選択してください」の値
  }

  // React-Hook-Form
  const useFormMethods = useForm<ProfileForm>({
    defaultValues,
    resolver: zodResolver(ProfileSchema),
  })

  const { handleSubmit, setError } = useFormMethods

  return (
    <FormProvider {...useFormMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        <form onSubmit={handleSubmit((data) => postEditProfile(data, setError))}>
          {/* 名前 */}
          <TextInput
            target={'name'}
            required={true}
            label={'名前'}
            subText={'表示されることはありません'}
          />
          {/* ニックネーム */}
          <TextInput target={'nickname'} required={true} label={'ニックネーム'} />
          {/* テニス歴 */}
          <Select
            target={careers}
            target_id={'career_id'}
            required={true}
            label={'テニス歴'}
            defaultValue={defaultValues?.career_id}
          />
          {/* 性別 */}
          <Select
            target={genders}
            target_id={'gender_id'}
            required={true}
            label={'性別'}
            defaultValue={defaultValues?.gender_id}
          />
          {/* 年齢 */}
          <Select
            target={ageRanges}
            target_id={'ageRange_id'}
            required={true}
            label={'年齢'}
            defaultValue={defaultValues?.ageRange_id}
          />
          {/* 利き手 */}
          <Select
            target={dominantHands}
            target_id={'dominantHand_id'}
            required={true}
            label={'利き手'}
            defaultValue={defaultValues?.dominantHand_id}
          />
          {/* プレー頻度 */}
          <Select
            target={playFrequencies}
            target_id={'playFrequency_id'}
            required={true}
            label={'プレー頻度'}
            defaultValue={defaultValues?.playFrequency_id}
          />
          {/* レベル */}
          <Select
            target={tennisLevels}
            target_id={'tennisLevels_id'}
            required={true}
            label={'レベル'}
            defaultValue={defaultValues?.tennisLevel_id}
          />
          {/* 登録するボタン */}
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default ProfileEdit
