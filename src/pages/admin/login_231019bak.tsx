import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEventHandler, useEffect, useState } from 'react'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAdminAuth } from '@/hooks/adminAuthQuery'

const AdminLogin_23109bak = () => {
  const { query } = useRouter()

  const { login } = useAdminAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/dashboard',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors]: [any, React.Dispatch<React.SetStateAction<never[]>>] = useState([])
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const reset = query && query.reset ? (query.reset as string) : ''
    if (reset.length > 0 && errors.length === 0) {
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
    })
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
        <AuthSessionStatus className='mb-4' status={status} />

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

            <InputError messages={errors.email} className='mt-2' />
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

            <InputError messages={errors.password} className='mt-2' />
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

export default AdminLogin_23109bak