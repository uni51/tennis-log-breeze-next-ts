import { NextPage } from 'next'
import { Memo } from '@/types/Memo'
import Link from 'next/link'

const SingleMemoBlockForList: NextPage<{ memo: Memo }> = ({ memo }) => {
  return (
    <div className='bg-gray-100 shadow-lg mb-5 p-4'>
      <p className='text-lg font-bold mb-5'>{memo.title}</p>
      <p className='mb-5'>{memo.body}</p>
      <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-1'>
        {memo.category_name}
      </p>
      <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1'>
        {memo.status === 0 && '下書き'}
        {memo.status === 1 && '公開中'}
        {memo.status === 2 && 'シェア'}
        {memo.status === 3 && '非公開'}
      </p>
      <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 last:mr-0 mr-1'>
        <Link href={`/${memo.user_nickname}/memos/page/1`}>{memo.user_nickname}</Link>
      </p>
      <p className='text-sm leading-6 text-gray-500 mt-2'>更新日時：{memo.updated_at}</p>
    </div>
  )
}

export default SingleMemoBlockForList
