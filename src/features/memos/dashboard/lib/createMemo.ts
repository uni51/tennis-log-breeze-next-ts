import { apiClient } from '@/lib/utils/apiClient'
import { MemoForm, MemoFormValidation } from '@/types/MemoForm'
import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'
import { UseFormSetError } from 'react-hook-form'

// メモの登録
export const createMemo = (postData: MemoForm, setError: UseFormSetError<MemoForm>) => {
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
            } = {} as MemoFormValidation
            Object.keys(errors).map((key: string) => {
              setError(key as keyof MemoForm, { message: errors[key][0] })
            })
          }
          if (err.response?.status === 500) {
            alert('システムエラーです！！')
          }
        })
    })
}
