import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { apiServer } from '@/lib/utils/apiServer'
import { Memo } from '@/types/Memo'

export async function getServerSideProps(context: { query: any; req: any }) {
  const { query, req } = context

  const res = await apiServer.get(`/api/memos/${query.id}`, {
    headers: {
      origin: process.env.ORIGIN_HOST!,
      Cookie: req.headers.cookie,
    },
  })
  const memo = res.data.data

  return {
    props: { memo },
  }
}

const MemoDetail: NextPage<Memo> = ({ memo }) => {
  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>メモ詳細</h2>}
    >
      <Head>
        <title>メモ詳細を表示</title>
      </Head>
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
    </AppLayout>
  )
}

export default MemoDetail
