import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'
import { UseFormSetError } from 'react-hook-form'
import { apiClient } from '@/lib/utils/apiClient'
import { MemoForm } from '@/types/MemoForm'

// メモの編集
export const postEditMemo = (
  postData: MemoForm,
  setError: UseFormSetError<MemoForm>,
  memoId: number,
) => {
  apiClient
    // CSRF保護の初期化
    .get('/auth/sanctum/csrf-cookie')
    .then((res) => {
      // APIへのリクエスト
      apiClient
        .post(`/api/dashboard/memos/${memoId}`, postData)
        .then((response: AxiosResponse) => {
          console.log(response.data)
          router.push('/dashboard/memos')
        })
        .catch((err: AxiosError) => {
          // バリデーションエラー
          if (err.response?.status === 422) {
            const errors = err.response?.data.errors
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
