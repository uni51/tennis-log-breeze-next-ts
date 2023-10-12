import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'
import { useState } from 'react'
import { apiClient } from '@/lib/utils/apiClient'

// POSTデータの型
export type ProfileForm = {
  name: string
  nickname: string
  career_id: string
}

// バリデーションメッセージの型
type Validation = {
  name?: string
  nickname?: string
  career_id?: string
}

// プロフィールの編集
export const editProfile = (postData: ProfileForm) => {
  const [validation, setValidation] = useState<Validation>({})

  // バリデーションメッセージの初期化
  // setValidation({})

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
            } = {} as Validation
            Object.keys(errors).map((key: string) => {
              validationMessages[key] = errors[key][0]
            })
            // state更新用オブジェクトに更新
            setValidation({ ...validation, ...validationMessages })
          }
          if (err.response?.status === 500) {
            alert('システムエラーです！！')
          }
        })
    })
}
