import { NextPage } from 'next'
import { Memo } from '@/types/Memo'

const MemoDetail: NextPage<{ memo: Memo }> = ({ memo }) => {
  return (
    <div className='mx-auto mt-20'>
      <div className='grid w-4/5 mx-auto gap-4'>
        <div className='bg-gray-100 shadow-lg mb-5 p-4'>
          <p className='text-lg font-bold mb-1'>{memo.title}</p>
          <p className=''>{memo.body}</p>
          <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-1'>
            {memo.category_name}
          </p>
          <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1'>
            公開中
          </p>
          <p className='text-sm leading-6 text-gray-500 mt-2'>更新日時：{memo.updated_at}</p>
        </div>
      </div>
    </div>
  )
}

export default MemoDetail
