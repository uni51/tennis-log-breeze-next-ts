import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'

/* ユーザー毎のTOPページ */
const UserMemo: NextPage = () => {
  const router = useRouter()
  const { nickName } = router.query

  const headline = `${nickName}さんのページ`

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-32'>{nickName}さんのページ</div>
    </AppLayout>
  )
}

export default UserMemo
