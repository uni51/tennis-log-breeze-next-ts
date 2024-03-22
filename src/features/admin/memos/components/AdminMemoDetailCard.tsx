import { AxiosError, AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import router from 'next/router'
import { toast } from 'react-toastify'
import { showAlertModal } from '@/components/AlertModalManager'
import { apiClient } from '@/lib/utils/apiClient'
import { handleAxiosError } from '@/lib/utils/errorHandling'
import { Memo } from '@/types/Memo'
import parse from 'html-react-parser'

type Props = {
  memo: Memo
  renderMemoListByCategoryLink: string
  renderMemoListByNickNameLink: string
  renderMemoListByTagLink?: string
}

const AdminMemoDetailCard: NextPage<Props> = ({
  memo,
  renderMemoListByCategoryLink,
  renderMemoListByNickNameLink,
  renderMemoListByTagLink,
}) => {
  const showAlertForDelete = () => {
    showAlertModal({
      message: '本当にこの記事を削除しますか？',
      onOk: memoDelete,
    })
  }

  const showAlertForEdit = () => {
    showAlertModal({
      message: 'この記事の修正を依頼しますか？',
      onOk: memoEditRequest,
    })
  }

  const memoDelete = async () => {
    try {
      const response: AxiosResponse = await apiClient.post(`/api/admin/memos/${memo?.id}/delete`)
      toast.success('記事を削除しました')
      router.push({
        pathname: '/admin/memos',
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

  const memoEditRequest = async () => {
    try {
      const response: AxiosResponse = await apiClient.post(
        `/api/admin/memos/${memo?.id}/request-modify`,
      )
      toast.success(response.data.message)
      // 必要に応じて適切なリダイレクトを行う
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        return handleAxiosError(error as AxiosError)
      } else {
        throw new Error(`Failed to request memo edit: ${String(error)}`)
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
          {Boolean(memo.is_waiting_for_admin_review) === true && (
            <p className='pt-1'>
              <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-white bg-red-500 last:mr-0 mr-1'>
                管理者レビュー待ち
              </span>
            </p>
          )}
          <p className='text-sm leading-6 text-gray-500 mt-2 inline-block'>
            作成日時：{memo.created_at}
          </p>
          <p className='text-sm leading-6 text-gray-500 mt-2 inline-block'>
            更新日時：{memo.updated_at}
          </p>
          <p className='text-sm leading-6 font-bold text-blue-700 mt-2' onClick={showAlertForEdit}>
            記事の修正を依頼する（記事の掲載は一時停止されます）
          </p>
          <p
            className='text-sm leading-6 font-bold text-blue-700 mt-2'
            onClick={showAlertForDelete}
          >
            記事を完全に削除する
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminMemoDetailCard
