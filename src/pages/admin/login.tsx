import Link from 'next/link'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAdminAuthQuery } from '@/hooks/adminAuthQuery'
import { FormProvider, UseFormSetError, useForm } from 'react-hook-form'
import { AdminLogin } from '@/types/AdminLogin'
import { AdminLoginSchema } from '@/features/memos/dashboard/lib/schema/AdminLoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '@/components/Form/TextInput'
import { isAxiosError } from '@/lib/utils/axiosUtils'
import { use, useEffect } from 'react'
import { useRouter } from 'next/router'

const AdminLogin = () => {
  const { login, admin } = useAdminAuthQuery({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/dashboard',
  })

  const router = useRouter()

  useEffect(() => {
    if (admin) {
      router.push('/admin/dashboard')
    }
  }, [admin])

  const useFormMethods = useForm<AdminLogin>({
    resolver: zodResolver(AdminLoginSchema),
  })

  const { handleSubmit, setError } = useFormMethods

  const submitForm = async (postData: AdminLogin, setError: UseFormSetError<AdminLogin>) => {
    try {
      // バックエンドへのリクエストを行う
      await login(postData)

      // リクエストが成功した場合の処理
    } catch (err: any) {
      if (isAxiosError(err)) {
        // バリデーションエラー
        if (err.response?.status === 422) {
          const errors = err.response?.data.errors
          Object.keys(errors).map((key: string) => {
            setError(key as keyof AdminLogin, { message: errors[key][0] })
          })
        }
        if (err.response?.status === 500) {
          alert('システムエラーです！！')
        }
      }
    }
  }

  return (
    <FormProvider {...useFormMethods}>
      <GuestLayout>
        <AuthCard
          logo={
            <Link href='/'>
              <ApplicationLogo className='w-20 h-20 fill-current text-gray-500' />
            </Link>
          }
        >
          {/* Session Status */}
          <form onSubmit={handleSubmit((data) => submitForm(data, setError))}>
            {/* Email Address */}
            <div>
              {/* Email */}
              <TextInput target={'email'} required={true} label={'Email'} />
            </div>

            {/* Password */}
            <div className='mt-4'>
              <TextInput target={'password'} required={true} label={'Password'} />
            </div>

            <div className='flex items-center justify-end mt-4'>
              <Button className='ml-3'>Login</Button>
            </div>
          </form>
        </AuthCard>
      </GuestLayout>
    </FormProvider>
  )
}

export default AdminLogin
