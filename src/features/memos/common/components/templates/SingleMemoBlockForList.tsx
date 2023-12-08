import Link from 'next/link'
import { FC } from 'react'
import { Memo } from '@/types/Memo'

type SingleMemoBlockForListProps = {
  memo: Memo
  renderMemoDetailLink: string
  renderMemoListByCategoryLink: string
  renderMemoListByNickNameLink: string
}

const SingleMemoBlockForList: FC<SingleMemoBlockForListProps> = ({
  memo,
  renderMemoDetailLink,
  renderMemoListByCategoryLink,
  renderMemoListByNickNameLink,
}) => {
  return (
    <div className='bg-gray-100 shadow-lg mb-5 p-4'>
      <p className='text-lg font-bold pt-2 pb-1'>
        <Link href={renderMemoDetailLink}>{memo.title}</Link>
      </p>
      <div className='border-b-2 border-gray-300 mb-4'></div>
      <p className='mb-5 whitespace-pre-wrap'>{memo.body}</p>
      <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-1'>
        <Link href={renderMemoListByCategoryLink}>
          {memo.category_id === 1 && 'フォアハンド'}
          {memo.category_id === 2 && 'バックハンド'}
          {memo.category_id === 3 && 'サーブ'}
          {memo.category_id === 4 && 'リターン'}
          {memo.category_id === 5 && 'ボレー'}
          {memo.category_id === 6 && 'スマッシュ'}
          {memo.category_id === 7 && 'ゲーム'}
          {memo.category_id === 99 && 'その他'}
        </Link>
      </p>
      <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1'>
        {memo.status === 0 && '下書き'}
        {memo.status === 1 && '公開中'}
        {memo.status === 2 && 'シェア'}
        {memo.status === 3 && '非公開'}
      </p>
      <p className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-green-600 bg-green-200 last:mr-0 mr-1'>
        <Link href={renderMemoListByNickNameLink}>{memo.user_nickname}</Link>
      </p>
      <p className='text-sm leading-6 text-gray-500 mt-2'>更新日時：{memo.updated_at}</p>
    </div>
  )
}

export default SingleMemoBlockForList
