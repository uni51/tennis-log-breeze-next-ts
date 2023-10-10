import { ErrorMessage } from '@hookform/error-message'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RequiredMark } from '@/components/RequiredMark'
import { apiClient } from '@/lib/utils/apiClient'
import { Career } from '@/types/Career'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'
import { User } from '@/types/User'
import { PlayFrequency } from '@/types/playFrequency'

// POSTデータの型
type MemoForm = {
  title: string
  body: string
  category_id: number
  status_id: number
  career_id: number
  frequency_id: number
}

// バリデーションメッセージの型
type Validation = {
  title?: string
  body?: string
  category_id?: string
  status_id?: string
  career_id?: string
  frequency_id?: string
}

type Props = {
  user: User
  status: Status[]
  category: Category[]
  career: Career[]
  frequency: PlayFrequency[]
}

const ProfileEdit: React.FC<Props> = ({ user, status, category, career, frequency }) => {
  // ルーター定義
  const router = useRouter()
  const [validation, setValidation] = useState<Validation>({})

  console.log(frequency)

  const defaultValues = {
    title: user.data?.name,
    category_id: 3,
    status_id: 0,
    career_id: 4,
    frequency_id: 2,
  }

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoForm>({
    defaultValues,
  })

  // メモの登録
  const editProfile = (postData: MemoForm) => {
    // バリデーションメッセージの初期化
    setValidation({})

    apiClient
      // CSRF保護の初期化
      .get('/auth/sanctum/csrf-cookie')
      .then((res) => {
        // APIへのリクエスト
        apiClient
          .post('/api/dashboard/memos', postData)
          .then((response: AxiosResponse) => {
            console.log(response.data)
            router.push('/dashboard/memos')
          })
          .catch((err: AxiosError) => {
            // バリデーションエラー
            if (err.response?.status === 422) {
              const errors = err.response?.data.errors
              // state更新用のオブジェクトを別で定義
              const validationMessages: {
                [index: string]: string
              } = {} as Validation
              Object.keys(errors).map((key: string) => {
                validationMessages[key] = errors[key][0]
              })
              // state更新用オブジェクトに更新
              setValidation({ ...validation, ...validationMessages })
            }
            if (err.response?.status === 500) {
              alert('システムエラーです！！')
            }
          })
      })
  }

  return (
    <div className='w-4/5 mx-auto'>
      {/* <div className='mx-auto mt-4 sm:mt-16 border-2 px-6 sm:px-12 py-4 sm:py-16 rounded-2xl'> */}
      <div className='mx-auto mt-4 sm:mt-4 w-full py-4 rounded-2xl'>
        <div className='mb-2 sm:mb-4'>
          <div className='flex justify-start my-1 sm:my-2'>
            <p>表示名</p>
            <RequiredMark />
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            {...register('title', { required: '必須入力です。' })}
          />
          <ErrorMessage
            errors={errors}
            name={'title'}
            render={({ message }) => <p className='py-3 text-red-500'>{message}</p>}
          />
          {validation.title && <p className='py-3 text-red-500'>{validation.title}</p>}
        </div>
        <div className='mb-2 sm:mb-4'>
          <div className='flex justify-start my-1 sm:my-2'>
            <p>キャッチコピー</p>
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            {...register('title', { required: '必須入力です。' })}
          />
          <ErrorMessage
            errors={errors}
            name={'title'}
            render={({ message }) => <p className='py-3 text-red-500'>{message}</p>}
          />
          {validation.title && <p className='py-3 text-red-500'>{validation.title}</p>}
        </div>
        {/* テニス歴 */}
        <p>テニス歴</p>
        <select
          className='mb-5'
          defaultValue={defaultValues?.career_id}
          {...register('career_id', {
            validate: (value) => {
              return !!career.find((item) => item.id === Number(value)) ? true : '不正な値です'
            },
          })}
        >
          {career.map((item, i) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name={'career_id'}
          render={({ message }) => <p className='py-3 text-red-500'>{message}</p>}
        />
        {validation.career_id && <p className='py-3 text-red-500'>{validation.career_id}</p>}
        {/* プレー頻度 */}
        <p>プレー頻度</p>
        <select
          className='mb-5'
          {...register('frequency_id', {
            validate: (value) => {
              return !!frequency.find((item) => item.id === Number(value)) ? true : '不正な値です'
            },
          })}
        >
          {frequency.map((item, i) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name={'frequency_id'}
          render={({ message }) => <p className='py-3 text-red-500'>{message}</p>}
        />
        <p>利き腕</p>
        <select
          className='mb-5'
          {...register('category_id', {
            validate: (value) => {
              return !!category.find((item) => item.id === Number(value)) ? true : '不正な値です'
            },
          })}
        >
          {category.map((item, i) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name={'category_id'}
          render={({ message }) => <p className='py-3 text-red-500'>{message}</p>}
        />
        <p>レベル</p>
        <select
          className='mb-5'
          {...register('category_id', {
            validate: (value) => {
              return !!category.find((item) => item.id === Number(value)) ? true : '不正な値です'
            },
          })}
        >
          {category.map((item, i) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name={'category_id'}
          render={({ message }) => <p className='py-3 text-red-500'>{message}</p>}
        />
        {validation.category_id && <p className='py-3 text-red-500'>{validation.category_id}</p>}
        <p>プレースタイル</p>
        <select
          className='sm:mb-5'
          defaultValue={defaultValues?.status_id}
          {...register('status_id', {
            validate: (value) => {
              return !!status.find((item) => item.id == value) ? true : '不正な値です'
            },
          })}
        >
          {status.map((item, i) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name={'status_id'}
          render={({ message }) => <p className='py-3 text-red-500'>{message}</p>}
        />
        {validation.status_id && <p className='py-3 text-red-500'>{validation.status_id}</p>}
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
  )
}

export default ProfileEdit