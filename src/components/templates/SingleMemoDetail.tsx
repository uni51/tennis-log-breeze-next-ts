import { NextPage } from 'next'
import { Memo } from '@/types/Memo'

const SingleDetailMemo: NextPage<{ memo: Memo }> = ({ memo }) => {
  return (
    <div className='mx-auto mt-20'>
      <div className='grid w-4/5 mx-auto gap-4'>
        <div className='bg-gray-100 shadow-lg mb-5 p-4'>
          <p className='text-lg font-bold mb-3'>{memo.title}</p>
          <p className='mb-3'>{memo.body}</p>
          <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-1'>
            {memo.category_name}
          </p>
          <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1'>
            {memo.status === 0 && '下書き'}
            {memo.status === 1 && '公開中'}
            {memo.status === 2 && 'シェア'}
            {memo.status === 3 && '非公開'}
          </p>
          <p className='text-sm leading-6 text-gray-500 mt-2'>更新日時：{memo.updated_at}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleDetailMemo
