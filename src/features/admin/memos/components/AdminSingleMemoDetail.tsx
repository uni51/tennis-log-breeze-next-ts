import { AxiosError, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import router from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { showAlertModal } from '@/components/AlertModalManager'
import { Memo } from '@/types/Memo'
import { LoginUser } from '@/types/loginUser'

type Props = {
  memo: Memo
  setTitleText?: Dispatch<SetStateAction<string>>
}
const AdminSingleMemoDetail: NextPage<Props> = ({ memo }) => {
  const showAlert = () => {
    showAlertModal({
      message: '本当にこの記事を削除しますか？',
      onOk: () => {
        memoDelete()
      },
    })
  }

  const memoDelete = () => {
    toast.success('記事を削除しました')
    router.push('/admin/memos')
    // apiClient
    //   // CSRF保護の初期化
    //   .get('/auth/sanctum/csrf-cookie')
    //   .then((res) => {
    //     // APIへのリクエスト
    //     apiClient
    //       .post(`/api/admin/memos/${memo?.id}/delete`)
    //       .then((response: AxiosResponse) => {
    //         router.push({
    //           pathname: '/admin/memos',
    //           query: { page: 1 },
    //         })
    //       })
    //       .catch((err: AxiosError) => {
    //         // バリデーションエラー
    //         if (err.response?.status === 422) {
    //         }
    //         if (err.response?.status === 500) {
    //           alert('システムエラーです！！')
    //         }
    //       })
    // })
  }

  return (
    <div className='mx-auto mt-10 sm:mt-20'>
      <div className='grid w-4/5 mx-auto gap-4'>
        <div className='bg-gray-100 shadow-lg mb-5 p-4 rounded-xl'>
          <p className='text-lg font-bold pt-2 pb-1'>{memo.title}</p>
          <div className='border-b-2 border-gray-300 mb-4'></div>
          <p className='mb-3 whitespace-pre-wrap'>{memo.body}</p>
          <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-1'>
            {memo.category_name}
          </p>
          <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1 mb-2'>
            {memo.status === 0 && '下書き'}
            {memo.status === 1 && '公開中'}
            {memo.status === 2 && 'シェア'}
            {memo.status === 3 && '非公開'}
          </p>
          <p className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-green-600 bg-green-200 last:mr-0 mr-1'>
            <Link href={`/${memo.user_nickname}/memos/page/1`}>{memo.user_nickname}</Link>
          </p>
          <p className='text-sm leading-6 text-gray-500 mt-2'>作成日時：{memo.created_at}</p>
          <p className='text-sm leading-6 text-gray-500 mt-2'>更新日時：{memo.updated_at}</p>

          <p className='text-sm leading-6 font-bold text-blue-700 mt-2' onClick={showAlert}>
            この記事を削除
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminSingleMemoDetail
