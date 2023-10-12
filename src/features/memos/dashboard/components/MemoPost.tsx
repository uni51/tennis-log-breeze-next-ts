import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { RequiredMark } from '@/components/RequiredMark'
import { createMemo } from '@/features/memos/dashboard/lib/createMemo'
import { Category } from '@/types/Category'
import { MemoForm } from '@/types/MemoForm'
import { Status } from '@/types/Status'

type Props = {
  statuses: Status[]
  categories: Category[]
}

const MemoPostSchema = z.object({
  title: z.string().min(1, { message: '必須入力です。' }),
  body: z.string().min(1, { message: '必須入力です。' }),
  category_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  status_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
})

const MemoPost: React.FC<Props> = ({ statuses, categories }) => {
  const defaultValues = {
    category_id: '1', // カテゴリーは、フォアハンドをデフォルト値にする
    status_id: '0', // ステータスは、下書きをデフォルト値にする
  }

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<MemoForm>({
    defaultValues,
    resolver: zodResolver(MemoPostSchema),
  })

  return (
    <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
      <form onSubmit={handleSubmit((data) => createMemo(data, setError))}>
        {/* タイトル */}
        <div className='mb-2 sm:mb-4'>
          <div className='flex justify-start my-1 sm:my-2'>
            <p>タイトル</p>
            <RequiredMark />
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            {...register('title', { required: true })}
          />
          {errors.title?.message && <p className='py-3 text-red-500'>{errors.title?.message}</p>}
        </div>
        {/* 内容 */}
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>内容</p>
            <RequiredMark />
          </div>
          <textarea
            className='p-2 border rounded-md w-full outline-none'
            cols={30}
            rows={12}
            {...register('body', { required: true })}
          />
          {errors.body?.message && <p className='py-3 text-red-500'>{errors.body?.message}</p>}
        </div>
        {/* カテゴリー */}
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>カテゴリー</p>
            <RequiredMark />
          </div>
          <select
            defaultValue={defaultValues?.category_id}
            {...register('category_id', { required: true })}
          >
            {categories.map((item, i) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.category_id?.message && (
            <p className='py-3 text-red-500'>{errors.category_id?.message}</p>
          )}
        </div>
        {/* ステータス */}
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>ステータス</p>
            <RequiredMark />
          </div>
          <select
            defaultValue={defaultValues?.status_id}
            {...register('status_id', { required: true })}
          >
            {statuses.map((item, i) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.status_id?.message && (
            <p className='py-3 text-red-500'>{errors.status_id?.message}</p>
          )}
        </div>
        {/* 登録するボタン */}
        <div className='text-center'>
          <button
            className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 mt-8 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
            type='submit'
          >
            登録する
          </button>
        </div>
      </form>
    </div>
  )
}

export default MemoPost
