import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Memo } from '@/types/Memo'

const MemoDetail: NextPage<{ memo: Memo }> = ({ memo }) => {
  return (
    <div className='mx-auto mt-32'>
      <div className='grid w-4/5 mx-auto gap-4'>
        <div className='bg-gray-100 shadow-lg mb-5 p-4'>
          <p className='text-lg font-bold mb-1'>{memo.title}</p>
          <p className=''>{memo.body}</p>
          <p className='text-lg font-bold mb-1'>{memo.category_name}</p>
          <p className='text-sm mb-1'>作成日時：{memo.created_at}</p>
          <p className='text-sm mb-1'>更新日時：{memo.updated_at}</p>
        </div>
      </div>
    </div>
  )
}

export default MemoDetail
