import { useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'
import { UseFormSetError } from 'react-hook-form'
import { apiClient } from '@/lib/utils/apiClient'
import { MemoForm } from '@/types/MemoForm'
import { toast } from 'react-toastify'

// メモの編集
export const postEditMemo = (
  postData: MemoForm,
  setError: UseFormSetError<MemoForm>,
  memoId: number,
  queryClient: ReturnType<typeof useQueryClient>,
  setErrorMessage?: (message: string) => void,
) => {
  apiClient
    // CSRF保護の初期化
    .get('/auth/sanctum/csrf-cookie')
    .then(() => {
      // APIへのリクエスト
      apiClient
        .post(`/api/dashboard/memos/${memoId}`, postData)
        .then((response: AxiosResponse) => {
          if (response.status === 201) {
            router.push('/dashboard/memos') // 画面遷移
            toast.success('メモを更新しました')
            // Refetch memoList after successful update
            queryClient.invalidateQueries({ queryKey: ['memoList'] })
          }
        })
        .catch((err: AxiosError) => {
          // バリデーションエラー
          if (err.response?.status === 422) {
            const errors = err.response?.data.errors
            Object.keys(errors).map((key: string) => {
              setError(key as keyof MemoForm, { message: errors[key][0] })
              if (key === 'original-message') {
                setErrorMessage!(errors[key][0])
              }
            })
          }
          if (err.response?.status === 500) {
            alert('システムエラーです！！')
          }
        })
    })
}
