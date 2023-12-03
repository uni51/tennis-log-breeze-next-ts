import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, UseFormSetError, useForm } from 'react-hook-form'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import { TextInput } from '@/components/Form/TextInput'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { Loading } from '@/components/Loading'
import { AdminLoginSchema } from '@/features/admin/lib/schema/AdminLoginSchema'
import { useAdminAuthQuery } from '@/hooks/adminAuthQuery'
import { isAxiosError } from '@/lib/utils/axiosUtils'
import { AdminLogin } from '@/types/AdminLogin'

const AdminLogin = () => {
  const { login, getAdmin } = useAdminAuthQuery({
    middleware: 'guest',
    redirectIfAuthenticated: '/admin/dashboard',
  })
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      // // ログイン中か判定
      const res = await getAdmin.refetch()
      if (res.data) {
        router.push('/admin/dashboard')
        return
      }
      setIsLoading(false)
    }
    init()
  }, [])

  const useFormMethods = useForm<AdminLogin>({
    resolver: zodResolver(AdminLoginSchema),
  })

  if (isLoading) return <Loading />

  const { handleSubmit, setError } = useFormMethods

  const submitForm = async (postData: AdminLogin, setError: UseFormSetError<AdminLogin>) => {
    try {
      setIsLoading(true) // リクエスト開始時にisLoadingをtrueに設定
      // バックエンドへのリクエストを行う
      await login(postData)
      // リクエストが成功した場合の処理
      const res = await getAdmin.refetch()
      console.log(res)
      if (res.data) {
        router.push('/admin/dashboard')
      }
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
      setIsLoading(false) // リクエスト完了時にisLoadingをfalseに設定
    }
    // } finally {
    //   setIsLoading(false) // リクエスト完了時にisLoadingをfalseに設定
    // }
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
            {/* Email */}
            <div>
              <TextInput target={'email'} required={true} label={'Email'} />
            </div>

            {/* Password */}
            <div className='mt-4'>
              {/* TODO: パスワード入力に変更 */}
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
