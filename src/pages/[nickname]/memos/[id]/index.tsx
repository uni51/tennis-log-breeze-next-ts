import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import NickNameMemoDetail from '@/features/memos/nickname/components/NickNameMemoDetail'
import { Memo } from '@/types/Memo'

/* ユーザー毎の公開中のメモ詳細ページ */
const MemoByNickNameDetail: NextPage<Memo> = () => {
  const router = useRouter()
  const { nickname, id } = router.query
  const [apiUrl, setApiUrl] = useState('')

  // Fetch用URL組み立て
  useEffect(() => {
    const init = async () => {
      if (router.isReady) {
        const apiUri = `api/public/${nickname}/memos/${id}`
        setApiUrl(apiUri)
      }
    }
    init()
  }, [router, apiUrl])

  const headline = `${nickname}さんの公開メモ`

  return (
    <>
      <Head>
        <title>メモ詳細を表示</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
      >
        <NickNameMemoDetail apiUrl={apiUrl} />
      </AppLayout>
    </>
  )
}

export default MemoByNickNameDetail
