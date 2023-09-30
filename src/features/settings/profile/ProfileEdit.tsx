import { ErrorMessage } from '@hookform/error-message'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RequiredMark } from '@/components/RequiredMark'
import { apiClient } from '@/lib/utils/apiClient'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'
import { User } from '@/types/User'

// POSTデータの型
type MemoForm = {
  title: string
  body: string
  category_id: number
  status_id: number
}

// バリデーションメッセージの型
type Validation = {
  title?: string
  body?: string
  category_id?: string
  status_id?: string
}

type Props = {
  user: User
  status: Status[]
  category: Category[]
}

const ProfileEdit: React.FC<Props> = ({ user, status, category }) => {
  // ルーター定義
  const router = useRouter()
  const [validation, setValidation] = useState<Validation>({})

  console.log(user)

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoForm>({
    defaultValues: { title: user.data?.name, category_id: 1, status_id: 1 },
  })

  // メモの登録
  const createMemo = (postData: MemoForm) => {
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
        <p>テニス歴</p>
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
        <p>プレー頻度</p>
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
        <p>生年月日</p>
        <select
          className='sm:mb-5'
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
            onClick={handleSubmit(createMemo)}
          >
            登録する
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
