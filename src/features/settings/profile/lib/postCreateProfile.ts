import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'
import { UseFormSetError } from 'react-hook-form'
import { apiClient } from '@/lib/utils/apiClient'
import { toast } from 'react-toastify'
import { ProfileForm } from '@/types/form/profile/ProfileForm'

// プロフィールの編集
export const postCreateProfile = (
  postData: ProfileForm,
  setError: UseFormSetError<ProfileForm>,
) => {
  apiClient
    // CSRF保護の初期化
    .get('/auth/sanctum/csrf-cookie')
    .then((res) => {
      // APIへのリクエスト
      apiClient
        .post('/api/profile/create', postData)
        .then((response: AxiosResponse) => {
          // console.log(response.data)
          router.push('/settings/profile')
          toast.success(response.data.message)
        })
        .catch((err: AxiosError) => {
          // バリデーションエラー
          if (err.response?.status === 422) {
            const errors = err.response?.data.errors
            Object.keys(errors).map((key: string) => {
              setError(key as keyof ProfileForm, { message: errors[key][0] })
            })
          }
          if (err.response?.status === 500) {
            alert('システムエラーです！！')
          }
        })
    })
}
