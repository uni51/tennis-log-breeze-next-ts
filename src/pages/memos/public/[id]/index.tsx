import { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import MemoDetail from '@/components/templates/SingleDetailMemo'
import { apiServer } from '@/lib/utils/apiServer'
import { Memo } from '@/types/Memo'

export async function getServerSideProps(context: { query: any; req: any }) {
  const { query, req } = context

  try {
    const apiMemosResponse = await apiServer.get(`/api/memos/${query.id}`, {
      headers: {
        origin: process.env.ORIGIN_HOST!,
        Cookie: req.headers.cookie,
      },
    })

    const memo = apiMemosResponse.data.data ?? null

    // ユーザーIDと記事の作成者IDが合致する場合
    if (memo) {
      return {
        props: { memo },
      }
    } else {
      return {
        props: {},
      }
    }
  } catch (error: any) {
    if (error.response.status === 404) {
      return { notFound: true }
    } else {
      console.error(error)
    }
  }
}

type Props = {
  memo: Memo
}

const PublicMemoDetail: NextPage<Props> = ({ memo }) => {
  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>メモ詳細</h2>}
    >
      <Head>
        <title>メモ詳細を表示</title>
      </Head>
      <MemoDetail memo={memo} />
    </AppLayout>
  )
}

export default PublicMemoDetail
