import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { ProfileForm, postEditProfile } from '@/features/settings/profile/lib/postEditProfile'
import { User } from '@/types/User'
import { AgeRange } from '@/types/profile/AgreRange'
import { Career } from '@/types/profile/Career'
import { Gender } from '@/types/profile/Gender'

type Props = {
  user: User
  careers: Career[]
  genders: Gender[]
  ageRanges: AgeRange[]
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
})

const ProfileEdit: React.FC<Props> = ({ user, careers, genders, ageRanges }) => {
  const defaultValues = {
    name: user.data?.name,
    nickname: user.data?.nickname,
    career_id: '0', // 「選択してください」の値
    gender_id: '0', // 「選択してください」の値
    ageRange_id: '0', // 「選択してください」の値
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
          {/* 年代 */}
          <Select
            target={ageRanges}
            target_id={'ageRange_id'}
            required={true}
            label={'年代'}
            defaultValue={defaultValues?.ageRange_id}
          />
          {/* 登録するボタン */}
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default ProfileEdit
