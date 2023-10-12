import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { RequiredMark } from '@/components/RequiredMark'
import { ProfileForm, editProfile } from '@/features/memos/dashboard/lib/editProfile'
import { Career } from '@/types/Career'
import { User } from '@/types/User'

type Props = {
  user: User
  career: Career[]
}

const schema = z.object({
  name: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  nickname: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  career_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  // career_id: z.number(),
})

const ProfileEditZod: React.FC<Props> = ({ user, career }) => {
  const defaultValues = {
    name: user.data?.name,
    nickname: user.data?.nickname,
    career_id: '4',
  }

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  return (
    <div className='w-4/5 mx-auto'>
      {/* <div className='mx-auto mt-4 sm:mt-16 border-2 px-6 sm:px-12 py-4 sm:py-16 rounded-2xl'> */}
      <div className='mx-auto mt-4 sm:mt-4 w-full py-4 rounded-2xl'>
        <div className='mb-2 sm:mb-4'>
          <div className='flex justify-start my-1 sm:my-2'>
            <p>名前</p>
            <RequiredMark />
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            {...register('name', { required: true })}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className='mb-2 sm:mb-4'>
          <div className='flex justify-start my-1 sm:my-2'>
            <p>ニックネーム</p>
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            {...register('nickname', { required: true })}
          />
          <p>{errors.nickname?.message}</p>
          {/* テニス歴 */}
          <div className='mb-2 sm:mb-4'>
            <p>テニス歴</p>
            <select
              className='mb-5'
              defaultValue={defaultValues?.career_id}
              {...register('career_id')}
            >
              {career.map((item, i) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.career_id?.message && <p>{errors.career_id?.message}</p>}
          </div>

          <div className='text-center'>
            <button
              className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 mt-8 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
              onClick={handleSubmit(editProfile)}
            >
              登録する
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditZod
