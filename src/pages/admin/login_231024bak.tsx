import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAdminAuth } from '@/hooks/adminAuthQuery'
import { AxiosError } from 'axios'

interface ErrorData {
  email?: { message: string }[]
  password?: { message: string }[]
}
const getErrorMessages = (errors: { message: string }[] = []): ReactNode => {
  if (errors.length === 0) {
    return null
  }

  return (
    <ul className='mt-1 text-sm text-red-600'>
      {errors.map((error, index) => (
        <li key={index}>{error.message}</li>
      ))}
    </ul>
  )
}

const AdminLogin = () => {
  const { login } = useAdminAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/dashboard',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState<ErrorData>({})

  const getErrorData = (
    error: AxiosError<any>,
    setErrors: React.Dispatch<React.SetStateAction<ErrorData>>,
  ) => {
    if (error.response?.status === 422) {
      const errors = error.response?.data?.errors
      Object.keys(errors).map((key: string) => {
        setErrors((prevState) => ({
          ...prevState,
          [key]: [{ message: errors[key][0] }],
        }))
      })
    }
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // バックエンドへのリクエストを行う
      // await login({ email, password, remember: shouldRemember })
      await login({ email, password })

      // リクエストが成功した場合の処理
    } catch (error: unknown) {
      // リクエストが失敗した場合の処理
      console.log(`error: ${error}`)
      const errorData = getErrorData(error as AxiosError<any>, setErrors)
    }
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href='/'>
            <ApplicationLogo className='w-20 h-20 fill-current text-gray-500' />
          </Link>
        }
      >
        {/* Session Status */}
        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor='email' className={undefined}>
              Email
            </Label>

            <Input
              id='email'
              type='email'
              value={email}
              className='block mt-1 w-full'
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
            />
            <div className='flex items-center justify-start mt-4'>
              {getErrorMessages(errors.email)}
            </div>
          </div>

          {/* Password */}
          <div className='mt-4'>
            <Label htmlFor='password' className={undefined}>
              Password
            </Label>

            <Input
              id='password'
              type='password'
              value={password}
              className='block mt-1 w-full'
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete='current-password'
            />
            <div className='flex items-center justify-start mt-4'>
              {getErrorMessages(errors.password)}
            </div>
            {/* <InputError messages={errors.password} className='mt-2' /> */}
          </div>

          {/* Remember Me */}
          <div className='block mt-4'>
            <label htmlFor='remember_me' className='inline-flex items-center'>
              <input
                id='remember_me'
                type='checkbox'
                name='remember'
                className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                onChange={(event) => setShouldRemember(event.target.checked)}
              />

              <span className='ml-2 text-sm text-gray-600'>Remember me</span>
            </label>
          </div>

          <div className='flex items-center justify-end mt-4'>
            <Link
              href='/forgot-password'
              className='underline text-sm text-gray-600 hover:text-gray-900'
            >
              Forgot your password?
            </Link>

            <Button className='ml-3'>Login</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default AdminLogin
