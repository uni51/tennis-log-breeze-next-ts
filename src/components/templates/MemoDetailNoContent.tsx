import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Memo } from '@/types/Memo'

type Props = {
  message: string
}

const MemoDetailNotAllowed: NextPage<Props> = ({ message }) => {
  return (
    <div className='mx-auto mt-32'>
      <div className='grid w-4/5 mx-auto gap-4'>
        <div className='bg-gray-100 shadow-lg mb-5 p-4'>{message}</div>
      </div>
    </div>
  )
}

export default MemoDetailNotAllowed
