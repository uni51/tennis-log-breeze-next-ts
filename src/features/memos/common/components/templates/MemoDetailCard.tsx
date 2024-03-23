import { AxiosError, AxiosResponse } from 'axios'
import parse from 'html-react-parser'
import { NextPage } from 'next'
import Link from 'next/link'
import router from 'next/router'
import { toast } from 'react-toastify'
import { showAlertModal } from '@/components/AlertModalManager'
import { apiClient } from '@/lib/utils/apiClient'
import { handleAxiosError } from '@/lib/utils/errorHandling'
import { Memo } from '@/types/Memo'
import { LoginUser } from '@/types/loginUser'

type Props = {
  memo: Memo
  loginUser?: LoginUser
  renderMemoListByCategoryLink: string
  renderMemoListByNickNameLink: string
  renderMemoListByTagLink?: string
}

const MemoDetailCard: NextPage<Props> = ({
  memo,
  loginUser,
  renderMemoListByCategoryLink,
  renderMemoListByNickNameLink,
  renderMemoListByTagLink,
}) => {
  const showAlert = () => {
    showAlertModal({
      message: '本当にこの記事を削除しますか？',
      onOk: memoDelete,
    })
  }

  const memoDelete = async () => {
    try {
      const response: AxiosResponse = await apiClient.post(
        `/api/dashboard/memos/delete/${memo?.id}`,
      )
      toast.success('記事を削除しました')
      router.push({
        pathname: '/dashboard/memos',
        query: { page: 1 },
      })
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        return handleAxiosError(error as AxiosError)
      } else {
        throw new Error(`Failed to fetch memo detail: ${String(error)}`)
      }
    }
  }

  return (
    <div className='mx-auto mt-10 sm:mt-20'>
      <div className='grid w-4/5 mx-auto gap-4'>
        <div className='bg-gray-100 shadow-lg mb-5 p-4 rounded-xl'>
          <p className='text-lg font-bold pt-2 pb-1'>{memo.title}</p>
          <div className='border-b-2 border-gray-300 mb-4'></div>
          <p className='mb-3 whitespace-pre-wrap'>{parse(memo.body)}</p>
          <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-lg text-pink-600 bg-pink-200 last:mr-0 mr-1'>
            <Link href={renderMemoListByCategoryLink}>{memo.category_name}</Link>
          </p>
          <p className='mt-1'>
            {memo.tag_list.tags.map((tag, index) => (
              <Link href={`${renderMemoListByTagLink}${tag}`} key={index} className='pr-1'>
                <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-blue-600 bg-blue-200 last:mr-0 mr-1'>
                  {tag}
                </span>
              </Link>
            ))}
          </p>
          <p className='mt-1'>
            <Link href={renderMemoListByNickNameLink}>
              <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-green-600 bg-green-200 last:mr-0 mr-1'>
                {memo.user_nickname}
              </span>
            </Link>
          </p>
          <p className='pt-1'>
            {memo.status !== 5 && (
              <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-white bg-black last:mr-0 mr-1'>
                {memo.status === 0 && '下書き'}
                {memo.status === 1 && '公開中'}
                {memo.status === 2 && 'シェア'}
                {memo.status === 3 && '非公開'}
              </span>
            )}
            {memo.status === 5 && (
              <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-white bg-red-500 last:mr-0 mr-1'>
                修正待ち
              </span>
            )}
          </p>
          <p className='text-sm leading-6 text-gray-500 mt-2 inline-block'>
            作成日時：{memo.created_at}
          </p>
          <p className='text-sm leading-6 text-gray-500 mt-2 inline-block'>
            更新日時：{memo.updated_at}
          </p>
          {loginUser && memo.user_id === loginUser.id && (
            <>
              <Link href={`/dashboard/memos/${memo.id}/edit`}>
                <p className='text-sm leading-6 font-bold text-blue-700 mt-2'>編集する</p>
              </Link>
              <p className='text-sm leading-6 font-bold text-blue-700 mt-2' onClick={showAlert}>
                この記事を削除
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemoDetailCard
