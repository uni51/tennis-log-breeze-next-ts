import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { ProfileForm, editProfile } from '@/features/memos/dashboard/lib/editProfile'
import { Career } from '@/types/Career'
import { User } from '@/types/User'

type Props = {
  user: User
  careers: Career[]
}

const ProfileSchema = z.object({
  name: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  nickname: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  career_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  // career_id: z.number(),
})

const ProfileEdit: React.FC<Props> = ({ user, careers }) => {
  const defaultValues = {
    name: user.data?.name,
    nickname: user.data?.nickname,
    career_id: '4',
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
        <form onSubmit={handleSubmit((data) => editProfile(data, setError))}>
          {/* 名前 */}
          <TextInput target={'name'} required={true} label={'名前'} />
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
          {/* 登録するボタン */}
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default ProfileEdit
