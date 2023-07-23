import { useRouter } from 'next/router'
import React from 'react'

const AddMemoButton = () => {
  const router = useRouter()

  return (
    <div className='w-1/2 mx-auto text-center'>
      <button
        className='text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400'
        onClick={() => router.push('/dashboard/memos/post')}
      >
        メモを追加する
      </button>
    </div>
  )
}

export default AddMemoButton
