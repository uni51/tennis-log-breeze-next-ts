import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, FormEventHandler } from 'react'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import GuestLayout from '@/components/Layouts/GuestLayout'
import PrimaryButton from '@/components/PrimaryButton'
// import Checkbox from '@/components/CheckBox'
import { useAuth } from '@/hooks/auth'
import { LoginError } from '@/types/authError'

const Login0726 = () => {
  const { query } = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [shouldRemember, setShouldRemember] = useState(false)
  // const [errors, setErrors]: [any, React.Dispatch<React.SetStateAction<never[]>>] = useState([])
  const [errors, setErrors] = useState<LoginError | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const reset = query && query.reset ? (query.reset as string) : ''
    if (reset.length > 0 && errors?.email === undefined && errors?.password === undefined) {
      setStatus(atob(reset))
    } else {
      setStatus(null)
    }
  })

  const submitForm: FormEventHandler = async (event) => {
    event.preventDefault()

    login({
      email,
      password,
      // remember: shouldRemember,
      setErrors,
      setStatus,
    })
  }

  return (
    <GuestLayout>
      <Head>
        <title>Laravel - Login</title>
      </Head>
      <AuthCard logo={undefined}>
        {/* Session Status */}
        <AuthSessionStatus className='mb-4' status={status} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor='email'>Email</Label>

            <Input
              id='email'
              type='email'
              value={email}
              className='block mt-1 w-full'
              onChange={(event) => setEmail(event.target.value)}
              // required
              isFocused={true}
            />

            <InputError messages={errors?.email} className='mt-2' />
          </div>

          {/* Password */}
          <div className='mt-4'>
            <Label htmlFor='password'>Password</Label>

            <Input
              id='password'
              type='password'
              value={password}
              className='block mt-1 w-full'
              onChange={(event) => setPassword(event.target.value)}
              // required
              autoComplete='current-password'
            />

            <InputError messages={errors?.password} className='mt-2' />
          </div>

          {/* Remember Me */}
          {/* <div className='block mt-4'>
            <label htmlFor='remember_me' className='inline-flex items-center'>
              <Checkbox
                id='remember_me'
                name='remember'
                checked={shouldRemember}
                onChange={(event) => setShouldRemember(event.target.checked)}
              />
              <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>Remember me</span>
            </label>
          </div> */}

          <div className='flex items-center justify-end mt-4'>
            <Link
              href='/forgot-password'
              className='underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800'
            >
              Forgot your password?
            </Link>

            <PrimaryButton className='ml-4'>Login</PrimaryButton>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Login0726
