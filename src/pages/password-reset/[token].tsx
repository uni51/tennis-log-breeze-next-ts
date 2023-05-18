import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEventHandler, useEffect, useState } from 'react'
import ApplicationLogo from '../../components/ApplicationLogo'
import AuthCard from '../../components/AuthCard'
import AuthSessionStatus from '../../components/AuthSessionStatus'
import Button from '../../components/Button'
import Input from '../../components/Input'
import InputError from '../../components/InputError'
import Label from '../../components/Label'
import GuestLayout from '../../components/Layouts/GuestLayout'
import { useAuth } from '../../hooks/auth'

const PasswordReset = () => {
  const { query } = useRouter()

  const { resetPassword } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors]: [any, React.Dispatch<React.SetStateAction<never[]>>] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm: FormEventHandler = (event) => {
    event.preventDefault()

    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    })
  }

  useEffect(() => {
    const email = query && query.email ? (query.email as string) : ''
    setEmail(email)
  }, [query.email])

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
            />

            <InputError messages={errors.password} className='mt-2' />
          </div>

          {/* Confirm Password */}
          <div className='mt-4'>
            <Label htmlFor='passwordConfirmation' className={undefined}>
              Confirm Password
            </Label>

            <Input
              id='passwordConfirmation'
              type='password'
              value={passwordConfirmation}
              className='block mt-1 w-full'
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />

            <InputError messages={errors.password_confirmation} className='mt-2' />
          </div>

          <div className='flex items-center justify-end mt-4'>
            <Button>Reset Password</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default PasswordReset
